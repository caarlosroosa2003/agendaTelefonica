import { Injectable, signal } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environment';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  id = 0;
  private supabase: SupabaseClient;

  setID(id: number) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  getContacts(): Observable<[]> {
    return from(this.supabase.from('contactos').select('*').then(response => response.data as []));
  }

  insertContact(contacto: any):Observable<[]>  {
    return from(this.supabase
    .from('contactos')
    .insert([
      { nombre: contacto.nombre, phone: contacto.phone },
    ])
    .select()  
    .then(response => response.data as unknown as []));
  }

  deleteContactoByPhone(phone: string): Observable<[]> {
    return from(this.supabase
      .from('contactos')
      .delete()
      .eq('phone', parseInt(phone))
      .select()
      .then(response => response.data as unknown as [])
  )}

  deleteAllContacts(): Observable<[]> {
    return from(this.supabase
      .from('contactos')
      .delete()
      .select()
      .then(response => response.data as unknown as []))
  }

  

  updateContact(name: string, phone: string, id: number):Observable<[]>  {
    return from(this.supabase
    .from('contactos')
    .update({ nombre: name, phone: phone })
    .eq( 'id', id )
    .select()  
    .then(response => response.data as unknown as []));
  }

}


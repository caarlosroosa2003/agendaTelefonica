import { Injectable, signal } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    constructor() { }

    listContactos = signal<Contact[]>([]);
    listadoAuxiliar = this.listContactos();
}
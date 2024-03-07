import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { share } from 'rxjs';
import { SharedService } from '../SharedService/sharedService.component';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  private supabaseService = inject(SupabaseService);
  constructor(private sharedService: SharedService) { }

  listContactos = this.sharedService.listContactos;
  // Numero de telefono que empieza por 6 o 7
  patternTelefono = '^[6-7][0-9]{8}$';

  telefonoController = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.minLength(9),
      Validators.maxLength(9),
      Validators.pattern(this.patternTelefono),
      Validators.required
    ]
  });

  nombreController = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

 

  checkForm(isAdd: boolean) {
    if (this.telefonoController.valid && this.nombreController.valid && isAdd) {
      this.addContacto(this.nombreController.value, this.telefonoController.value);
      console.log(this.listContactos());
      console.log(this.nombreController.value);
      console.log(this.telefonoController.value);
      this.telefonoController.reset();
      this.nombreController.reset();
      return true;
    }else{
      
        this.updateContacto(this.nombreController.value, this.telefonoController.value, this.supabaseService.getID());
        console.log(this.listContactos());
        console.log(this.nombreController.value);
        console.log(this.telefonoController.value);
        this.telefonoController.reset();
        this.nombreController.reset();
        return true;
    }
    return false;
  }

  addContacto(name: string, phone: string) {
    const contactExists = this.listContactos().find(contact => contact.phone === phone);
    let contacto = {
      nombre: name,
      phone: parseInt(phone)
    }
    if (!contactExists) {
      this.supabaseService.insertContact(contacto).subscribe({
        next: (data) => {
          console.log(data);
        }
        
      });
    }
  }

  removeAllContactos() {
    this.supabaseService.deleteAllContacts().subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }

  updateContacto(name: string, phone: string, id: number) {
    const contactExists = this.listContactos().find(contact => contact.id === id);
    if (contactExists) {
      this.supabaseService.updateContact(name, phone, id).subscribe({
        next: (data) => {
          console.log(data);
        }
    });
  }
}

}





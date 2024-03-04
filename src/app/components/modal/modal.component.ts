import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { share } from 'rxjs';
import { SharedService } from '../SharedService/sharedService.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

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
      this.updateContacto(this.nombreController.value, this.telefonoController.value);
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
    const contactExists = this.listContactos().find(contact => contact.telefono === phone);

    if (!contactExists) {
      this.listContactos.update((listadoContactos) => {
        return [
          ...listadoContactos,
          {
            id: listadoContactos.length + 1,
            nombre: name,
            telefono: phone
          }
        ];
      });
    }
  }

  removeAllContactos() {
    this.listContactos.update(() => []);
  }

  updateContacto(name: string, phone: string) {
    let listadoContactos = this.listContactos();
    listadoContactos.map((contact) => {
      if (contact.telefono === phone) {
        contact.nombre = name;
        contact.telefono = phone;
      }
    });
  }
}





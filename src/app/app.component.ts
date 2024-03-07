import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from './components/SharedService/sharedService.component';
import { SupabaseService } from './services/supabase.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalComponent, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  faEdit = faEdit;
  faTrash = faTrash;
  title = 'AgendaTelefonica';

  constructor(private sharedService: SharedService) { }

  listContactos = this.sharedService.listContactos;
  supabase = inject(SupabaseService);
  
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

  removeContacto(phone: string) {
    let listadoContactos = this.listContactos();
    listadoContactos.map((contact, index) => {
      if (contact.phone === phone) {
        listadoContactos.splice(index, 1);
      }
    });
  }

  private supabaseService = inject(SupabaseService);

  ngOnInit() {
    this.supabaseService.getContacts().subscribe({
      next: (data) => {
        console.log(data);
        this.sharedService.listContactos.set(data);
      }
      
    });
  }

  deleteContact(phone: string) {
    console.log(phone);
    const contactExists = this.listContactos().find(contact => contact.phone === phone);
    let contacto = {
      phone: parseInt(phone)
    }
      if (contactExists) {
        this.supabaseService.deleteContactoByPhone(contacto.phone.toString()).subscribe({
          next: (data) => {
            console.log(data);
          }
          
        });
      }
  };

  recuperarId(id: number) {
    this.supabaseService.setID(id);
  }

  updateContacto(name: string, phone: string) {
    console.log(name);
    console.log(phone);
}
}

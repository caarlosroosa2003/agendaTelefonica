import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { HeaderComponent } from './components/header/header.component';
import { Contact } from './components/models/contact.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from './components/SharedService/sharedService.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalComponent, HeaderComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  faEdit = faEdit;
  faTrash = faTrash;
  title = 'AgendaTelefonica';

  constructor(private sharedService: SharedService) { }



  listContactos = this.sharedService.listContactos;

  removeContacto(phone: string) {
    let listadoContactos = this.listContactos();
    listadoContactos.map((contact, index) => {
      if (contact.telefono === phone) {
        listadoContactos.splice(index, 1);
      }
    });
  }


  
}

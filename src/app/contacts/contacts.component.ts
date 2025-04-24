import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contacts.service';
import { MatTableModule } from '@angular/material/table';
import { contacts } from '../interfaces/interface/contacts';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit {
  //Déclaration d'une variable globale
  contactsDataArray: contacts[] = [];
  contactnom: any;
  contactprenom: any;
  contactemail: any;
  //
  selectedUser: any;
  //Constructeur
  constructor(
    private ContactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  //Initialisation des arguments
  ngOnInit(): void {
    //Méthode pour réccupérer les éléments du tableau

    this.contactsDataArray = this.ContactService.getContacts();
    console.log(this.contactsDataArray);
  }
  //Fonction pour l'affichage
  voirDetails(user: any) {
    this.selectedUser = user;
  }
  //Recherche de contacts par le nom et l'id
  search(event: any) {
    console.log(event.target.value);
    const searchValue = event.target.value.toLowerCase();
    if (searchValue) {
      this.contactsDataArray = this.ContactService.getContacts().filter(
        (el) =>
          el.nom.toLowerCase().includes(searchValue) ||
          el.tel.includes(searchValue) ||
          el.prenom.toLowerCase().includes(searchValue) ||
          el.adressemail.toLowerCase().includes(searchValue)
      );
    } else {
      this.contactsDataArray = this.ContactService.getContacts();
    }
  }
}

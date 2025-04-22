import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contacts.service';
import { MatTableModule } from '@angular/material/table';
import { contacts } from '../interfaces/interface/contacts';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports:[CommonModule,RouterModule, MatCardModule, MatButtonModule,MatTableModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit {
  //Déclaration d'une variable globale
  contactsDataArray: contacts[] = [];
  //
  selectedUser: any;
  //Constructeur
  constructor(private ContactService: ContactService) {}
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

  revenir() {
    this.selectedUser = null;
  }
  hideDetails() {
    this.selectedUser = null;
  }
 

  
}

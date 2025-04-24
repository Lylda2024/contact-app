import { Injectable } from '@angular/core';
import { contacts } from '../interfaces/interface/contacts';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: contacts[] = [
    {
      id: 1,
      nom: 'Kouadio',
      prenom: 'Jean',
      tel: '0700000001',
      adressemail: 'jean.kouadio@example.com',
      adressePostale: 'Abidjan, Cocody',
      entreprise: 'Orange CI',
      fonction: 'Ingénieur réseau',
      dateNaissance: new Date('1990-05-15'),
      site: 'https://jeankouadio.dev',
      typeContact: 'professionnel',
      notes: 'Très réactif par email.',
      photo: 'jean.jpg',
      reseauxSociaux: '@jeankouadio',
      favori: true,
    },

    {
      id: 2,
      nom: 'Touré',
      prenom: 'Fatou',
      tel: '0700000002',
      adressemail: 'fatou.toure@example.com',
      adressePostale: 'Yopougon, Sideci',
      entreprise: 'Banque Atlantique',
      fonction: 'Analyste financière',
      dateNaissance: new Date('1988-11-03'),
      typeContact: 'professionnel',
      favori: false,
    },

    {
      id: 3,
      nom: 'Koffi',
      prenom: 'Michel',
      tel: '0700000003',
      adressemail: 'michel.koffi@example.com',
      adressePostale: 'Treichville, Rue 12',
      entreprise: 'Freelance',
      fonction: 'Développeur Web',
      dateNaissance: new Date('1995-07-22'),
      site: 'https://michelkoffi.tech',
      typeContact: 'ami',
      notes: 'Disponible en soirée.',
      reseauxSociaux: '@michelk_dev',
      favori: true,
    },

    {
      id: 4,
      nom: 'Bamba',
      prenom: 'Awa',
      tel: '0700000004',
      adressemail: 'awa.bamba@example.com',
      adressePostale: 'Marcory, Résidentiel',
      entreprise: 'UNICEF',
      fonction: 'Chargée de projet',
      dateNaissance: new Date('1992-03-18'),
      typeContact: 'professionnel',
      photo: 'awa.jpg',
      favori: false,
    },
  ];

  getContacts(): contacts[] {
    return this.contacts;
  }

  addContact(newContact: contacts): void {
    this.contacts.unshift(newContact);
  }
  //Modification
  updateContact(updatedContact: contacts): void {
    console.log('Contact update', updatedContact);

    const index = this.contacts.findIndex((c) => c.id == updatedContact.id);
    console.log('this.contacts[index]', index);

    if (index !== -1) {
      this.contacts[index] = updatedContact;
    }
  }

  deleteContact(id: number) {
    const index = this.contacts.findIndex((contact) => contact.id === id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
    }
  }

  getContactById(id: number): contacts | undefined {
    return this.contacts.find((c) => c.id === id);
  }
  //Fontion pour la recherche de contacts
  search(nom: string, prenom: string, email: string): contacts | undefined {
    return this.contacts.find((c) => c.nom === nom);
    return this.contacts.find((c) => c.prenom === prenom);
  }
}

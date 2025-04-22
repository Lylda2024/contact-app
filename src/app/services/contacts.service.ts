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
      tel: '+2250700000001',
      adressemail: 'jean.kouadio@example.com',
      adressePostale: 'Abidjan, Cocody',
      entreprise: 'Orange CI',
      fonction: 'Ingénieur réseau',
      dateNaissance: new Date('1990-05-15'),
      site: 'https://jeankouadio.dev',
      typeContact: 'Professionnel',
      notes: 'Très réactif par email.',
      photo: 'jean.jpg',
      reseauxSociaux: '@jeankouadio',
      favori: true,
    },

    {
      id: 2,
      nom: 'Touré',
      prenom: 'Fatou',
      tel: '+2250700000002',
      adressemail: 'fatou.toure@example.com',
      adressePostale: 'Yopougon, Sideci',
      entreprise: 'Banque Atlantique',
      fonction: 'Analyste financière',
      dateNaissance: new Date('1988-11-03'),
      typeContact: 'Professionnel',
      favori: false,
    },

    {
      id: 3,
      nom: 'Koffi',
      prenom: 'Michel',
      tel: '+2250700000003',
      adressemail: 'michel.koffi@example.com',
      adressePostale: 'Treichville, Rue 12',
      entreprise: 'Freelance',
      fonction: 'Développeur Web',
      dateNaissance: new Date('1995-07-22'),
      site: 'https://michelkoffi.tech',
      typeContact: 'Personnel',
      notes: 'Disponible en soirée.',
      reseauxSociaux: '@michelk_dev',
      favori: true,
    },

    {
      id: 4,
      nom: 'Bamba',
      prenom: 'Awa',
      tel: '+2250700000004',
      adressemail: 'awa.bamba@example.com',
      adressePostale: 'Marcory, Résidentiel',
      entreprise: 'UNICEF',
      fonction: 'Chargée de projet',
      dateNaissance: new Date('1992-03-18'),
      typeContact: 'Professionnel',
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

  updateContact(updatedContact: contacts): void {
    const index = this.contacts.findIndex((c) => c.id === updatedContact.id);
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
}

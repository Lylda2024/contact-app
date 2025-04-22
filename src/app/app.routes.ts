import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactFormComponent } from './contact-form/contact-form.component'; // 👈 à importer
import { DetailspagesComponent } from './detailspages/detailspages.component';
import { SuppressionComponent } from './suppression/suppression.component';
import { ModifComponent } from './modif/modif.component';

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contact-form', component: ContactFormComponent },
  { path: 'details/:id', component: DetailspagesComponent },

  { path: 'suppression/:id', component: SuppressionComponent },
  { path: 'modif/:id', component: ModifComponent },
];

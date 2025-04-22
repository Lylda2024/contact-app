import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { ContactService } from '../services/contacts.service';
import { contacts } from '../interfaces/interface/contacts';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialog,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatButtonModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @ViewChild('addDialog') addDialog!: TemplateRef<any>;
  formGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    tel: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    adressemail: new FormControl('', [Validators.required, Validators.email]),
    adressePostale: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    entreprise: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    fonction: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    dateNaissance: new FormControl('', Validators.required),
    site: new FormControl('', [Validators.minLength(3)]),
    typeContact: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required),
    reseauxSociaux: new FormControl(''),
    favori: new FormControl(false),
  });

  private dialog = inject(MatDialog);

  constructor(private contactservice: ContactService, private router: Router) {}

  isInvalidAndTouchedOrDirty(formControl: FormControl) {
    return formControl.invalid && (formControl.touched || formControl.dirty);
  }

  onSubmit(): void {
    const newContact: contacts = {
      id: this.contactservice.getContacts().length + 1,
      nom: this.formGroup.value.nom || '',
      prenom: this.formGroup.value.prenom || '',
      tel: this.formGroup.value.tel || '',
      adressemail: this.formGroup.value.adressemail || '',
      adressePostale: this.formGroup.value.adressePostale || '',
      entreprise: this.formGroup.value.entreprise || '',
      fonction: this.formGroup.value.fonction || '',
      dateNaissance: this.formGroup.value.dateNaissance
        ? new Date(this.formGroup.value.dateNaissance)
        : new Date(),
      site: this.formGroup.value.site || '',
      typeContact: this.formGroup.value.typeContact || '',
      notes: this.formGroup.value.notes || '',
      photo: this.formGroup.value.photo || '',
      reseauxSociaux: this.formGroup.value.reseauxSociaux || '',
      favori: this.formGroup.value.favori || false,
    };

    this.contactservice.addContact(newContact);
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    }).fire({
      title: 'Contact ajouté avec succès',
      icon: 'success' as SweetAlertIcon,
    });

    this.router.navigate(['/']);
  }

  openAddDialog(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          confirmButton: 'custom-confirm-button',
          cancelButton: 'custom-cancel-button',
        },
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      }).fire({
        title: ' Formulaire invalide :Veuillez bien remplir le formulaire',
        icon: 'error' as SweetAlertIcon,
      });

      return;
    }

    this.dialog.open(this.addDialog, {
      width: '250px',
    });
  }
}

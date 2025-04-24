import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
export class ContactFormComponent implements OnInit {
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
    reseauxSociaux: new FormControl('', [Validators.required]),
    favori: new FormControl(false),
  });

  private dialog = inject(MatDialog);

  constructor(
    private contactservice: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  contactsDataArray: contacts[] = [];
  contactDetail: contacts[] | any = [];
  contactid: any;

  ngOnInit(): void {
    this.contactid = this.route.snapshot.paramMap.get('id');
    this.contactsDataArray = [...this.contactservice.getContacts()].reverse();
    this.contactDetail = this.contactsDataArray.filter(
      (el) => el.id == this.contactid
    );
    console.log(this.contactid);
    console.log(this.contactDetail);
    if (this.contactid) {
      this.formGroup.patchValue(this.contactDetail[0]);

      const date = new Date(this.contactDetail[0].dateNaissance);
      const formattedDate = date.toISOString().substring(0, 10);

      this.formGroup.get('dateNaissance')?.setValue(formattedDate);
      this.formGroup
        .get('typeContact')
        ?.setValue(this.contactDetail[0].typeContact);
      this.imageBase64 = this.contactDetail[0].photo;
    }
  }

  isInvalidAndTouchedOrDirty(formControl: FormControl) {
    return formControl.invalid && (formControl.touched || formControl.dirty);
  }

  onSubmit(): void {
    const newContact: contacts = {
      id: this.contactid
        ? this.contactid
        : this.contactservice.getContacts().length + 1,
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
      photo: this.imageBase64 || '',
      reseauxSociaux: this.formGroup.value.reseauxSociaux || '',
      favori: this.formGroup.value.favori || false,
    };

    if (this.contactid) {
      this.contactservice.updateContact(newContact);
    } else {
      this.contactservice.addContact(newContact);
    }

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
      title: this.contactid
        ? 'Contact modifié avec succès'
        : 'Contact ajouté avec succès',
      icon: 'success' as SweetAlertIcon,
    });

    this.router.navigate(['/']);
  }

  openAddDialog(): void {
    this.formGroup.markAllAsTouched();
    if (this.imageBase64) {
      this.formGroup.get('photo')?.setValue(this.imageBase64 as string);
    }
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

  imageBase64: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string; // Stocke l'image en base64 dans la variable
    };
    reader.readAsDataURL(file); // Convertit le fichier en base64
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-modif',
  standalone: true,
  imports: [],
  templateUrl: './modif.component.html',
  styleUrl: './modif.component.scss'
})
export class ModifComponent {
  formGroup = new FormGroup({
    nom: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[A-Z][a-zA-Z ]*'),
    ]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    tel: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^(01|05|07)[0-9]{8}$'),
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

  isInvalidAndTouchedOrDirty(formControl: FormControl) {
    return formControl.invalid && (formControl.touched || formControl.dirty);
  }

  onSubmit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      alert('Veuillez bien remplir le formulaire');
      return;
    }
    console.log('Formulaire valide', this.formGroup.value);
  }

  
}

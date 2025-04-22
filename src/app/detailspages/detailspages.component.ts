import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ContactService } from '../services/contacts.service';
import { contacts } from '../interfaces/interface/contacts';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import {} from '@angular/material/dialog';

@Component({
  selector: 'app-detailspages',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    DatePipe,
    CommonModule,
  ],
  templateUrl: './detailspages.component.html',
  styleUrl: './detailspages.component.scss',
})
export class DetailspagesComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  //Injection des dépendances
  contactsDataArray: contacts[] = [];
  contactDetail: contacts[] = [];
  contactid: any;
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;

  //Constructeur
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  //Initialisation des arguments

  ngOnInit(): void {
    //Méthode pour réccupérer les éléments du tableau
    this.contactid = this.route.snapshot.paramMap.get('id');
    this.contactsDataArray = [...this.contactService.getContacts()].reverse();
    this.contactDetail = this.contactsDataArray.filter(
      (el) => el.id == this.contactid
    );
    console.log(this.contactDetail);
  }

  //suppression
  deleteContact(id: number): void {
    this.contactService.deleteContact(id);
    this.router.navigate(['/']);
  }

  openDeleteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(this.deleteDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

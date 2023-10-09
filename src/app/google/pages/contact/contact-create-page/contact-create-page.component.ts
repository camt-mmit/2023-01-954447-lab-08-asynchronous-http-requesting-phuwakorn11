import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  PersonFormData } from 'src/app/google/models';
import { take } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { ContactFormComponent } from 'src/app/google/contacts/contact-form/contact-form.component';
import { ContactsService } from 'src/app/google/services/contacts.service';


@Component({
  selector: 'app-contact-create-page',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ContactFormComponent],
  templateUrl: './contact-create-page.component.html',
  styleUrls: ['./contact-create-page.component.scss']
})
export class ContactCreatePageComponent {
  private readonly contactsService = inject(ContactsService);

  protected onSubmit(personFormData: PersonFormData): void{
    this.contactsService.create(personFormData).pipe(
      take(1),
    ).subscribe(() => {
        history.back();
    });
  }
}

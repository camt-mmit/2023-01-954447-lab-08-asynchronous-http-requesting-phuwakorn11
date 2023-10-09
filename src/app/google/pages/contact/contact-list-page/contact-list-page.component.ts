import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from 'src/app/google/services/contacts.service';
import { RouterLink } from '@angular/router';
import { ContactListComponent } from 'src/app/google/contacts/contact-list/contact-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@Component({
    selector: 'app-contact-list-page',
    standalone: true,
    templateUrl: './contact-list-page.component.html',
    styleUrls: ['./contact-list-page.component.scss'],
    imports: [CommonModule, RouterLink, ContactListComponent, MatIconModule, MatListModule]
})
export class ContactListPageComponent {
  private readonly contactsService = inject(ContactsService);

  protected readonly data$ = this.contactsService.getAll({
    personFields: 'names,photos,emailAddresses,phoneNumbers',
    sortOrder: 'FIRST_NAME_ASCENDING',
  });
}

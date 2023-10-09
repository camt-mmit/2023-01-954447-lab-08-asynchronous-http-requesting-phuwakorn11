import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from 'src/app/google/services/events.service';
import { EventFormData } from 'src/app/google/models';
import { take } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { ContactFormComponent } from 'src/app/google/contacts/contact-form/contact-form.component';


@Component({
  selector: 'app-contact-create-page',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ContactFormComponent],
  templateUrl: './contact-create-page.component.html',
  styleUrls: ['./contact-create-page.component.scss']
})
export class ContactCreatePageComponent {
  private readonly eventsService = inject(EventsService);

  protected onSubmit(eventFormData: EventFormData): void{
    this.eventsService.create(eventFormData).pipe(
      take(1),
    ).subscribe(() => {
        history.back();
    });
  }
}

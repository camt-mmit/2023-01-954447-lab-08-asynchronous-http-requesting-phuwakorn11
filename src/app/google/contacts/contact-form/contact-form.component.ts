import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EventFormData } from '../../models';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule,MatDatepickerModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder).nonNullable;
  protected readonly formGroup = this.fb.group(
    {
      summary: ['untitled', {
        updateOn: 'blur'
      }],
      start: [
        new Date(),
        {
          updateOn: 'blur',
        },
      ],

      end: [
        new Date(),
        {
          updateOn: 'blur',
        },
        ],


    }
  );

  @Output() readonly dataChange = new EventEmitter<EventFormData>();

  protected doSubmit(): void {
    if(this.formGroup.invalid) {
      return;
    }
    const formData = this.formGroup.getRawValue();
    const [startDate] = formData.start.toISOString().split('T');
    const [endDate] = formData.end.toISOString().split('T');


    this.dataChange.emit({
      summary: formData.summary,
      start: {
        date:  startDate,
      },

      end: {
        date:  endDate,
      },

    });
  }
}

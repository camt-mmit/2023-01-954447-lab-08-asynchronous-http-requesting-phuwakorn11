import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { List, SearchData, planets } from '../../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly formGroup = this.fb.group({
    search: [
      '',
      {
        updateOn: 'submit',
      }

  ],
    page: [''],
  });

  @Input({ required: true }) data!: List<planets>;

  @Input() set searchData(searchData: SearchData){
    this.formGroup.setValue({
      search: '',
      page: '',
      ...searchData,
    }
    );
  }
  @Output() readonly searchDataChange = new EventEmitter<SearchData>();
  private emitSearchData():void{
    const value = this.formGroup.value;



    this.searchDataChange.emit(
      {
        ...(value.search? {search: value.search} : null ),
        ...(value.page && value.page !== '1' ? {page: value.page} : null ),
      }
    );
  }

  protected get pages(): number{
    return Math.ceil(this.data.count/10);
  }

  protected getId(url: URL): string{
    return url.pathname.replace(/\/$/,'').split('/').pop() ?? '';
  }

  protected doSearchDataChange(): void{
    this.formGroup.controls.page.setValue('');
    this.emitSearchData();
  }


  protected doPageChange(url: URL | null):void{
    if(url === null){
      return;
    }
    this.formGroup.controls.page.setValue(url.searchParams.get('page') ?? '');
    this.emitSearchData();


 }
}

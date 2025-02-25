import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from './componenets/company-form/company-form.component';
import { CompanyListComponent } from './componenets/company-grid/company-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CompanyFormComponent, CompanyListComponent],
  template: `
    <h1>Company Management</h1>
    <app-company-form></app-company-form>
   <app-company-list></app-company-list>
  `
})
export class AppComponent {}

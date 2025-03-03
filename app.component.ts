import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from './componenets/company-form/company-form.component';
import { CompanyListComponent } from './componenets/company-grid/company-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CompanyFormComponent, CompanyListComponent],
  template: `
    <div class="container mt-5">
      <div class="text-center mb-4">
        <h1 class="display-3 fw-bold text-primary shadow-sm fancy-title">Company Management</h1>
      </div>

      <div class="row">
        <div class="col-lg-5">
          <div class="card shadow-lg border-0 rounded-4">
            <div class="card-header bg-success text-white text-center">
              <h3 class="fw-bold stylish-heading">➕ Add / Update Company</h3>
            </div>
            <div class="card-body bg-light">
              <app-company-form></app-company-form>
            </div>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="card shadow-lg border-0 rounded-4">
            <div class="card-header bg-info text-white text-center">
              <h3 class="fw-bold stylish-heading">📋 Company List</h3>
            </div>
            <div class="card-body bg-light">
              <app-company-list></app-company-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Lobster&display=swap');

      .fancy-title {
        font-family: 'Lobster', cursive;
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        color: #007bff;
      }

      .stylish-heading {
        font-family: 'Poppins', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    `
  ]
})
export class AppComponent {}

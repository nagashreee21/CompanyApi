import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <div class="card">
        <div class="card-header bg-primary text-white text-center">
          <h2>Company List</h2>
        </div>
        <div class="card-body">
          <table class="table table-striped text-center">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>No. of Employees</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let company of companies">
                <td>{{ company.id }}</td>
                <td>{{ company.name }}</td>
                <td>{{ company.location }}</td>
                <td>{{ company.no_Of_Emp }}</td>
                <td>{{ company.type }}</td>
                <td>
                  <button class="btn btn-sm btn-warning" (click)="editCompany(company)">Edit</button>
                  <button class="btn btn-sm btn-danger" (click)="deleteCompany(company.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div *ngIf="editing" class="card mt-4">
        <div class="card-header bg-warning text-white text-center">
          <h2>Edit Company</h2>
        </div>
        <div class="card-body">
          <form (ngSubmit)="updateCompany()">
            <div class="mb-3">
              <label class="form-label">ID:</label>
              <input type="number" class="form-control" [(ngModel)]="selectedCompany.id" name="id" disabled />
            </div>
            <div class="mb-3">
              <label class="form-label">Name:</label>
              <input type="text" class="form-control" [(ngModel)]="selectedCompany.name" name="name" required />
            </div>
            <div class="mb-3">
              <label class="form-label">No. of Employees:</label>
              <input type="number" class="form-control" [(ngModel)]="selectedCompany.no_Of_Emp" name="no_Of_Emp" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Location:</label>
              <select class="form-select" [(ngModel)]="selectedCompany.location" name="location" required>
                <option *ngFor="let loc of locations" [value]="loc">{{ loc }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Type:</label>
              <div class="form-check">
                <input class="form-check-input" type="radio" [(ngModel)]="selectedCompany.type" name="type" value="Service" required />
                <label class="form-check-label">Service</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" [(ngModel)]="selectedCompany.type" name="type" value="Product" required />
                <label class="form-check-label">Product</label>
              </div>
            </div>
            <div class="d-flex justify-content-around mt-4">
              <button type="submit" class="btn btn-primary">Update</button>
              <button type="button" class="btn btn-secondary" (click)="cancelEdit()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class CompanyListComponent implements OnInit {
  private companyService = inject(CompanyService);
  private logger = inject(LoggerService);

  companies: Company[] = [];
  locations = ['Bangalore', 'Pune', 'Mumbai', 'Delhi', 'Hyderabad'];
  selectedCompany: Company = { id: 0, name: '', no_Of_Emp: 0, location: '', type: '' };
  editing = false;

  ngOnInit() {
    this.logger.logInfo('Loading company list...');
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getAll().subscribe((data) => {
      this.companies = data;
      this.logger.logInfo('Company list loaded successfully.', data);
    }, (error) => this.logger.logError('Failed to load company list', error));
  }

  editCompany(company: Company) {
    this.logger.logInfo(`Editing company: ${company.id}`, company);
    this.selectedCompany = { ...company };
    this.editing = true;
  }

  updateCompany() {
    this.companyService.put(this.selectedCompany.id, this.selectedCompany).subscribe(() => {
      this.logger.logInfo(`Company updated successfully: ${this.selectedCompany.id}`, this.selectedCompany);
      this.editing = false;
      this.loadCompanies();
    }, (error) => this.logger.logError('Failed to update company', error));
  }

  deleteCompany(id: number) {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.delete(id).subscribe(() => {
        this.logger.logWarning(`Company deleted: ${id}`);
        this.loadCompanies();
      }, (error) => this.logger.logError('Failed to delete company', error));
    }
  }

  cancelEdit() {
    this.logger.logInfo('Edit canceled.');
    this.editing = false;
    this.selectedCompany = { id: 0, name: '', no_Of_Emp: 0, location: '', type: '' };
  }
}

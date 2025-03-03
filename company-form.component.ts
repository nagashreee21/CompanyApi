import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <div class="card shadow-lg border-0">
        <div class="card-header bg-primary text-white text-center">
          <h2 class="fw-bold">Company Form</h2>
        </div>
        <div class="card-body bg-light">
          <form (ngSubmit)="submitForm()">
            <div class="mb-3">
              <label class="form-label fw-semibold text-primary">ID:</label>
              <input type="number" class="form-control border-primary" [(ngModel)]="company.id" name="id" required />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold text-success">Name:</label>
              <input type="text" class="form-control border-success" [(ngModel)]="company.name" name="name" required />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold text-info">No. of Employees:</label>
              <input type="number" class="form-control border-info" [(ngModel)]="company.no_Of_Emp" name="no_Of_Emp" required />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold text-danger">Location:</label>
              <select class="form-select border-danger" [(ngModel)]="company.location" name="location" required>
                <option *ngFor="let loc of locations" [value]="loc">{{ loc }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold text-warning">Type:</label>
              <div class="form-check">
                <input class="form-check-input" type="radio" [(ngModel)]="company.type" name="type" value="Service" required />
                <label class="form-check-label">Service</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" [(ngModel)]="company.type" name="type" value="Product" required />
                <label class="form-check-label">Product</label>
              </div>
            </div>

            <div class="d-flex justify-content-around mt-4">
              <button type="submit" class="btn btn-lg btn-primary shadow-sm">Add</button>
              <button type="button" class="btn btn-lg btn-warning shadow-sm text-white" (click)="updateCompany()">Update</button>
              <button type="button" class="btn btn-lg btn-danger shadow-sm" (click)="deleteCompany()">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class CompanyFormComponent {
  private companyService = inject(CompanyService);
  private logger = inject(LoggerService);

  company: Company = { id: 0, name: '', no_Of_Emp: 0, location: '', type: '' };
  locations = ['Bangalore', 'Pune', 'Mumbai', 'Delhi', 'Hyderabad'];

  // Add a company
  submitForm() {
    this.companyService.post(this.company).subscribe(() => {
      this.logger.logInfo('Company added successfully!', this.company);
      this.resetForm();
    }, (error) => this.logger.logError('Failed to add company', error));
  }

  // Update a company
  updateCompany() {
    if (this.company.id) {
      this.companyService.put(this.company.id, this.company).subscribe(() => {
        this.logger.logInfo('Company updated successfully!', this.company);
        this.resetForm();
      }, (error) => this.logger.logError('Failed to update company', error));
    } else {
      this.logger.logWarning('Attempted to update without a valid ID');
    }
  }

  // Delete a company
  deleteCompany() {
    if (this.company.id) {
      this.companyService.delete(this.company.id).subscribe(() => {
        this.logger.logWarning(`Company deleted with ID: ${this.company.id}`);
        this.resetForm();
      }, (error) => this.logger.logError('Failed to delete company', error));
    } else {
      this.logger.logWarning('Attempted to delete without a valid ID');
    }
  }

  resetForm() {
    this.company = { id: 0, name: '', no_Of_Emp: 0, location: '', type: '' };
  }
}

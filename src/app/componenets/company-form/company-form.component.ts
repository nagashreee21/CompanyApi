import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Company Form</h2>
    <form (ngSubmit)="submitForm()">
      <label>ID:</label>
      <input type="number" [(ngModel)]="company.id" name="id" required />

      <label>Name:</label>
      <input type="text" [(ngModel)]="company.name" name="name" required />

      <label>No. of Employees:</label>
      <input type="number" [(ngModel)]="company.no_Of_Emp" name="no_Of_Emp" required />

      <label>Location:</label>
      <select [(ngModel)]="company.location" name="location" required>
        <option *ngFor="let loc of locations" [value]="loc">{{ loc }}</option>
      </select>

      <label>Type:</label>
      <label>
        <input type="radio" [(ngModel)]="company.type" name="type" value="Service" required /> Service
      </label>
      <label>
        <input type="radio" [(ngModel)]="company.type" name="type" value="Product" required /> Product
      </label>

      <button type="submit">Add</button>
      <button type="button" (click)="updateCompany()">Update</button>
      <button type="button" (click)="deleteCompany()">Delete</button>
    </form>
  `
})
export class CompanyFormComponent {
  private companyService = inject(CompanyService);

  company: Company = { id: 0, name: '', no_Of_Emp: 0, location: '', type: '' };
  locations = ['Bangalore', 'Pune', 'Mumbai', 'Delhi', 'Hyderabad'];

  // Add a company
  submitForm() {
    this.companyService.post(this.company).subscribe(() => {
      console.log('Company added successfully!');
      this.resetForm();
    });
  }

  // Update a company
  updateCompany() {
    if (this.company.id) {
      this.companyService.put(this.company.id, this.company).subscribe(() => {
        console.log('Company updated successfully!');
        this.resetForm();
      });
    } else {
      console.error('Please enter a valid ID to update.');
    }
  }

  // Delete a company
  deleteCompany() {
    if (this.company.id) {
      this.companyService.delete(this.company.id).subscribe(() => {
        console.log('Company deleted successfully!');
        this.resetForm();
      });
    } else {
      console.error('Please enter a valid ID to delete.');
    }
  }

  resetForm() {
    this.company = { id: 0, name: '', no_Of_Emp: 0, location: '', type: '' };
  }
}

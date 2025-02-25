import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  template: `
    <h2>Company List</h2>
    <table border="1">
      <thead>
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
            <button (click)="editCompany(company)">Edit</button>
            <button (click)="deleteCompany(company.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 *ngIf="editing">Edit Company</h2>
    <form *ngIf="editing" (ngSubmit)="updateCompany()">
      <label>ID:</label>
      <input type="number" [(ngModel)]="selectedCompany.id" name="id" disabled />

      <label>Name:</label>
      <input type="text" [(ngModel)]="selectedCompany.name" name="name" required />

      <label>No. of Employees:</label>
      <input type="number" [(ngModel)]="selectedCompany.no_Of_Emp" name="no_Of_Emp" required />

      <label>Location:</label>
      <select [(ngModel)]="selectedCompany.location" name="location" required>
        <option *ngFor="let loc of locations" [value]="loc">{{ loc }}</option>
      </select>

      <label>Type:</label>
      <label>
        <input type="radio" [(ngModel)]="selectedCompany.type" name="type" value="Service" required /> Service
      </label>
      <label>
        <input type="radio" [(ngModel)]="selectedCompany.type" name="type" value="Product" required /> Product
      </label>

      <button type="submit">Update</button>
      <button type="button" (click)="cancelEdit()">Cancel</button>
    </form>
  `
})
export class CompanyListComponent implements OnInit {
  private companyService = inject(CompanyService);
  
  companies: Company[] = [];
  locations = ['Bangalore', 'Pune', 'Mumbai', 'Delhi', 'Hyderabad'];
  selectedCompany: Company = { id: 0, name: '', no_Of_Emp: 0, location: '', type: '' };
  editing = false;

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getAll().subscribe((data) => {
      this.companies = data;
    });
  }

  editCompany(company: Company) {
    this.selectedCompany = { ...company }; 
    this.editing = true;
  }

  updateCompany() {
    this.companyService.put(this.selectedCompany.id, this.selectedCompany).subscribe(() => {
      console.log('Company updated successfully!');
      this.editing = false;
      this.loadCompanies(); 
    });
  }

  deleteCompany(id: number) {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.delete(id).subscribe(() => {
        console.log('Company deleted successfully!');
        this.loadCompanies();
      });
    }
  }

  cancelEdit() {
    this.editing = false;
    this.selectedCompany = { id: 0, name: '', no_Of_Emp: 0, location: '', type: '' };
  }
}

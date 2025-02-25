import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'https://localhost:7297/api/company/';

  constructor(private http: HttpClient) {}

  // Fetch all companies
  getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  // Add a new company
  post(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company);
  }

  //  DELETE COMPANY FUNCTION
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting company:', error);
        return throwError(() => new Error('Failed to delete company'));
      })
    );
  }

    //  Update an existing company
    put(id: number, company: Company): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}${id}`, company).pipe(
        catchError((error: any) => {
          console.error('Error updating company:', error);
          return throwError(() => new Error('Failed to update company'));
        })
      );
    }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Company } from '../models/company.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'https://localhost:7297/api/company/';
  private logger = inject(LoggerService);

  constructor(private http: HttpClient) {}

  // Fetch all companies
  getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl).pipe(
      tap(() => this.logger.logInfo('Fetched all companies')),
      catchError((error) => this.handleError('Error fetching companies', error))
    );
  }

  // Add a new company
  post(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company).pipe(
      tap(() => this.logger.logInfo('Company added', company)),
      catchError((error) => this.handleError('Error adding company', error))
    );
  }

  // DELETE a company by ID (number for now)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`).pipe(
      tap(() => this.logger.logWarning(`Company deleted with ID: ${id}`)),
      catchError((error) => this.handleError('Error deleting company', error))
    );
  }

  // Update an existing company by ID (number for now)
  put(id: number, company: Company): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${id}`, company).pipe(
      tap(() => this.logger.logInfo('Company updated', company)),
      catchError((error) => this.handleError('Error updating company', error))
    );
  }

  // Centralized error handling
  private handleError(message: string, error: any) {
    this.logger.logError(message, error);
    return throwError(() => new Error(message));
  }
}

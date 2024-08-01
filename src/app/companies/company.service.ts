import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Company {
  companyId: number;
  companyName: string;
  companyAddress: number;
  email: number; //roleA clients only
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:5084/api/companies';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company, { headers: this.getHeaders() });
  }

  updateCompany(company: Company): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${company.companyId}`, company, { headers: this.getHeaders() });
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}

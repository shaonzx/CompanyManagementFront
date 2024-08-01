import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company, CompanyService } from './company.service';
import { CompanyDialogComponentComponent } from './company-dialog-component/company-dialog-component.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {
  companies: Company[] = [];
  displayedColumns: string[] = [];
  role: string = "";

  constructor(private companyService: CompanyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';
    if(this.role === 'Admin'){
      this.displayedColumns = ['companyName', 'companyAddress', 'actions'];
    }else if(this.role === 'RoleA'){
      this.displayedColumns = ['companyName', 'companyAddress', 'email', 'actions'];
    }
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => this.companies = companies);
  }

  openDialog(company?: Company): void {
    const dialogRef = this.dialog.open(CompanyDialogComponentComponent, {
      width: '250px',
      data: company ? { ...company } : { companyName: '', companyAddress: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.companyId) {
          this.companyService.updateCompany(result).subscribe(() => this.loadCompanies());
        } else {
          this.companyService.addCompany(result).subscribe(() => this.loadCompanies());
        }
      }
    });
  }

  deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.deleteCompany(id).subscribe(() => this.loadCompanies());
    }
  }
}

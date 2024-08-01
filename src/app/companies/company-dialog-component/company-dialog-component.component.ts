import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '../company.service';

@Component({
  selector: 'app-company-dialog-component',
  templateUrl: './company-dialog-component.component.html',
  styleUrls: ['./company-dialog-component.component.css']
})
export class CompanyDialogComponentComponent implements OnInit {
  role: string = "";

  constructor(
    public dialogRef: MatDialogRef<CompanyDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

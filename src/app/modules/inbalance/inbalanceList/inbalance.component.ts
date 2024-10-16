import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { BalancingCircle, MemberData } from '../models/member-forecast';
import { InbalanceService } from '../service/inbalance.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CircleBalancingModalComponent } from '../modals/circle-balancing-modal/circle-balancing-modal.component';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inbalance',
  standalone: true,
  imports: [NgFor, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatIconModule],
  templateUrl: './inbalance.component.html',
  styleUrl: './inbalance.component.css'
})
export class InbalanceComponent {

  balancingCircle: BalancingCircle[] = [];
  dataSource = new MatTableDataSource<BalancingCircle>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private inbalanceService: InbalanceService,
    private dialog: MatDialog,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef: MatDialogRef<InbalanceComponent>) { }

  ngOnInit(): void {
    this.loadBalancingCircles(); 
  }

  loadBalancingCircles(): void {
    this.inbalanceService.getBalancingCircles()
      .then((data: BalancingCircle[]) => {
        console.log(data);
        this.balancingCircle = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      })
      .catch(error => {
        console.error('error LOADBALANCINGCIRCLES:', error);
      });
  }

  aplicarFiltro(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement?.value?.trim().toLowerCase();
    console.log('Filter load: ', filterValue);
    this.dataSource.filter = filterValue;
  }

  show(circle: BalancingCircle): void {
    const dialogRef = this.dialog.open(CircleBalancingModalComponent, {
      width: '950px',
      data: { variable: 'modal', circle: circle } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('MODAL CLOSED');
      console.log(result);
    });
  }
}
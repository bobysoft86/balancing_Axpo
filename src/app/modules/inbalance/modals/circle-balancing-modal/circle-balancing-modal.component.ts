import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InbalanceService } from '../../service/inbalance.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Member, MemberData } from '../../models/member-forecast';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-circle-balancing-modal',
  standalone: true,
  imports: [
    NgChartsModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './circle-balancing-modal.component.html',
  styleUrl: './circle-balancing-modal.component.css',
})
export class CircleBalancingModalComponent implements OnInit {
  inflow: number = 0;
  outflow: number = 0;
  chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [],
  };
  chartType: ChartType = 'line';
  dataSource = new MatTableDataSource<Member>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  displayedColumns: string[] = ['name', 'type', 'category', 'select'];
  select = new SelectionModel<Member>(true, []);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inbalanceService: InbalanceService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.dataSource = this.data.circle.members;
    this.dataSource.paginator = this.paginator;
    this.prepareChartData(this.data.circle.members);
    this.splitData(this.data.circle.members);
  }

  //calculate Imbalance
  async splitData(info: Member[]) {
    const requests = info.map((member) => {
      return this.inbalanceService
        .getBalancingMembersData(member.id)
        .then((memberdata: MemberData | undefined) => {
          if (memberdata) {
            console.log('Datos de miembro:', memberdata);

            if (member.type === 'Producer') {
              if (memberdata.forecast && memberdata.forecast.length > 0) {
                memberdata.forecast.forEach((forecastEntry) => {
                  this.inflow += forecastEntry.value;
                });
              }
            } else if (member.type === 'Consumer') {
              if (memberdata.forecast && memberdata.forecast.length > 0) {
                memberdata.forecast.forEach((forecastEntry) => {
                  this.outflow += forecastEntry.value;
                });
              }
            }
          } else {
            console.log(
              `No se recibieron datos para el miembro con id ${member.id}`
            );
          }
        })
        .catch((error: any) => {
          console.error('Error al obtener los datos del miembro:', error);
        });
    });

    await Promise.all(requests);
    console.log('Inflow total final:', this.inflow);
    console.log('Outflow total final:', this.outflow);
  }

  async prepareChartData(members: Member[]) {
    const chartLabels = new Set<string>();
    const datasets: any[] = [];
    const forecastValuesByTime: { [key: string]: number[] } = {};

    // dataset for each member
    for (const member of members) {
      const memberData = await this.inbalanceService.getBalancingMembersData(
        member.id
      );
      if (memberData && memberData.forecast) {
        const forecastValues = memberData.forecast.map((f) =>
          member.type === 'Consumer' ? -f.value : f.value
        );
        const forecastDates = memberData.forecast.map((f) =>
          new Date(f.date).toLocaleTimeString()
        );

        forecastDates.forEach((date, index) => {
          chartLabels.add(date);
          if (!forecastValuesByTime[date]) {
            forecastValuesByTime[date] = [];
          }
          forecastValuesByTime[date].push(forecastValues[index]);
        });

        datasets.push({
          label: member.name,
          data: forecastValues,
          borderColor: this.getRandomColor(),
          fill: false,
        });
      }
    }

    //calculate midrange

    const averageData: number[] = [];
    for (const time of Array.from(chartLabels)) {
      const valuesAtTime = forecastValuesByTime[time] || [];
      const sum = valuesAtTime.reduce((a, b) => a + b, 0);
      const average = sum / valuesAtTime.length;
      averageData.push(average);
    }

    datasets.push({
      label: 'Average',
      data: averageData,
      borderColor: 'rgba(0, 0, 0, 0.5)',
      borderDash: [5, 5],
      fill: false,
    });

    //load Chart
    this.chartData = {
      labels: Array.from(chartLabels),
      datasets: datasets,
    };
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  aplicarFiltro(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement?.value?.trim().toLowerCase();
    console.log('Filter load: ', filterValue);
    console.log(this.dataSource);

    this.dataSource.filter = filterValue;
  }

  toggleSelect(member: Member) {
    this.select.toggle(member);
    console.log(this.select.selected);
    this.prepareChartData(this.select.selected);
  }
}

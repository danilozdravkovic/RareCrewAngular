import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexLegend, ApexNonAxisChartSeries, ChartComponent } from 'ng-apexcharts';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-graph',
  templateUrl: './employee-graph.component.html',
  styleUrls: ['./employee-graph.component.css']
})
export class EmployeeGraphComponent implements OnInit {

  constructor(private employeeService: EmployeeService) {}

  chartOptions: any;
  chartSeries: ApexNonAxisChartSeries = [];
  chartLabels: string[] = [];
  
  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void{
    this.employeeService.getEmployeeTimeEntries().subscribe({
      next: (data) => {
        data.forEach(employee => {
          this.chartSeries.push(employee.TotalTimeWorked);
          employee.Name ? this.chartLabels.push(employee.Name) : this.chartLabels.push("Unknown");
        });
        this.chartOptions = {
          series: this.chartSeries,
          chart: {
            type: 'pie',
            toolbar: {
              show: true
            }
          },
          labels: this.chartLabels,
          legend: {
            show: true,
            position: 'bottom', 
            horizontalAlign: 'center', 
            floating: false,
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 400,
            itemMargin: {
              horizontal: 10, 
              vertical: 10
            },
            labels: {
              useSeriesColors: true 
            },
            markers: {
              size: 7, 
            },
            width: 'auto', 
          }
        };
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}

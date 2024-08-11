import { Component, OnInit } from '@angular/core';
import { IEmployee, IEmployeeForStats } from '../../interfaces/i-employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  employees: IEmployeeForStats[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployeeTimeEntries().subscribe({
      next: (data) => {
        this.employees = data.sort((a,b)=>b.TotalTimeWorked-a.TotalTimeWorked);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

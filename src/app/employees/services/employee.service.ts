import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IEmployee, IEmployeeForStats } from '../interfaces/i-employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiURL = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";

  constructor(private http: HttpClient) { }

  getEmployeeTimeEntries(): Observable<IEmployeeForStats[]> {
    return this.http.get<IEmployee[]>(this.apiURL).pipe(
      map(employees => {
        // Grupisanje radnika i sumiranje vremena rada
          const employeeWorkTime = employees.reduce((acc, employee) => {
          const startTime = new Date(employee.StarTimeUtc);
          const endTime = new Date(employee.EndTimeUtc);
  
          // Izračunavanje vremena rada u satima
          const timeWorked = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
          
  
          if (acc[employee.EmployeeName]) {
            acc[employee.EmployeeName].TotalTimeWorked += timeWorked;
          } else {
            acc[employee.EmployeeName] = {
              Name: employee.EmployeeName,
              TotalTimeWorked: timeWorked
            };
          }
          return acc;
        }, {} as { [key: string]: IEmployeeForStats });
        
        // Pretvaranje rezultata u niz
        return Object.values(employeeWorkTime);
      })
    );
  }
  
}

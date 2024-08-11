import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeTableComponent } from './employees/components/employee-table/employee-table.component';
import { EmployeeGraphComponent } from './employees/components/employee-graph/employee-graph.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from './modules/shared/shared.module';
import { HttpInterceptorService } from './modules/shared/services/spinner-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeTableComponent,
    EmployeeGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgApexchartsModule,
    SharedModule
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

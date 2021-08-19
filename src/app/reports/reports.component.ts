import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Router} from '@angular/router'
import { ReportsServiceService } from '../reports-service.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports = []
  temp = []
  report 
  constructor(private reportsService : ReportsServiceService, private router : Router) { }


  ngOnInit(): void {
    this.getAllReports()
  }
  getAllReports(){
    this.reportsService.getAllReports().subscribe(data => {
      this.reports = data.elements.filter((report)=> report.state == 'OPEN' || report.state == 'BLOCKED')
      this.temp = data.elements.filter((report) => report.state == 'OPEN')
      console.log(data)
    })
  }
  

  resolve(id){
    this.reportsService.getReport(id).subscribe(
      data =>{
        this.report = data
        this.report.state = "CLOSED"
        console.log(this.report)
        this.reportsService.resolveReport(id, this.report).subscribe()
        var index = this.temp.findIndex((report) => report.id == id)
        this.temp[index] = this.report
        this.reports = this.temp.filter((report) => report.state == 'OPEN' || report.state == 'BLOCKED')

      }
    )
  }

  block(id){
    this.reportsService.getReport(id).subscribe(
      data =>{
        this.report = data
        this.report.state = "BLOCKED"
        console.log(this.report)
        this.reportsService.resolveReport(id, this.report).subscribe()
        var index = this.temp.findIndex((report) => report.id == id)
        this.temp[index] = this.report
        this.reports = this.temp.filter((report) => report.state == 'OPEN' || report.state == 'BLOCKED')
      }
    )
  }

 

}

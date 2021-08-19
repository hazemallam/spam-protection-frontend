import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsServiceService {

  constructor(private http : HttpClient) { }
  getAllReports(){
    return this.http.get<any>(environment.APIURL + 'reports')
  }
  resolveReport(id:string, report:any){
    return this.http.put(environment.APIURL+'reports/'+id, report)
  }
  
  getReport(id){
    return this.http.get<any>(environment.APIURL+'reports/'+id)
  }
}

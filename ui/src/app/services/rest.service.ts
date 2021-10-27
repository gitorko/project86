import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer';
import {Router} from '@angular/router';
import {CustomerPage} from "../models/customer-page";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private router: Router) {
  }

  public getCustomers(page: number, size: number): Observable<CustomerPage> {
    return this.http.get<CustomerPage>(`/api/customer?page=${page}&size=${size}`);
  }

  public saveCustomer(customer: Customer): Observable<any> {
    return this.http.post('/api/customer', customer);
  }

  public deleteCustomer(id: any): Observable<any> {
    return this.http.delete('/api/customer/' + id);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer';
import {Router, UrlSerializer} from '@angular/router';
import {CustomerPage} from "../models/customer-page";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private router: Router, private serializer: UrlSerializer) {
  }

  public getCustomers(page: number, size: number, filters: any, sort: any): Observable<CustomerPage> {
    console.log(filters);
    let url = `/api/customer?page=${page}&size=${size}`;
    const queryParams: { [prop: string]: any[] } = {};
    if (filters) {
      for (let filter of filters) {
        let {property, value} = <{ property: string; value: string }>filter;
        queryParams[property] = [value];
      }
      const queryParamsString = new HttpParams({fromObject: queryParams}).toString();
      url = url + "&" + queryParamsString;
    }
    if (sort) {
      if (sort.reverse) {
        url = url + "&sort=" + sort.by + ",desc";
      } else {
        url = url + "&sort=" + sort.by + ",asc";
      }
    }
    return this.http.get<CustomerPage>(url);
  }

  public saveCustomer(customer: Customer): Observable<any> {
    return this.http.post('/api/customer', customer);
  }

  public deleteCustomer(id: any): Observable<any> {
    return this.http.delete('/api/customer/' + id);
  }
}

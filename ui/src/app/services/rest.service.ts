import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer';
import {CustomerPage} from "../models/customer-page";
import {CheckboxFilterComponent} from "../components/filter/checkbox-filter.component";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  public getCustomers(page: number, size: number | undefined, filters: any, sort: any): Observable<CustomerPage> {
    let url = `/api/customer?page=${page}&size=${size}`;
    if (filters) {
      for (let filter of filters) {
        if (filter instanceof CheckboxFilterComponent) {
          let propName = filter.filterKey;
          const propValues = Object.entries(filter.selectedValues);
          for (let propVal of propValues) {
            if (propVal[1].valueOf()) {
              url = url + "&" + new HttpParams().set(propName, propVal[0]).toString();
            }
          }
        } else {
          let {property, value} = <{ property: string; value: string }>filter;
          url = url + "&" + new HttpParams().set(property, value).toString();
        }
      }
      console.log(url);
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

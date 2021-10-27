import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient, private router: Router) {
    }

    public getCustomers(): Observable<Customer[]> {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', token);
        return this.http.get<Customer[]>('/api/customer', { headers });
    }

    public saveCustomer(customer: Customer): Observable<any> {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', token);
        return this.http.post('/api/customer', customer, { headers });
    }

    public deleteCustomer(id: any): Observable<any> {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', token);
        return this.http.delete('/api/customer/' + id, { headers });
    }

}

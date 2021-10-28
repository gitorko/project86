import {Component, OnInit} from '@angular/core';
import {Customer} from '../../models/customer';
import {RestService} from '../../services/rest.service';
import {Router} from '@angular/router';
import {ClarityIcons, trashIcon} from '@cds/core/icon';
import {ClrDatagridStateInterface} from '@clr/angular';
import {CustomerPage} from "../../models/customer-page";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  customerPage: CustomerPage = new CustomerPage();
  customer: Customer = new Customer();
  flashMsg = '';
  loading = false;
  page: number = 1;
  total: number = 1;
  cityFilterValues: string[] = [];

  constructor(private restService: RestService, private router: Router) {
    ClarityIcons.addIcons(trashIcon);
    this.cityFilterValues.push("Bangalore");
    this.cityFilterValues.push("New York");
    this.cityFilterValues.push("London");
  }

  ngOnInit(): void {
    this.loading = true;
    this.flashMsg = '';
  }

  saveCustomer(): void {
    console.log('save customer!');
    this.restService.saveCustomer(this.customer)
      .subscribe(data => {
        this.flashMsg = 'Saved customer: ' + this.customer.firstName;
      });
  }

  deleteCustomer(customer: Customer): void {
    console.log('deleting customer : ' + customer.id);
    this.restService.deleteCustomer(customer.id)
      .subscribe(data => {
        this.flashMsg = 'Deleted customer: ' + customer.id;
      });
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    if (!state.page) {
      state.page = {
        from: 1,
        to: 10,
        size: 10,
      };
    }
    // @ts-ignore
    let pageStart = state.page.current - 1;
    let pageSize = state.page.size;
    this.restService.getCustomers(pageStart, pageSize, state.filters, state.sort).subscribe(data => {
        this.customerPage = data;
        this.total = this.customerPage?.totalElements;
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
  }
}

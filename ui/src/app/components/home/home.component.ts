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

  constructor(private restService: RestService, private router: Router) {
    ClarityIcons.addIcons(trashIcon);
  }

  ngOnInit(): void {
    this.loading = true;
    this.flashMsg = '';
  }

  saveCustomer(): void {
    this.restService.saveCustomer(this.customer)
      .subscribe(data => {
        this.flashMsg = 'Saved customer: ' + this.customer.firstName;
      });
  }

  deleteCustomer(customer: Customer): void {
    console.log('delete: ' + customer.id);
    this.restService.deleteCustomer(customer.id)
      .subscribe(data => {
        this.flashMsg = 'Deleted customer: ' + customer.id;
      });
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    this.restService.getCustomers(state.page.current - 1, state.page.size, state.filters, state.sort).subscribe(data => {
        this.customerPage = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from '../../models/customer';
import {RestService} from '../../services/rest.service';
import {Router} from '@angular/router';
import {ClarityIcons, trashIcon} from '@cds/core/icon';
import {ClrDatagridStateInterface} from '@clr/angular';
import {CustomerPage} from "../../models/customer-page";
import {AlertComponent} from "../alert/alert.component";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  customerPage: CustomerPage = new CustomerPage();
  customer: Customer = new Customer();
  loading = false;
  page: number = 1;
  total: number = 1;
  cityFilterValues: string[] = [];
  tableState: ClrDatagridStateInterface = {page: {current: 1, from: 1, size: 10, to: 10}};
  debouncer: Subject<any> = new Subject<any>();

  // @ts-ignore
  @ViewChild(AlertComponent, {static: true}) private alert: AlertComponent;

  constructor(private restService: RestService, private router: Router) {
    ClarityIcons.addIcons(trashIcon);
    this.cityFilterValues.push("Bangalore");
    this.cityFilterValues.push("New York");
    this.cityFilterValues.push("London");
  }

  ngOnInit(): void {
    this.loading = true;
    this.debouncer
      .pipe(debounceTime(700))
      .subscribe(state => {
        this.tableState = state;
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
      );
  }

  saveCustomer(): void {
    console.log('save customer!');
    this.restService.saveCustomer(this.customer)
      .subscribe(data => {
        this.alert.showSuccess('Saved customer: ' + this.customer.firstName);
        this.refresh(this.tableState);
      });
  }

  deleteCustomer(customer: Customer): void {
    console.log('deleting customer : ' + customer.id);
    this.restService.deleteCustomer(customer.id)
      .subscribe(data => {
        this.alert.showSuccess('Deleted customer: ' + customer.id);
        this.refresh(this.tableState);
      });
  }

  refresh(state: ClrDatagridStateInterface) {
    this.debouncer.next(state);
  }

}

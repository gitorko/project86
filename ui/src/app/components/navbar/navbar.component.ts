import {Component, OnInit} from '@angular/core';
import {ClarityIcons, userIcon} from '@cds/core/icon';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private restService: RestService) {
    ClarityIcons.addIcons(userIcon);
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavMenuItem } from '../nav';
import { NavService } from '../../service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  navMenuItems$: Observable<NavMenuItem[]>;

  constructor(
    private navService: NavService
  ) {
  }


  ngOnInit() {
    this.navMenuItems$ = this.navService.getNavMenus();
  }

}

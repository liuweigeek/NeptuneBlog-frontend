import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/entity';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  private user: User;
  constructor() {}

  ngOnInit() {
  }

}

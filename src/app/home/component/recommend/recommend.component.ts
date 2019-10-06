import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

  data = [
    '#Chine National Day',
    '#New iPhone',
    '#Google I/O',
    '#Steve Jobs'
  ];
  constructor() { }

  ngOnInit() {
  }

}

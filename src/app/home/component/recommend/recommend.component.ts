import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

  data = [
    '#China National Day',
    '#New iPhone',
    '#Google I/O',
    '#Steve Jobs'
  ];

  constructor(private message: NzMessageService,
              private router: Router) {
  }

  ngOnInit() {
  }

  search(event: any) {
    const keyword = event.target.value;
    if (!keyword) {
      this.message.error('请输入关键字');
      return;
    }
    this.router.navigate(['home', 'search', keyword]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../../shared/entity';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.css']
})
export class SearchResultListComponent implements OnInit {

  private userList: User[];
  private postList: Post[];

  constructor() {
  }

  ngOnInit() {
  }

}

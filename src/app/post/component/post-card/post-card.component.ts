import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../shared/entity/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;
  constructor() { }

  private dateFormat = 'yyyy/MM/dd HH:mm:ss';

  ngOnInit() {
  }

  handleLike() {
    return null;
  }
}

import { Component, OnInit } from '@angular/core';
import { Pageable, Post, User } from '../../../shared/entity';
import { UserStoreService } from '../../../shared/service';
import { PostService } from '../../service';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-post-zone',
  templateUrl: './post-zone.component.html',
  styleUrls: ['./post-zone.component.css']
})
export class PostZoneComponent implements OnInit {

  private user: User;
  private postList: Post[] = [];

  private pageable: Pageable<any> = {
    current: 1,
    size: environment.pageSize
  };

  constructor(private userStoreService: UserStoreService,
              private postService: PostService,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.user = this.userStoreService.getLoginUser();
    this.getNextPosts();
  }

  getNextPosts() {

    this.postService.getFollowingPost(this.pageable)
      .subscribe(res => {
        if (res.isSuccess()) {
          const newPosts = res.data.records;
          if (newPosts.length > 0) {
            this.postList = this.postList.concat(newPosts);
            this.pageable.current++;
          } else {
            this.message.info('没有更多内容了');
          }
        } else {
          this.message.error(res.msg);
        }
      });
  }

  publishPostSuccess(post: Post) {
  }

}

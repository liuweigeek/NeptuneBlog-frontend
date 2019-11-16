import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Pageable, Post, User } from '../../../shared/entity';
import { UserStoreService } from '../../../shared/service';
import { PostService } from '../../service';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-post-zone',
  templateUrl: './post-zone.component.html',
  styleUrls: ['./post-zone.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostZoneComponent implements OnInit {

  private user: User;

  initLoading = true;
  loadingMore = false;
  postList: Array<Post> = [];

  private pageable: Pageable<any> = {
    current: 1,
    size: environment.pageSize
  };

  constructor(private userStoreService: UserStoreService,
              private postService: PostService,
              private message: NzMessageService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.user = this.userStoreService.getLoginUser();
    this.cd.markForCheck();
    this.postService.getFollowingPost(this.pageable)
      .subscribe(res => {
        this.initLoading = false;
        if (res.isSuccess()) {
          const newPosts = res.data.records;
          if (newPosts.length > 0) {
            this.postList = newPosts;
            this.pageable.current++;
            this.cd.markForCheck();
          } else {
            this.message.info('没有更多内容了');
          }
        } else {
          this.message.error(res.msg);
        }
      });

  }

  getNextPosts() {
    this.loadingMore = true;
    this.postService.getFollowingPost(this.pageable)
      .subscribe(res => {
        if (res.isSuccess()) {
          const newPosts = res.data.records;
          if (newPosts.length > 0) {
            this.postList = this.postList.concat(newPosts);
            this.pageable.current++;
            this.cd.markForCheck();
          } else {
            this.message.info('没有更多内容了');
          }
        } else {
          this.message.error(res.msg);
        }
        this.loadingMore = false;
      });
  }

  publishPostSuccess(post: Post) {
    this.postList.unshift(post);
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Pageable, Post, Relation, User } from '../../../shared/entity';
import { PostService } from '../../../post/service';
import { NzMessageService } from 'ng-zorro-antd';
import { FriendService, UserService } from '../../service';
import { UserStoreService } from '../../../shared/service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  private username$: Observable<string>;
  private user: User;
  private loginUser: User;

  private postList: Post[] = [];

  private pageable: Pageable<any> = {
    current: 1,
    size: 30
  };

  private birthdayFormat = 'yyyy年MM月dd日';
  private registerDateFormat = 'yyyy年MM月';

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private message: NzMessageService,
              private userStoreService: UserStoreService,
              private userService: UserService,
              private friendService: FriendService,
              private postService: PostService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.loginUser = this.userStoreService.getLoginUser();
    this.username$ = this.activeRoute.paramMap.pipe(
      filter(params => params.has('username')),
      map(params => params.get('username'))
    );

    this.username$.subscribe(username => {
      /*this.pageable = {
        current: 1,
        size: 30
      };
      this.postList = [];*/
      this.getByUsername(username);
      this.getPosts(username);
    });

  }

  /**
   * 根据用户名获取用户
   * @param username  用户名
   */
  getByUsername(username: string) {
    this.userService.getByUsername(username)
      .subscribe(res => {
        if (res.isSuccess()) {
          this.user = res.data;
          this.cd.markForCheck();
        } else {
          this.message.error(res.msg);
        }
      });
  }

  /**
   * 获取用户推文
   * @param username  用户名
   */
  getPosts(username: string) {
    this.postService.getPostsByUsername(username, this.pageable)
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
      });
  }

  isSelf(): boolean {
    return this.loginUser.id === this.user.id;
  }

  isFollowing(): boolean {
    return Relation.FOLLOWING === this.user.relation;
  }

  handleFollow() {
    this.friendService.follow(this.user.id)
      .subscribe(res => {
        if (res.isSuccess()) {
          this.message.success(`已成功关注${this.user.nickname}`);
          this.user.relation = Relation.FOLLOWING;
          this.cd.markForCheck();
        } else {
          this.message.error(res.msg);
        }
      });
  }

  handleCancelFollow() {
    this.friendService.cancelFollow(this.user.id)
      .subscribe(res => {
        if (res.isSuccess()) {
          this.message.success('已取消关注');
          this.user.relation = Relation.UN_FOLLOW;
          this.cd.markForCheck();
        } else {
          this.message.error(res.msg);
        }
      });
  }
}

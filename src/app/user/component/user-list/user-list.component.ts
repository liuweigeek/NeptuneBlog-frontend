import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FriendService } from '../../service';
import { Pageable, ServerResponse, User } from '../../../shared/entity';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  private userId$: Observable<string>;
  private userId: string;
  private title = '';
  private following: boolean;
  private loading = false;
  private userList: User[] = [];

  private pageable: Pageable<any> = {
    current: 1,
    size: environment.pageSize
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private friendService: FriendService,
    private message: NzMessageService,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.userId$ = this.activeRoute.paramMap.pipe(
      filter(params => {
        return params.has('userId');
      }),
      map(params => params.get('userId'))
    );

    this.userId$.subscribe(userId => {
      this.userId = userId;
    });

    this.userId$.subscribe(() => {
      if (this.router.url.endsWith('followings')) {
        this.following = true;
        this.title = '正在关注';
        this.cd.markForCheck();
        this.getFollowings();
      } else if (this.router.url.endsWith('followers')) {
        this.following = true;
        this.title = '关注者';
        this.cd.markForCheck();
        this.getFollowers();
      }
    });

  }

  getFollowings() {
    this.loading = true;
    this.friendService.getFollowingUsers(this.userId, this.pageable,
      (res: ServerResponse<Pageable<User>>) => {
        this.successCallBack(res);
      },
      (res: ServerResponse<any>) => {
        this.loading = false;
        this.message.error(res.msg);
        this.cd.markForCheck();
      });
  }

  getFollowers() {
    this.loading = true;
    this.friendService.getFollowerUsers(this.userId, this.pageable,
      (res: ServerResponse<Pageable<User>>) => {
        this.successCallBack(res);
      },
      (res: ServerResponse<any>) => {
        this.loading = false;
        this.message.error(res.msg);
        this.cd.markForCheck();
    });
  }

  successCallBack(res: ServerResponse<Pageable<User>>) {
    this.loading = false;
    const newUsers = res.data.records;
    if (newUsers.length > 0) {
      this.userList = this.userList.concat(newUsers);
      this.pageable.current++;
    } else {
      this.message.info('没有更多内容了');
    }
    this.cd.markForCheck();
  }

}

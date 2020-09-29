import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FriendService } from '../../service';
import { PageRequest, User } from '../../../shared/entity';
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

    username$: Observable<string>;
    username: string;
    title = '';
    following: boolean;
    loading = false;
    userList: User[] = [];

    private pageRequest: PageRequest = {
        offset: 1,
        limit: environment.pageLimit
    };

    constructor(
        private activeRoute: ActivatedRoute,
        private router: Router,
        private friendService: FriendService,
        private message: NzMessageService,
        private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {

        this.username$ = this.activeRoute.paramMap.pipe(
            filter(params => {
                return params.has('username');
            }),
            map(params => params.get('username'))
        );

        this.username$.subscribe(username => {
            this.username = username;
        });

        this.username$.subscribe(() => {
            if (this.router.url.endsWith('followings')) {
                this.following = true;
                this.title = '正在关注';
                this.cd.markForCheck();
                this.findFollowing();
            } else if (this.router.url.endsWith('followers')) {
                this.following = true;
                this.title = '关注者';
                this.cd.markForCheck();
                this.findFollowers();
            }
        });

    }

    findFollowing() {
        this.loading = true;
        this.friendService.getFollowingUsers(this.username, this.pageRequest)
            .subscribe(next => {
                if (!next.empty) {
                    this.userList = this.userList.concat(next.content);
                    this.pageRequest.offset += next.size;
                } else {
                    this.message.info('没有更多内容了');
                }
            }, error => {
                this.message.error(error.error.message || '获取正在关注失败');
            });
    }

    findFollowers() {
        this.loading = true;
        this.friendService.getFollowerUsers(this.username, this.pageRequest)
            .subscribe(next => {
                if (!next.empty) {
                    this.userList = this.userList.concat(next.content);
                    this.pageRequest.offset += next.size;
                } else {
                    this.message.info('没有更多内容了');
                }
            }, error => {
                this.message.error(error.error.message || '获取关注人失败');
            }, () => {
                this.loading = false;
                this.cd.markForCheck();
            });
    }
}

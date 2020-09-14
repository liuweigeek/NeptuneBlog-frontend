import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FriendService } from '../../service';
import { Pageable, PageRequest, ServerResponse, User } from '../../../shared/entity';
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
        this.friendService.getFollowingUsers(this.username, this.pageRequest,
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
        this.friendService.getFollowerUsers(this.username, this.pageRequest,
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
            this.pageRequest.offset += newUsers.length;
        } else {
            this.message.info('没有更多内容了');
        }
        this.cd.markForCheck();
    }

}

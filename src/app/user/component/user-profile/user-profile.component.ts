import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PageRequest, Relation, Tweet, User } from '../../../shared/entity';
import { TweetService } from '../../../tweet/service';
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

    username$: Observable<string>;
    user: User;
    authUser: User;

    tweetList: Tweet[] = [];

    pageRequest: PageRequest = {
        offset: 1,
        limit: 30
    };

    birthdayFormat = 'yyyy年MM月dd日';
    createAtFormat = 'yyyy年MM月';

    constructor(private activeRoute: ActivatedRoute,
                private router: Router,
                private message: NzMessageService,
                private userStoreService: UserStoreService,
                private userService: UserService,
                private friendService: FriendService,
                private tweetService: TweetService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {

        this.authUser = this.userStoreService.getAuthUser();
        this.username$ = this.activeRoute.paramMap.pipe(
            filter(params => params.has('username')),
            map(params => params.get('username'))
        );

        this.username$.subscribe(username => {
            this.getByUsername(username);
        });

    }

    /**
     * 根据用户名获取用户
     * @param username  用户名
     */
    getByUsername(username: string) {
        this.userService.getByUsername(username)
            .subscribe(next => {
                this.user = next;
                this.cd.markForCheck();
                this.findTweets(this.user.id);
            }, error => {
                this.message.error(error.error.message || '获取用户信息失败');
            });
    }

    /**
     * 获取用户推文
     * @param userId  用户Id
     */
    findTweets(userId: number) {
        this.tweetService.findTweetsByUserId(userId, this.pageRequest)
            .subscribe(next => {
                if (!next.empty) {
                    this.tweetList = this.tweetList.concat(next.content);
                    this.pageRequest.offset = this.pageRequest.offset + next.size;
                    this.cd.markForCheck();
                } else {
                    this.message.info('没有更多内容了');
                }
            }, error => {
                this.message.error(error.error.message || '获取推文失败');
            });
    }

    isSelf(): boolean {
        return this.authUser.id === this.user.id;
    }

    isFollowing(): boolean {
        return Relation.FOLLOWING === this.user.relation;
    }

    handleFollow() {
        this.friendService.follow(this.user.id)
            .subscribe(res => {
                if (res.isSuccess()) {
                    this.message.success(`已成功关注${this.user.name}`);
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

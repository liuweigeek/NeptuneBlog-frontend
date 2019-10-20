import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Post, User } from '../../../shared/entity';
import { PostService } from '../../../post/service';
import { NzMessageService } from 'ng-zorro-antd';
import { Pageable } from '../../../shared/entity/pageable';
import { UserService } from '../../service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    userId$: Observable<string>;
    user: User;

    private postList: Post[] = [];

    private pageable: Pageable<any> = {
        current: 1,
        size: 30
    };

    private birthdayFormat = 'yyyy年MM月dd日';
    private registerDateFormat = 'yyyy年MM月';

    constructor(private activeRoute: ActivatedRoute,
                private message: NzMessageService,
                private userService: UserService,
                private postService: PostService) {
    }

    ngOnInit() {

        this.userId$ = this.activeRoute.paramMap.pipe(
            filter(params => params.has('userId')),
            map(params => params.get('userId'))
        );

        this.userId$.subscribe(userId => {
            this.getUserInfo(userId);
            this.getPosts(userId);
        });

    }

    /**
     * 获取用户信息
     * @param userId    用户ID
     */
    getUserInfo(userId: string) {
        this.userService.getUserInfo(userId)
            .subscribe(res => {
                if (res.isSuccess()) {
                    this.user = res.data;
                } else {
                    this.message.error(res.msg);
                }
            });
    }

    /**
     * 获取用户推文
     * @param userId    用户ID
     */
    getPosts(userId: string) {
        this.postService.getPostsByUserId(userId, this.pageable)
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

}

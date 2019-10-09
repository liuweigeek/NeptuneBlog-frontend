import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../../shared/entity';
import { PostService } from '../../../post/service';
import { UserStoreService } from '../../../shared/service';
import { NzMessageService } from 'ng-zorro-antd';
import { Pageable } from '../../../shared/entity/pageable';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

    private user: User;
    private postList: Post[] = [];

    private pageable: Pageable<any> = {
        current: 1,
        size: 30
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
            .subscribe(response => {
                if (response.isSuccess()) {
                    const newPosts = response.data.records;
                    if (newPosts.length > 0) {
                        for (const post of newPosts) {
                            this.postList.push(post);
                        }
                    } else {
                        this.message.info('没有更多内容了');
                    }
                } else {
                    this.message.info(response.msg);
                }
            });

        this.pageable.current++;
    }

}

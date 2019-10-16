import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../../shared/entity';
import { Pageable } from '../../../shared/entity/pageable';
import { UserStoreService } from '../../../shared/service';
import { PostService } from '../../service';
import { NzMessageService } from 'ng-zorro-antd';

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
                        this.postList = this.postList.concat(newPosts);
                        this.pageable.current++;
                    } else {
                        this.message.info('没有更多内容了');
                    }
                } else {
                    this.message.error(response.msg);
                }
            });
    }

}

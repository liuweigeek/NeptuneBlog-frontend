import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FriendService } from '../../../post/service/friend.service';
import { Pageable } from '../../../shared/entity/pageable';
import { ServerResponse, User } from '../../../shared/entity';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    loading = false;
    userList: User[] = [];

    private pageable: Pageable<any> = {
        current: 1,
        size: 30
    };

    constructor(private friendService: FriendService, private message: NzMessageService) {
    }

    ngOnInit(): void {
        this.getFollowings();
    }

    getFollowings() {
        this.loading = true;
        this.friendService.getFollowingUsers(this.pageable,
            (res: ServerResponse<Pageable<User>>) => {
                this.loading = false;
                const newUsers = res.data.records;
                if (newUsers.length > 0) {
                    this.userList = this.userList.concat(newUsers);
                    this.pageable.current++;
                } else {
                    this.message.info('没有更多内容了');
                }
            },
            (res: ServerResponse<any>) => {
                this.loading = false;
                this.message.error(res.msg);
            });
    }

    handleFollow(userId: number): void {
        this.message.success(userId.toString());
    }

}
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User, UserConnection, UserRelationship, UserStoreService } from '../../../shared';
import { FriendService } from '../../service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserItemComponent implements OnInit {

    private authUser: User;

    @Input() user: UserRelationship;
    @ViewChild('follow', {static: true}) followRef;
    @ViewChild('cancelFollow', {static: true}) cancelFollowRef;

    constructor(private userStoreService: UserStoreService,
                private friendService: FriendService,
                private message: NzMessageService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.authUser = this.userStoreService.getAuthUser();
    }

    getActions(): TemplateRef<void>[] {
        if (this.authUser.id === this.user.id) {
            return [];
        }
        if (this.user.connections && this.user.connections.includes(UserConnection.FOLLOWING)) {
            return [this.cancelFollowRef];
        }
        return [this.followRef];
    }

    handleFollow(userId: number) {
        this.friendService.follow(userId)
            .pipe(finalize(() => {
                this.cd.markForCheck();
            }))
            .subscribe(next => {
                this.message.success(`已成功关注${next.name}`);
                this.user.connections.push(UserConnection.FOLLOWING);
            }, error => {
                this.message.error(error.error.message || '关注失败');
            });
    }

    handleCancelFollow(userId: number) {
        this.friendService.cancelFollow(userId)
            .pipe(finalize(() => {
                this.cd.markForCheck();
            }))
            .subscribe(next => {
                this.message.success(`已取消关注${next.name}`);
                this.user.connections = this.user.connections
                    .filter(connection => connection !== UserConnection.FOLLOWING);
            }, error => {
                this.message.error(error.error.message || '取消关注失败');
            });
    }

}

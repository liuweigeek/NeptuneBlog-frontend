import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Relation, User } from '../../../shared/entity';
import { FriendService } from '../../service';
import { UserStoreService } from '../../../shared/service';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserItemComponent implements OnInit {

    private authUser: User;

    @Input() user: User;
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
        switch (this.user.relation) {
            case Relation.FOLLOWING:
                return [this.cancelFollowRef];
            case Relation.UN_FOLLOW:
                return [this.followRef];
            default:
                return [];
        }
    }

    handleFollow(userId: number) {
        this.friendService.follow(userId)
            .subscribe(next => {
                this.message.success(`已成功关注${next.name}`);
                this.user.relation = Relation.FOLLOWING;
            }, error => {
                this.message.error(error.error.message || '关注失败');
            }, () => {
                this.cd.markForCheck();
            });
    }

    handleCancelFollow(userId: number) {
        this.friendService.cancelFollow(userId)
            .subscribe(next => {
                this.message.success(`已取消关注${next.name}`);
                this.user.relation = Relation.UN_FOLLOW;
            }, error => {
                this.message.error(error.error.message || '关注失败');
            }, () => {
                this.cd.markForCheck();
            });
    }

}

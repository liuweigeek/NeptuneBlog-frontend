import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
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

  private loginUser: User;

  @Input() user: User;
  @ViewChild('follow', {static: true}) followRef;
  @ViewChild('cancelFollow', {static: true}) cancelFollowRef;

  constructor(private userStoreService: UserStoreService,
              private friendService: FriendService,
              private message: NzMessageService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loginUser = this.userStoreService.getLoginUser();
  }

  getActions(): TemplateRef<void>[] {
    if (this.loginUser.id === this.user.id) {
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

  handleFollow(userId: string) {
    this.friendService.follow(userId)
      .subscribe(res => {
        if (res.isSuccess()) {
          this.message.info(`已成功关注${this.user.nickname}`);
          this.user.relation = Relation.FOLLOWING;
          this.cd.markForCheck();
        } else {
          this.message.error(res.msg);
        }
      });
  }

  handleCancelFollow(userId: string) {
    this.friendService.cancelFollow(userId)
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

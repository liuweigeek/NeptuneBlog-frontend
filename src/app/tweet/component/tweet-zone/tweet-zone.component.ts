import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageRequest, Tweet, User, UserStoreService } from '../../../shared';
import { TweetService } from '../../service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from '../../../../environments/environment';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-tweet-zone',
    templateUrl: './tweet-zone.component.html',
    styleUrls: ['./tweet-zone.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TweetZoneComponent implements OnInit {

    user: User;

    initLoading = true;
    loadingMore = false;
    tweetList: Tweet[] = [];

    private pageRequest: PageRequest = {
        offset: 0,
        limit: environment.pageLimit
    };

    constructor(private userStoreService: UserStoreService,
                private tweetService: TweetService,
                private message: NzMessageService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.user = this.userStoreService.getAuthUser();
        this.cd.markForCheck();
        this.tweetService.findFollowingTweet(this.pageRequest)
            .pipe(finalize(() => {
                this.initLoading = false;
                this.cd.markForCheck();
            }))
            .subscribe(next => {
                if (!next.empty) {
                    this.tweetList = this.tweetList.concat(next.content);
                    this.pageRequest.offset += next.numberOfElements;
                } else {
                    this.message.info('没有更多内容了');
                }
            }, error => {
                this.message.error(error.error.message || '获取推文失败');
            });
    }

    getNextTweets() {
        this.loadingMore = true;
        this.tweetService.findFollowingTweet(this.pageRequest)
            .pipe(finalize(() => {
                this.loadingMore = false;
                this.cd.markForCheck();
            }))
            .subscribe(next => {
                if (!next.empty) {
                    this.tweetList = this.tweetList.concat(next.content);
                    this.pageRequest.offset += next.numberOfElements;
                } else {
                    this.message.info('没有更多内容了');
                }
            }, error => {
                this.message.error(error.error.message || '获取推文失败');
            });
    }

    publishTweetSuccess(tweet: Tweet) {
        this.tweetList = [tweet].concat(this.tweetList);
        this.cd.markForCheck();
    }

}

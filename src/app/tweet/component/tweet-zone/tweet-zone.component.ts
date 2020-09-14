import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageRequest, Tweet, User } from '../../../shared/entity';
import { UserStoreService } from '../../../shared/service';
import { TweetService } from '../../service';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '../../../../environments/environment';

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
    tweetList: Array<Tweet> = [];

    private pageRequest: PageRequest = {
        offset: 1,
        limit: environment.pageLimit
    };

    constructor(private userStoreService: UserStoreService,
                private tweetService: TweetService,
                private message: NzMessageService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.user = this.userStoreService.getLoginUser();
        this.cd.markForCheck();
        this.tweetService.getFollowingTweet(this.pageRequest)
            .subscribe(next => {
                this.initLoading = false;
                const newTweets = next.records;
                if (newTweets.length > 0) {
                    this.tweetList = newTweets;
                    this.pageRequest.offset += newTweets.length;
                    this.cd.markForCheck();
                } else {
                    this.message.info('没有更多内容了');
                }
            }, error => {
                this.message.error(error.error.message);
            });

    }

    getNextTweets() {
        this.loadingMore = true;
        this.tweetService.getFollowingTweet(this.pageRequest)
            .subscribe(next => {
                const newTweets = next.records;
                if (newTweets.length > 0) {
                    this.tweetList = this.tweetList.concat(newTweets);
                    this.pageRequest.offset += newTweets.length;
                    this.cd.markForCheck();
                } else {
                    this.message.info('没有更多内容了');
                }
                this.loadingMore = false;
            }, error => {
                this.message.error(error.error.message || '获取推文失败');
            });
    }

    publishTweetSuccess(tweet: Tweet) {
        this.tweetList = [tweet].concat(this.tweetList);
        this.cd.markForCheck();
    }

}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Tweet } from '../../../shared/entity';

@Component({
    selector: 'app-tweet-card',
    templateUrl: './tweet-card.component.html',
    styleUrls: ['./tweet-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TweetCardComponent implements OnInit {

    @Input() tweet: Tweet;

    constructor() {
    }

    dateFormat = 'yyyy/MM/dd HH:mm:ss';

    ngOnInit() {
    }

    handleLike() {
        return null;
    }
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../shared/entity';

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent implements OnInit {

    @Input() post: Post;

    constructor() {
    }

    dateFormat = 'yyyy/MM/dd HH:mm:ss';

    ngOnInit() {
    }

    handleLike() {
        return null;
    }
}

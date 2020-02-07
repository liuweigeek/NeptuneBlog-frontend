import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Post, ServerResponse, User } from '../../../shared/entity';
import { SearchService } from '../../service';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-search-result-list',
    templateUrl: './search-result-list.component.html',
    styleUrls: ['./search-result-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultListComponent implements OnInit {

    keyword: string;

    userList: User[] = [];
    postList: Post[] = [];

    constructor(private route: ActivatedRoute,
                private searchService: SearchService,
                private message: NzMessageService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            filter(params => params.has('keyword')),
            map(params => params.get('keyword'))
        ).subscribe(keyword => {
            this.keyword = keyword;
            this.cd.markForCheck();
            this.searchByKeyword(this.keyword);
        });
    }

    searchByKeyword(keyword: string) {
        this.searchService.searchByKeyword(keyword)
            .subscribe(res => {
                if (res.isSuccess()) {
                    const resultMap = new Map();
                    for (const key of Object.keys(res.data)) {
                        resultMap.set(key, res.data[key]);
                    }

                    // get user list from result
                    if (resultMap.has('userRes')) {
                        const userRes = Object.assign(new ServerResponse<User[]>(), resultMap.get('userRes'));
                        if (userRes.isSuccess()) {
                            this.userList = userRes.data;
                            this.cd.markForCheck();
                        } else {
                            this.message.error(userRes.msg);
                        }
                    }
                    // get post list from result
                    if (resultMap.has('postRes')) {
                        const postRes = Object.assign(new ServerResponse<Post[]>(), resultMap.get('postRes'));
                        if (postRes.isSuccess()) {
                            this.postList = postRes.data;
                            this.cd.markForCheck();
                        } else {
                            this.message.error(postRes.msg);
                        }
                    }
                } else {
                    this.message.error(res.msg);
                }
            });
    }

}

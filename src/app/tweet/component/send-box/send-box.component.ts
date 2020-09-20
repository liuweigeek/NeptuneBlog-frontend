import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { Tweet, User } from '../../../shared/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TweetService } from '../../service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-send-box',
    templateUrl: './send-box.component.html',
    styleUrls: ['./send-box.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendBoxComponent implements OnInit {

    isSending = false;
    placeHolder = '有什么新鲜事?';

    validateForm: FormGroup;

    @Input() user: User;
    @Output() publishSuccess = new EventEmitter<Tweet>();

    constructor(private fb: FormBuilder,
                private tweetService: TweetService,
                private message: NzMessageService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            content: [null, [Validators.required, Validators.maxLength(200)]]
        });
    }

    handleSubmit() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls.hasOwnProperty(i)) {
                this.validateForm.controls[i].markAsDirty();
                this.validateForm.controls[i].updateValueAndValidity();
            }
        }

        this.tweetService.publishTweet(this.getTweetFromForm())
            .subscribe(next => {
                this.message.success('发送成功');
                this.publishSuccess.emit(next);
                this.validateForm.reset();
                this.cd.markForCheck();
            }, error => {
                this.message.error(error.error.message || '发送失败');
            });
    }

    getTweetFromForm(): Tweet {
        return {
            text: this.validateForm.controls.content.value,
        } as Tweet;
    }
}

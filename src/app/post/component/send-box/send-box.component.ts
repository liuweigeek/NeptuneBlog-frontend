import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post, User } from '../../../shared/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-send-box',
    templateUrl: './send-box.component.html',
    styleUrls: ['./send-box.component.css']
})
export class SendBoxComponent implements OnInit {

    private isSending = false;
    private placeHolder = '有什么新鲜事?';

    validateForm: FormGroup;

    @Input() user: User;
    @Output() publishSuccess = new EventEmitter<Post>();

    constructor(private fb: FormBuilder,
                private postService: PostService,
                private message: NzMessageService) {
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

        this.postService.publishPost(this.getPostFromForm())
            .subscribe(res => {
                if (res.isSuccess()) {
                    this.message.success('发送成功');
                    this.publishSuccess.emit(res.data);
                    this.validateForm.reset();
                } else {
                    this.message.error(res.msg);
                }
            });
    }

    getPostFromForm(): Post {
        return {
            content: this.validateForm.controls.content.value,
        } as Post;
    }
}

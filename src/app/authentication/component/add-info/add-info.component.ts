import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserAvatarService } from '../../../user';
import { UserStoreService } from '../../../shared';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-add-info',
    templateUrl: './add-info.component.html',
    styleUrls: ['./add-info.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddInfoComponent implements OnInit {

    uploading = false;
    avatarFile: any;
    previewUrl: any;
    valid: boolean;

    constructor(private userAvatarService: UserAvatarService,
                private userStoreService: UserStoreService,
                private router: Router,
                private message: NzMessageService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        const authUser = this.userStoreService.getAuthUser();
        this.previewUrl = authUser.mediumAvatar;
    }

    beforeUpload = (file: File): boolean => {
        this.valid = this.checkFile(file);

        if (this.valid) {
            this.avatarFile = file;
            this.getBase64(this.avatarFile, (img: string) => {
                this.previewUrl = img;
                this.cd.markForCheck();
            });
        } else {
            this.previewUrl = null;
            this.avatarFile = null;
            this.cd.markForCheck();
        }
        return false;
    };

    checkFile(file: File): boolean {
        const isSupports = ['image/jpeg', 'image/png'].includes(file.type);
        if (!isSupports) {
            this.message.error('请传入JPG或PNG格式的图片');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            this.message.error('图片大小不可超过2MB');
            return false;
        }

        /*const dimensionRes = this.checkImageDimension(file, 300);
        if (!dimensionRes) {
          this.message.error(`为保证最佳效果，图片分辨率需大于${length}x${length}`);
          return false;
        }*/
        return true;
    }

    getBase64(img: File, callback: (img: string) => void): void {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result.toString()));
        reader.readAsDataURL(img);
    }

    private checkImageDimension(file: File, length: number): Promise<boolean> {
        return new Promise(resolve => {
            const img = new Image(); // create image
            img.src = window.URL.createObjectURL(file);
            img.onload = () => {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                window.URL.revokeObjectURL(img.src);
                resolve(height >= length && width >= 300);
            };
        });
    }

    submitForm(): void {
        const formData = new FormData();
        formData.append('file', this.avatarFile);
        this.uploading = true;
        this.userAvatarService.uploadAvatar(formData)
            .pipe(finalize(() => {
                this.uploading = false;
                this.cd.markForCheck();
            }))
            .subscribe(next => {
                    this.message.success('头像上传成功');
                    this.userStoreService.setAuthUser(next);
                    this.navigateToMainPage();
                },
                error => {
                    this.message.error(error.error.message || '头像上传失败');
                }
            );
    }

    navigateToMainPage() {
        this.router.navigate(['/']);
    }
}

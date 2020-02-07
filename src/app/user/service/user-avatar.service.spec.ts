import { TestBed } from '@angular/core/testing';

import { UserAvatarService } from './user-avatar.service';

describe('UserAvatarService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: UserAvatarService = TestBed.get(UserAvatarService);
        expect(service).toBeTruthy();
    });
});

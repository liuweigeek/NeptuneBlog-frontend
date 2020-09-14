import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetZoneComponent } from './tweet-zone.component';

describe('TweetZoneComponent', () => {
    let component: TweetZoneComponent;
    let fixture: ComponentFixture<TweetZoneComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TweetZoneComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TweetZoneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

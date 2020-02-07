import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfoComponent } from './add-info.component';

describe('AddInfoComponent', () => {
    let component: AddInfoComponent;
    let fixture: ComponentFixture<AddInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddInfoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

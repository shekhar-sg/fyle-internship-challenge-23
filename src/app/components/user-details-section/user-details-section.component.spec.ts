import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsSectionComponent } from './user-details-section.component';

describe('UserDetailsSectionComponent', () => {
  let component: UserDetailsSectionComponent;
  let fixture: ComponentFixture<UserDetailsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

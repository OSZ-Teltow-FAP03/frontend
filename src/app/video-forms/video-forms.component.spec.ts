import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFormsComponent } from './video-forms.component';

describe('VideoFormsComponent', () => {
  let component: VideoFormsComponent;
  let fixture: ComponentFixture<VideoFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoFormsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

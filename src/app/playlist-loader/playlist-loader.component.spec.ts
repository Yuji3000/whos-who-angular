import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistLoaderComponent } from './playlist-loader.component';

describe('PlaylistLoaderComponent', () => {
  let component: PlaylistLoaderComponent;
  let fixture: ComponentFixture<PlaylistLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

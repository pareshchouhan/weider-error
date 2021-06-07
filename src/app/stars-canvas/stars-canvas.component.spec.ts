import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsCanvasComponent } from './stars-canvas.component';

describe('StarsCanvasComponent', () => {
  let component: StarsCanvasComponent;
  let fixture: ComponentFixture<StarsCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogninComponent } from './lognin.component';

describe('LogninComponent', () => {
  let component: LogninComponent;
  let fixture: ComponentFixture<LogninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogninComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

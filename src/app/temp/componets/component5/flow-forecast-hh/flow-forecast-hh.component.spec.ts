import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowForecastHhComponent } from './flow-forecast-hh.component';

describe('FlowForecastHhComponent', () => {
  let component: FlowForecastHhComponent;
  let fixture: ComponentFixture<FlowForecastHhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowForecastHhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowForecastHhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

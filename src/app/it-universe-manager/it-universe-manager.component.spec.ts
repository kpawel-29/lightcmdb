import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItUniverseManagerComponent } from './it-universe-manager.component';

describe('ItUniverseManagerComponent', () => {
  let component: ItUniverseManagerComponent;
  let fixture: ComponentFixture<ItUniverseManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItUniverseManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItUniverseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

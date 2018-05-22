import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IprangeFormComponent } from './iprange-form.component';

describe('IprangeFormComponent', () => {
  let component: IprangeFormComponent;
  let fixture: ComponentFixture<IprangeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IprangeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IprangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

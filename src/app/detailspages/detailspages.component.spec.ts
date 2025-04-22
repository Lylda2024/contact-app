import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailspagesComponent } from './detailspages.component';

describe('DetailspagesComponent', () => {
  let component: DetailspagesComponent;
  let fixture: ComponentFixture<DetailspagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailspagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailspagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

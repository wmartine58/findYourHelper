import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GooglemapsPage } from './googlemaps.page';

describe('GooglemapsPage', () => {
  let component: GooglemapsPage;
  let fixture: ComponentFixture<GooglemapsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglemapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

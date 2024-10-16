import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CircleBalancingModalComponent } from './circle-balancing-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('CircleBalancingModalComponent', () => {
  let component: CircleBalancingModalComponent;
  let fixture: ComponentFixture<CircleBalancingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleBalancingModalComponent, BrowserAnimationsModule], 
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { circle: { name: 'Test Circle', members: [] } } },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleBalancingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { InbalanceComponent } from './inbalance.component';
import { InbalanceService } from '../service/inbalance.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import axios from 'axios';

describe('InbalanceComponent', () => {
  let component: InbalanceComponent;
  let fixture: ComponentFixture<InbalanceComponent>;
  let mockInbalanceService: InbalanceService;
  let mockMatDialog: any;

  beforeEach(async () => {
    mockInbalanceService = jasmine.createSpyObj(['getBalancingCircles']);
    mockMatDialog = jasmine.createSpyObj(['open']);

    await TestBed.configureTestingModule({
      imports: [MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule],
      providers: [
        { provide: InbalanceService, useValue: mockInbalanceService },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InbalanceComponent);
    component = fixture.componentInstance;

    spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ id: '1', name: 'Test Circle' }] }));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
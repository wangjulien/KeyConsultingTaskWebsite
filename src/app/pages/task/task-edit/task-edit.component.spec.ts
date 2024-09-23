import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskEditComponent} from './task-edit.component';
import {provideRouter} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEditComponent, BrowserAnimationsModule],
      providers: [provideRouter([]), provideHttpClient()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

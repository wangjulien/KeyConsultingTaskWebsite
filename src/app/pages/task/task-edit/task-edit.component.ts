import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskService} from "../../../shared/services/task.service";
import {Task} from '../../../shared/model/task';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {
  private _taskService = inject(TaskService);

  public form: FormGroup;
  private task: Task;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      id: [{value: '', disabled: true}],
      label: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.task = {completed: false} as Task;
  }

  ngOnInit(): void {
    let id: string | null | number = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    id = parseInt(id);
    if (isNaN(id)) return;

    this._taskService.getTaskById(id)
      .subscribe({
        next: data => {
          this.task = data;
          this.form.patchValue({
            id: this.task.id,
            label: this.task.label,
            description: this.task.description,
          });
        },
        error: error => this.snackBar.open(error.message),
      });
  }

  createTask() {
    if (this.form.valid) {
      const {label, description} = this.form.value;
      this._taskService.createNewTask({...this.task, label, description})
        .subscribe({
          next: () => this.router.navigate(['/tasks']),
          error: error => this.snackBar.open(error.message),
        });
    }
  }
}

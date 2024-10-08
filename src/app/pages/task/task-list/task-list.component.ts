import {Component, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {Task} from '../../../shared/model/task';
import {MatButton} from "@angular/material/button";
import {TaskService} from "../../../shared/services/task.service";
import {MatIcon} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatLabel,
    MatTable,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    FormsModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  private _taskService = inject(TaskService);

  public displayedColumns = ['id', 'label', 'description', 'completed', 'action'];
  public dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  public selectedStatus?: boolean = undefined;

  constructor(private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this._taskService.getTasks()
      .subscribe({
        next: data => this.dataSource.data = data,
        error: error => this.snackBar.open(error.message),
      });
  }

  public filterTasksByStatus() {
    this._taskService.getTasks(this.selectedStatus)
      .subscribe({
        next: data => this.dataSource.data = data,
        error: error => this.snackBar.open(error.message),
      });
  }

  public editTask(task: Task) {
    this.router.navigate(['/tasks', task.id])
      .catch(error => this.snackBar.open(error.message));
  }

  public finishTask(task: Task) {
    if (task.completed) return;

    this._taskService.patchTaskStatus(task.id!, true)
      .subscribe({
        next: data => task.completed = data.completed,
        error: error => this.snackBar.open(error.message)
      });
  }
}

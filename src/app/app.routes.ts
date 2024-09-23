import {Routes} from '@angular/router';
import {TaskListComponent} from "./pages/task/task-list/task-list.component";
import {TaskEditComponent} from "./pages/task/task-edit/task-edit.component";

export const routes: Routes = [
  {
    path: 'tasks',
    component: TaskListComponent
  },
  {
    path: 'tasks/:id',
    component: TaskEditComponent
  },
  {path: '**', redirectTo: '/tasks'}
];

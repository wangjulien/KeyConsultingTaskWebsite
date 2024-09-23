import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {Task} from "../model/task";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private static readonly TASK_PATH = environment.apiURL + '/tasks';

  constructor(private http: HttpClient) {
  }

  public getTasks(isCompleted?: boolean): Observable<Task[]> {
    let params = new HttpParams();
    if (undefined !== isCompleted) {
      params = params.append('isCompleted', isCompleted);
    }
    return this.http.get<Task[]>(TaskService.TASK_PATH, {params});
  }

  public getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(TaskService.TASK_PATH + '/' + id);
  }

  public patchTaskStatus(id: number, completed: boolean): Observable<Task> {
    return this.http.patch<Task>(TaskService.TASK_PATH, {id, completed});
  }

  public createNewTask(task: Task): Observable<Task> {
    return this.http.post<Task>(TaskService.TASK_PATH, task);
  }
}


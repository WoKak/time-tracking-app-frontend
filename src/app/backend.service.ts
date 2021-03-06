import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';

@Injectable()
export class BackendService {

  currentUser: string;
  token: any;
  role: string;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  login(username: string, password: string) {

    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', '');

    return this.http.post(
      'https://localhost:5000/login',
      {username: username, password: password},
      {headers: httpHeaders}
    ).map(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.currentUser = response.username;
        this.role = response.role;
        this.token = response.token;
        return response.token;
      }
    );
  }

  logout() {
    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    return this.http.post(
      'https://localhost:5000/logout',
      {username: this.currentUser, token: this.token},
      {headers: httpHeaders}
    ).map(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.token = '';
        this.currentUser = '';
        return response.user;
      }
    );
  }

  isAuthenticated(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.authService.isAuthenticated(route, state, this.role);
  }

  fetchTimesheetByEmployer(week: any, year: any, worker: any) {

    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    let url = 'https://localhost:5000/timesheet/fetch-timesheet/' + worker + '/' + week + '/' + year;

    return this.http.get(url, {headers: httpHeaders}).map(
      data => {
        return JSON.parse(JSON.stringify(data));
      }
    );
  }

  fetchTasksByEmployee() {

    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    let url = 'https://localhost:5000/task/employee/fetch-tasks/' + this.currentUser;

    return this.http.get(url, {headers: httpHeaders}).map(
      data => {
        return JSON.parse(JSON.stringify(data));
      }
    );
  }

  fetchEmployees() {

    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    return this.http.get(
      'https://localhost:5000/employee/fetch-employees',
      {headers: httpHeaders}
    ).map(
      data => {
        return JSON.parse(JSON.stringify(data));
      }
    );
  }

  fetchWeeklyReportForTask(week: any, selectedTask: any, year: any) {

    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    return this.http.get(
      'https://localhost:5000/timesheet/fetch-task-report/' + this.currentUser + '/' + week + '/' + year + '/' + selectedTask,
      {headers: httpHeaders}
    ).map(
      data => {
        return JSON.parse(JSON.stringify(data));
      }
    );
  }

  fetchDetails(selectedTask: any) {

    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    return this.http.post(
      'https://localhost:5000/task/fetch-details',
      {task: selectedTask},
      {headers: httpHeaders}
    ).map(
      data => {
        return JSON.parse(JSON.stringify(data));
      }
    );
  }

  updateDetails(time: any, worker: any, selectedTask: any) {

    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    return this.http.post(
      'https://localhost:5000/task/update-details',
      {task: selectedTask, time: time, worker: worker},
      {headers: httpHeaders}
    ).map(
      data => {
      }
    );
  }

  fetchTasksByEmployer() {

    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    return this.http.get(
      'https://localhost:5000/task/employer/fetch-tasks/' + this.currentUser,
      {headers: httpHeaders}
    ).map(
      data => {
        return JSON.parse(JSON.stringify(data));
      }
    );
  }

  decline_timesheet(id_tmsht: any, week: any, year: any) {

    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    let url = 'https://localhost:5000/timesheet/decline-timesheet/' + id_tmsht + '/' + week + '/' + year;

    console.log(url);

    return this.http.get(url, {headers: httpHeaders}).map(
      data => {
        return JSON.parse(JSON.stringify(data));
      }
    );
  }

  accept_timesheet(id_tmsht: any, week: any, year: any) {

    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    let url = 'https://localhost:5000/timesheet/accept-timesheet/' + id_tmsht + '/' + week + '/' + year;

    return this.http.get(url, {headers: httpHeaders}).map(
      data => {
        return JSON.parse(JSON.stringify(data));
      }
    );
  }

  addTask(taskName: any, taskTime: any, employee: any) {
    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    let url = 'https://localhost:5000/task/add-task/' + this.currentUser;

    return this.http.post(
      url,
      {task_name: taskName, task_time: taskTime, employee: employee},
      {headers: httpHeaders}
    ).map(
      data => {
        return "OK";
      }
    );
  }

  reportWeeklyReportForTask(week: any, year: any, selectedTask: any, tracked: any) {

    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Token', this.token);

    let url = 'https://localhost:5000/timesheet/save-report';

    return this.http.post(
      url,
      {task_descriptions: tracked, week: week, year: year, selected_task: selectedTask, worker: this.currentUser},
      {headers: httpHeaders}
    ).map(
      data => {}
    );
  }
}

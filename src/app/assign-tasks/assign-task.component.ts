import {Component} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './assign-task.component.html'
})

export class AppAssignTask {

  model: any = {};
  token: string;

  constructor() {
  }
}

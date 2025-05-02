import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  // @Input() specificerar att TaskListComponent tar emot tasks från sin förälder <app-task-list [tasks]="tasks" />
  // @Input är en så kallad "decorator"
  @Input() tasks: any[] = [];
}

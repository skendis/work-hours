import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  time;
  totalHours = 0;
  totalMinutes = 0;
  base = 0;
  workHours = this.fb.array([]);
  form = this.fb.group({
    workHours: this.workHours
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.addTime();
  }


  diff(start, end): string {
    start = start.split(':');
    end = end.split(':');
    const startDate = new Date(0, 0, 0, start[0], start[1], 0);
    const endDate = new Date(0, 0, 0, end[0], end[1], 0);
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / 1000 / 60);

    if (hours < 0) {
      hours = hours + 24;
    }

    this.totalHours += hours;
    this.totalMinutes += minutes;
    if (this.totalMinutes >= 60) {
      this.totalHours += 1;
      this.totalMinutes -= 60;
    }
    return (hours <= 9 ? '0' : '') + hours + ':' + (minutes <= 9 ? '0' : '') + minutes;
  }


  calcTime(formGroup: AbstractControl): void {
    const startTime = formGroup.get('startTime').value;
    const endTime = formGroup.get('endTime').value;
    this.diff(startTime, endTime);

    this.addTime();
  }

  addTime(): void {
    const newTime = this.fb.group({
      startTime: [''],
      endTime: ['']
    });
    this.workHours.push(newTime);
  }

}

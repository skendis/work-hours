import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  time;
  form: FormGroup = this.fb.group({
    startTime: ['09:00'],
    endTime: ['18:00']
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
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

    return (hours <= 9 ? '0' : '') + hours + ':' + (minutes <= 9 ? '0' : '') + minutes;
  }


  calcTime(): void {
    const startTime = this.form.get('startTime').value;
    const endTime = this.form.get('endTime').value;
    this.time = this.diff(startTime, endTime);
  }

}

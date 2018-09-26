import { Component, OnInit,ChangeDetectionStrategy  } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
// import { colors } from 'colors';
// import { colors } from './colors';
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  view: string = 'month';
  activeDayIsOpen=true;
   colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Click me',
      color: this.colors.yellow,
      start: new Date()
    },
    {
      title: 'Or click me',
      color: this.colors.blue,
      start: new Date()
    }
  ];

  clickedDate: Date;
  constructor() { }

  ngOnInit() {
  
  }
  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
    this.activeDayIsOpen=!this.activeDayIsOpen;
  }

}

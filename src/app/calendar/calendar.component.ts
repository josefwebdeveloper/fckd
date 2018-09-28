import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CalendarEvent } from "angular-calendar";
import { Subject } from "rxjs";
import { UserService } from "../_services/user.service";
import { environment } from "../../environments/environment";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from "date-fns";
// import { colors } from 'colors';
// import { colors } from './colors';
@Component({
  selector: "app-calendar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  constructor(private userService: UserService) {}
  
  refresh: Subject<any> = new Subject();
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }
  webUrl=environment.webUrl;
  view: string = "month";
  activeDayIsOpen = true;
  colors: any = {
    red: {
      primary: "#ad2121",
      secondary: "#FAE3E3"
    },
    blue: {
      primary: "#1e90ff",
      secondary: "#D1E8FF"
    },
    yellow: {
      primary: "#e3bc08",
      secondary: "#FDF1BA"
    }
  };

  viewDate: Date = new Date();
  title = "kakashka";
  events: CalendarEvent[] = [
    // {
    //   title: 'Click me',
    //   // color: this.colors.yellow,
    //   start: new Date()
    // },
    // {
    //   title: 'Or click me',
    //   // color: this.colors.blue,
    //   start:
    // }
  ];

  clickedDate: Date;

  ngOnInit() {
    this.getAllEvents();
  }
  // refreshView(): void {
  //   console.log("refresh");
  //   this.refresh.next();
  // }
  // beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
  //   body.forEach(day => {
  //   console.log(day);
  //   });
  // }

  eventClicked({ event }: { event: CalendarEvent }): void {
    this.activeDayIsOpen = !this.activeDayIsOpen;
  }
  clickDate(event) {
    // console.log('Event clicked',{event});
    if (event.day.events.length > 0) {
      this.deleteEvent(event);
    } else {
      // console.log('Event clicked');
      // this.addEvent(event);
      this.add(event.day.date, this.title);

      this.clickedDate = event;
      // console.log(this.events);
    }

    this.refresh.next();
  }
  getAllEvents(): void {
    this.userService.getAllEvents().subscribe(events => {
      for (let i in events) {
        events[i].start = new Date(events[i].start);
      }

      this.events = events;
      // this.events[0].start=new Date(this.events[0].start);
      console.log({ events });
      this.refresh.next();
    });
  }

  add(start, title): void {
    // name = name.trim();
    // if (!name) { return; }
    console.log({ start, title });
    this.userService
      .createEvent({ start: start, title: title })
      .subscribe(event => {
        this.events.push({
          id: event.event.id,
          title: event.event.title,
          start: new Date(event.event.start)
        });
        console.log("1",  this.events );
        this.refresh.next();
      });
  }
  addEvent(event): void {
    this.events.push({
      title: "New event",
      start: event.day.date
      // start: event.day.date,
      // end: event.day.date,
      // color: this.colors.blue,
    });
    // this.refresh.next();
  }
  deleteEvent(event): void {
    this.events = this.events.filter(iEvent => iEvent !== event.day.events[0]);
    console.log("dele", event.day.events[0].id);
    this.userService.deleteEvent(event.day.events[0].id).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  gregorianTimezoneOffset = 0;
  time: string;

  constructor() { }

  goToOhareCalendar() {
    window.location.href = 'http://blakeohare.com/calendar';
  }

  ngOnInit() {
    this.start();
  }

  start(): void {
    this.gregorianTimezoneOffset = this.calculateTimezoneOffset();
    this.run();
}

  calculateTimezoneOffset(){
    return new Date().getTimezoneOffset();
  }

  updateOhare(ohare: string): void {
    this.time = ohare;
  }


  async run() {
    Promise.all([
      await this.ohareSecond(),
    ]);
  }

  ohareSecond() {
    setInterval(() => {
      this.updateOhare(this.getOhareUTC());
    }, 432);
  }

  getCurrentGregorianDateTimeUTC(): string {
    const now = new Date();
    now.setUTCMinutes(now.getUTCMinutes() - this.gregorianTimezoneOffset);
    return this.getCurrentGregorianDateUTC(now) + ' ' + this.getCurrentGregorianTimeUTC(now) + ' (' + this.parseTimezoneOffset(this.gregorianTimezoneOffset) + ')';
  }

  getCurrentGregorianDateUTC(now?: Date): string {
    if (!now) {
      now = new Date();
    }
    return this.parseMonth(now.getUTCMonth()) + ' ' + now.getUTCDate() + ', ' + now.getUTCFullYear();;
  }

  getCurrentGregorianTimeUTC(now?: Date): string {
    if (!now) {
      now = new Date();
    }
    return now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + this.digitCheck(now.getSeconds());
  }

  digitCheck(value: number): string {
    if (value < 10) {
      return '0' + value.toString();
    }
    return value.toString();
  }

  parseMonth(month: number): string {
    switch(month) {
      case 0:
          return 'January';
      case 1:
          return 'February';
      case 2:
          return 'March';
      case 3:
          return 'April';
      case 4:
          return 'May';
      case 5:
          return 'June';
      case 6:
          return 'July';
      case 7:
          return 'August';
      case 8:
          return 'September';
      case 9:
          return 'October';
      case 10:
          return 'November';
      case 11:
          return 'December';
      default:
          return 'NaM'
    }
  }

  getOhareUTC() {
    const now = new Date();
    now.setUTCMinutes(now.getUTCMinutes() - 720);
    const ohareanTime = new OHareanDate(now);
    const zoneString = this.parseOhareTimezone(this.gregorianTimezoneOffset);
    const hourOffset = parseInt(zoneString.substring(1,zoneString.length));
    ohareanTime.setTimezoneOffset(hourOffset);
    return ohareanTime.toUTCString() + ' (' + this.parseOhareTimezone(this.gregorianTimezoneOffset) + ')';
  }

  parseTimezoneOffset(offset: number): string {
    switch(offset) {
      case 720:
        return 'UTC-12:00';
      case 660:
        return 'UTC-11:00';
      case 600:
        return 'UTC-10:00';
      case 570:
        return 'UTC-09:30';
      case 540:
        return 'UTC-09:00';
      case 480:
        return 'UTC-08:00';
      case 420:
        return 'UTC-07:00';
      case 360:
        return 'UTC-06:00';
      case 300:
        return 'UTC-05:00';
      case 240:
        return 'UTC-04:00';
      case 210:
        return 'UTC-03:30';
      case 180:
        return 'UTC-03:00';
      case 120:
        return 'UTC-02:00';
      case 60:
        return 'UTC-01:00';
      case 0:
        return 'UTC-00:00';
      case -60:
        return 'UTC+01:00';
      case -120:
        return 'UTC+02:00';
      case -180:
        return 'UTC+03:00';
      case -210:
        return 'UTC+03:30';
      case -240:
        return 'UTC+04:00';
      case -270:
        return 'UTC+04:30';
      case -300:
        return 'UTC+05:00';
      case -330:
        return 'UTC+05:30';
      case -345:
        return 'UTC+05:45';
      case -360:
        return 'UTC+06:00';
      case -390:
        return 'UTC+06:30';
      case -420:
        return 'UTC+07:00';
      case -480:
        return 'UTC+08:00';
      case -510:
        return 'UTC+08:30';
      case -525:
        return 'UTC+08:45';
      case -540:
        return 'UTC+09:00';
      case -570:
        return 'UTC+09:30';
      case -600:
        return 'UTC+10:00';
      case -630:
        return 'UTC+10:30';
      case -660:
        return 'UTC+11:00';
      case -720:
        return 'UTC+12:00';
      case -765:
        return 'UTC+12:45';
      case -780:
        return 'UTC+13:00';
      case -840:
        return 'UTC+14:00';
      default:
        return 'NaZ';
    }
  }

  parseOhareTimezone(offset): string {
    if(offset <= 720 && offset >= 540){
        return '+0';
    }
    if(offset <= 480 && offset >= 360){
        return '+2';
    }
    if(offset <= 300 && offset >= 180){
        return '+5';
    }
    if(offset <= 120 && offset >= -120){
        return '+8';
    }
    if(offset <= -180 && offset >= -300){
        return '+11';
    }
    if(offset <= -360 && offset >= -480){
        return '+14';
    }
    if(offset <= -540 && offset >= -840){
        return '+17';
    }
  }

}

export class OHareanDate {
  now: Date;
  isLeap: boolean = false;

  year: number = 0;
  season: number = 0;
  week: number = 0;
  day: number = 0;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;

  offset = 0;


  constructor(inputDate: Date) {
      this.now = inputDate;
      const year = this.now.getUTCFullYear();
      if(year % 4 === 0 && year % 100 === 0 && year % 400) {
          this.isLeap = true;
      }
      this.convertTime();
      this.convertDate();
  }

  convertTime() {
      const hours = this.now.getUTCHours();
      const minutes = this.now.getUTCMinutes();
      const seconds = this.now.getUTCSeconds();
      const milliseconds = this.now.getUTCMilliseconds();
      const currentMillisecond = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;

      this.second = Math.floor(currentMillisecond / 432);

      this.minute = Math.floor((currentMillisecond / 432) / 100);

      this.hour = Math.floor(((currentMillisecond / 432) / 100) / 100);

      this.minute = this.minute - (this.hour * 100);

      this.second = this.second - (this.hour * 100 * 100) - (this.minute * 100);
  }

  convertDate() {
      this.year = this.now.getUTCFullYear() + 10000;
      const delta = this.timeDeltaFromSpringEquinox();
      this.day = delta;
      this.week = Math.floor(delta / (6))
      this.season = Math.floor((delta / 6) / 15);
      this.week = this.week - (this.season * 15);
      this.day = this.day - (this.season * 15 * 6) - (this.week * 6);
  }

  timeDeltaFromSpringEquinox(): number {
      const year = this.now.getUTCFullYear();
      let equinox = '3/20/' + this.now.getUTCFullYear();
      const today = (this.now.getUTCMonth() + 1) +'/' + this.now.getUTCDate() + '/' + this.now.getUTCFullYear();
      let dayDelta = this.date_diff_indays(equinox, today);
      if(dayDelta < 0){
          equinox = '3/20/' + (this.now.getUTCFullYear() - 1);
          dayDelta = this.date_diff_indays(equinox, today);;
      }
      return dayDelta;
  }

  toUTCString(): string {
      return this.toUTCDateStrong() + ' ' +  this.toUTCTimeString();
  }

  toUTCTimeString(): string {
      return this.hour + '.' + this.minute + '.' + this.second;
  }

  toUTCDateStrong(): string {
      return this.year + ' HE ' + this.parseSeason(this.season) + ' ' + this.week + ':' + this.day;
  }

  date_diff_indays(date1, date2) {
      const dt1 = new Date(date1);
      const dt2 = new Date(date2);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  setTimezoneOffset(offset: number){
      this.now.setUTCHours(this.now.getUTCHours() + offset)
  }

  parseSeason(month: number): string {
      switch(month) {
          case 0:
              return 'Ineo';
          case 1:
              return 'Cresco';
          case 2:
              return 'Vigeo';
          case 3:
              return 'Cado';
          case 4:
              return 'Abeo'
          default:
              return 'NaS';
      };
  }
}
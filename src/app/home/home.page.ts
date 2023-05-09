import { Component } from '@angular/core';

interface IDate {
  label: string,
  date: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  public today: string = ''
  public yesterday: string = ''
  public minDate: string = '' 
  public maxDate: string = ''
  public selectedDate: any
  public tenDaysFuture: string = ''
  public oneYearFuture: string = ''
  public dates: IDate[] = []
  public didSubmit = false

  constructor() { }

  ngOnInit() {

    // Prevent date advance by one day when calling toISOString() due to timezone conversion issue
   const date = new Date();
   const timezoneOffset = date.getTimezoneOffset() * 60000; // convert minutes to milliseconds
   const adjustedDate = new Date(date.getTime() - timezoneOffset);
   adjustedDate.setDate(adjustedDate.getDate()+1)
   this.minDate = adjustedDate.toISOString().split('T')[0]
   console.log('minDate: ', this.minDate)
  
   const today = new Date()
   today.setFullYear(today.getFullYear() + 5);
   this.maxDate = today.toISOString()
  }

  setDate(e: any) {

    this.dates = []
    this.today = new Date().toISOString().split('T')[0]
    //this.today = this.getISODate(new Date())
    console.log(this.today)
    this.dates.push({ label: 'Today:', date: this.today })

    const y = new Date()
    y.setDate(y.getDate() - 1)
    this.yesterday = y.toISOString().split('T')[0]

    this.dates.push({ label: 'Yesterday:', date: this.yesterday })

    const d = new Date(e.detail.value)
    this.selectedDate = d.toISOString().split('T')[0]

    const td = new Date(e.detail.value)
    td.setDate(d.getDate() + 10)
    this.tenDaysFuture = td.toISOString().split('T')[0]
    this.dates.push({ label: '10 days past selected date:', date: this.tenDaysFuture })

    const oy = new Date(e.detail.value)
    oy.setFullYear(oy.getFullYear() + 1)
    this.oneYearFuture = oy.toISOString().split('T')[0]
    this.dates.push({ label: '1 year past selected date: ', date: this.oneYearFuture })

  }

  // Prevent date advance by one day when calling toISOString() due to timezone conversion issue
  adjustedDate() {
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000; // convert minutes to milliseconds
    const adjustedDate = new Date(date.getTime() - timezoneOffset);
    console.log('adjustedDate: ', adjustedDate)
    return adjustedDate;  
  }

  hideDates() {
    this.didSubmit = false
  }

  doSubmit() {
    this.didSubmit = true
  }


}

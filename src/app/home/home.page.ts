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
  public tenDaysPastSelectedDate: string = ''
  public oneYearPastSelectedDate: string = ''
  public dates: IDate[] = []
  public didSubmit = false

  constructor() { }

  ngOnInit() {


    const d = new Date()
    d.setDate(d.getDate() + 1)
    this.minDate = d.toISOString()

    d.setFullYear(d.getFullYear() + 5);
    this.maxDate = d.toISOString()
  }

  setDate(e: any) {

    this.dates = []
    console.log(new Date().toISOString())
    this.today = new Date().toISOString().split('T')[0]
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
    this.tenDaysPastSelectedDate = td.toISOString().split('T')[0]
    this.dates.push({ label: '10 days past selected date:', date: this.tenDaysPastSelectedDate })

    const oy = new Date(e.detail.value)
    oy.setFullYear(oy.getFullYear() + 1)
    this.oneYearPastSelectedDate = oy.toISOString().split('T')[0]
    this.dates.push({ label: '1 year past selected date: ', date: this.oneYearPastSelectedDate })

  }

  hideDates() {
    this.didSubmit = false
  }

  doSubmit() {
    this.didSubmit = true
  }


}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private _status:string=""
  private _date:string=""
  private _customerName:string=""


  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get customerName(): string {
    return this._customerName;
  }

  set customerName(value: string) {
    this._customerName = value;
  }

  constructor() { }
}

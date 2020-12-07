import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServPeriodFilterService {
  public periodFastFilterData = {name: '', code: ''}
  public periodFilterData = {name: '', code: ''}
  public periodTemp = {name: '', code: ''}
  public disableFastFiled = false

  public onStndFilter() {
    this.disableFastFiled = true
    this.periodTemp = this.periodFastFilterData
    this.periodFastFilterData = {name: '', code: ''}
  }

  public onFastFilter() {
    this.disableFastFiled = false
    this.periodFilterData = this.periodTemp
    this.periodTemp = {name: '', code: ''}
  }
  constructor() { }
}

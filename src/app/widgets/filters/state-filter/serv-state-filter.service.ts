import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServStateFilterService {
  public stateFastFilterData = {name: '', code: ''}
  public stateFilterData = {name: '', code: ''}
  public stateTemp = {name: '', code: ''}
  public disableFastFiled = false

  public onStndFilter() {
    this.disableFastFiled = true
    this.stateTemp = this.stateFastFilterData
    this.stateFastFilterData = {name: '', code: ''}
    console.log(this.stateFastFilterData)
  }

  public onFastFilter() {
    this.disableFastFiled = false
    this.stateFastFilterData = this.stateTemp
    this.stateTemp = {name: '', code: ''}

  }
  constructor() { }
}

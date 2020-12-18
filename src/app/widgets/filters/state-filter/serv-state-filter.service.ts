import { Injectable } from '@angular/core';
import {FilterService} from "../filter.service";
import * as moment from "moment";
import {OrderRequest} from "../order.request";

@Injectable({
  providedIn: 'root'
})
export class ServStateFilterService {
  public stateFastFilterData =  {name: 'незакрытые', code: 'UNCLOSED'}
  public stateFilterData = {name: '', code: ''}
  public stateTemp = {name: '', code: ''}
  public disableFastFiled = false
  private orderRequest: OrderRequest

  defaultFastFilter() {
    this.stateFastFilterData =  {name: 'незакрытые', code: 'UNCLOSED'}
  }

  public onStndFilter() {
    this.disableFastFiled = true
    this.stateTemp.name = this.stateFastFilterData.name
    this.stateTemp.code = this.stateFastFilterData.code
    this.stateFastFilterData.name=''
    this.stateFastFilterData.code=''
    console.log(this.stateFastFilterData)
  }

  public onFastFilter() {
    this.disableFastFiled = false
    this.stateFastFilterData.name = this.stateTemp.name
    this.stateFastFilterData.code = this.stateTemp.code
    this.stateTemp.name=''
    this.stateTemp.code=''
    this.changeState()

  }
  constructor(   public filterService: FilterService) { }

  changeState() {
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.state = this.stateFastFilterData.code
        this.filterService.setOrderRequest(this.orderRequest)
    console.log(this.filterService.getOrderRequest().state)


  }


}

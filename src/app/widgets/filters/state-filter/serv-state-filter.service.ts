import { Injectable } from '@angular/core';
import {FilterService} from "../filter.service";
import * as moment from "moment";
import {OrderRequest} from "../order.request";

@Injectable({
  providedIn: 'root'
})
export class ServStateFilterService {
  public stateFastFilterData =    {name: 'закрытые', code: 'CLOSED'}
  public stateFilterData = {name: '', code: ''}
  public stateTemp = {name: '', code: ''}
  public disableFastFiled = false
  private orderRequest: OrderRequest

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
    this.changeState()

  }
  constructor(   public filterService: FilterService) { }

  changeState() {
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.state = this.stateFastFilterData.code
        this.filterService.setOrderRequest(this.orderRequest)


  }


}

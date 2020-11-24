import { Component, OnInit } from '@angular/core';
import {OrderRequest} from "../order.request";
import {FilterService} from "../filter.service";
import * as moment from "moment";

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  private dateTo = null;
  private dateFrom = null;
  private orderRequest: OrderRequest
  private isCloseDate: boolean = false
  menuChange: number = 1
  constructor(public filterService: FilterService) { }

  ngOnInit(): void {
    this.orderRequest = this.filterService.getOrderRequest()

  }

  changePeriod() {
    this.orderRequest.closeDate = this.isCloseDate
    if(this.dateFrom!=null){
      this.orderRequest.dateFrom = moment(this.dateFrom).utc().format("YYYY-MM-DD")
    }
    if(this.dateTo!=null){
      this.orderRequest.dateTo = moment(this.dateTo).utc().format("YYYY-MM-DD")
    }
    this.filterService.setOrderRequest(this.orderRequest)
  }

}

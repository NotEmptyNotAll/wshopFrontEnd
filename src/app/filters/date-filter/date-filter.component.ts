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
  private menuChange: number = 1
  constructor(public filterService: FilterService) { }

  ngOnInit(): void {
  }

  changePeriod() {

    this.orderRequest = this.filterService.getOrderRequest()

    this.orderRequest.closeDate = this.isCloseDate
    this.orderRequest.dateFrom = this.dateFrom;
    this.orderRequest.dateTo = this.dateTo;
alert(this.dateFrom+' '+this.dateTo)
    //  moment().utc().format("YYYY-MM-DD")
    this.filterService.setOrderRequest(this.orderRequest)
  }

}

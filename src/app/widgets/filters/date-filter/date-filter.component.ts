import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderRequest} from "../order.request";
import {FilterService} from "../filter.service";
import * as moment from "moment";
import {PeriodDateFilterComponent} from "../period-date-filter/period-date-filter.component";

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
    @ViewChild(PeriodDateFilterComponent) childPeriodDateFilter:PeriodDateFilterComponent
    menuChange: number = 1

    constructor(public filterService: FilterService) {
    }

    ngOnInit(): void {
        this.orderRequest = this.filterService.getOrderRequest()

    }

    clear() {
        this.dateTo = null;
        this.dateFrom = null;
        this.childPeriodDateFilter.clear()
    }

    changePeriod() {
        this.orderRequest.closeDate = this.isCloseDate
        if(this.dateFrom != null || this.dateTo!=null){
            if (this.dateFrom != null) {
                this.orderRequest.dateFrom = moment(this.dateFrom).utc().format("YYYY-MM-DD")
            }else {
                this.orderRequest.dateFrom = moment().year(2000).utc().format("YYYY-MM-DD")
            }
            if (this.dateTo != null) {
                this.orderRequest.dateTo = moment(this.dateTo).utc().format("YYYY-MM-DD")
            } else {
                this.orderRequest.dateTo = moment().utc().format("YYYY-MM-DD")
            }
        }

        this.filterService.setOrderRequest(this.orderRequest)
    }

    changeMonthPeriodDateFrom() {
        this.orderRequest.closeDate = this.isCloseDate
        if(this.dateFrom != null || this.dateTo!=null){
            if (this.dateFrom != null) {
                this.orderRequest.dateFrom = moment(this.dateFrom).utc().format("YYYY-MM-DD")
            }
            if (this.dateTo == null) {
                this.orderRequest.dateTo = moment().utc().format("YYYY-MM-DD")
            }
        }

        this.filterService.setOrderRequest(this.orderRequest)
    }


    changeMonthPeriodDateTo() {
        this.orderRequest.closeDate = this.isCloseDate
        if((this.dateFrom != null || this.dateTo!=null)
        && moment(this.dateTo).utc().format("YYYY-MM-DD")!== this.orderRequest.dateTo ){
            if (this.dateTo != null) {
                this.dateTo= new Date(this.dateTo.setMonth(this.dateTo.getMonth()+1))
                 this.dateTo= new Date(this.dateTo.setDate(0))
                this.orderRequest.dateTo = moment(this.dateTo).utc().format("YYYY-MM-DD")
            }
            if (this.dateFrom == null) {
                this.orderRequest.dateFrom = moment().year(2000).utc().format("YYYY-MM-DD")
            }
        }

        this.filterService.setOrderRequest(this.orderRequest)
    }

}

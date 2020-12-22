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
    private dateToMonth = null;
    private dateFromMonth = null;
    private orderRequest: OrderRequest
    private isCloseDate: boolean = false
    @ViewChild(PeriodDateFilterComponent) childPeriodDateFilter: PeriodDateFilterComponent
    menuChange: number = 1

    constructor(public filterService: FilterService) {
    }

    changeInputField() {
        // if(this.menuChange===1){
        //     this.dateFromMonth = null;
        //     this.dateToMonth = null;
        //     this.childPeriodDateFilter.clear()
        // }else if(this.menuChange===2){
        //     this.dateTo = null;
        //     this.dateFrom = null;
        //     this.childPeriodDateFilter.clear()
        // } if(this.menuChange===3){
        //     this.dateTo = null;
        //     this.dateFrom = null;
        //     this.dateFromMonth = null;
        //     this.dateToMonth = null;
        // }
    }

    ngOnInit(): void {
        this.orderRequest = this.filterService.getOrderRequest()

    }

    clear() {
        this.dateTo = null;
        this.dateFrom = null;
        this.dateFromMonth = null;
        this.dateToMonth = null;
        if (this.childPeriodDateFilter != null) {
            this.childPeriodDateFilter.clear()

        }
    }

    changePeriod() {
        this.orderRequest.closeDate = this.isCloseDate

        if (this.dateFrom != null || this.dateTo != null) {
            if (this.dateFrom != null) {
                this.orderRequest.dateFrom = moment(this.dateFrom).dayOfYear(moment(this.dateFrom).dayOfYear() + 1).utc().format("YYYY-MM-DD")
            } else {
                this.orderRequest.dateFrom = moment().year(2000).utc().format("YYYY-MM-DD")
            }
            if (this.dateTo != null) {
                this.orderRequest.dateTo = moment(this.dateTo).dayOfYear(moment(this.dateTo).dayOfYear() + 1).utc().format("YYYY-MM-DD")
            } else {
                this.orderRequest.dateTo = moment().utc().format("YYYY-MM-DD")
            }
        }

        this.filterService.setOrderRequest(this.orderRequest)
    }

    changeMonthPeriodDateFrom() {
        this.orderRequest.closeDate = this.isCloseDate
        if (this.dateFromMonth != null || this.dateToMonth != null) {
            if (this.dateFromMonth != null) {
                let dat = this.dateFromMonth
                this.orderRequest.dateFrom = moment(dat).dayOfYear(moment(dat).dayOfYear() + 1).utc().format("YYYY-MM-DD")
            }
            if (this.dateToMonth == null) {
                this.orderRequest.dateTo = moment().utc().format("YYYY-MM-DD")
            }
        }

        this.filterService.setOrderRequest(this.orderRequest)
    }


    changeMonthPeriodDateTo() {
        this.orderRequest.closeDate = this.isCloseDate
        if ((this.dateFromMonth != null || this.dateToMonth != null)
            && moment(this.dateToMonth).utc().format("YYYY-MM-DD") !== this.orderRequest.dateTo) {
            if (this.dateToMonth != null) {
                this.dateToMonth = new Date(this.dateToMonth.setMonth(this.dateToMonth.getMonth() + 1))
                this.dateToMonth = new Date(this.dateToMonth.setDate(0))
                this.orderRequest.dateTo = moment(this.dateToMonth).utc().format("YYYY-MM-DD")
            }
            if (this.dateFromMonth == null) {
                this.orderRequest.dateFrom = moment().year(2000).utc().format("YYYY-MM-DD")
            }
        }

        this.filterService.setOrderRequest(this.orderRequest)
    }

}

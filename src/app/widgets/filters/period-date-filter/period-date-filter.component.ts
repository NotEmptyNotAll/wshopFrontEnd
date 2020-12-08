import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterService} from "../filter.service";
import {OrderRequest} from "../order.request";
import * as moment from "moment";
import {ServPeriodFilterService} from "./serv-period-filter.service";

@Component({
    selector: 'app-period-date-filter',
    templateUrl: './period-date-filter.component.html',
    styleUrls: ['./period-date-filter.component.css']
})
export class PeriodDateFilterComponent implements OnInit {
    @Output() onSuggest: EventEmitter<any> = new EventEmitter();
    @Output() onClear: EventEmitter<any> = new EventEmitter();
    @Input() onlyField: boolean = false
    private period = {name: '', code: -1}
    private orderRequest: OrderRequest
    private isCloseDate: boolean = false
    private periods: any[] = [
        {name: 'Усі', code: 0},
        {name: 'Сьогодні', code: 1},
        {name: 'Вчора', code: 2},
        {name: 'Поточний тиждень', code: 3},
        {name: 'Поточний місяць', code: 4},
        {name: 'Поточний квартал', code: 5},
        {name: 'Поточний рік', code: 6},
        {name: 'Минулий тиждень', code: 7},
        {name: 'Минулий місяць', code: 8},
        {name: 'Минулий квартал', code: 9},
        {name: 'Минулий рік', code: 10},
    ]

    constructor(
        public filterPeriodService:ServPeriodFilterService,
        public filterService: FilterService) {
    }

    ngOnInit(): void {
    }

    clear() {
        this.period = {name: 'Усе', code: 0}
        this.changePeriod()
        this.onClear.emit()
    }

    changePeriod() {

        if (this.period === null) {
            this.clear()
        } else {
            this.orderRequest = this.filterService.getOrderRequest()
            let dateTo = null;
            let dateFrom = null;
            switch (this.filterPeriodService.periodFastFilterData.code) {
                case 0: {
                    dateTo = null
                    dateFrom = null
                    break;
                }

                case 1: {
                    dateFrom = moment().utc().format("YYYY-MM-DD")
                    dateTo = moment().utc().format("YYYY-MM-DD")
                    break;
                }
                case 2: {
                    dateFrom = moment().subtract(1, 'days').utc().format("YYYY-MM-DD")
                    dateTo = moment().subtract(1, 'days').utc().format("YYYY-MM-DD")
                    break;
                }
                case 3: {
                    dateFrom = moment().weekday(1).utc().format("YYYY-MM-DD")
                    dateTo = moment().weekday(7).utc().format("YYYY-MM-DD")
                    break;
                }
                case 4: {
                    dateFrom = new Date()
                    dateTo = new Date()
                    dateFrom.setDate(1)
                    dateTo.setMonth(dateTo.getMonth() + 1)
                    dateTo.setDate(0)
                    dateFrom = moment(dateFrom).utc().format("YYYY-MM-DD")
                    dateTo = moment(dateTo).utc().format("YYYY-MM-DD")
                    break;
                }
                case 5: {

                    dateFrom = new Date()
                    dateTo = new Date()
                    dateFrom.setMonth(0)
                    dateFrom.setDate(1)
                    dateTo.setMonth(3)
                    dateTo.setDate(0)
                    dateFrom = moment(dateFrom).quarter(moment().quarter()).utc().format("YYYY-MM-DD")
                    dateTo = moment(dateTo).quarter(moment().quarter()).utc().format("YYYY-MM-DD")
                    break;
                }
                case 6: {
                    dateFrom = new Date()
                    dateTo = new Date()
                    dateFrom.setMonth(0)
                    dateFrom.setDate(1)
                    dateTo.setMonth(11)
                    dateTo.setDate(31)
                    dateFrom = moment(dateFrom).utc().format("YYYY-MM-DD")
                    dateTo = moment(dateTo).utc().format("YYYY-MM-DD")
                    break;
                }
                case 7: {
                    dateFrom = moment().week(moment().week() - 1).weekday(1).utc().format("YYYY-MM-DD")
                    dateTo = moment().week(moment().week() - 1).weekday(7).utc().format("YYYY-MM-DD")
                    break;
                }
                case 8: {
                    dateFrom = new Date()
                    dateTo = new Date()
                    dateFrom.setMonth(dateTo.getMonth() - 1)
                    dateFrom.setDate(1)
                    dateTo.setMonth(dateTo.getMonth())
                    dateTo.setDate(0)
                    dateFrom = moment(dateFrom).utc().format("YYYY-MM-DD")
                    dateTo = moment(dateTo).utc().format("YYYY-MM-DD")
                    break;
                }
                case 9: {
                    dateFrom = new Date()
                    dateTo = new Date()
                    dateFrom.setMonth(0)
                    dateFrom.setDate(1)
                    dateTo.setMonth(3)
                    dateTo.setDate(0)
                    dateFrom = moment(dateFrom).quarter(moment().quarter() - 1).utc().format("YYYY-MM-DD")
                    dateTo = moment(dateTo).quarter(moment().quarter() - 1).utc().format("YYYY-MM-DD")
                    break;
                }
                case 10: {
                    dateFrom = new Date()
                    dateTo = new Date()
                    dateFrom.setMonth(0)
                    dateFrom.setDate(1)
                    dateTo.setMonth(11)
                    dateTo.setDate(31)
                    dateFrom = moment(dateFrom).year(moment().year() - 1).utc().format("YYYY-MM-DD")
                    dateTo = moment(dateTo).year(moment().year() - 1).utc().format("YYYY-MM-DD")
                    break;
                }

            }


            this.orderRequest.closeDate = this.isCloseDate
            this.orderRequest.dateFrom = dateFrom;
            this.orderRequest.dateTo = dateTo;
            this.filterService.setOrderRequest(this.orderRequest)
            this.onSuggest.emit();
        }
    }


}

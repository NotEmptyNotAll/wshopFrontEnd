import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderRequest} from "../order.request";
import {ServPeriodFilterService} from "../period-date-filter/serv-period-filter.service";
import {FilterService} from "../filter.service";
import * as moment from "moment";

@Component({
    selector: 'app-work-period-filter',
    templateUrl: './work-period-filter.component.html',
    styleUrls: ['./work-period-filter.component.css']
})
export class WorkPeriodFilterComponent implements OnInit {

    @Output() onSuggest: EventEmitter<any> = new EventEmitter();
    @Output() onClear: EventEmitter<any> = new EventEmitter();
    @Input() onlyField: boolean = false
    private period = {name: '', code: -1}
    private orderRequest: OrderRequest
    private isCloseDate: boolean = false
    private periods: any[] = [
        {name: 'все', code: 0},
        {name: 'сегодня', code: 1},
        {name: 'вчера', code: 2},
        {name: 'последние 7 дней', code: 11},
        {name: 'текущая неделя', code: 3},
        {name: 'текущий месяц', code: 4},
        {name: 'текущий квартал', code: 5},
        {name: 'текущий год', code: 6},
        {name: 'прошедшая неделя', code: 7},
        {name: 'прошлый месяц', code: 8},
        {name: 'прошлый квартал', code: 9},
        {name: 'прошлый год', code: 10},
    ]

    constructor(
        public filterPeriodService: ServPeriodFilterService,
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
            switch (this.period.code) {
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
                case 11: {
                    dateTo = new Date()
                    dateFrom = moment().dayOfYear(moment().dayOfYear() - 7).utc().format("YYYY-MM-DD")
                    dateTo = moment(dateTo).utc().format("YYYY-MM-DD")
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
            this.orderRequest.workDateFrom = dateFrom;
            this.orderRequest.workDateTo = dateTo;
            this.filterService.setOrderRequest(this.orderRequest)
            this.onSuggest.emit();
        }
    }

}

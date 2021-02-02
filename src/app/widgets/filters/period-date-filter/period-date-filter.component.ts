import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterService} from "../filter.service";
import {OrderRequest} from "../order.request";
import * as moment from "moment";
import {ServPeriodFilterService} from "./serv-period-filter.service";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

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
        {name: 'все', code: 0},
        {name: 'сегодня', code: 1},
        {name: 'последние 7 дней', code: 11},
        {name: 'вчера', code: 2},
        {name: 'текущая неделя', code: 3},
        {name: 'текущий месяц', code: 4},
        {name: 'текущий квартал', code: 5},
        {name: 'текущий год', code: 6},
        {name: 'прошедшая неделя', code: 7},
        {name: 'прошлый месяц', code: 8},
        {name: 'прошлый квартал', code: 9},
        {name: 'прошлый год', code: 10},
    ]

    private fastPeriods: any[] = [
        {name: 'сегодня', code: 1},
        {name: 'последние 7 дней', code: 11},
        {name: 'вчера', code: 2},
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
        private translate: TranslateService,
        public filterService: FilterService) {
        this.translate.get('page.all').subscribe((res: string) => {
            this.periods[0].name = res
        });
        this.translate.get('page.today').subscribe((res: string) => {
            this.periods[1].name = res
            this.fastPeriods[0].name = res
        });
        this.translate.get('page.yesterday').subscribe((res: string) => {
            this.periods[2].name = res
            this.fastPeriods[1].name = res
        });
        this.translate.get('page.lastSevenDays').subscribe((res: string) => {
            this.periods[3].name = res
            this.fastPeriods[2].name = res
        });
        this.translate.get('page.thisWeek').subscribe((res: string) => {
            this.periods[4].name = res
            this.fastPeriods[3].name = res
        });
        this.translate.get('page.currentMonth').subscribe((res: string) => {
            this.periods[5].name = res
            this.fastPeriods[4].name = res
        });
        this.translate.get('page.currentQuarter').subscribe((res: string) => {
            this.periods[6].name = res
            this.fastPeriods[5].name = res
        });
        this.translate.get('page.thisYear').subscribe((res: string) => {
            this.periods[7].name = res
            this.fastPeriods[6].name = res
        });
        this.translate.get('page.lastWeek').subscribe((res: string) => {
            this.periods[8].name = res
            this.fastPeriods[7].name = res
        });
        this.translate.get('page.lastMonth').subscribe((res: string) => {
            this.periods[9].name = res
            this.fastPeriods[8].name = res
        });
        this.translate.get('page.lastQuarter').subscribe((res: string) => {
            this.periods[10].name = res
            this.fastPeriods[9].name = res
        });
        this.translate.get('page.lastYear').subscribe((res: string) => {
            this.periods[11].name = res
            this.fastPeriods[10].name = res
        });
    }

    ngOnInit(): void {
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translate.get('page.all').subscribe((res: string) => {
                this.periods[0].name = res
            });
            this.translate.get('page.today').subscribe((res: string) => {
                this.periods[1].name = res
                this.fastPeriods[0].name = res
            });
            this.translate.get('page.yesterday').subscribe((res: string) => {
                this.periods[2].name = res
                this.fastPeriods[1].name = res
            });
            this.translate.get('page.lastSevenDays').subscribe((res: string) => {
                this.periods[3].name = res
                this.fastPeriods[2].name = res
            });
            this.translate.get('page.thisWeek').subscribe((res: string) => {
                this.periods[4].name = res
                this.fastPeriods[3].name = res
            });
            this.translate.get('page.currentMonth').subscribe((res: string) => {
                this.periods[5].name = res
                this.fastPeriods[4].name = res
            });
            this.translate.get('page.currentQuarter').subscribe((res: string) => {
                this.periods[6].name = res
                this.fastPeriods[5].name = res
            });
            this.translate.get('page.thisYear').subscribe((res: string) => {
                this.periods[7].name = res
                this.fastPeriods[6].name = res
            });
            this.translate.get('page.lastWeek').subscribe((res: string) => {
                this.periods[8].name = res
                this.fastPeriods[7].name = res
            });
            this.translate.get('page.lastMonth').subscribe((res: string) => {
                this.periods[9].name = res
                this.fastPeriods[8].name = res
            });
            this.translate.get('page.lastQuarter').subscribe((res: string) => {
                this.periods[10].name = res
                this.fastPeriods[9].name = res
            });
            this.translate.get('page.lastYear').subscribe((res: string) => {
                this.periods[11].name = res
                this.fastPeriods[10].name = res
            });
        });
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
            let index = 0;
            if (this.onlyField) {
                index = this.filterPeriodService.periodFastFilterData.code
            } else {
                index = this.period.code
            }
            switch (index) {
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
                case 11: {
                    dateTo = new Date()
                    dateFrom = moment().dayOfYear(moment().dayOfYear() - 7).utc().format("YYYY-MM-DD")
                    dateTo = moment(dateTo).utc().format("YYYY-MM-DD")
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

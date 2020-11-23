import {Component, OnInit} from '@angular/core';
import {FilterService} from "../filter.service";
import {OrderRequest} from "../order.request";
import * as moment from "moment";

@Component({
    selector: 'app-period-date-filter',
    templateUrl: './period-date-filter.component.html',
    styleUrls: ['./period-date-filter.component.css']
})
export class PeriodDateFilterComponent implements OnInit {
    private period = {name: 'Усе', code: 0}
    private orderRequest: OrderRequest
    private isCloseDate: boolean = false
    private periods: any[] = [
        {name: 'Усе', code: 0},
        {name: 'Сьогодні', code: 1},
        {name: 'Вчора', code: 2},
        {name: 'Цей тиждень', code: 3},
        {name: 'Этот месяц', code: 4},
        {name: 'Этот квартал', code: 5},
        {name: 'Этот год', code: 6},
        {name: 'Минулий тиждень', code: 7},
        {name: 'Минулий місяць', code: 8},
        {name: 'Минулий квартал', code: 9},
        {name: 'Минулий рік', code: 10},
    ]

    constructor(public filterService: FilterService) {
    }

    ngOnInit(): void {
    }

    changePeriod() {

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
                dateFrom = moment().subtract(1, 'week').utc().format("YYYY-MM-DD")
                dateTo = moment().utc().format("YYYY-MM-DD")
                break;
            }
            case 4: {
                dateFrom = moment().subtract(1, 'month').utc().format("YYYY-MM-DD")
                dateTo = moment().utc().format("YYYY-MM-DD")
                break;
            }
            case 5: {
                dateFrom = moment().quarter(moment().quarter() - 1).utc().format("YYYY-MM-DD")
                dateTo = moment().quarter(moment().quarter()).utc().format("YYYY-MM-DD")
                break;
            }
            case 6: {
                dateFrom = moment().subtract(1, "year").utc().format("YYYY-MM-DD")
                dateTo = moment().utc().format("YYYY-MM-DD")
                break;
            }
            case 7: {
                dateFrom = moment().subtract(2, 'week').utc().format("YYYY-MM-DD")
                dateTo = moment().subtract(1, 'week').utc().format("YYYY-MM-DD")
                break;
            }
            case 8: {
                dateFrom = moment().subtract(2, 'month').utc().format("YYYY-MM-DD")
                dateTo = moment().subtract(1, 'month').utc().format("YYYY-MM-DD")
                break;
            }
            case 9: {
                dateFrom = moment().quarter(moment().quarter() - 2).utc().format("YYYY-MM-DD")
                dateTo = moment().quarter(moment().quarter() - 1).utc().format("YYYY-MM-DD")
                break;
            }
            case 10: {
                dateFrom = moment().subtract(2, "year").utc().format("YYYY-MM-DD")
                dateTo = moment().subtract(1, "year").utc().format("YYYY-MM-DD")
                break;
            }

        }

        this.orderRequest.closeDate = this.isCloseDate
        this.orderRequest.dateFrom = dateFrom;
        this.orderRequest.dateTo = dateTo;
        this.filterService.setOrderRequest(this.orderRequest)
    }


}

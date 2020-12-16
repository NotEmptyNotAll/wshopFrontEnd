import {Injectable} from '@angular/core';
import * as moment from "moment";
import {OrderRequest} from "../order.request";
import {FilterService} from "../filter.service";

@Injectable({
    providedIn: 'root'
})
export class ServPeriodFilterService {
    public periodFastFilterData = {name: 'сегодня', code: 1}
    public periodFilterData = {name: '', code: -1}
    public periodTemp = {name: '', code: -1}
    public disableFastFiled = false
    private orderRequest: OrderRequest

    public onStndFilter() {
        this.disableFastFiled = true
        this.periodTemp.name = this.periodFastFilterData.name
        this.periodTemp.code = this.periodFastFilterData.code
        this.periodFastFilterData.name = ''
        this.periodFastFilterData.code = -1
    }

    public onFastFilter() {
        this.disableFastFiled = false
        this.periodFastFilterData.name = this.periodTemp.name
        this.periodFastFilterData.code = this.periodTemp.code
        this.periodTemp.name = ''
        this.periodTemp.code = -1
        this.changePeriod()
    }

    constructor(public filterService: FilterService) {
    }

    changePeriod() {
        this.orderRequest = this.filterService.getOrderRequest()
        let dateTo = null;
        let dateFrom = null;
        switch (this.periodFastFilterData.code) {
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

        this.orderRequest.closeDate = false
        this.orderRequest.dateFrom = dateFrom;
        this.orderRequest.dateTo = dateTo;
        this.filterService.setOrderRequest(this.orderRequest)
        console.log(this.filterService.getOrderRequest().state)

    }

}

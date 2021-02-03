import {Injectable} from '@angular/core';
import * as moment from "moment";
import {OrderRequest} from "../order.request";
import {FilterService} from "../filter.service";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class ServPeriodFilterService {
    public periodFastFilterData =    {name: 'последние 7 дней', code: 11}
    public periodFilterData = {name: '', code: -1}
    public periodTemp = {name: '', code: -1}
    public disableFastFiled = false
    private orderRequest: OrderRequest

   public defaultFastFilter() {
        this.translate.get('page.lastSevenDays').subscribe((res: string) => {
            this.periodFastFilterData.name = res
            this.periodFastFilterData.code = 11
        });    }

    public onStndFilter() {
        this.disableFastFiled = true
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.dateFrom=null
        this.orderRequest.dateTo=null
        this.filterService.setOrderRequest(this.orderRequest)

        this.periodTemp.name = this.periodFastFilterData.name
        this.periodTemp.code = this.periodFastFilterData.code
        this.periodFastFilterData=null
    }

    public onFastFilter() {
        this.disableFastFiled = false

        this.periodFastFilterData={name: '', code: -1}
        this.periodFastFilterData.name = this.periodTemp.name
        this.periodFastFilterData.code = this.periodTemp.code

        this.periodTemp.name = ''
        this.periodTemp.code = -1
        this.changePeriod()
    }

    constructor(public filterService: FilterService,
                private translate: TranslateService) {
        this.translate.get('page.lastSevenDays').subscribe((res: string) => {
            this.periodFastFilterData.name = res
            this.periodFastFilterData.code = 11
        });
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translate.get('page.lastSevenDays').subscribe((res: string) => {
                this.periodFastFilterData.name = res
                this.periodFastFilterData.code = 11
            });
        })

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
            case 11: {
                dateTo = new Date()
                dateFrom = moment().dayOfYear(moment().dayOfYear() - 7).utc().format("YYYY-MM-DD")
                dateTo = moment(dateTo).utc().format("YYYY-MM-DD")
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

import {Injectable} from '@angular/core';
import {FilterService} from "../filter.service";
import * as moment from "moment";
import {OrderRequest} from "../order.request";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class ServStateFilterService {
    public stateFastFilterData = {name: 'незакрытые', code: 'UNCLOSED'}
    public stateFilterData = {name: 'незакрытые', code: 'UNCLOSED'}
    public stateTemp = {name: '', code: ''}
    public stateStndTemp = {name: 'незакрытые', code: 'UNCLOSED'}
    public disableFastFiled = false
    private orderRequest: OrderRequest

    defaultFastFilter() {
        this.translate.get('page.lastSevenDays').subscribe((res: string) => {
            this.stateFastFilterData.name = res
            this.stateFastFilterData.code = 'UNCLOSED'
            this.stateStndTemp.name = res
            this.stateStndTemp.code = 'UNCLOSED'
            this.stateFilterData.name = res
            this.stateFilterData.code = 'UNCLOSED'
        });
    }

    public onStndFilter() {
        this.disableFastFiled = true

        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.state = this.stateFilterData.code
        this.filterService.setOrderRequest(this.orderRequest)
        this.stateTemp.name = this.stateFastFilterData.name
        this.stateTemp.code = this.stateFastFilterData.code
        this.stateFastFilterData = null
    }

    public onFastFilter() {
        this.disableFastFiled = false
        this.stateFastFilterData = {name: '', code: ''}
        this.stateFastFilterData.name = this.stateTemp.name
        this.stateFastFilterData.code = this.stateTemp.code
        this.changeState()

    }

    constructor(public filterService: FilterService,
                private translate: TranslateService) {
        this.translate.get('page.lastSevenDays').subscribe((res: string) => {
            this.stateFastFilterData.name = res
            this.stateFastFilterData.code = 'UNCLOSED'
            this.stateStndTemp.name = res
            this.stateStndTemp.code = 'UNCLOSED'
            this.stateFilterData.name = res
            this.stateFilterData.code = 'UNCLOSED'
        });
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translate.get('page.lastSevenDays').subscribe((res: string) => {
                this.stateFastFilterData.name = res
                this.stateFastFilterData.code = 'UNCLOSED'
                this.stateStndTemp.name = res
                this.stateStndTemp.code = 'UNCLOSED'
                this.stateFilterData.name = res
                this.stateFilterData.code = 'UNCLOSED'
            });
        })
    }

    changeState() {
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.state = this.stateFastFilterData.code
        this.filterService.setOrderRequest(this.orderRequest)
        console.log(this.filterService.getOrderRequest().state)


    }


}

import {Injectable} from '@angular/core';
import {OrderRequest} from "../order.request";
import {FilterService} from "../filter.service";

@Injectable({
    providedIn: 'root'
})
export class ServSubstringFilterService {
    public substringFastFilterData = ''
    public substringFilterData = ''
    public substringTemp = ''
    public disableFastFiled = false
    private orderRequest: OrderRequest

    public onStndFilter() {
        this.disableFastFiled = true
        this.substringTemp = this.substringFastFilterData
        this.substringFastFilterData = ''
    }

    public onFastFilter() {
        this.disableFastFiled = false
        this.substringFastFilterData = this.substringTemp
        this.substringTemp = ''
        this.onChang()

    }

    onChang() {
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.searchString = this.substringFastFilterData;
        this.filterService.setOrderRequest(this.orderRequest)
    }

    constructor(public filterService: FilterService) {
    }
}

import {Injectable} from '@angular/core';
import {OrderRequest} from "./order.request";
import {User} from "../Service/User";

@Injectable({
    providedIn: 'root'
})
export class FilterService {


   private orderRequest: OrderRequest={
       dateFrom: null,
       dateTo: null,
       searchString: null,
       customerId: null,
       employeeId: null,
       customerName: null,
       lang: null,
       state: null,
       status: null,
       payed: null,
       user: null,
       closeDate:false
   }

    constructor() {
    }


    public getOrderRequest(): OrderRequest {
        console.log(this.orderRequest)
        return this.orderRequest;
    }

    public setOrderRequest(value: OrderRequest) {
        console.log(value)
        this.orderRequest = value;
    }
}

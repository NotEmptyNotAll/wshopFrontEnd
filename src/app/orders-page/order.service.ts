import {Injectable} from '@angular/core';
import {Order} from "./orders";
import {TableOrderResponse} from "../Service/table-order-response";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private orders: Order[]
    private ordersTableResponse: TableOrderResponse
    private userValidate: boolean = false

    constructor() {
    }

    getOrders(): Order[] {
        return this.orders
    }

    setOrders(ordrs: Order[]) {
        this.orders = ordrs
    }


    getOrderResponse(): TableOrderResponse {
        return this.ordersTableResponse
    }

    setOrderResponse(resp: TableOrderResponse) {
        this.ordersTableResponse = resp
    }

    getUserValidate(): boolean {
        return this.userValidate
    }

    setUserValidate(validate: boolean) {
        this.userValidate = validate
    }
}

import {Injectable} from '@angular/core';
import {Order} from "./orders";
import {TableOrderResponse} from "../Service/table-order-response";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private orders: Order[]
    private ordersTableResponse: TableOrderResponse
    private workTableResponse: TableOrderResponse
    private userValidate: boolean = false
    public dataIsExist: boolean = false

    constructor() {
    }

    getOrders(): Order[] {
        return this.orders
    }

    setOrders(ordrs: Order[]) {
        this.orders = ordrs
    }


    getWorkResponse(): TableOrderResponse {
        return this.workTableResponse
    }

    setWorkResponse(resp: TableOrderResponse) {
        this.workTableResponse = resp
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

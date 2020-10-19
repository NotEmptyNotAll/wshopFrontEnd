import {Injectable} from '@angular/core';
import {Order} from "./orders";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private orders: Order[]
    private userValidate:boolean=false

    constructor() {
    }

    getOrders(): Order[] {
        return this.orders
    }

    setOrders(ordrs: Order[]) {
        this.orders = ordrs
    }

  getUserValidate(): boolean {
    return this.userValidate
    }

  setUserValidate(validate:boolean) {
    this.userValidate = validate
  }
}

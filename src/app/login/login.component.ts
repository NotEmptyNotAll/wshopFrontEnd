import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {Order} from "../orders-page/orders";
import {User} from "../Service/User";
import {OrderService} from "../orders-page/order.service";
import {Router} from '@angular/router';
import {TableOrderResponse} from "../Service/table-order-response";
import {FilterService} from "../filters/filter.service";
import {OrderRequest} from "../filters/order.request";
import * as moment from 'moment';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    display: boolean = false
    masterWindowVisible: boolean = false
    selectedUser: User;
    userIsSelected: boolean = false
    orderRequest: OrderRequest;

    users: User[];

    orders: Order[];
    ordersResponse: TableOrderResponse;

    password: string;

    async getUsers() {
        this.users = await this.apiService.get<User[]>('getListUser')
    }

    constructor(public apiService: ApiDataServiceService,
                public orderService: OrderService,
                public filterService: FilterService,
                private router: Router) {
        this.getUsers()
        this.orderRequest = this.filterService.getOrderRequest()
    }

    updateData() {

    }

    cancelFilter() {
        this.filterService.clearFilter()
    }

    cancel() {
        this.selectedUser = null;
        this.password = "";

    }

    moveToMasterSelectWindows(){
        this.router.navigate(['/selectWork'])
    }

    async login() {
        this.selectedUser.password = this.password;
        this.apiService.setUserData(this.selectedUser)
        console.log(this.orderRequest)
        this.orderRequest.lang = this.apiService.getLang();
        this.orderRequest.user = this.selectedUser
        this.filterService.setOrderRequest(this.orderRequest)
        if (this.selectedUser.name !== 'Administrator (superuser) ') {
            this.orderService.setUserValidate(true)
            this.masterWindowVisible=true
        } else {
            this.ordersResponse = await this.apiService.post<TableOrderResponse>(
                'getCroppedOrders', this.filterService.getOrderRequest()
            );
            this.orderService.setOrderResponse(this.ordersResponse)


            if (this.ordersResponse.ordersTableBody.length != 0) {
                this.orderService.setUserValidate(true)
                this.router.navigate(['/'])
                ;
            }
        }
    }

    ngOnInit(): void {
    }

    showDialog() {
        this.display = true;
    }

}

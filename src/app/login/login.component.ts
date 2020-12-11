import {Component, OnInit} from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {Order} from "../orders-page/orders";
import {User} from "../Service/User";
import {OrderService} from "../orders-page/order.service";
import {Router} from '@angular/router';
import {TableOrderResponse} from "../Service/table-order-response";
import {FilterService} from "../widgets/filters/filter.service";
import {OrderRequest} from "../widgets/filters/order.request";
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
    name: string
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
                private messageService: MessageService,
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

    showSuccess() {
        this.messageService.add({severity: 'success', summary: this.name, detail: 'смена началась'});
    }

    moveToMasterSelectWindows() {
        this.showSuccess()
        this.router.navigate(['/selectWork'])
    }

    quit() {
        this.orderService.setUserValidate(false)
        this.router.navigate(['/'])
        this.masterWindowVisible = false
    }

    async login() {
        this.name = this.selectedUser.name
        this.selectedUser.password = this.password;
        this.apiService.setUserData(this.selectedUser)
        console.log(this.orderRequest)
        this.orderRequest.lang = this.apiService.getLang();
        this.orderRequest.user = this.selectedUser
        let dateFrom = moment().utc().format("YYYY-MM-DD")
        let dateTo = moment().utc().format("YYYY-MM-DD")
        this.orderRequest.dateTo=dateTo
        this.orderRequest.dateFrom=dateFrom
        this.filterService.setOrderRequest(this.orderRequest)
        if (this.selectedUser.name !== 'Administrator (superuser) ') {
            // this.orderRequest = this.filterService.getOrderRequest()
            // this.orderRequest.state = 'UNCLOSED'
            // this.filterService.setOrderRequest(this.orderRequest)
            // this.selectedUser.name = 'Administrator (superuser) '
            // this.selectedUser.password = '12345'
            // this.orderService.setUserValidate(true)
            // this.masterWindowVisible = true
            // this.ordersResponse = await this.apiService.post<TableOrderResponse>(
            //     'getListOFWork', this.filterService.getOrderRequest(),
            //     true
            // );
           // this.orderService.setOrderResponse(this.ordersResponse)

        } else {
            this.ordersResponse = await this.apiService.post<TableOrderResponse>(
                'getCroppedOrders', this.filterService.getOrderRequest(),true
            );
            console.log(this.orderRequest)
            this.orderService.setOrderResponse(this.ordersResponse)


            if (this.ordersResponse.ordersTableBody.length != 0) {
                this.orderService.setUserValidate(true)
                this.router.navigate(['/order'])
                ;
            }
        }


        this.ordersResponse = await this.apiService.post<TableOrderResponse>(
            'getCroppedOrders', this.filterService.getOrderRequest(),true
        );
        console.log(this.orderRequest)
        this.orderService.setOrderResponse(this.ordersResponse)


        if (this.ordersResponse.ordersTableBody.length != 0) {
            this.orderService.setUserValidate(true)
            this.router.navigate(['/order'])
            ;
        }
    }

    ngOnInit(): void {
    }

    showDialog() {
        this.display = true;
    }

}

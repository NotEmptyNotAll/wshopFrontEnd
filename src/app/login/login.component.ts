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

    showSuccess(msg: string) {
        this.messageService.add({severity: 'success', summary: this.name, detail: msg});
    }

    moveToMasterSelectWindows() {
        this.showSuccess('смена началась')
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
        this.orderRequest.lang = this.apiService.getLang();
        this.orderRequest.user = this.selectedUser
        this.orderRequest.sizeResponse = 15;
        let dateFrom = moment().utc().format("YYYY-MM-DD")
        let dateTo = moment().utc().format("YYYY-MM-DD")
        this.orderRequest.dateTo = dateTo
        this.orderRequest.rowStartIndex=0
        this.orderRequest.dateFrom = dateFrom
        this.orderRequest.state = 'UNCLOSED'
        this.filterService.setOrderRequest(this.orderRequest)
        // if (this.selectedUser.role !== 2) {
        //     // this.orderRequest = this.filterService.getOrderRequest()
        //     // //this.orderRequest.state = 'UNCLOSED'
        //     // // this.orderRequest.user.id=0
        //     // // this.orderRequest.user.password='12345'
        //     // this.orderRequest.detailId=1
        //     // this.orderRequest.workStatus=0
        //     //
        //     // this.filterService.setOrderRequest(this.orderRequest)
        //     // this.ordersResponse = await this.apiService.post<TableOrderResponse>(
        //     //     'getListOFWork', this.filterService.getOrderRequest(),
        //     //     true
        //     // );
        //     // if (this.ordersResponse.status !== -1) {
        //     //     this.orderService.setUserValidate(true)
        //     //     this.masterWindowVisible = true
        //     //     this.orderService.setOrderResponse(this.ordersResponse)
        //     // } else {
        //     //     this.apiService.normalizeError('Произашла ошибка. Неправильный пароль')
        //     //
        //     // }
        // } else {
        //
        //     this.ordersResponse = await this.apiService.post<TableOrderResponse>(
        //         'getCroppedOrders', this.filterService.getOrderRequest(), true
        //     );
        //
        //     if (this.ordersResponse.status !== -1) {
        //         this.orderService.setOrderResponse(this.ordersResponse)
        //         this.orderService.setUserValidate(true)
        //         this.showSuccess('пользователь авторизтрован')
        //         this.router.navigate(['/order']);
        //     } else {
        //         this.apiService.normalizeError('Произашла ошибка. Неправильный пароль')
        //     }
        // }
        this.ordersResponse = await this.apiService.post<TableOrderResponse>(
            'getCroppedOrders', this.filterService.getOrderRequest(), true
        );

        if (this.ordersResponse.status !== -1) {
            this.orderService.setOrderResponse(this.ordersResponse)
            this.orderService.setUserValidate(true)
            this.showSuccess('пользователь авторизтрован')
            this.router.navigate(['/order']);
        } else {
            this.apiService.normalizeError('Произашла ошибка. Неправильный пароль')
        }
    }

    ngOnInit(): void {
    }

    showDialog() {
        this.display = true;
    }

}

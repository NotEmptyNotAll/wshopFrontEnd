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
        this.messageService.add({severity: 'success', summary: this.selectedUser.name, detail: msg});
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
        this.selectedUser.password = this.password;
        this.apiService.setUserData(this.selectedUser)
        this.orderRequest.lang = this.apiService.getLang();

        this.filterService.onDefaultValue()
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.user = this.selectedUser
        this.filterService.setOrderRequest(this.orderRequest)

        let validate = await this.apiService.post<TableOrderResponse>(
            'login', this.selectedUser,
            true
        );

        if (validate) {
            this.orderService.setUserValidate(true)
            this.showSuccess('пользователь авторизтрован')
            if (this.selectedUser.role !== 2 && validate) {
                this.apiService.adminMode = false
                this.router.navigate(['/selectWork'])
            } else if (validate) {
                this.apiService.adminMode = true
                this.router.navigate(['/order']);
            }
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

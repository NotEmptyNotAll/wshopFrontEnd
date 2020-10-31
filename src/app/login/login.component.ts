import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {Order} from "../orders-page/orders";
import {User} from "../Service/User";
import {OrderService} from "../orders-page/order.service";
import {Router} from '@angular/router';
import {TableOrderResponse} from "../Service/table-order-response";

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


    selectedUser: User;
    userIsSelected:boolean=false

    users: User[];

    orders: Order[];
    ordersResponse: TableOrderResponse;

    password: string;

    async getUsers() {
        this.users = await this.apiService.get<User[]>('getListUser')
    }

    constructor(public apiService: ApiDataServiceService,
                public orderService: OrderService,
                private router: Router) {
        this.getUsers()

    }

    cancel(){
        this.selectedUser=null;
        this.password="";
    }

    async login() {
        this.selectedUser.password = this.password;
        this.apiService.setUserData(this.selectedUser)
        this.ordersResponse = await this.apiService.post<TableOrderResponse>(
            'getCroppedOrders', {user: this.selectedUser}
        );
        this.orderService.setOrderResponse(this.ordersResponse)
        if (this.ordersResponse.ordersTableBody.length != 0) {
            this.orderService.setUserValidate(true)
            this.router.navigate(['/order'])
            ;
        }
    }

    ngOnInit(): void {
    }

}

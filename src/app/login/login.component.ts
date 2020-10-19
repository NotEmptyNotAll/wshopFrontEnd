import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {Order} from "../orders-page/orders";
import {User} from "../Service/User";
import {OrderService} from "../orders-page/order.service";
import { Router } from '@angular/router';

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

  users:User[];

  orders:Order[];

  password:string;

  async getUsers(){
    this.users = await this.apiService.get<User[]>('getListUser')
  }

  constructor( public apiService: ApiDataServiceService,
               public orderService:OrderService,
               private router: Router) {
    this.getUsers()

  }

  async login(){
    this.selectedUser.password=this.password;
    this.orders= await this.apiService.post<Order[]>('getCroppedOrders',this.selectedUser);
    this.orderService.setOrders(this.orders)
    if(this.orders.length!=0){
      this.orderService.setUserValidate(true)
    this.router.navigate(['/order'])
    ;}
  }

  ngOnInit(): void {
  }

}

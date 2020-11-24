import { Component, OnInit } from '@angular/core';
import {OrderRequest} from "../order.request";
import {FilterService} from "../filter.service";
import {ApiDataServiceService} from "../../Service/api-data-service.service";
import {User} from "../../Service/User";

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css']
})
export class EmployeeFilterComponent implements OnInit {

  private employee = {name: '', id: null}
  // @Output() onSuggest: EventEmitter<any> = new EventEmitter();
  private orderRequest: OrderRequest
  private employees: any[]

  constructor(public filterService: FilterService,
              public apiService: ApiDataServiceService,
  ) {
  }

  ngOnInit(): void {
    this.getCustomer()
  }


  async getCustomer() {
    this.employees = await this.apiService.get<User[]>('getListUser')
  }

  changeState() {
    this.orderRequest = this.filterService.getOrderRequest()
    if (this.employee.id !== null) {
      this.orderRequest.employeeId = this.employee.id
    } else {
      this.orderRequest.employeeId = null
    }

    this.filterService.setOrderRequest(this.orderRequest)

    //this.onSuggest.emit();

  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderRequest} from "../order.request";
import {FilterService} from "../filter.service";
import {ApiDataServiceService} from "../../../Service/api-data-service.service";
import {User} from "../../../Service/User";
import {AutoComplete} from "primeng/autocomplete";

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css']
})
export class EmployeeFilterComponent implements OnInit {
  @ViewChild(AutoComplete) chidFilter:AutoComplete

  private employee = {name: '', id: null}
  // @Output() onSuggest: EventEmitter<any> = new EventEmitter();
  private orderRequest: OrderRequest
  private employees: any[]
  filtered: any[];
  selected: User;
  constructor(public filterService: FilterService,
              public apiService: ApiDataServiceService,
  ) {
  }

  ngOnInit(): void {
    this.getCustomer()
  }

  clear(){
    this.filtered=[]
    this.chidFilter.selectItem(null)
  }
  async getCustomer() {
    this.employees = await this.apiService.get<User[]>('getListUser')
  }
  filter(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filteredTemp: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.employees.length; i++) {
      let stat = this.employees[i];
      if (stat.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filteredTemp.push(stat);
      }
    }
    this.filtered = filteredTemp;

  }
  changeState() {
    this.orderRequest = this.filterService.getOrderRequest()
    if (this.selected!==null && this.selected.id!==undefined && this.selected.id !== null) {
      this.orderRequest.employeeId = this.selected.id
    } else {
      this.orderRequest.employeeId = null
    }

    this.filterService.setOrderRequest(this.orderRequest)

    //this.onSuggest.emit();

  }
}

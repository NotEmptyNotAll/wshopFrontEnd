import {Component, OnInit} from '@angular/core';
import {OrderRequest} from "../order.request";
import {FilterService} from "../filter.service";
import {User} from "../../Service/User";
import {ApiDataServiceService} from "../../Service/api-data-service.service";

@Component({
    selector: 'app-customer-filter',
    templateUrl: './customer-filter.component.html',
    styleUrls: ['./customer-filter.component.css']
})
export class CustomerFilterComponent implements OnInit {
    private customer = {name: '', id: null}
    // @Output() onSuggest: EventEmitter<any> = new EventEmitter();
    private orderRequest: OrderRequest
    private customers: any[] = []

    constructor(public filterService: FilterService,
                public apiService: ApiDataServiceService,
    ) {
    }

    ngOnInit(): void {
        this.getCustomer();
    }


    async getCustomer() {
        this.customers = await this.apiService.get<User[]>('getListCustomer')

    }

    changeState() {
        this.orderRequest = this.filterService.getOrderRequest()
        if (this.customer.id !== null) {
            this.orderRequest.customerId = this.customer.id
        } else {
            this.customer.id = null
        }
        this.filterService.setOrderRequest(this.orderRequest)

        //this.onSuggest.emit();

    }
}

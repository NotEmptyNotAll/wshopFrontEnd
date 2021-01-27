import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderRequest} from "../order.request";
import {FilterService} from "../filter.service";
import {User} from "../../../Service/User";
import {ApiDataServiceService} from "../../../Service/api-data-service.service";
import {AutoComplete} from "primeng/autocomplete";

@Component({
    selector: 'app-customer-filter',
    templateUrl: './customer-filter.component.html',
    styleUrls: ['./customer-filter.component.css']
})
export class CustomerFilterComponent implements OnInit {
    private customer = {name: '', id: null}
    @ViewChild(AutoComplete) chidFilter: AutoComplete

    // @Output() onSuggest: EventEmitter<any> = new EventEmitter();
    private orderRequest: OrderRequest
    private customers: any[] = []
    filtered: any[];
    selected: User;

    constructor(public filterService: FilterService,
                public apiService: ApiDataServiceService,
    ) {
    }

    ngOnInit(): void {
        this.getCustomer('');
    }

    filter(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        // let query = event.query;
        // for (let i = 0; i < this.customers.length; i++) {
        //     let stat = this.customers[i];
        //     if (stat.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        //         filteredTemp.push(stat);
        //     }
        // }
        this.getCustomer(event.query)
    }

    async getCustomer(nameCustomer) {
        this.apiService.applySubLoading=false
        this.customers = await this.apiService.post<User[]>('getListCustomer'
            , {name: nameCustomer, sizeResponse: 50},false,false)
    }

    clear() {
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.customerId = null
        this.filterService.setOrderRequest(this.orderRequest)
        this.filtered = []
        this.chidFilter.selectItem(null)
    }


    changeState() {

        this.orderRequest = this.filterService.getOrderRequest()
        if (this.selected!==null && this.selected.id !== undefined && this.selected.id !== null ) {
            this.orderRequest.customerId = this.selected.id
        } else {
            this.orderRequest.customerId = null
        }
        this.filterService.setOrderRequest(this.orderRequest)

        //this.onSuggest.emit();

    }
}

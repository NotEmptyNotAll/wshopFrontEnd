import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AutoComplete} from "primeng/autocomplete";
import {OrderRequest} from "../order.request";
import {User} from "../../../Service/User";
import {FilterService} from "../filter.service";
import {ApiDataServiceService} from "../../../Service/api-data-service.service";
import {SimpleData} from "../SimpleData";

@Component({
    selector: 'app-detail-filter',
    templateUrl: './detail-filter.component.html',
    styleUrls: ['./detail-filter.component.css']
})
export class DetailFilterComponent implements OnInit {
    @Output() onSuggest: EventEmitter<any> = new EventEmitter();

    private detail = {}
    @ViewChild(AutoComplete) chidFilter: AutoComplete

    // @Output() onSuggest: EventEmitter<any> = new EventEmitter();
    private orderRequest: OrderRequest
    private details: any[] = []
    filtered: any[];
    selected: SimpleData;
    fixDataString:String='работа с фикс. цен.'

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

        console.log(this.selected)

        this.getCustomer(event.query)
    }

    async getCustomer(name) {
        this.apiService.applySubLoading = false
        let data = await this.apiService.post<SimpleData[]>('getListDetails'
            , {name: name, sizeResponse: 50}, false,false)
        if (this.fixDataString.indexOf(name.toLowerCase())!==-1) {
            data.unshift({id: null, name: 'работа с фикс. цен.'})
        }
        this.details = data
    }


    clear() {
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.detailId = null
        this.filterService.setOrderRequest(this.orderRequest)
        this.onSuggest.emit();
        this.getCustomer('')

    }


    changeState() {
        if(this.selected.id!==null){
            this.filterService.fixDataSelect=false
        }else {
            this.filterService.fixDataSelect=true
        }
        let orderRequest = this.filterService.getOrderRequest()
        orderRequest.detailId = this.selected.id
        this.filterService.setOrderRequest(orderRequest)
        this.onSuggest.emit()
    }

    change() {
        if(this.selected.id!==undefined){
            this.filterService.workFilterEnable=false
        }else {
            this.filterService.workFilterEnable=true

        }
    }
}

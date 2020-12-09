import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderRequest} from "../order.request";
import {FilterService} from "../filter.service";

@Component({
    selector: 'app-payed-filter',
    templateUrl: './payed-filter.component.html',
    styleUrls: ['./payed-filter.component.css']
})
export class PayedFilterComponent implements OnInit {

    private payed = {name: '', code: ''}
    // @Output() onSuggest: EventEmitter<any> = new EventEmitter();
    private orderRequest: OrderRequest
    private states: any[] = [
        {name: 'Всепше', code: null},
        {name: 'оплачены', code: false},
        {name: 'неоплачены', code: true}
    ]

    constructor(public filterService: FilterService) {
    }

    ngOnInit(): void {
    }
    clear(){
        this.payed= {name: '', code: ''}
    }
    changeState() {
        this.orderRequest = this.filterService.getOrderRequest()
        if (this.payed.code !== null) {
            this.orderRequest.payed = Boolean(this.payed.code)
        } else {
            this.orderRequest.payed = null
        }
        this.filterService.setOrderRequest(this.orderRequest)

        //this.onSuggest.emit();

    }
}

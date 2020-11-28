import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterService} from "../filter.service";
import {OrderRequest} from "../order.request";

@Component({
    selector: 'app-state-filter',
    templateUrl: './state-filter.component.html',
    styleUrls: ['./state-filter.component.css']
})
export class StateFilterComponent implements OnInit {
    private state = {name: '', code: ''}
    @Input() onlyField:boolean=false
    @Input() disabled:boolean=false
    @Output() onSuggest: EventEmitter<any> = new EventEmitter();
    private orderRequest: OrderRequest


    private states: any[] = [
        {name: 'Усе', code: null},
        {name: 'завершений', code: 'FINISHED'},
        {name: 'незакриті', code: 'UNCLOSED'},
        {name: 'закриті', code: 'CLOSED'}
    ]

    constructor(public filterService: FilterService) {
    }

    ngOnInit(): void {
    }

    clear(){
        this.state=  {name: 'Усе', code: null}
    }
    changeState() {
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.state = this.state.code
        this.filterService.setOrderRequest(this.orderRequest)
        this.onSuggest.emit();

    }

}

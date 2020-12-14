import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterService} from "../filter.service";
import {OrderRequest} from "../order.request";
import {ServStateFilterService} from "./serv-state-filter.service";

@Component({
    selector: 'app-state-filter',
    templateUrl: './state-filter.component.html',
    styleUrls: ['./state-filter.component.css']
})
export class StateFilterComponent implements OnInit {
    private state = {name: '', code: ''}
    @Input() onlyField: boolean = false
    @Input() disabled: boolean = false
    @Output() onSuggest: EventEmitter<any> = new EventEmitter();
    @Output() onClear: EventEmitter<any> = new EventEmitter();
    private orderRequest: OrderRequest


    private states: any[] = [
        {name: 'все', code: null},
        {name: 'выполненные', code: 'FINISHED'},
        {name: 'незакрытые', code: 'UNCLOSED'},
        {name: 'закрытые', code: 'CLOSED'}
    ]

    constructor(
        public stateService:ServStateFilterService,
        public filterService: FilterService) {
    }

    ngOnInit(): void {
    }

    clear() {
        this.state = {name: 'все', code: null}
        this.changeState()
        this.onClear.emit()
    }



    changeState() {

        if (this.state === null) {
            this.clear()
        } else {
            if(this.onlyField){
                this.orderRequest = this.filterService.getOrderRequest()
                this.orderRequest.state = this.stateService.stateFastFilterData.code
                this.filterService.setOrderRequest(this.orderRequest)
                this.onSuggest.emit();
            }else {
                this.orderRequest = this.filterService.getOrderRequest()
                this.orderRequest.state = this.state.code
                this.filterService.setOrderRequest(this.orderRequest)
                this.onSuggest.emit();
            }

        }
    }

}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderRequest} from "../order.request";
import {FilterService} from "../filter.service";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-payed-filter',
    templateUrl: './payed-filter.component.html',
    styleUrls: ['./payed-filter.component.css']
})
export class PayedFilterComponent implements OnInit {

    public payed = {name: '', code: ''}
    // @Output() onSuggest: EventEmitter<any> = new EventEmitter();
    private orderRequest: OrderRequest
    public states: any[] = [
        {name: 'все', code: null},
        {name: 'оплаченые', code: true},
        {name: 'неоплаченые', code: false}
    ]

    constructor(public filterService: FilterService,
                private translate: TranslateService) {
        this.translate.get('page.all').subscribe((res: string) => {
            this.states[0].name = res
        });
        this.translate.get('page.paid').subscribe((res: string) => {
            this.states[1].name = res
        });
        this.translate.get('page.unpaid').subscribe((res: string) => {
            this.states[2].name = res
        });
    }

    ngOnInit(): void {
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translate.get('page.all').subscribe((res: string) => {
                this.states[0].name = res
            });
            this.translate.get('page.paid').subscribe((res: string) => {
                this.states[1].name = res
            });
            this.translate.get('page.unpaid').subscribe((res: string) => {
                this.states[2].name = res
            });
        })

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

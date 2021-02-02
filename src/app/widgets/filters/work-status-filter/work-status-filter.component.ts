import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderRequest} from "../order.request";
import {ServStateFilterService} from "../state-filter/serv-state-filter.service";
import {FilterService} from "../filter.service";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-work-status-filter',
    templateUrl: './work-status-filter.component.html',
    styleUrls: ['./work-status-filter.component.css']
})
export class WorkStatusFilterComponent implements OnInit {
    @Input() minSizeResolution: boolean = false

   public state = {name: 'не выполнена', code: 0}
    @Input() onlyField: boolean = false
    @Input() disabled: boolean = false
    @Output() onSuggest: EventEmitter<any> = new EventEmitter();
    @Output() onClear: EventEmitter<any> = new EventEmitter();
    private orderRequest: OrderRequest


    public states: any[] = [
        {name: 'все', code: null},
        {name: 'не выполнена', code: 0},
        {name: 'выполнена', code: 1},
        {name: 'выполняется', code: 2},
        {name: 'пауза', code: 3}
    ]

    constructor(
        public stateService: ServStateFilterService,
        private translate: TranslateService,
        public filterService: FilterService) {
        this.translate.get('page.all').subscribe((res: string) => {
            this.states[0].name = res
        });
        this.translate.get('page.completed').subscribe((res: string) => {
            this.states[1].name = res
        });

        this.translate.get('page.unclosed').subscribe((res: string) => {
            this.states[2].name = res
        });

        this.translate.get('page.closed').subscribe((res: string) => {
            this.states[3].name = res
        });
    }

    ngOnInit(): void {
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translate.get('page.all').subscribe((res: string) => {
                this.states[0].name = res
            });
            this.translate.get('page.completed').subscribe((res: string) => {
                this.states[1].name = res
            });

            this.translate.get('page.unclosed').subscribe((res: string) => {
                this.states[2].name = res
            });

            this.translate.get('page.closed').subscribe((res: string) => {
                this.states[3].name = res
            });
        })
    }

    clear() {
        this.translate.get('page.all').subscribe((res: string) => {
            this.state = {name:res, code: null}
        });
        this.state = {name: 'все', code: null}
        this.changeState()
        this.onClear.emit()
    }


    changeState() {

        if (this.state === null) {
            this.clear()
        } else {
            this.orderRequest = this.filterService.getOrderRequest()
            this.orderRequest.workStatus = this.state.code
            this.filterService.setOrderRequest(this.orderRequest)
            this.onSuggest.emit();
        }
    }


}

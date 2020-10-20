import {Component, OnInit, Renderer2} from '@angular/core';
import {REGION} from "../region-page/mock-region";
import {Order} from "./orders";
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {TableDataService} from "../table-page/tableData.service";
import {OrderService} from "./order.service";
import {Router} from '@angular/router';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    data: Order[]
    mainColumn: any[]
    listener1;
    listener2;
    listener3;
    sec:number
    secIncr: number = 1
   temp:any;

    constructor(public apiService: ApiDataServiceService,
                public tableService: TableDataService,
                public orderService: OrderService,
                public renderer2: Renderer2,
                private router: Router) {
        this.start()

        this.listener1 = this.renderer2.listen('window', 'scroll', (e) => {
            this.sec=0
        });

        this.listener2 = this.renderer2.listen('window', 'click', (e) => {
            this.sec=0
        });


        this.listener3 = this.renderer2.listen('window', 'mousemove', (e) => {
            this.sec=0
        });
        if (orderService.getUserValidate()) {
            this.getOrd()
        } else {
            this.router.navigate(['/'])
        }
    }

    start() {


        this.sec=0
        setInterval(()=>{
            this.sec++
            if(this.sec==300){
                this.router.navigate(['/'])
            }
            console.log(this.sec)
        }, 1000);
    }

    tick(sec:number) {
        console.log(sec)

        sec++;
        if(sec==10){
            this.router.navigate(['/'])
        }
        console.log(sec)
    }

    async getOrd() {
        // this.data = await this.apiService.get<Order[]>('getCroppedOrders')
        this.data = this.orderService.getOrders()
        this.mainColumn = [
            {field: 'id', header: 'Order id ', width: '30%'},
            {field: 'orderName', header: 'Order no', width: '30%'},
            {field: 'customerId', header: 'Customer id ', width: '30%'},
            {field: 'date', header: 'Date', width: '30%'},
            {field: 'jobsSum', header: 'Jobs sum', width: '30%'},
            {field: 'componentsSum', header: 'Components sum', width: '30%'}
        ];
        this.tableService.setMainData(this.data)

    }

    ngOnInit() {

    }

}

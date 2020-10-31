import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng";
import {OrderService} from "../orders-page/order.service";
import {Router} from "@angular/router";
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {User} from "../Service/User";
import {SelectItem} from 'primeng/api';


@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

    constructor(public apiService: ApiDataServiceService,
                public orderService: OrderService,
                private router: Router) {
    }

    display: boolean = false
    items: MenuItem[];
    private user: User;
    cities2: any[];
    cities1: SelectItem[];

    ngOnInit() {
        this.cities2 = [
            {name: 'List of orders', code: 'NY'},
            {name: 'name1', code: 'RM'},
            {name: 'name2', code: 'LDN'},
            {name: 'name3', code: 'IST'},
        ];
        this.items = [
            {

                icon: 'pi pi-fw pi-bars',
                style: {fontSize: '1.3em'},
                command: (event: Event) => {
                    this.display = !this.display
                }
            },
            {
                icon: 'pi pi-fw pi-globe',
                label: 'language',
                style: {fontSize: '1.3em'},
                items: [
                    {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'русский',
                        style: {fontSize: '1.3em'},
                    }, {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'українська',
                        style: {fontSize: '1.3em'}
                    }, {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'poland',
                        style: {fontSize: '1.3em'}
                    }, {
                    icon: 'pi pi-fw pi-chevron-right',
                    label: 'english',
                    style: {fontSize: '1.3em'}
                  }
                ]
            }
        ];
    }

    quit() {
        this.user = null
        this.apiService.setUserData(this.user)
        this.orderService.setUserValidate(false)
        this.router.navigate(['/'])
    }

}

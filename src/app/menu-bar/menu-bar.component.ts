import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng";
import {OrderService} from "../orders-page/order.service";
import {Router} from "@angular/router";
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {User} from "../Service/User";
import {SelectItem} from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";


@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

    constructor(public apiService: ApiDataServiceService,
                public orderService: OrderService,
                private router: Router,
                private translate: TranslateService) {

   }

    display: boolean = false
    items: MenuItem[];
    private user: User;
    langLabel:string="";
    cities2: any[];
    cities1: SelectItem[];

    ngOnInit() {
        this.setDefaultTranslation();
        this.cities2 = [
            {name:  'List of orders', code: 'NY'}
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
                label:'Lang',
                style: {fontSize: '1.3em'},
                items: [
                    {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'русский',
                        style: {fontSize: '1.3em'},
                        command: (event: Event) => {
                            this.switchLanguage('ru')
                        }
                    }, {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'українська',
                        style: {fontSize: '1.3em'},
                        command: (event: Event) => {
                            this.switchLanguage('ua')
                        }
                    }, {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'poland',
                        style: {fontSize: '1.3em'},
                        command: (event: Event) => {
                            this.switchLanguage('pl')
                        }
                    }, {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'english',
                        style: {fontSize: '1.3em'},
                        command: (event: Event) => {
                            this.switchLanguage('en')
                        }
                    }
                ]
            }
        ];
    }

    private setDefaultTranslation(): void {
        if (['en', 'pl', 'ua', 'ru'].indexOf(this.translate.getBrowserLang()) > -1) {
            this.translate.setDefaultLang(this.translate.getBrowserLang());
        } else {
            this.translate.setDefaultLang('ru');
        }
    }

    public switchLanguage(lang: string): void {
        this.translate.use(lang);
        //this.translate.setDefaultLang(lang);
    }

    quit() {
        this.user = null
        this.apiService.setUserData(this.user)
        this.orderService.setUserValidate(false)
        this.router.navigate(['/'])
    }

}

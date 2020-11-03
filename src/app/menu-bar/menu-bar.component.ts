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

     open() {
         document.getElementById("main").style.left = "13%";
         document.getElementById("main").style.position = "absolute";
         document.getElementById("main").style.right = "0px";
         document.getElementById("main").style.transform = 'scale(0.88,1)';
        document.getElementById("mySidebar").style.width = "13%";
        document.getElementById("mySidebarList").style.width = "13%";
       document.getElementById("mySidebar").style.display = "block";
       document.getElementById("mySidebarList").style.display = "block";
       // document.getElementById("openNav").style.display = 'none';
    }
     close() {
         document.getElementById("main").style.transform = 'scale(1)';
         document.getElementById("main").style.position = "relative";
         document.getElementById("main").style.left = "0%";
         document.getElementById("mySidebarList").style.transition = "0.6s";
         document.getElementById("mySidebar").style.width = "0%";
         document.getElementById("mySidebarList").style.width = "0%";
         document.getElementById("mySidebar").style.display = "none";
         document.getElementById("openNav").style.display = "inline-block";
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
                style: {fontSize: '1.2em'},
                command: (event: Event) => {
                    this.display=!this.display;
                    if(this.display){
                        this.open()
                    }else {
                        this.close()
                    }
                    //this.display = !this.display
                }
            },
            {
                icon: 'pi pi-fw pi-globe',
                label:'Lang',
                style: {fontSize: '1.2em'},
                items: [
                    {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'русский',
                        style: {fontSize: '1.2em'},
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

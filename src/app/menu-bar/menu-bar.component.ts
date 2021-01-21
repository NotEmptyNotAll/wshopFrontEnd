import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {OrderService} from "../orders-page/order.service";
import {Router} from "@angular/router";
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {User} from "../Service/User";
import {SelectItem} from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";
import {TableOrderResponse} from "../Service/table-order-response";
import {OrdersComponent} from "../orders-page/orders.component";
import {FilterService} from "../widgets/filters/filter.service";
import {OrderRequest} from "../widgets/filters/order.request";
import {TableDataService} from "../table-page/tableData.service";
import {ListOption} from "../widgets/listbox/ListOption";
import {AppNavigateService} from "../Service/app-navigate.service";
import alasql from "alasql";


@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
    ordersResponse: TableOrderResponse
    private langTitle: string
    orderRequest: OrderRequest
    indexSelect: number = -1
    screenHeight: number = 1920
    screenWidth: number = 1080
    itemsMinSizeAdmin=[
        {
            style: {fontSize: '1.2em'},
            label: 'заказы',
            command: () => {
                this.toOrders()
            }
        },
        {
            style: {fontSize: '1.2em'},
            label: 'работы', command: () => {
                this.toSelectWork()
            },
        },
        {
            style: {fontSize: '1.2em'},
            label: 'работы на выполнении', command: () => {
                this.toListOfWork()
            }
        }
    ];
    itemsMinSizeUser=[
        {
            style: {fontSize: '1.2em'},
            label: 'работы', command: () => {
                this.toSelectWork()
            },
        },
        {
            style: {fontSize: '1.2em'},
            label: 'работы на выполнении', command: () => {
                this.appNavigate.toListOfWork()
            }
        }
    ];

    constructor(public apiService: ApiDataServiceService,
                public orderService: OrderService,
                private router: Router,
                public appNavigate: AppNavigateService,
                public tableDataService: TableDataService,
                public filterService: FilterService,
                //   private ordersComponent:OrdersComponent,
                private translate: TranslateService) {

    }

    setSize() {

    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
    }

    open() {
        document.getElementById("main").style.left = "10%";
        document.getElementById("main").style.position = "absolute";
        document.getElementById("main").style.right = "0px";
        document.getElementById("main").style.transform = 'scale(0.97,1)';
        document.getElementById("mySidebar").style.width = "10%";
        document.getElementById("mySidebarList").style.width = "10%";
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("mySidebarList").style.display = "block";
        // document.getElementById("openNav").style.display = 'none';
    }

    close() {
        document.getElementById("main").style.transform = 'scale(1)';
        document.getElementById("main").style.position = "relative";
        document.getElementById("main").style.left = "0%";
        document.getElementById("mySidebar").style.width = "0%";
        document.getElementById("mySidebarList").style.width = "0%";
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("openNav").style.display = "inline-block";
    }

    display: boolean = false
    items: MenuItem[];
    itemsNoLogin: MenuItem[];
    private user: User;
    langLabel: string = "";
    cities2: any[];
    cities1: ListOption = {
        id: 0,
        name: '',
        command: null,
        selected: false
    };

    public optionsAdmin = [
        {
            id: 1,
            name: 'заказы',
            command: () => {
                this.toOrders()
            }, selected: false
        },
        {
            id: 2,
            name: 'работы', command: () => {
                this.toSelectWork()
            }, selected: true
        },
        {
            id: 3,
            name: 'работы на выполнении', command: () => {
                this.toListOfWork()
            }, selected: false
        }
    ];
    public optionsUser = [

        {
            id: 2,
            name: 'работы', command: () => {
                this.toSelectWork()
            }, selected: false
        },
        {
            id: 3,
            name: 'работы на выполнении', command: () => {
                this.toListOfWork()
            }, selected: false
        }
    ];

    public updateOptions(index) {
        if (this.indexSelect === -1) {
            this.indexSelect = index
        }

        this.optionsAdmin.find(elem =>
            elem.id === this.indexSelect).selected = false

        this.optionsUser.find(elem =>
            elem.id === this.indexSelect
        ).selected = false
        this.optionsAdmin.find(elem =>
            elem.id === index
        ).selected = true
        this.optionsUser.find(elem =>
            elem.id === index
        ).selected = true
        this.indexSelect = index
    }

    public async toListOfWork() {
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.workStatus = 2
        this.orderRequest.detailId = null
        this.updateOptions(3)
        this.filterService.setOrderRequest(this.orderRequest)
        this.ordersResponse = await this.apiService.post<TableOrderResponse>(
            'getListOFWork', this.filterService.getOrderRequest(),
            true, true
        );
        if (this.ordersResponse.status !== -1) {
            this.orderService.setOrderResponse(this.ordersResponse)
            this.router.navigate(['/workPage'])
        } else {
            this.apiService.normalizeError('')
        }
    }

    public async toSelectWork() {
        this.updateOptions(2)
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.workStatus = 0
        this.orderRequest.autoDetectionExecutor = true
        this.orderRequest.detailId = null

        this.filterService.setOrderRequest(this.orderRequest)
        this.ordersResponse = await this.apiService.post<TableOrderResponse>(
            'getListOFWork', this.filterService.getOrderRequest(),
            true, true
        );
        if (this.ordersResponse.status !== -1) {
            this.orderService.setOrderResponse(this.ordersResponse)
            this.router.navigate(['/selectWork'])
        } else {
            this.apiService.normalizeError('')
        }
    }


    toOrders() {
        this.updateOptions(1)
        this.router.navigate(['/order'])

    }

    ngOnInit() {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        this.setDefaultTranslation();
        this.cities2 = [
            {name: 'List of orders', code: 'NY'}
        ];
        this.itemsNoLogin = [
            {
                icon: 'pi pi-fw pi-globe',
                label: 'ru',
                style: {fontSize: '1.2em'},
                items: [
                    {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'русский',
                        style: {fontSize: '1.2em'},
                        styleClass: 'myClass',
                        command: (event: Event) => {
                            this.switchLanguage('ru')
                            this.apiService.setLang('ru')
                            this.changeLangPost()
                        }
                    }, {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'українська',
                        style: {fontSize: '1.3em'},
                        command: (event: Event) => {
                            this.switchLanguage('ua')
                            this.apiService.setLang('ua')
                            this.changeLangPost()

                        }
                    }, {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'poland',
                        style: {fontSize: '1.3em'},
                        command: (event: Event) => {
                            this.switchLanguage('pl')
                            this.apiService.setLang('pl')
                            this.changeLangPost()
                        }
                    }, {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'english',
                        style: {fontSize: '1.3em'},
                        command: (event: Event) => {
                            this.switchLanguage('en')
                            this.apiService.setLang('en')
                            this.changeLangPost()
                        }
                    }
                ]
            }, {label: "Beta 1.03"}

        ];

        this.items = [
            {
                icon: 'pi pi-fw pi-bars',
                style: {fontSize: '1.2em'},
                command: (event: Event) => {
                    this.display = !this.display;
                    if (this.display) {
                        this.open()
                    } else {
                        this.close()
                    }
                    //this.display = !this.display
                }
            },
            {
                icon: 'pi pi-fw pi-globe',
                label: 'ru',
                style: {fontSize: '1.2em'},
                items: [
                    {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'русский',
                        style: {fontSize: '1.2em'},
                        command: (event: Event) => {
                            this.switchLanguage('ru')
                            this.apiService.setLang('ru')
                            this.changeLangPost()
                        }
                    }, {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'українська',
                        style: {fontSize: '1.3em'},
                        command: (event: Event) => {
                            this.switchLanguage('ua')
                            this.apiService.setLang('ua')
                            this.changeLangPost()

                        }
                    }, {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'poland',
                        style: {fontSize: '1.3em'},
                        command: (event: Event) => {
                            this.switchLanguage('pl')
                            this.apiService.setLang('pl')
                            this.changeLangPost()
                        }
                    }, {
                        icon: 'pi pi-fw pi-chevron-right',
                        label: 'english',
                        style: {fontSize: '1.3em'},
                        command: (event: Event) => {
                            this.switchLanguage('en')
                            this.apiService.setLang('en')
                            this.changeLangPost()
                        }
                    }
                ]
            },
            {label: "Beta 1.03"}
        ];
    }

    private setDefaultTranslation(): void {
        /*if (['en', 'pl', 'ua', 'ru'].indexOf(this.translate.getBrowserLang()) > -1) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use('ua');
        }*/
        this.translate.use('ru');
    }

    public switchLanguage(lang: string): void {
        this.translate.use(lang);
        this.items[1].label = lang
        this.itemsNoLogin[0].label = lang

        //this.translate.setDefaultLang(lang);
    }

    async changeLangPost() {
        if (this.apiService.getUserData() !== undefined) {
            this.ordersResponse = await this.apiService.post<TableOrderResponse>(
                'getCroppedOrders', {
                    user: this.apiService.getUserData(),
                    lang: this.apiService.getLang()
                }, true, true
            )

            this.orderService.setOrderResponse(this.ordersResponse)
            //this.router.navigate(['/'])
            //this.router.navigate(['/order'])
            //this.ordersComponent.getOrd()
        }
    }

    quit() {
        let ordersTableResponse = this.orderService.getOrderResponse()
        this.close()
        ordersTableResponse.ordersTableBody = []
        this.orderService.setOrderResponse(ordersTableResponse)
        this.tableDataService.setMainData([])
        this.user = null
        this.apiService.setUserData(this.user)
        this.orderService.setUserValidate(false)
        this.router.navigate(['/'])
    }

    onItemMenu(event) {
        event.value.command()
    }
}

import {ErrorHandler, Injectable} from '@angular/core';
import axios from "axios";
import {AxiosInstance} from "axios";
import {Order} from "../orders-page/orders";
import {User} from "./User";
import {MessageService} from "primeng/api";

// @ts-ignore
@Injectable({
    providedIn: 'root'

})
export class ApiDataServiceService {

    mainURL: string = 'https://wshop.24x7tools.com:5052/'
    testUrl: string = 'https://wshop.24x7tools.com:5052/'
    private axiosClient: AxiosInstance;
    public sizeNextRequest:number=0
    public sizeDataResponse:number=100
    private errorHandler: ErrorHandler;
    private ordersResp: Order[];
    private users: User[];
    private userData: User;
    private lang: string = 'ru'
    public startIndex: number = 0
    public sizeResponse: number = 0
    private errorNumber: number = 0
    public barLoading: boolean = false
    public isLoading: boolean = false
    public adminMode:boolean=false
    public isLoadingData: boolean = false
    public applySubLoading: boolean = true
    public applySubLoadingBar: boolean = true
    private errorMsg: string = 'Произашла ошибка. Попробуйте повторить дествие или перезагрузиться'

    public getLang() {
        return this.lang
    }

    public setLang(lang: string) {
        this.lang = lang
    }


    public getUserData() {
        return this.userData
    }

    public setUserData(user: User) {
        this.userData = user
    }

    constructor(
        private messageService: MessageService) {
        //    axios.defaults.timeout = 5000
        this.axiosClient = axios.create({
            timeout: 120000,
            headers: {
                "X-Initialized-At": Date.now().toString()
            }
        });
    }

    public async getUser<T>(url: string): Promise<T> {

        try {

            var axiosResponse = await this.axiosClient.request<T>({
                method: "get",
                url: this.mainURL + url,
            });

            return (axiosResponse.data);

        } catch (error) {

            return (Promise.reject(this.normalizeError(error)));

        }

    }

    public async testPost<T>(url: string, data: any): Promise<T> {
        this.isLoading = true
        try {

            var axiosResponse = await this.axiosClient.request<T>({
                method: "post",
                data: data,
                timeout: 100000,
                url: this.testUrl + url,
            });
            return (axiosResponse.data);

        } catch (error) {
            console.log(error)
            return null;
            // return (Promise.reject(this.normalizeError(error)));

        } finally {
            this.isLoading = false
        }


    }

    public async post<T>(url: string, data: any, applyLoading: boolean,applySubLoading:boolean): Promise<T> {
        // this.barLoading = this.applySubLoadingBar
        this.isLoading = applyLoading
        this.applySubLoading=applySubLoading
        this.isLoadingData = this.applySubLoading
        try {

            var axiosResponse = await this.axiosClient.request<T>({
                method: "post",
                data: data,
                url: this.mainURL + url,
            });
            this.errorNumber = 0;
            console.log(axiosResponse.data)
            return (axiosResponse.data);

        } catch (error) {
            // this.barLoading = false
            return (Promise.reject(this.normalizeError(null)));
            // return (Promise.reject(this.normalizeError(error)));

        } finally {
            // this.barLoading = false
            this.isLoading = false
            this.isLoadingData = false
            this.barLoading=false
            this.applySubLoading = true
        }


    }

    public async get<T>(url: string): Promise<T> {
        this.isLoading = this.applySubLoading
        try {

            var axiosResponse = await this.axiosClient.request<T>({
                method: "get",
                url: this.mainURL + url,
            });

            return (axiosResponse.data);

        } catch (error) {
            return (Promise.reject(this.normalizeError(null)));

        } finally {
            this.isLoading = false
            this.applySubLoading = true
        }

    }


    public normalizeError(message: string) {
        this.errorNumber++;

        if (message === null || message === '') {
            message = this.errorMsg
        }

        // this.errorHandler.handleError(error);

        // NOTE: Since I'm not really dealing with a production API, this doesn't really
        // normalize anything (ie, this is not the focus of this demo).

        this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: this.errorNumber > 1 ? this.errorMsg : message
        });
        this.isLoading = false

        return null


    }

}

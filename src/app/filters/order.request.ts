import {User} from "../Service/User";

export interface OrderRequest {
    dateFrom: string;
    dateTo: string;
    searchString: string;
    customerId: number;
    employeeId: number;
    customerName: string;
    lang: string;
    state: string;
    closeDate: boolean;
    status: boolean;
    payed: boolean;
    user: User;
}
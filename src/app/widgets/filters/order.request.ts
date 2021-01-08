import {User} from "../../Service/User";

export interface OrderRequest {
    dateFrom: string;
    dateTo: string;
    workDateFrom: string;
    workDateTo: string;
    searchString: string;
    customerId: number;
    employeeId: number;
    customerName: string;
    lang: string;
    state: string;
    closeDate: boolean;
    status: boolean;
    rowStartIndex: number;
    payed: boolean;
    autoDetectionExecutor: boolean;
    user: User;
    workStatus: number;
    workId: number;
    sizeResponse: number;
    detailId: number;
}
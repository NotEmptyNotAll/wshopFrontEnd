import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TableData} from "./tableData";
import {Order} from "../orders-page/orders";

@Injectable({
    providedIn: 'root'
})
export class TableDataService {
    tempData: any[] = []
    startSize: number = 0
    selectData: any = null
    search: string = ''
    mainData: any[]
    startData: any[]
    addColumnText: string = ''
    showUpdatePage = false
    patternTableRow: any = {}

    constructor() {

    }


    public getMainData() {
        return this.mainData
    }

    setTablePatternRow(mock: any) {
        this.patternTableRow = mock
    }

    getTablePatternRow() {
        return this.patternTableRow
    }

    setStartData(data) {
        this.startData = data
        this.startSize = data.length
    }

    addData(name: string) {
        if (this.selectData === null) {
            let data: Order = {
                id: this.getDataSize() + 1,
                orderName: name,
                customerId: null,
                date: null,
                jobsSum: null,
                componentsSum: null
            }
            this.tempData.push(data)
        } else {
            this.tempData.find(elem =>
                elem.id === this.selectData.id).orderName = name
        }
        this.searchData()
        this.selectData = null
    }

    searchData(): void {
        this.mainData = this.startData.concat(this.tempData).filter(item => {
            return item.orderName.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                || item.id.toString().indexOf(this.search) > -1
        })
    }


    setMainData(data: any[]) {
        this.mainData = data
    }


    getDataSize(): number {
        return this.startSize + this.tempData.length
    }

    deleteData(id: number) {
        if (id > this.startSize) {
            this.tempData = this.tempData.filter(elem => {
                return elem.id !== id
            })
        }
    }

    setChangeRow(selectData: any): void {
        this.selectData = selectData
    }

    getChangeRow(): Observable<any> {
        return of(this.selectData)
    }


}

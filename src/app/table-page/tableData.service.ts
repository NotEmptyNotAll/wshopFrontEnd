import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TableData} from "./tableData";

@Injectable({
    providedIn: 'root'
})
export class TableDataService {
    tempData: TableData[] = []
    startSize: number = 0
    selectData: TableData = null
    search: string = ''
    mainData: TableData[]
    startData: TableData[]
    addColumnText: string = ''
    showUpdatePage = false

    constructor() {

    }

    setStartData(data) {
        this.startData = data
        this.startSize = data.length
    }

    addData(name: string) {
        if (this.selectData === null) {
            let data: TableData = {
                id: this.getDataSize() + 1,
                name: name
            }
            this.tempData.push(data)
        } else {
            this.tempData.find(elem =>
                elem.id === this.selectData.id).name = name
        }
        this.searchData()
        this.selectData = null
    }

    searchData():void {
        this.mainData= this.startData.concat(this.tempData).filter(item => {
            return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                || item.id.toString().indexOf(this.search) > -1
        })
    }


    setMainData(data: TableData[]) {
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

    setChangeRow(selectData: TableData): void {
        this.selectData = selectData
    }

    getChangeRow(): Observable<TableData> {
        return of(this.selectData)
    }
    

}

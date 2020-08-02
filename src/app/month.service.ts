import {Injectable} from '@angular/core';
import {MONTHS} from "./table-page/mock-months";
import {Observable, of} from 'rxjs';
import {Month} from "./table-page/month";

@Injectable({
    providedIn: 'root'
})
export class MonthService {
    tempMonth: Month[] = []
    startSize: number = 12
    changeMonth: Month = null
    search: string = ''
    tempMonths: Month[]
    addColumnText:string=''

    constructor() {
    }

    addMonth(name: string) {
        if (this.changeMonth === null) {
            let month: Month = {
                id: this.getMonthSize() + 1,
                name: name
            }
            this.tempMonth.push(month)
        } else {
            this.tempMonth.find(elem =>
                elem.id === this.changeMonth.id).name = name
        }
        this.tempMonths=this.searchMonth()
        this.changeMonth = null
    }

    searchMonth():Month[]{
        return MONTHS.concat(this.tempMonth).filter(item => {
            return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                || item.id.toString().indexOf(this.search) > -1
        })
    }



    setTempMonth(months: Month[]) {
        this.tempMonths = months
    }

    getTempMonth(): Month[] {
        return this.tempMonths
    }

    getMonthSize(): number {
        return this.startSize + this.tempMonth.length
    }

    deleteMonth(id: number) {
        if (id > this.startSize) {
            this.tempMonth = this.tempMonth.filter(elem => {
                return elem.id !== id
            })
        }
    }

    setChangeRow(month: Month): void {
        this.changeMonth = month
    }

    getChangeRow(): Observable<Month> {
        return of(this.changeMonth)
    }

    getMonth(): Observable<Month[]> {
        return of(MONTHS.concat(this.tempMonth));
    }

}

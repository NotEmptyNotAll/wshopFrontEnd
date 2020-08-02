import {Component, OnInit} from '@angular/core';
import {MonthService} from "../month.service";
import {Month} from "../table-page/month";

@Component({
    selector: 'app-create-add',
    templateUrl: './create-add.component.html',
    styleUrls: ['./create-add.component.css']
})
export class CreateAddComponent implements OnInit {

    inputValue: string = ''

    constructor(private monthService: MonthService) {
    }


    addMonth(): void {
        this.monthService.addMonth(this.inputValue)
    }

    ngOnInit(): void {
        this.monthService.getChangeRow().subscribe(month => this.inputValue = month.name)
    }

}

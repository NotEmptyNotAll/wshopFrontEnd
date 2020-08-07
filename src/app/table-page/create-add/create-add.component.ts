import {Component, OnInit} from '@angular/core';
import {TableDataService} from "../tableData.service";
import {TableData} from "../tableData";

@Component({
    selector: 'app-create-add',
    templateUrl: './create-add.component.html',
    styleUrls: ['./create-add.component.css']
})
export class CreateAddComponent implements OnInit {

    inputValue: string = ''

    constructor(public tableDataService: TableDataService) {
    }


    addData(): void {
        this.tableDataService.addData(this.inputValue)
        this.tableDataService.showUpdatePage = false
    }

    ngOnInit(): void {
        this.tableDataService.getChangeRow().subscribe(month => this.inputValue = month.name)
    }

}

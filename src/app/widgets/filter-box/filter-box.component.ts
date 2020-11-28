import {Component, OnInit} from '@angular/core';
import {ApiDataServiceService} from "../../Service/api-data-service.service";

@Component({
    selector: 'app-filter-box',
    templateUrl: './filter-box.component.html',
    styleUrls: ['./filter-box.component.css']
})
export class FilterBoxComponent implements OnInit {

    employeeName: string = ""
    date: string = ""
    status: string = ""
    statusList = [   {name: 'empty', code: 'empty'},
      {name: 'yse', code: 'yes'},
        {name: 'no', code: 'no'}
    ]


    constructor(public apiService:ApiDataServiceService) {
    }

    ngOnInit(): void {
    }

    onSearch(){

    }

}

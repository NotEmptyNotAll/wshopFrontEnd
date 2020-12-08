import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FilterService} from "../filter.service";
import {OrderRequest} from "../order.request";
import {ServSubstringFilterService} from "./serv-substring-filter.service";

@Component({
  selector: 'app-substring-filter',
  templateUrl: './substring-filter.component.html',
  styleUrls: ['./substring-filter.component.css']
})
export class SubstringFilterComponent implements OnInit {
  @Output() onSuggest: EventEmitter<any> = new EventEmitter();
  @Output() onClear: EventEmitter<any> = new EventEmitter();

  private orderRequest: OrderRequest

  private sunString:string=''

  constructor(
      public substringService:ServSubstringFilterService,
      public filterService: FilterService) { }
  clear(){
    this.sunString= ''
    this.onClear.emit()
  }
  onChang(){
    this.orderRequest = this.filterService.getOrderRequest()
    this.orderRequest.searchString =this.substringService.substringFastFilterData ;
    this.filterService.setOrderRequest(this.orderRequest)
    this.onSuggest.emit();

  }

  ngOnInit(): void {
  }

}

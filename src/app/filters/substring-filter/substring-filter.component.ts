import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FilterService} from "../filter.service";
import {OrderRequest} from "../order.request";

@Component({
  selector: 'app-substring-filter',
  templateUrl: './substring-filter.component.html',
  styleUrls: ['./substring-filter.component.css']
})
export class SubstringFilterComponent implements OnInit {
  @Output() onSuggest: EventEmitter<any> = new EventEmitter();
  private orderRequest: OrderRequest

  private sunString:string=''

  constructor(public filterService: FilterService) { }

  onChang(){
    this.orderRequest = this.filterService.getOrderRequest()
    this.orderRequest.searchString =this.sunString ;
    this.filterService.setOrderRequest(this.orderRequest)
    this.onSuggest.emit();

  }

  ngOnInit(): void {
  }

}

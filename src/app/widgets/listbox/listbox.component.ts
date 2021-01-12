import {Component, Input, OnInit} from '@angular/core';
import {ListOption} from "./ListOption";

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.css']
})
export class ListboxComponent implements OnInit {

  @Input() options: ListOption[]
  @Input() selected:ListOption

  constructor() { }

  ngOnInit(): void {
  }

  selectItem(value){
    this.selected.selected=false
    this.selected= this.options.find(elem=>elem.name===value.name)
    this.selected.selected=true
  }

  onItemMenu(value) {
    value.command()
  }
}

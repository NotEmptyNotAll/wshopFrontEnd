import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-master-start-window',
  templateUrl: './master-start-window.component.html',
  styleUrls: ['./master-start-window.component.css']
})
export class MasterStartWindowComponent implements OnInit {

  @Output() onConfirm: EventEmitter<any> = new EventEmitter();
  @Output() onCancelAction: EventEmitter<any> = new EventEmitter();

  @Input() display:boolean=true
  @Input() title:boolean=true
  @Input() textOnConfirm:boolean=true
  @Input() textOnCancel:boolean=true
  constructor() { }

  ngOnInit(): void {
  }

  action(){
    this.onConfirm.emit()
  }
  onCancel(){
    this.display=false;
    this.onCancelAction.emit()
  }
}

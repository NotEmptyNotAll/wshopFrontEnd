import {Component, OnInit, Renderer2} from '@angular/core';
import {TableOrderResponse} from "../Service/table-order-response";
import {User} from "../Service/User";
import {TableDataService} from "../table-page/tableData.service";
import {OrderService} from "../orders-page/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-master-select-window',
  templateUrl: './master-select-window.component.html',
  styleUrls: ['./master-select-window.component.css']
})
export class MasterSelectWindowComponent implements OnInit {
  data: TableOrderResponse
  mainColumn: any[]
  listener1;
  listener2;
  listener3;
  sec: number
  secIncr: number = 1
  temp: any;
  private user: User;

  constructor(    public tableService: TableDataService,
                  public orderService: OrderService,
                  public renderer2: Renderer2,
                  private router: Router) {

    this.listener1 = this.renderer2.listen('window', 'scroll', (e) => {
      this.sec = 0
    });

    this.listener2 = this.renderer2.listen('window', 'click', (e) => {
      this.sec = 0
    });


    this.listener3 = this.renderer2.listen('window', 'mousemove', (e) => {
      this.sec = 0
    });
    if (orderService.getUserValidate()) {
      this.getOrd()
    } else {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {

  }
  async getOrd() {

    // this.data = await this.apiService.get<Order[]>('getCroppedOrders')
    this.data = this.orderService.getOrderResponse()
    console.log('///////////////////////////')
    console.log(this.data)
    this.mainColumn = []
    this.data.columnTables.map(elem => {
      this.mainColumn.push(
          {
            field: elem.nameColumn,
            header: elem.nameColumn,
            width: elem.width<100?elem.width+elem.nameColumn.length*8:elem.width+elem.nameColumn.length*5
          }
      )
    })
    let regexp = new RegExp('^[1-9]\d{0,2}$');
    let tableBody = []
    this.data.ordersTableBody.map(row => {
      let tableRow: any = {}
      row.rowData.map(cell => {
        if (cell.cellData.indexOf('thWOrders.orderClosed')!==-1) {
          tableRow[cell.cellName] = cell.cellData.substr(22, 3)
        } else if (cell.cellName === 'Код' || cell.cellName === 'Борг' || cell.cellName === 'Разом'
            || cell.cellName === 'З/ч' || cell.cellName === 'Роб.') {
          tableRow[cell.cellName] = Number(cell.cellData)
        } else if ((cell.cellName.toLowerCase().indexOf('до') !== -1 || cell.cellName.toLowerCase().indexOf('дата') !== -1 || cell.cellName === '---') && !isNaN(new Date(cell.cellData).getDate())) {
          let data = new Date(cell.cellData)
          tableRow[cell.cellName] = data.getDate() + '.' + data.getMonth() + '.' + data.getFullYear();
        } else {
          tableRow[cell.cellName] = cell.cellData
        }
      })
      tableBody.push(tableRow)
    })
    let tableRowPattern: any = {}

    this.data.ordersTableBody[0].rowData.map(
        cell => {
          if (cell.cellName === 'Close') {
            tableRowPattern[cell.cellName] = cell.cellData.substr(22, 3)

          } else {
            tableRowPattern[cell.cellName] = cell.cellData;
          }
        }
    )


    this.tableService.setMainData(tableBody)
    this.tableService.setTablePatternRow(tableRowPattern)
  }

  start() {


    this.sec = 0
    setInterval(() => {
      this.sec++
      if (this.sec == 300) {
        this.router.navigate(['/'])
      }
      console.log(this.sec)
    }, 1000);
  }
}

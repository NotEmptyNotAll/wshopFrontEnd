import {TableRow} from "../table-page/table-row";
import {TableColumnHeader} from "../table-page/table-column-header";

export interface TableOrderResponse {
    columnTables: TableColumnHeader[];
    ordersTableBody: TableRow[];
    status: number;
    sizeTwoPartData: number;
}

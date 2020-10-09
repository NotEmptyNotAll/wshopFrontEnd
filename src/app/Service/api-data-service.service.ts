import {ErrorHandler, Injectable} from '@angular/core';
import axios from "axios";
import { AxiosInstance } from "axios";
import {Order} from "../orders-page/orders";

@Injectable({
  providedIn: 'root'
})
export class ApiDataServiceService {

  mainURL:string= 'http://localhost:5051/'
  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;
  private ordersResp:Order[];

  constructor() {
    this.axiosClient = axios.create({
      timeout: 3000,
      headers: {
        "X-Initialized-At": Date.now().toString()
      }
    });
  }

  public async get<T>( url:string ) : Promise<T> {

    try {

      var axiosResponse = await this.axiosClient.request<T>({
        method: "get",
        url: this.mainURL + url,
      });

      return( axiosResponse.data );

    } catch ( error ) {

      return( Promise.reject( this.normalizeError( error ) ) );

    }

  }

  private normalizeError( error: any )  {

    this.errorHandler.handleError( error );

    // NOTE: Since I'm not really dealing with a production API, this doesn't really
    // normalize anything (ie, this is not the focus of this demo).
    return({
      id: "-1",
      code: "UnknownError",
      message: "An unexpected error occurred."
    });

  }

}

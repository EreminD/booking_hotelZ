import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import * as config from '../config.json'

@Injectable()
export class BkngService {
  private readonly HOTEL_URL = config.hotelUrl;
  private readonly ROOMS_URL: string = `${this.HOTEL_URL}/rooms`
  private readonly BOOKINGS_URL: string = `${this.HOTEL_URL}/bookings`
  private readonly bookings: Array<any> = [] 

  constructor(private httpService: HttpService) {
  }

  createBooking(roomId: number){
    return this.httpService.post(this.BOOKINGS_URL, {roomId})
      .pipe(map(resp => this.removePrice(resp.data)))
  }

  removeBooking(bookingId: number){
    return this.httpService.delete(this.BOOKINGS_URL + '/' + bookingId)
      .pipe(map(resp => this.removePrice(resp.data)))  
  }

  getAvailableRooms(): Observable<any> {
    return this.httpService.get(this.ROOMS_URL)
      .pipe(map(resp => this.addComission(this.availableOnly(resp.data))))
  }

  private availableOnly(data: Array<any>): Array<any> {
    return data.filter(r => r['state'] === 'available')
  }

  private addComission(data: Array<any>): Array<any>{
    data.forEach(r => r['price'] = +(1.1*r['price']).toFixed(2)) 
    return data;
  }

  private removePrice(obj: object){
    delete obj['room']['price']
    return obj
  }
}
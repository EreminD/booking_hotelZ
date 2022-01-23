import { Injectable } from '@nestjs/common';
import { Room } from 'src/rooms/entities/room.entity';
import { RoomsService } from 'src/rooms/rooms.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  private readonly bookings: Array<Booking> = new Array<Booking>();
  private bookingsCounter: number;

  constructor(private readonly roomService: RoomsService){
    this.bookingsCounter = 0;
  }

  addBook(roomId: number) : Booking | string{
    let room: Room;
    try {
      room = this.roomService.bookRoom(roomId)
    } catch (ex: any){
      let error: string = (ex instanceof Error) ? ex.message : String(ex);
      console.error(error)
      return error;
    }
    
    if (room) {
      const booking = {id: ++this.bookingsCounter, room};
      this.bookings.push(booking)
      return booking
    }
  }

  findAll(): Array<Booking> {
    return this.bookings
  }

  removeBook(bookingId: number): Booking | string {
    const booking = this.bookings.find(b => b.id === bookingId)

    if (!booking){
      return `No such booking: ${bookingId}`
    }

    this.roomService.releaseRoom(booking.room.id)
    
    const index = this.bookings.indexOf(booking);
    if (index > -1) {
      this.bookings.splice(index, 1);
    }

    return booking;
  }
}

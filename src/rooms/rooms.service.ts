import { Injectable } from '@nestjs/common';
import { Room } from './entities/room.entity'

@Injectable()
export class RoomsService {
  private readonly rooms: Array<Room> = new Array<Room>()
  
  constructor(){
    this.rooms = [
      {id: 1, name: 'Economy 1', price: 10, state: 'available'},
      {id: 2, name: 'Economy 2', price: 12, state: 'available'},
      {id: 3, name: 'Economy 3', price: 15, state: 'available'},
      {id: 4, name: 'Standart 1', price: 20, state: 'available'},
      {id: 5, name: 'Standart 2', price: 25, state: 'available'},
      {id: 6, name: 'Standart 3', price: 30, state: 'available'},
      {id: 7, name: 'Business 1', price: 35, state: 'available'},
      {id: 8, name: 'Business 2', price: 40, state: 'available'},
      {id: 9, name: 'Business 3', price: 45, state: 'available'},
      {id: 10, name: 'President lux', price: 85, state: 'available'},
    ]
  }
  
  findAll(): Array<Room> {
    return this.rooms;
  }

  bookRoom(roomId: number): Room {
    console.log(`Booking room ${roomId}`)
    const room = this.rooms.find(r => r.id === roomId)
    
    if (!room) {
      throw new Error(`No such room ${roomId}`)
    }

    if (room.state === 'booked'){
      throw new Error(`Room ${roomId} is booked already`)
    }
    
    room.state = 'booked'
    return room;
  }

  releaseRoom(roomId: number): Room {
    console.log(`Relesasing room ${roomId}`)
    const room = this.rooms.find(r => r.id === roomId)
    
    if (!room) {
      throw new Error(`No such room ${roomId}`)
    }
    
    room.state = 'available'
    return room;
  }
}

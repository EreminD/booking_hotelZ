import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.addBook(createBookingDto.roomId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.removeBook(+id);
  }
}

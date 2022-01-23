import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BkngService } from './bkng.service';
import { CreateBkngDto } from './dto/create-bkng.dto';

@Controller('bkng')
export class BkngController {
  constructor(private readonly bkngService: BkngService) {}

  @Get('/rooms')
  findOne() {
    return this.bkngService.getAvailableRooms();
  }

  @Post()
  bookRoom(@Body() body: CreateBkngDto ) {
    return this.bkngService.createBooking(body.roomId)
  }

  @Delete()
  unbookRoom(@Query('bookNumber') id: string) {
    return this.bkngService.removeBooking(+id)
  }
}

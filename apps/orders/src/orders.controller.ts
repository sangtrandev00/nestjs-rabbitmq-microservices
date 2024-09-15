import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @UseGuards(JwtAuthGuard) // Step 1: Chạy dến guard JWT Auth Guard này ở @app/common
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    console.log('req.cookies', req.cookies);
    // Bước 7: Xử lý nghiệp vụ tạo order ở đây!
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}

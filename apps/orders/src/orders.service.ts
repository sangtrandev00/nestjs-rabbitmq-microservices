import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';

// Mục tiêu là phải chạy được source này! ==> Hiểu được luồng -> từ sau đó sẽ hiểu các concepts
@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest, authentication: string) {
    // const session = await this.ordersRepository.startTransaction();
    try {
      // const order = await this.ordersRepository.create(request, { session });
      const order = await this.ordersRepository.create(request);
      const res = await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
          Authentication: authentication,
        }),
      );
      console.log('res emit', res);

      // await session.commitTransaction();
      return order;
    } catch (err) {
      // await session.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}

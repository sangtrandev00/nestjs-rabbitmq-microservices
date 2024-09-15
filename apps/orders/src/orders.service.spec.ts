import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { RmqService } from '@app/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { BillingService } from '../../billing/src/billing.service'
import { OrdersRepository } from './orders.repository';


describe('OrdersService', () => {
  let ordersService: OrdersService;
  let billingService: BillingService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       OrdersService,
  //       RmqService,
  //       OrdersRepository,
  //       {
  //         provide: BillingService,
  //         useValue: {
  //           bill: jest.fn(), // Mock the bill method
  //         },
  //       },
  //     ],
  //   }).compile();

  //   ordersService = module.get<OrdersService>(OrdersService);
  //   billingService = module.get<BillingService>(BillingService);
  // });

  // it('should process orders in FIFO order', async () => {
  //   const orderIds: string[] = [];
  //   const orderCount = 5;

  //   for (let i = 0; i < orderCount; i++) {
  //     const orderRequest: CreateOrderRequest = {
  //       name: `Order ${i}`,
  //       price: 100,
  //       phoneNumber: '1234567890',
  //     };
  //     const order = await ordersService.createOrder(orderRequest, 'some-auth-token');
  //     orderIds.push((order as any).id);
  //   }

  //   // Simulate processing in BillingService
  //   const processedOrderIds: string[] = [];
  //   const originalEmit = billingService.bill;

  //   billingService.bill = (data) => {
  //     processedOrderIds.push(data.id);
  //     return originalEmit.call(billingService, data);
  //   };

  //   // Wait for processing to complete (you may need to implement a way to wait)
  //   await new Promise(resolve => setTimeout(resolve, 1000));

  //   expect(processedOrderIds).toEqual(orderIds);
  // });
});
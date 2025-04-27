import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { CreateOrderDto, StatusDto } from './dto';
import { OrderPaginationDto, PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Get()
  findAll(
    @Query() orderPaginationDto: OrderPaginationDto
  ) {

    return this.client.send({ cmd: 'findAllOrders' }, orderPaginationDto)
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {

      return this.client.send({ cmd: 'findAllOrders' }, {
        ...paginationDto,
        status: statusDto.status,
      });

    } catch (error) {

      throw new RpcException(error);

    }
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    try {

      return this.client.send('changeOrderStatus', { id, status: statusDto.status })

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.client.send({ cmd: 'findOneOrder' }, { id: id })
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'createOrder' }, createOrderDto)
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )
  }
}
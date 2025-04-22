import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "../../common/dtos/pagination.dto";
import { OrderStatus, OrderStatusList } from "src/orders/enum/order.enum";



export class OrderPaginationDto extends PaginationDto {

    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Valid status are ${ OrderStatusList }`
    })
    status: OrderStatus
}
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards, ValidationPipe, Request, HttpException, HttpStatus, Query, Delete } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/CreateOrder.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoles } from '../../auth/enums/user-roles';
import { UpdateOrderDto } from '../dtos/UpdateOrder.dto';
import { RolesGuard } from '../../auth/guards/roles.guard';


@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {
    }

    @Roles(UserRoles.Admin, UserRoles.Root)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAllOrders() {
        return this.ordersService.findAllOrders()
    }

    @Roles(UserRoles.Admin, UserRoles.Root)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    getOrderById(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.findOrderByID(id);
    }

    @Roles(UserRoles.Admin, UserRoles.User, UserRoles.Root)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/name/:name')
    getUserOrders(@Request() req, @Param('name') name: string, @Query('orderStatusID') orderStatusID?: number) {
        const authUser = req.user;
        if (authUser.userName !== name && (authUser.roles !== UserRoles.Admin && authUser.roles !== UserRoles.Root)) {
            throw new HttpException('You are not authorized to view orders for this user', HttpStatus.UNAUTHORIZED);
        }
        return this.ordersService.findUserOrders(name, orderStatusID);
    }

    @Roles(UserRoles.Admin, UserRoles.User, UserRoles.Root)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    createOrder(@Request() req, @Body(new ValidationPipe()) createOrderDto: CreateOrderDto) {
        const authUser = req.user;
        if (authUser.userName !== createOrderDto.username && authUser.roles !== UserRoles.Admin) {
            throw new HttpException('You are not authorized to create order for such user', HttpStatus.UNAUTHORIZED);
        }
        return this.ordersService.createNewOrder(createOrderDto);
    }

    @Roles(UserRoles.Admin, UserRoles.Root)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/status/:id')
    getOrdersByStatus(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.findOrdersByStatus(id);
    }

    @Roles(UserRoles.Admin, UserRoles.Root)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateOrder(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateOrderDto: UpdateOrderDto) {
        return this.ordersService.updateOrderById(id, updateOrderDto);
    }

    @Roles(UserRoles.Admin, UserRoles.Root)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/change-status/:statusId')
    updateOrderStatus(@Param('id') id: number, @Param('statusId') statusId: number) {
        return this.ordersService.changeOrderStatus(id, statusId);
    }

    @Roles(UserRoles.Admin, UserRoles.Root)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteOrder(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.deleteOrderById(id);
    }

}

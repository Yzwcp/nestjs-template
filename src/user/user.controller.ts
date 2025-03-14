import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'nestjs-pino'
import { UserListQuery } from './dto/get-user.dto'
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly logger: Logger
	) {}
	@Get('/findAll')
	findAll(@Query() query: UserListQuery) {
		return this.userService.findAll(query)
	}

	@Get('/getOne/:id')
	async findOne(@Param('id') id: string) {
		const data = await this.userService.findOne(Number(id))
		console.log(data)
		return data
	}

	@Post('/create')
	addUser(@Body() body: any): any {
		return this.userService.create(body)
	}
}

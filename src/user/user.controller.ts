import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config'

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly logger: Logger
	) {}

	@Get('/:id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(Number(id))
	}

	@Post('/create')
	addUser(@Body() body: any): any {
		return this.userService.create(body)
	}
}

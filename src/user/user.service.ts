import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserService {
	constructor(private readonly userService: PrismaService) {}
	async findOne(id: number) {
		return this.userService.user.findUnique({ where: { id: id } })
	}
	async create(user: Prisma.UserCreateInput) {
		return this.userService.user.create({ data: user })
	}
	async findAll() {
		return this.userService.user.findMany()
	}
}

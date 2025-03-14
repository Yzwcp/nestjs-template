import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { Prisma } from '@prisma/client'
import { UserListQuery } from './dto/get-user.dto'

@Injectable()
export class UserService {
	constructor(private readonly userService: PrismaService) {}
	async findOne(id: number) {
		return this.userService.user.findUnique({
			where: {
				id
			},
			include: {
				profile: true, // 一对一关系
				logs: true, // 一对多日志
				userRoles: {
					// 用户角色关系
					include: {
						role: true // 如果需要包含角色详细信息
					}
				}
			}
		})
	}

	async create(user: Prisma.ProfileCreateWithoutUserInput) {
		return this.userService.user.create({
			data: {
				password: user.password,
				profile: {
					create: user
				}
			}
		})
	}
	async findAll(query: UserListQuery) {
		const skip = query.skip || 0
		const take = query.take || 10
		// const condition = query.condition || {}
		return this.userService.user.findMany({
			skip,
			take: (skip - 1) * take,
			select: {
				id: true,
				password: false,
				profile: true, // 一对一关系
				logs: false, // 一对多日志
				userRoles: {
					// 用户角色关系
					include: {
						role: true // 如果需要包含角色详细信息
					}
				}
			},
			where: {
				profile: {
					age: {
						gt: 10
					}
				}
			}
		})
	}
}

import { Prisma } from '@prisma/client'

export interface UserListQuery extends Prisma.UserCreateInput {
	skip: number
	take: number
	condition: {
		username: string
		email: string
		role: number
	}
}

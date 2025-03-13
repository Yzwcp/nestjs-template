import { Global, Logger, Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { RolesModule } from './roles/roles.module'
@Global()
@Module({
	imports: [
		PrismaModule.forRoot({ isGlobal: true }),
		ConfigModule.forRoot({ isGlobal: true }),
		UserModule,
		RolesModule
	],
	controllers: [],
	providers: [Logger],
	exports: [Logger]
})
export class AppModule {}

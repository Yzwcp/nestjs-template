import { Global, Logger, Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { RolesModule } from './roles/roles.module'
import { LoggerModule } from 'nestjs-pino'
import { pinoConfig } from './config/pino.config'
@Global()
@Module({
	imports: [
		PrismaModule.forRoot({ isGlobal: true }),
		ConfigModule.forRoot({ isGlobal: true }),
		LoggerModule.forRoot(pinoConfig),
		UserModule,
		RolesModule
	],
	controllers: [],
	providers: [Logger],
	exports: [Logger]
})
export class AppModule {}

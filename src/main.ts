import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from 'nestjs-pino'
import { AllExceptionFilter } from './filters/all-exception.filter'
async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true })

	app.setGlobalPrefix('api/v1')
	app.useLogger(app.get(Logger))
	app.useGlobalFilters(new AllExceptionFilter())
	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()

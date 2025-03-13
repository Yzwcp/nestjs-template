import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import winstonLogger from './config/winston.config'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { AllExceptionFilter } from './filters/all-exception.filter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: winstonLogger
	})

	app.setGlobalPrefix('api/v1')
	app.useGlobalFilters(new AllExceptionFilter(winstonLogger))
	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, LoggerService } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	constructor(private logger: LoggerService) {}
	catch(exception: HttpException, host: ArgumentsHost): any {
		const ctx = host.switchToHttp()
		//响应请求对象
		const response = ctx.getResponse()
		const request = ctx.getRequest()
		//http状态码
		const code = exception.getStatus()
		this.logger.error(exception.message, exception.stack)
		response.status(code).json({
			code,
			timeStamp: new Date().toISOString(),
			path: request.url,
			method: request.method,
			message: exception.message || HttpException.name
		})
	}
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	constructor() {}
	catch(exception: HttpException, host: ArgumentsHost): any {
		const ctx = host.switchToHttp()
		// const {httpAdapter}  = this.httpAdapterHost
		//响应请求对象

		const response = ctx.getResponse()

		const request = ctx.getRequest()
		//http状态码
		const code = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
		// this.logger.error(exception.message, exception.stack)
		const responseBody = {
			code,

			query: request.query,
			body: request.body,
			params: request.params,
			timeStamp: new Date().toISOString(),
			path: request.url,
			method: request.method,
			message: exception.message || HttpException.name,
			exception: exception.name,
			error: exception['response'] || 'SERVER ERROR'
		}
		// this.logger.error('[toimc]', { ...responseBody, headers: request.headers })
		// httpAdapter.reply(response,responseBody,code)

		response.status(code).json(responseBody)
	}
}

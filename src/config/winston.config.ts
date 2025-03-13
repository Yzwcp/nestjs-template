import chalk from 'chalk' // 用于颜色化输出
import { createLogger, format, transports } from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'
import * as winston from 'winston'
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'

const options = (name) => {
	return {
		filename: 'logs/' + name + '/error-%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
		datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
		zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
		maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
		maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
		level: name, // 日志类型，此处表示只记录错误日志。
		format: format.combine(winston.format.timestamp(), winston.format.ms(), winston.format.simple())
	}
}

const winstonLogger = createLogger({
	level: 'info',
	// format: winston.format.json(),
	transports: [
		new transports.Console({
			format: format.combine(
				winston.format.timestamp(),
				winston.format.ms(),
				nestWinstonModuleUtilities.format.nestLike('MyApp', {
					colors: true,
					prettyPrint: true,
					processId: true,
					appName: true
				})
			),
			level: 'debug'
		}),
		new DailyRotateFile(options('error')),
		new DailyRotateFile(options('warn')),
		new DailyRotateFile({
			filename: 'logs/app/app-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d',
			format: format.combine(winston.format.ms(), winston.format.timestamp(), winston.format.simple())
		})
	]
})

export default winstonLogger

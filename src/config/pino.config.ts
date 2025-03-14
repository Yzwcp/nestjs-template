export const customTimestamp = () => {
	const date = new Date()
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，需要加 1
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')

	return `,"time":"${year}-${month}-${day} ${hours}:${minutes}:${seconds}"`
}
export const pinoTargetsDev = [
	// 控制台输出（格式化）
	{
		target: 'pino-pretty',
		options: {
			singleLine: true,
			colorize: true,
			translateTime: 'SYS:HH:MM:ss' // 格式化时间
		}
	}
]

export const pinoTargetsDep = [
	// 存储所有日志
	{
		target: 'pino-roll',
		options: {
			file: 'logs/all/all.log', // 所有日志存储路径
			frequency: 'daily', // 按天切割日志
			mkdir: true, // 自动创建目录
			dateFormat: 'yyyy-MM-dd',
			size: '10m' // 按文件大小切割
		}
	},
	// 存储 error 日志
	{
		target: 'pino-roll',
		options: {
			file: 'logs/error/error.log', // error 日志存储路径
			frequency: 'daily',
			dateFormat: 'yyyy-MM-dd',
			mkdir: true,
			size: '10m'
		},
		level: 'error' // 只记录 error 级别日志
	},
	// 存储 warn 日志
	{
		target: 'pino-roll',
		options: {
			file: 'logs/warn/warn.log', // warn 日志存储路径
			dateFormat: 'yyyy-MM-dd',
			frequency: 'daily',
			mkdir: true,
			size: '10m'
		},
		level: 'warn' // 只记录 warn 级别日志
	}
]
export const pinoConfig = {
	pinoHttp: {
		timestamp: customTimestamp,
		transport: {
			targets: process.env.NODE_ENV === 'production' ? pinoTargetsDep : pinoTargetsDev
		}
	}
}

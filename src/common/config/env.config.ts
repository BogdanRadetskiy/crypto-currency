import { cleanEnv, num, str } from 'envalid'
import * as dotenv from 'dotenv'
dotenv.config()

export const env = cleanEnv(process.env, {
	REDIS_HOST: str(),
	URL: str(),
	TRANSPORT_PORT: num(),
	TRANSPORT_HOST: str(),
	TYPE: str(),
})

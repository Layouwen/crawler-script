import dotenv from 'dotenv'

dotenv.config()

export default {
  mongoUrl: {
    flow:
      process.env.MONGO_URL_FLOW || 'mongodb://test:test@localhost:27017/test1?authMechanism=DEFAULT&authSource=test',
    media:
      process.env.MONGO_URL_MEDIA || 'mongodb://test:test@localhost:27017/test2?authMechanism=DEFAULT&authSource=test',
  },
}

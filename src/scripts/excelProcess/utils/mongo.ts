import mongoose from 'mongoose'
import config from '../config'

export const flowMongoConn = mongoose.createConnection(config.mongoUrl.flow)
export const mediaMongoConn = mongoose.createConnection(config.mongoUrl.media)

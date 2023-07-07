import { Schema } from 'mongoose'
import { flowMongoConn } from '../utils/mongo'

const schema = new Schema({
  uuid: String,
  name: String,
  url: String,
  updated: Date,
  type: String,
  setLocation: Object,
  state: Number,
  opTime: Date,
  workTime: Date,
})

export const Devices = flowMongoConn.model('Devices', schema)

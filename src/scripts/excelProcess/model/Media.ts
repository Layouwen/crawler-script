import { Schema } from 'mongoose'
import { mediaMongoConn } from '../utils/mongo'

const schema = new Schema({
  uuid: String,
  name: String,
  updated: Date,
  type: String,
  streamProtocol: String,
  streamUrl: String,
  isRecording: Boolean,
  created: Date,
})

export const Media = mediaMongoConn.model('Media', schema)

import { Schema, model } from 'mongoose'

const schema = new Schema({
  uuid: String,
  name: String,
  url: String,
  opTime: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
})

export const Case02 = model('Case02', schema)

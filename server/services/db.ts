// tslint:disable no-var-requires no-submodule-imports

const low = require('lowdb/lib/fp')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')

export const db = low(adapter)

export const videos = db('videos', [])
export const users = db('users', [])

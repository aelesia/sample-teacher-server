import Koa from 'koa'
import Router from 'koa-router'
import { getConnection } from 'typeorm'

export const app = new Koa()
export const router = new Router()

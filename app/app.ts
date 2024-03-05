/* -----------------------------------------------------------------------------
 *  Copyright (c) 2023, Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published by
 *  the Free Software Foundation, version 3.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program. If not, see <https://www.gnu.org/licenses/>.  
 *
 *  No Patent Rights, Trademark Rights and/or other Intellectual Property
 *  Rights other than the rights under this license are granted.
 *  All other rights reserved.
 *
 *  For any other rights, a separate agreement needs to be closed.
 *
 *  For more information please contact:  
 *  Fraunhofer FOKUS
 *  Kaiserin-Augusta-Allee 31
 *  10589 Berlin, Germany
 *  https://www.fokus.fraunhofer.de/go/fame
 *  famecontact@fokus.fraunhofer.de
 * -----------------------------------------------------------------------------
 */
import dotenv from 'dotenv'
dotenv.config()
import RedisStore from 'connect-redis'
import { createClient } from "redis"
import session from 'express-session'

process.env.MARIA_CONFIG = process.env.MARIA_CONFIG!.replace('tcp://', '')



// use RedisStore for express-session
let redis_url = process.env.REDIS_URL!.replace('tcp://', '')
let redisClient = createClient(
    {
        url: redis_url
    }
)

redisClient.connect().then(() => {
    console.info('redis connected')
})
    .catch((err) => {
        console.error(err)
    })

// @ts-ignore
let redisStore = new RedisStore({
    // @ts-ignore
    client: redisClient,
    prefix: "myapp:",
})


declare module 'express-session' {
    export interface SessionData {
        access_token: string,
        sanis_refresh_token: string,
        id_token: string,
        user?: {
            pid: string,
            personenkontexte: {
                ktid: string,
                organisation: {
                    id: string,
                    name: string
                    typ: string
                }
                rolle: string
            }[]
        }
    }
}







import {
    errHandler,
} from 'clm-core'
import cors from 'cors'
import express from 'express'

import EntryPointCtrl from './controllers/EntryPointCtrl'
import { verify_access_token } from './helpers/verify_token'

const APP = express()
APP.use(cors({
    origin: process.env.DEPLOY_URL || 'http://localhost:3000',
    credentials: true
}))


APP.use(
    session({
        store: redisStore,
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: false, // recommended: only save session when data exists
        secret: process.env.SESSION_SECRET! || 'keyboard cat',
    })
)

APP.use(express.json())
APP.use(verify_access_token)
APP.use('/', EntryPointCtrl)
APP.use(errHandler)

export default APP

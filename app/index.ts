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

import YAML from 'yamljs'

import APP from './app'
import {
    pathBDTOInstance,
} from 'clm-core'

const CORS_ACCESS_CONTROL_ALLOW_ORIGIN: string = (process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN) ? process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN : '*'

const openapiSpecification = YAML.load('./docs/oas/swagger.yaml')
APP.get('/api-docs', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)
    res.setHeader('Content-Type', 'application/json')
    res.send(openapiSpecification)
})

const PORT: number = (process.env.PORT) ? parseInt(process.env.PORT) : 443
const BASE_PATH: string = (process.env.BASE_PATH)
    ? (process.env.BASE_PATH.indexOf('/') == 0)
        ? process.env.BASE_PATH
        : '/' + process.env.BASE_PATH
    : ''

// paths which don't require API-Token
const PATHS_WITHOUT_AUTH: string[] = [
    `${BASE_PATH}/licenseInformations`,
    `${BASE_PATH}/licenseDefinitions`,
    `${BASE_PATH}/licenseDefinitions/:licenseDefinitionId`,
]

Promise.all([
    pathBDTOInstance.registerRoutes(APP, PATHS_WITHOUT_AUTH),
]).then(() => {
    APP.listen(PORT, () => {
        console.info(`${process.env.npm_package_name} in version ${process.env.npm_package_version} is running on port ${PORT}.`)
    })
}).catch(err => console.error(err))

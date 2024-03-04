#!/usr/bin/env node
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

'use strict'

var dotenv = require('dotenv')
dotenv.config()

var resolve = require('json-refs').resolveRefs
var YAML = require('js-yaml')
var fs = require('fs')

const FILE_BASE_PATH = './docs/oas/'
const FILE_INPUT_FILENAME = 'api-docs.yaml'
const FILE_OUTPUT_FILENAME = 'swagger.yaml'

const PROTOCOL = (process.env.PROTOCOL) ? process.env.PROTOCOL : 'http'
const HOST = (process.env.HOST) ? process.env.HOST : '127.0.0.1'
const PORT = (process.env.PORT) ? process.env.PORT : '3092'
const BASE_PATH = (process.env.BASE_PATH)
  ? (process.env.BASE_PATH.indexOf('/') == 0)
    ? process.env.BASE_PATH
    : '/' + process.env.BASE_PATH
  : ''

if (!fs.existsSync(FILE_BASE_PATH + FILE_INPUT_FILENAME)) {
  console.error('File does not exist: (' + FILE_INPUT_FILENAME + ')')
  process.exit(1)
}

const ROOT = YAML.load(fs.readFileSync(FILE_BASE_PATH + FILE_INPUT_FILENAME).toString())

if (process.env.npm_package_name) {
  ROOT.info.title = process.env.npm_package_name
}
if (process.env.npm_package_description) {
  ROOT.info.description = process.env.npm_package_description
}
if (process.env.npm_package_version) {
  ROOT.info.version = process.env.npm_package_version
}
ROOT.servers = [
  {
    url: '{protocol}://{host}:{port}{basePath}',
    description: 'Server definition from .env file',
    variables: {
      protocol: {
        default: PROTOCOL
      },
      host: {
        default: HOST
      },
      port: {
        default: PORT
      },
      basePath: {
        default: BASE_PATH
      }
    }
  }
]

const OPTIONS = {
  filter: ['relative', 'remote'],
  loaderOptions: {
    processContent: function (res, callback) {
      callback(null, YAML.load(res.text))
    }
  }
}

resolve(ROOT, OPTIONS).then(function (results) {
  fs.writeFile(FILE_BASE_PATH + FILE_OUTPUT_FILENAME, YAML.dump(results.resolved), (err) => {
    if (err) {
      console.error(err)
    }
  })
})
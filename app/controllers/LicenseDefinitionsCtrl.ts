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

import {
    BaseModelController,
} from 'clm-core'

import express from 'express'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import LicenseDefinitionDAO from '../models/LicenseDefinition/LicenseDefinitionDAO'
import LicenseDefinitionSchema from '../models/LicenseDefinition/LicenseDefinitionSchema'
import LicenseDefinitionFDTO from '../models/LicenseDefinition/LicenseDefinitionFDTO'

import {
    getLicenseDefinitionID,
} from '../helpers/BiLoTransformator'
import { Policy } from '../lib/Corelib'

const CORS_ACCESS_CONTROL_ALLOW_ORIGIN: string = (process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN) ? process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN : '*'

const AJV = new Ajv({
    strict: false
})
addFormats(AJV)

const VALIDATE = AJV.compile(LicenseDefinitionSchema)

class LicenseDefinitionCtrl extends BaseModelController<typeof LicenseDefinitionDAO, Policy, LicenseDefinitionFDTO> {

    createLicenseDefinition(): express.Handler {
        return async (req, res, next) => {
            // res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)

            try {
                let payload: Policy = req.body
                if (VALIDATE(payload)) {
                    await LicenseDefinitionDAO.create(payload)
                    return res.status(204).end()
                } else {
                    return res.status(400).end()
                }
            } catch (err) {
                if (err.message.toLowerCase().indexOf('duplicate') > -1) {
                    return res.status(409).end()
                }
                return next(err)
            }
        }
    }

    readLicenseDefinitions(): express.Handler {
        return async (req, res, next) => {
            try {
                if (req.query.policyid) {
                    let licenseDefinition = await LicenseDefinitionDAO.readById(req.query.policyid.toString())
                    return res.json(licenseDefinition)
                } else {
                    const orgId = req.session.user?.personenkontexte[0].organisation.id
                    let licenseDefinitions = (await LicenseDefinitionDAO.read()).filter((policy) => {
                        const refinement = policy.action![0].refinement.find((refinement) => { return refinement.uid === 'organisation' })
                        return refinement?.rightOperand === orgId
                    })
                    return res.json(licenseDefinitions)
                }
            } catch (err) {
                next(err)
            }
        }
    }

    readLicenseDefinitionById(): express.Handler {
        return async (req, res, next) => {
            // res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)

            try {
                let licenseDefinitionId = (req.params.licenseDefinitionId && req.params.licenseDefinitionId.indexOf('http') > -1)
                    ? req.params.licenseDefinitionId
                    : getLicenseDefinitionID(req.params.licenseDefinitionId)
                let licenseDefinition = await LicenseDefinitionDAO.readById(licenseDefinitionId)
                return res.json(licenseDefinition)
            } catch (err) {
                return next(err)
            }
        }
    }

    deleteLicenseDefinitionById(): express.Handler {
        return async (req, res, next) => {
            // res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)

            try {
                let licenseDefinitionId = (req.params.licenseDefinitionId && req.params.licenseDefinitionId.indexOf('http') > -1)
                    ? req.params.licenseDefinitionId
                    : getLicenseDefinitionID(req.params.licenseDefinitionId)
                await LicenseDefinitionDAO.deleteById(licenseDefinitionId)
                return res.status(204).end()
            } catch (err) {
                return next(err)
            }
        }
    }

}

const CONTROLLER = new LicenseDefinitionCtrl(LicenseDefinitionDAO, Policy, LicenseDefinitionFDTO)

/**
 * @openapi
 * /licenseDefinitions:
 *   post:
 *     description: Create License-definition object
 *     tags:
 *       - LicenseDefinitions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LicenseDefinition'
 *     responses:
 *       204:
 *         description: No Content.
 *       400:
 *         description: Bad Request.
 *       409:
 *         description: Conflict.
 *       500:
 *         description: Internal Server Error.
 */
CONTROLLER.router.post('/', CONTROLLER.createLicenseDefinition())

/**
 * @openapi
 * /licenseDefinitions:
 *   get:
 *     description: Request list of License-definition objects
 *     tags:
 *       - LicenseDefinitions
 *     parameters:
 *       - in: query
 *         name: policyid
 *         description: Filter by Policy-Id
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK - Returns a list of License-definition objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LicenseDefinition'
 *       500:
 *         description: Internal Server Error.
 */
CONTROLLER.router.get('/', CONTROLLER.readLicenseDefinitions())

/**
 * @openapi
 * /licenseDefinitions/{licenseDefinitionId}:
 *   get:
 *     description: Request License-definition object by License-definition-Id
 *     tags:
 *       - LicenseDefinitions
 *     parameters:
 *       - in: path
 *         name: licenseDefinitionId
 *         description: License-definition with specific Policy-Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK - Returns a License-definition object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LicenseDefinition'
 *       404:
 *         description: Not found.
 *       500:
 *         description: Internal Server Error.
 */
CONTROLLER.router.get('/:licenseDefinitionId', CONTROLLER.readLicenseDefinitionById())

CONTROLLER.activateStandardRouting()

export default CONTROLLER
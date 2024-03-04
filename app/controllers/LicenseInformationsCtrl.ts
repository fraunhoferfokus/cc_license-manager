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
import axios from 'axios'
import LicenseInformationDAO from '../models/LicenseInformation/LicenseInformationDAO'
import LicenseInformationModel from '../models/LicenseInformation/LicenseInformationModel'
import LicenseInformationSchema from '../models/LicenseInformation/LicenseInformationSchema'
import LicenseInformationFDTO from '../models/LicenseInformation/LicenseInformationFDTO'
import { URLSearchParams } from 'url'
import LicenseDefinitionDAO from '../models/LicenseDefinition/LicenseDefinitionDAO'

import BiLoTransformer from '../helpers/BiLoTransformator'
import BiLoTransformatorV2 from '../helpers/BiloTransformator2_2'
import LicenseDefinitionModel from '../models/LicenseDefinition/LicenseDefinitionModel.2_1'
import { spawn } from 'child_process'
import { Policy } from '../lib/Corelib'

const CORS_ACCESS_CONTROL_ALLOW_ORIGIN: string = (process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN) ? process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN : '*'

const LICENSE_INFORMATION_PROVIDER_API_PROTOCOL: string = (process.env.LICENSE_INFORMATION_PROVIDER_API_PROTOCOL) ? process.env.LICENSE_INFORMATION_PROVIDER_API_PROTOCOL : 'http'
const LICENSE_INFORMATION_PROVIDER_API_HOST: string = (process.env.LICENSE_INFORMATION_PROVIDER_API_HOST) ? process.env.LICENSE_INFORMATION_PROVIDER_API_HOST : '127.0.0.1'
const LICENSE_INFORMATION_PROVIDER_API_PORT: number = (process.env.LICENSE_INFORMATION_PROVIDER_API_PORT) ? parseInt(process.env.LICENSE_INFORMATION_PROVIDER_API_PORT) : 3041
const LICENSE_INFORMATION_PROVIDER_API_BASE_PATH: string = (process.env.LICENSE_INFORMATION_PROVIDER_API_BASE_PATH)
    ? (process.env.LICENSE_INFORMATION_PROVIDER_API_BASE_PATH.indexOf('/') == 0)
        ? process.env.LICENSE_INFORMATION_PROVIDER_API_BASE_PATH
        : '/' + process.env.LICENSE_INFORMATION_PROVIDER_API_BASE_PATH
    : ''

const LICENSE_INFORMATION_PROVIDER_API = LICENSE_INFORMATION_PROVIDER_API_PROTOCOL + '://' + LICENSE_INFORMATION_PROVIDER_API_HOST + ':' + LICENSE_INFORMATION_PROVIDER_API_PORT + LICENSE_INFORMATION_PROVIDER_API_BASE_PATH

const AJV = new Ajv({
    strict: false
})
addFormats(AJV)
const VALIDATE = AJV.compile(LicenseInformationSchema)

function createLicenseInformationAndLicenseDefinition(data: LicenseInformationModel, orgId: string = '12345'): Promise<number> {
    return new Promise(async (resolve) => {
        let licenseInformationCreated: LicenseInformationModel | undefined
        let licenseDefinitionCreated: Policy | undefined
        try {
            licenseInformationCreated = await LicenseInformationDAO.create(data)
            // let licenseDefinition = new BiLoTransformer(data).toLicenseDefinition()
            let licenseDefinition = new BiLoTransformatorV2(data).toLicenseDefinition(orgId)
            if (licenseDefinition) {
                licenseDefinitionCreated = await LicenseDefinitionDAO.create(licenseDefinition)
                resolve(204)
            } else {
                LicenseInformationDAO.deleteById(licenseInformationCreated._id)
                resolve(406)
            }
        } catch (err) {
            if (err.message.toLowerCase().indexOf('duplicate') > -1) {
                if (licenseInformationCreated) {
                    LicenseInformationDAO.deleteById(licenseInformationCreated._id)
                }
                if (licenseDefinitionCreated) {
                    LicenseDefinitionDAO.deleteById(licenseDefinitionCreated._id)
                }
                resolve(409)
            }
            resolve(500)
        }
    })
}

class LicenseInformationCtrl extends BaseModelController<typeof LicenseInformationDAO, LicenseInformationModel, LicenseInformationFDTO> {

    // fetchLicenseInformationsByTicketId(): express.Handler {
    //     return async (req, res, next) => {
    //         res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)

    //         try {
    //             await axios.get(`${LICENSE_INFORMATION_PROVIDER_API}/${req.params.ticketId}`)
    //                 .then(function (request_product_id_response) {
    //                     let list_of_import_responses: any[] = []

    //                     let request_product_id_response_data: LicenseInformationModel[] = []
    //                     if (Array.isArray(request_product_id_response.data)) {
    //                         request_product_id_response_data = request_product_id_response.data
    //                     } else {
    //                         request_product_id_response_data = [request_product_id_response.data]
    //                     }

    //                     request_product_id_response_data.forEach(async (request_product_id_object, idx) => {
    //                         let data: LicenseInformationModel = new LicenseInformationModel(request_product_id_object)
    //                         let status: number = await createLicenseInformationAndLicenseDefinition(data)
    //                         list_of_import_responses.push({
    //                             data,
    //                             status
    //                         })
    //                         if (idx === request_product_id_response_data.length - 1) {
    //                             return res.json(list_of_import_responses)
    //                         }
    //                     })
    //                 })
    //                 .catch((err) => {
    //                     return next(err)
    //                 })
    //         } catch (err) {
    //             return next(err)
    //         }
    //     }
    // }

    fetchLicenseInformationsByTicketIdV2(): express.Handler {
        return async (req, res, next) => {

            let context = {
                config: {
                    headers: {
                        Authorization: ''
                    }
                }
            }

            try {
                // import url search params using improt syntax


                // create new search params
                const params = new URLSearchParams({
                    client_id: process.env.OIDC_BILO_CLIENT_ID!,
                    client_secret: process.env.OIDC_BILO_CLIENT_SECRET!,
                    grant_type: 'client_credentials'
                })

                const response = await axios.post(process.env.OIDC_AUTH_BILO_ENDPOINT!, params)
                context.config = {
                    headers: {
                        Authorization: `Bearer ${response.data.access_token}`
                    }
                }


            } catch (err: any) {
                return next(err)
            }

            try {


                let config = {
                    headers: {
                        ...context.config.headers,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        package_id: req.params.ticketId
                    }
                }

                const { licenses } = (await axios.get(`${process.env.LICENSE_BILO_API}`, config)).data
                const orgId = req.session?.user?.personenkontexte?.[0]?.organisation?.id
                let request_product_response_data: LicenseInformationModel[] = licenses
                let list_of_import_responses: any[] = []

                for (let i = 0; i < request_product_response_data.length; i++) {
                    let request_product_object = request_product_response_data[i]
                    let data: LicenseInformationModel = new LicenseInformationModel({ ...request_product_object, _id: request_product_object.lizenzcode +"_"+ orgId })
                    let status: number = await createLicenseInformationAndLicenseDefinition(data, orgId)
                    list_of_import_responses.push({
                        data,
                        status
                    })
                }
                return res.json(list_of_import_responses)
            } catch (err) {
                return next(err)
            }
        }
    }

    createLicenseInformation(): express.Handler {
        return async (req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)

            try {
                if (VALIDATE(req.body)) {
                    let data: LicenseInformationModel = new LicenseInformationModel(req.body)
                    let status: number = await createLicenseInformationAndLicenseDefinition(data)
                    return res.status(status).end()
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

    deleteLicenseInformationById(): express.Handler {
        return async (req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)

            try {
                let licenseInformation = await LicenseInformationDAO.readById(req.params.licenseInformationId)
                await LicenseInformationDAO.deleteById(licenseInformation._id)
                let licenseDefinition = new BiLoTransformer(licenseInformation).toLicenseDefinition()
                if (licenseDefinition) {
                    await LicenseDefinitionDAO.deleteById(licenseDefinition.policyid)
                }
                return res.status(204).end()
            } catch (err) {
                return next(err)
            }
        }
    }

}

const CONTROLLER = new LicenseInformationCtrl(LicenseInformationDAO, LicenseInformationModel, LicenseInformationFDTO)

/**
 * @openapi
 * /licenseInformations/import/{ticketId}:
 *   get:
 *     description: Fetches License-information objects from external source by Ticket-Id (Download-Id) and creates them. Also creates the according License-definition objects.
 *     tags:
 *       - LicenseInformations
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         description: License-information objects with specific Ticket-Id (Download-Id)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK - Returns a list of License-information-Ids.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad Request.
 *       409:
 *         description: Conflict.
 *       500:
 *         description: Internal Server Error.
 */
// CONTROLLER.router.get('/import/:ticketId', CONTROLLER.fetchLicenseInformationsByTicketId())
CONTROLLER.router.get('/import2/:ticketId', CONTROLLER.fetchLicenseInformationsByTicketIdV2())

/**
 * @openapi
 * /licenseInformations:
 *   post:
 *     description: Create License-information object. Also creates according License-definition object.
 *     tags:
 *       - LicenseInformations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LicenseInformation'
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
CONTROLLER.router.post('/', CONTROLLER.createLicenseInformation())

/**
 * @openapi
 * /licenseInformations/{licenseInformationId}:
 *   delete:
 *     description: Deletes License-information object by License-information-Id. Also deletes according License-definition object.
 *     tags:
 *       - LicenseInformations
 *     parameters:
 *       - in: path
 *         name: licenseInformationId
 *         description: License-information with specific License-information-Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content.
 *       404:
 *         description: Not found.
 *       500:
 *         description: Internal Server Error.
 */
CONTROLLER.router.delete('/:licenseInformationId', CONTROLLER.deleteLicenseInformationById())

CONTROLLER.activateStandardRouting()

export default CONTROLLER
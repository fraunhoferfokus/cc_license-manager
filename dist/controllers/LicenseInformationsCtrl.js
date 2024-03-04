"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clm_core_1 = require("clm-core");
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const axios_1 = __importDefault(require("axios"));
const LicenseInformationDAO_1 = __importDefault(require("../models/LicenseInformation/LicenseInformationDAO"));
const LicenseInformationModel_1 = __importDefault(require("../models/LicenseInformation/LicenseInformationModel"));
const LicenseInformationSchema_1 = __importDefault(require("../models/LicenseInformation/LicenseInformationSchema"));
const LicenseInformationFDTO_1 = __importDefault(require("../models/LicenseInformation/LicenseInformationFDTO"));
const url_1 = require("url");
const LicenseDefinitionDAO_1 = __importDefault(require("../models/LicenseDefinition/LicenseDefinitionDAO"));
const BiLoTransformator_1 = __importDefault(require("../helpers/BiLoTransformator"));
const BiloTransformator2_2_1 = __importDefault(require("../helpers/BiloTransformator2_2"));
const CORS_ACCESS_CONTROL_ALLOW_ORIGIN = (process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN) ? process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN : '*';
const LICENSE_INFORMATION_PROVIDER_API_PROTOCOL = (process.env.LICENSE_INFORMATION_PROVIDER_API_PROTOCOL) ? process.env.LICENSE_INFORMATION_PROVIDER_API_PROTOCOL : 'http';
const LICENSE_INFORMATION_PROVIDER_API_HOST = (process.env.LICENSE_INFORMATION_PROVIDER_API_HOST) ? process.env.LICENSE_INFORMATION_PROVIDER_API_HOST : '127.0.0.1';
const LICENSE_INFORMATION_PROVIDER_API_PORT = (process.env.LICENSE_INFORMATION_PROVIDER_API_PORT) ? parseInt(process.env.LICENSE_INFORMATION_PROVIDER_API_PORT) : 3041;
const LICENSE_INFORMATION_PROVIDER_API_BASE_PATH = (process.env.LICENSE_INFORMATION_PROVIDER_API_BASE_PATH)
    ? (process.env.LICENSE_INFORMATION_PROVIDER_API_BASE_PATH.indexOf('/') == 0)
        ? process.env.LICENSE_INFORMATION_PROVIDER_API_BASE_PATH
        : '/' + process.env.LICENSE_INFORMATION_PROVIDER_API_BASE_PATH
    : '';
const LICENSE_INFORMATION_PROVIDER_API = LICENSE_INFORMATION_PROVIDER_API_PROTOCOL + '://' + LICENSE_INFORMATION_PROVIDER_API_HOST + ':' + LICENSE_INFORMATION_PROVIDER_API_PORT + LICENSE_INFORMATION_PROVIDER_API_BASE_PATH;
const AJV = new ajv_1.default({
    strict: false
});
(0, ajv_formats_1.default)(AJV);
const VALIDATE = AJV.compile(LicenseInformationSchema_1.default);
function createLicenseInformationAndLicenseDefinition(data) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let licenseInformationCreated;
        let licenseDefinitionCreated;
        try {
            licenseInformationCreated = yield LicenseInformationDAO_1.default.create(data);
            // let licenseDefinition = new BiLoTransformer(data).toLicenseDefinition()
            let licenseDefinition = new BiloTransformator2_2_1.default(data).toLicenseDefinition();
            if (licenseDefinition) {
                licenseDefinitionCreated = yield LicenseDefinitionDAO_1.default.create(licenseDefinition);
                resolve(204);
            }
            else {
                LicenseInformationDAO_1.default.deleteById(licenseInformationCreated._id);
                resolve(406);
            }
        }
        catch (err) {
            if (err.message.toLowerCase().indexOf('duplicate') > -1) {
                if (licenseInformationCreated) {
                    LicenseInformationDAO_1.default.deleteById(licenseInformationCreated._id);
                }
                if (licenseDefinitionCreated) {
                    LicenseDefinitionDAO_1.default.deleteById(licenseDefinitionCreated._id);
                }
                resolve(409);
            }
            resolve(500);
        }
    }));
}
class LicenseInformationCtrl extends clm_core_1.BaseModelController {
    fetchLicenseInformationsByTicketId() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN);
            try {
                yield axios_1.default.get(`${LICENSE_INFORMATION_PROVIDER_API}/${req.params.ticketId}`)
                    .then(function (request_product_id_response) {
                    let list_of_import_responses = [];
                    let request_product_id_response_data = [];
                    if (Array.isArray(request_product_id_response.data)) {
                        request_product_id_response_data = request_product_id_response.data;
                    }
                    else {
                        request_product_id_response_data = [request_product_id_response.data];
                    }
                    request_product_id_response_data.forEach((request_product_id_object, idx) => __awaiter(this, void 0, void 0, function* () {
                        let data = new LicenseInformationModel_1.default(request_product_id_object);
                        let status = yield createLicenseInformationAndLicenseDefinition(data);
                        list_of_import_responses.push({
                            data,
                            status
                        });
                        if (idx === request_product_id_response_data.length - 1) {
                            return res.json(list_of_import_responses);
                        }
                    }));
                })
                    .catch((err) => {
                    return next(err);
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    fetchLicenseInformationsByTicketIdV2() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let context = {
                config: {
                    headers: {
                        Authorization: ''
                    }
                }
            };
            try {
                // import url search params using improt syntax
                // create new search params
                const params = new url_1.URLSearchParams({
                    client_id: process.env.OIDC_BILO_CLIENT_ID,
                    client_secret: process.env.OIDC_BILO_CLIENT_SECRET,
                    grant_type: 'client_credentials'
                });
                const response = yield axios_1.default.post(process.env.OIDC_AUTH_BILO_ENDPOINT, params);
                context.config = {
                    headers: {
                        Authorization: `Bearer ${response.data.access_token}`
                    }
                };
            }
            catch (err) {
                return next(err);
            }
            res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN);
            try {
                let config = {
                    headers: Object.assign(Object.assign({}, context.config.headers), { 'Content-Type': 'application/x-www-form-urlencoded' }),
                    data: {
                        package_id: req.params.ticketId
                    }
                };
                const { licenses } = (yield axios_1.default.get(`${process.env.LICENSE_BILO_API}`, config)).data;
                let request_product_id_response_data = licenses;
                let list_of_import_responses = [];
                for (let i = 0; i < request_product_id_response_data.length; i++) {
                    let data = new LicenseInformationModel_1.default(request_product_id_response_data[i]);
                    let status = yield createLicenseInformationAndLicenseDefinition(data);
                    list_of_import_responses.push({
                        data,
                        status
                    });
                }
                return res.json(list_of_import_responses);
            }
            catch (err) {
                console.error(err.response);
                return next(err);
            }
        });
    }
    createLicenseInformation() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN);
            try {
                if (VALIDATE(req.body)) {
                    let data = new LicenseInformationModel_1.default(req.body);
                    let status = yield createLicenseInformationAndLicenseDefinition(data);
                    return res.status(status).end();
                }
                else {
                    return res.status(400).end();
                }
            }
            catch (err) {
                if (err.message.toLowerCase().indexOf('duplicate') > -1) {
                    return res.status(409).end();
                }
                return next(err);
            }
        });
    }
    deleteLicenseInformationById() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN);
            try {
                let licenseInformation = yield LicenseInformationDAO_1.default.readById(req.params.licenseInformationId);
                yield LicenseInformationDAO_1.default.deleteById(licenseInformation._id);
                let licenseDefinition = new BiLoTransformator_1.default(licenseInformation).toLicenseDefinition();
                if (licenseDefinition) {
                    yield LicenseDefinitionDAO_1.default.deleteById(licenseDefinition.policyid);
                }
                return res.status(204).end();
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
const CONTROLLER = new LicenseInformationCtrl(LicenseInformationDAO_1.default, LicenseInformationModel_1.default, LicenseInformationFDTO_1.default);
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
CONTROLLER.router.get('/import/:ticketId', CONTROLLER.fetchLicenseInformationsByTicketId());
CONTROLLER.router.get('/import2/:ticketId', CONTROLLER.fetchLicenseInformationsByTicketIdV2());
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
CONTROLLER.router.post('/', CONTROLLER.createLicenseInformation());
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
CONTROLLER.router.delete('/:licenseInformationId', CONTROLLER.deleteLicenseInformationById());
CONTROLLER.activateStandardRouting();
exports.default = CONTROLLER;

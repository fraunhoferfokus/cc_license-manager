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
const LicenseDefinitionDAO_1 = __importDefault(require("../models/LicenseDefinition/LicenseDefinitionDAO"));
const LicenseDefinitionSchema_1 = __importDefault(require("../models/LicenseDefinition/LicenseDefinitionSchema"));
const LicenseDefinitionFDTO_1 = __importDefault(require("../models/LicenseDefinition/LicenseDefinitionFDTO"));
const BiLoTransformator_1 = require("../helpers/BiLoTransformator");
const Corelib_1 = require("../lib/Corelib");
const CORS_ACCESS_CONTROL_ALLOW_ORIGIN = (process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN) ? process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN : '*';
const AJV = new ajv_1.default({
    strict: false
});
(0, ajv_formats_1.default)(AJV);
const VALIDATE = AJV.compile(LicenseDefinitionSchema_1.default);
class LicenseDefinitionCtrl extends clm_core_1.BaseModelController {
    createLicenseDefinition() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN);
            try {
                let payload = req.body;
                if (VALIDATE(payload)) {
                    yield LicenseDefinitionDAO_1.default.create(payload);
                    return res.status(204).end();
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
    readLicenseDefinitions() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN);
            try {
                if (req.query.policyid) {
                    let licenseDefinition = yield LicenseDefinitionDAO_1.default.readById(req.query.policyid.toString());
                    return res.json(licenseDefinition);
                }
                else {
                    let licenseDefinitions = yield LicenseDefinitionDAO_1.default.read();
                    return res.json(licenseDefinitions);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    readLicenseDefinitionById() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN);
            try {
                let licenseDefinitionId = (req.params.licenseDefinitionId && req.params.licenseDefinitionId.indexOf('http') > -1)
                    ? req.params.licenseDefinitionId
                    : (0, BiLoTransformator_1.getLicenseDefinitionID)(req.params.licenseDefinitionId);
                let licenseDefinition = yield LicenseDefinitionDAO_1.default.readById(licenseDefinitionId);
                return res.json(licenseDefinition);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    deleteLicenseDefinitionById() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN);
            try {
                let licenseDefinitionId = (req.params.licenseDefinitionId && req.params.licenseDefinitionId.indexOf('http') > -1)
                    ? req.params.licenseDefinitionId
                    : (0, BiLoTransformator_1.getLicenseDefinitionID)(req.params.licenseDefinitionId);
                yield LicenseDefinitionDAO_1.default.deleteById(licenseDefinitionId);
                return res.status(204).end();
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
const CONTROLLER = new LicenseDefinitionCtrl(LicenseDefinitionDAO_1.default, Corelib_1.Policy, LicenseDefinitionFDTO_1.default);
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
CONTROLLER.router.post('/', CONTROLLER.createLicenseDefinition());
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
CONTROLLER.router.get('/', CONTROLLER.readLicenseDefinitions());
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
CONTROLLER.router.get('/:licenseDefinitionId', CONTROLLER.readLicenseDefinitionById());
CONTROLLER.activateStandardRouting();
exports.default = CONTROLLER;

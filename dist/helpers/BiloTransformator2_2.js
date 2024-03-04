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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLicenseDefinitionID = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const LicenseDefinitionModel_2_2_1 = __importDefault(require("../models/LicenseDefinition/LicenseDefinitionModel.2_2"));
const PROTOCOL = (process.env.PROTOCOL) ? process.env.PROTOCOL : 'https';
const HOST = (process.env.HOST) ? process.env.HOST : 'localhost';
const PORT = (process.env.PORT) ? parseInt(process.env.PORT) : 443;
const BASE_PATH = (process.env.BASE_PATH)
    ? (process.env.BASE_PATH.indexOf('/') == 0)
        ? process.env.BASE_PATH
        : '/' + process.env.BASE_PATH
    : '';
const ENDPOINT = PROTOCOL + '://' + HOST + BASE_PATH + '/' + 'licenseDefinitions';
const DEFAULT = {
    kaufreferenz: '1970-01-01T00:00:01.000Z',
    gueltigkeitsdauer: '0',
    nutzungssysteme: 'Bildungslogin',
    lizenzanzahl: '0',
};
function getLicenseDefinitionID(id) {
    try {
        return [ENDPOINT, id].join('/');
    }
    catch (error) {
        return '';
    }
}
exports.getLicenseDefinitionID = getLicenseDefinitionID;
class BiLoTransformatorV2 {
    constructor(data) {
        this.licenseInformation = data;
    }
    toLicenseDefinition() {
        var _a, _b, _c, _d, _e, _f;
        try {
            //@ts-ignore
            if (this.licenseInformation.lizenztyp === 'Lerngruppenlizenz') {
                this.licenseInformation.lizenztyp = 'Gruppenlizenz';
            }
            let policyid = getLicenseDefinitionID(this.licenseInformation.lizenzcode);
            let actionObjects = [];
            const defaultGueltigskeitbeginn = new Date().toISOString();
            const defaultGueltigskeitende = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
            let useActionObject = {
                action: 'use',
                refinement: [
                    {
                        // Lizenzanzahl
                        uid: 'lizenzanzahl',
                        leftOperand: 'count',
                        operator: 'eq',
                        rightOperand: (_a = this.licenseInformation.lizenzanzahl.toString()) !== null && _a !== void 0 ? _a : DEFAULT.lizenzanzahl,
                    },
                    {
                        //Kaufreferenz
                        uid: 'kaufreferenz',
                        leftOperand: 'dateTime',
                        operator: 'eq',
                        rightOperand: (_b = this.licenseInformation.kaufreferenz) !== null && _b !== void 0 ? _b : DEFAULT.kaufreferenz,
                    },
                    {
                        // Gueltigskeitsbeginn
                        uid: 'gueltigskeitsdauer',
                        leftOperand: 'dateTime',
                        operator: 'gteq',
                        rightOperand: this.licenseInformation.gueltigkeitsbeginn ? new Date(this.licenseInformation.gueltigkeitsbeginn.replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$2/$1/$3")).toISOString() : defaultGueltigskeitbeginn,
                    },
                    {
                        // Gueltigskeitsende
                        uid: 'guelitgskeitsende',
                        leftOperand: 'dateTime',
                        operator: 'lteq',
                        rightOperand: this.licenseInformation.gueltigkeitsende ? new Date(this.licenseInformation.gueltigkeitsende.replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$2/$1/$3")).toISOString() : defaultGueltigskeitende
                    },
                    // GÜltigskeitsdauer
                    {
                        uid: 'gueltigkeitsdauer',
                        leftOperand: 'elapsedTime',
                        operator: 'eq',
                        rightOperand: (_c = this.licenseInformation.gueltigkeitsdauer) !== null && _c !== void 0 ? _c : DEFAULT.gueltigkeitsdauer,
                    },
                    // Nutzungssysteme
                    {
                        uid: 'nutzungssysteme',
                        leftOperand: 'system',
                        operator: 'eq',
                        rightOperand: (_d = this.licenseInformation.nutzungssysteme) !== null && _d !== void 0 ? _d : DEFAULT.nutzungssysteme,
                    },
                    // Lizenztyp
                    {
                        uid: 'lizenztyp',
                        leftOperand: 'purpose',
                        operator: 'eq',
                        rightOperand: (_e = this.licenseInformation.lizenztyp) !== null && _e !== void 0 ? _e : DEFAULT.lizenztyp,
                    },
                ]
            };
            if (this.licenseInformation.sonderlizenz === 'Lehrkraft') {
                useActionObject.refinement.push({
                    leftOperand: 'recipient',
                    operator: 'eq',
                    rightOperand: 'Lehrkraft',
                    uid: 'sonderlizenz'
                });
            }
            actionObjects.push(useActionObject);
            if (this.licenseInformation.lizenztyp === 'Gruppenlizenz') {
                let concurrentUseActionObject = {
                    action: 'concurrentUse',
                    refinement: [
                        {
                            uid: 'lizenzanzahl',
                            leftOperand: 'count',
                            operator: 'eq',
                            rightOperand: (_f = this.licenseInformation.lizenzanzahl.toString()) !== null && _f !== void 0 ? _f : DEFAULT.lizenzanzahl,
                        }
                    ]
                };
                actionObjects.push(concurrentUseActionObject);
            }
            let policy = new LicenseDefinitionModel_2_2_1.default({
                _id: policyid,
                action: actionObjects,
                permission: [],
                prohibition: [],
                obligation: [],
                uid: policyid,
                constraint: [],
                target: this.licenseInformation.product_id,
                // lizenzgeber
                assignee: this.licenseInformation.lizenzgeber,
                assigner: this.licenseInformation.school_identifier
            });
            return policy;
        }
        catch (err) {
            console.error(err);
            return undefined;
        }
    }
}
exports.default = BiLoTransformatorV2;

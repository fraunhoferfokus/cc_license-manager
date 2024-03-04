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
const LicenseDefinitionModel_2_1_1 = __importDefault(require("../models/LicenseDefinition/LicenseDefinitionModel.2_1"));
const LicenseDefinitionVocabulary_2_1_1 = __importDefault(require("../models/LicenseDefinition/LicenseDefinitionVocabulary.2_1"));
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
class BiLoTransformator {
    constructor(data) {
        this.licenseInformation = data;
    }
    toLicenseDefinition() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        try {
            //@ts-ignore
            if (this.licenseInformation.lizenztyp === 'Lerngruppenlizenz') {
                this.licenseInformation.lizenztyp = 'Gruppenlizenz';
            }
            let policyid = getLicenseDefinitionID(this.licenseInformation.lizenzcode);
            let permissions = [
                {
                    // product-id
                    target: this.licenseInformation.product_id,
                    // lizenzgeber
                    assigner: this.licenseInformation.lizenzgeber,
                    assignee: this.licenseInformation.school_identifier,
                    action: LicenseDefinitionVocabulary_2_1_1.default.Actions.Permission.use,
                    constraints: [
                        // Lizenzanzahl
                        {
                            name: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Name.count,
                            operator: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Operator.eq,
                            rightoperand: (_a = this.licenseInformation.lizenzanzahl.toString()) !== null && _a !== void 0 ? _a : DEFAULT.lizenzanzahl, //TODO: BiLoTransformator.getLizenzanzahl()
                        },
                        // Kaufreferenz
                        {
                            name: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Name.dateTime,
                            operator: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Operator.eq,
                            rightoperand: (_b = this.licenseInformation.kaufreferenz) !== null && _b !== void 0 ? _b : DEFAULT.kaufreferenz, //TODO: BiLoTransformator.getKaufreferenz()
                        },
                        // Gültigskeitsbeginn
                        {
                            name: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Name.dateTime,
                            operator: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Operator.gteq,
                            rightoperand: new Date(((_d = (_c = this.licenseInformation) === null || _c === void 0 ? void 0 : _c.gueltigkeitsbeginn) === null || _d === void 0 ? void 0 : _d.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) || new Date()).valueOf(),
                        },
                        // Gültigkeitsende
                        {
                            name: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Name.dateTime,
                            operator: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Operator.lteq,
                            rightoperand: new Date(((_f = (_e = this.licenseInformation) === null || _e === void 0 ? void 0 : _e.gueltigkeitsende) === null || _f === void 0 ? void 0 : _f.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) || new Date().valueOf()).valueOf(),
                        },
                        // Gültigkeitsdauer
                        {
                            name: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Name.elapsedTime,
                            operator: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Operator.eq,
                            rightoperand: (_h = (_g = this.licenseInformation.gueltigkeitsdauer) === null || _g === void 0 ? void 0 : _g.split(' ')[0]) !== null && _h !== void 0 ? _h : DEFAULT.gueltigkeitsdauer, //TODO: BiLoTransformator.getGueltigkeitsdauer()
                        },
                        // Nutzungssysteme
                        {
                            name: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Name.product,
                            operator: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Operator.eq,
                            rightoperand: (_j = this.licenseInformation.nutzungssysteme) !== null && _j !== void 0 ? _j : DEFAULT.nutzungssysteme, ////TODO: BiLoTransformator.getNutzungssysteme()
                        },
                        // Lizenztyp
                        {
                            name: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Name.purpose,
                            operator: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Operator.eq,
                            rightoperand: this.licenseInformation.lizenztyp, ////TODO: BiLoTransformator.getNutzungssysteme()
                        },
                    ],
                },
            ];
            // instructor license
            if (this.licenseInformation.sonderlizenz === 'Lehrkraft') {
                permissions[0].constraints.push({
                    name: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Name.recipient,
                    operator: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Operator.eq,
                    rightoperand: 'Lehrkraft',
                });
            }
            // concurrent use
            if (this.licenseInformation.lizenztyp === 'Gruppenlizenz') {
                permissions.push({
                    target: this.licenseInformation.product_id,
                    assigner: this.licenseInformation.lizenzgeber,
                    assignee: this.licenseInformation.school_identifier,
                    action: LicenseDefinitionVocabulary_2_1_1.default.Actions.Permission.concurrentUse,
                    constraints: [
                        {
                            name: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Name.count,
                            operator: LicenseDefinitionVocabulary_2_1_1.default.Constraints.Operator.eq,
                            rightoperand: (_k = this.licenseInformation.lizenzanzahl.toString()) !== null && _k !== void 0 ? _k : DEFAULT.lizenzanzahl, //TODO: BiLoTransformator.getLizenzanzahl()
                        },
                    ],
                });
            }
            let licenseDefinition = new LicenseDefinitionModel_2_1_1.default({
                _id: policyid,
                policyid,
                policytype: LicenseDefinitionVocabulary_2_1_1.default.PolicyTypes.Agreement,
                permissions,
            });
            return licenseDefinition;
        }
        catch (err) {
            console.error(err);
            return undefined;
        }
    }
}
exports.default = BiLoTransformator;

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
Object.defineProperty(exports, "__esModule", { value: true });
const clm_core_1 = require("clm-core");
/**
 * LicenseInformation datamodel which is used by {@link LicenseInformationBDTO}
 * @public
 */
class LicenseInformationModel extends clm_core_1.BaseDatamodel {
    constructor(payload) {
        super(payload);
        this._id = payload.lizenzcode;
        this.lizenzcode = payload.lizenzcode;
        this.product_id = payload.product_id;
        this.lizenzanzahl = payload.lizenzanzahl;
        this.lizenzgeber = payload.lizenzgeber;
        if (payload.kaufreferenz) {
            this.kaufreferenz = payload.kaufreferenz;
        }
        if (payload.school_identifier) {
            this.school_identifier = payload.school_identifier;
        }
        if (payload.nutzungssysteme) {
            this.nutzungssysteme = payload.nutzungssysteme;
        }
        if (payload.gueltigkeitsbeginn) {
            this.gueltigkeitsbeginn = payload.gueltigkeitsbeginn;
        }
        if (payload.gueltigkeitsende) {
            this.gueltigkeitsende = payload.gueltigkeitsende;
        }
        if (payload.gueltigkeitsdauer) {
            this.gueltigkeitsdauer = payload.gueltigkeitsdauer;
        }
        if (payload.sonderlizenz) {
            this.sonderlizenz = payload.sonderlizenz;
        }
        if (payload.lizenztyp) {
            this.lizenztyp = payload.lizenztyp;
        }
    }
}
exports.default = LicenseInformationModel;
/**
 * @openapi
 * components:
 *   schemas:
 *     LicenseInformation:
 *       type: object
 *       required:
 *         - lizenzcode
 *         - product_id
 *         - lizenzanzahl
 *         - lizenzgeber
 *         - lizenztyp
 *       properties:
 *         _id:
 *           type: string
 *         lizenzcode:
 *           type: string
 *         product_id:
 *           type: string
 *         lizenzanzahl:
 *           type: number
 *           minValue: 0
 *         lizenzgeber:
 *           type: string
 *         kaufreferenz:
 *           type: string
 *         school_identifier:
 *           type: string
 *         nutzungssysteme:
 *           type: string
 *         gueltigkeitsbeginn:
 *           type: string
 *         gueltigkeitsende:
 *           type: string
 *         gueltigkeitsdauer:
 *           type: string
 *         sonderlizenz:
 *           type: string
 *           enum:
 *             - 'Demo'
 *             - 'Lehrkraft'
 *         lizenztyp:
 *           type: string
 *           enum:
 *             - 'Schullizenz'
 *             - 'Gruppenlizenz'
 *             - 'Volumenlizenz'
 *             - 'Einzellizenz'
 *       xml:
 *         name: LicenseInformation
 *       additionalProperties: false
 */

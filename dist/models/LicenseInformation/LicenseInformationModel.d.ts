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
import { BaseDatamodel, iBaseDatamodel } from 'clm-core';
declare type Sonderlizenztypen = 'Demo' | 'Lehrkraft';
declare type Lizenztypen = 'Schullizenz' | 'Gruppenlizenz' | 'Volumenlizenz' | 'Einzellizenz';
/**
 * @public
 * The payload which is passed to the constructor of {@link LicenseInformationModel}
 */
export interface iLicenseInformationModel extends iBaseDatamodel {
    /**
     * The identifier of the LicenseInformation object
     */
    _id: string;
    lizenzcode: string;
    product_id: string;
    lizenzanzahl: number;
    lizenzgeber: string;
    kaufreferenz?: string;
    school_identifier?: string;
    nutzungssysteme?: string;
    gueltigkeitsbeginn?: string;
    gueltigkeitsende?: string;
    gueltigkeitsdauer?: string;
    sonderlizenz?: Sonderlizenztypen;
    lizenztyp: Lizenztypen;
}
/**
 * LicenseInformation datamodel which is used by {@link LicenseInformationBDTO}
 * @public
 */
export default class LicenseInformationModel extends BaseDatamodel implements iLicenseInformationModel {
    /**
     *
     * {@inheritDoc iLicenseInformationModel._id}
     */
    _id: string;
    lizenzcode: string;
    product_id: string;
    lizenzanzahl: number;
    lizenzgeber: string;
    kaufreferenz?: string;
    school_identifier?: string;
    nutzungssysteme?: string;
    gueltigkeitsbeginn?: string;
    gueltigkeitsende?: string;
    gueltigkeitsdauer?: string;
    sonderlizenz?: Sonderlizenztypen;
    lizenztyp: Lizenztypen;
    constructor(payload: iLicenseInformationModel);
}
export {};
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

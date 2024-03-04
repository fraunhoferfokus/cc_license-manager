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
    BaseFrontendDTO,
    iBaseFrontendDTO,
} from 'clm-core'

type Sonderlizenztypen = 'Demo' | 'Lehrkraft'
type Lizenztypen = 'Schullizenz' | 'Lerngruppenlizenz' | 'Volumenlizenz' | 'Einzellizenz'

interface iLicenseInformationFDTO extends iBaseFrontendDTO {
    _id: string
    lizenzcode: string
    product_id: string
    lizenzanzahl: number
    lizenzgeber: string
    kaufreferenz?: string
    school_identifier?: string
    nutzungssysteme?: string
    gueltigkeitsbeginn?: string
    gueltigkeitsende?: string
    gueltigkeitsdauer?: string
    sonderlizenz?: Sonderlizenztypen
    lizenztyp?: Lizenztypen
}

export default class LicenseInformationFDTO extends BaseFrontendDTO implements iLicenseInformationFDTO {
    _id: string
    lizenzcode: string
    product_id: string
    lizenzanzahl: number
    lizenzgeber: string
    kaufreferenz?: string
    school_identifier?: string
    nutzungssysteme?: string
    gueltigkeitsbeginn?: string
    gueltigkeitsende?: string
    gueltigkeitsdauer?: string
    sonderlizenz?: Sonderlizenztypen
    lizenztyp?: Lizenztypen

    constructor(payload: iLicenseInformationFDTO) {
        super(payload)
        this._id = payload.lizenzcode

        this.lizenzcode = payload.lizenzcode
        this.product_id = payload.product_id
        this.lizenzanzahl = payload.lizenzanzahl
        this.lizenzgeber = payload.lizenzgeber

        if (payload.kaufreferenz) {
            this.kaufreferenz = payload.kaufreferenz
        }
        if (payload.school_identifier) {
            this.school_identifier = payload.school_identifier
        }
        if (payload.nutzungssysteme) {
            this.nutzungssysteme = payload.nutzungssysteme
        }
        if (payload.gueltigkeitsbeginn) {
            this.gueltigkeitsbeginn = payload.gueltigkeitsbeginn
        }
        if (payload.gueltigkeitsende) {
            this.gueltigkeitsende = payload.gueltigkeitsende
        }
        if (payload.gueltigkeitsdauer) {
            this.gueltigkeitsdauer = payload.gueltigkeitsdauer
        }
        if (payload.sonderlizenz) {
            this.sonderlizenz = payload.sonderlizenz
        }
        if (payload.lizenztyp) {
            this.lizenztyp = payload.lizenztyp
        }
    }
}

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

import dotenv from 'dotenv'
dotenv.config()

// import Policy from '../models/LicenseInformation/LicenseInformationModel'

import LicenseDefinitionVocabulary from '../models/LicenseDefinition/LicenseDefinitionVocabulary.2_1'
import Policy, { ActionObject, Rule } from '../models/LicenseDefinition/LicenseDefinitionModel.2_2'
import LicenseInformationModel from '../models/LicenseInformation/LicenseInformationModel'

const PROTOCOL: string = (process.env.PROTOCOL) ? process.env.PROTOCOL : 'https'
const HOST: string = (process.env.HOST) ? process.env.HOST : 'localhost'
const PORT: number = (process.env.PORT) ? parseInt(process.env.PORT) : 443
const BASE_PATH: string = (process.env.BASE_PATH)
    ? (process.env.BASE_PATH.indexOf('/') == 0)
        ? process.env.BASE_PATH
        : '/' + process.env.BASE_PATH
    : ''

const ENDPOINT = PROTOCOL + '://' + HOST + BASE_PATH + '/' + 'licenseDefinitions'


const DEFAULT: any = {
    kaufreferenz: '1970-01-01T00:00:01.000Z',
    gueltigkeitsdauer: '0',
    nutzungssysteme: 'Bildungslogin',
    lizenzanzahl: '0',
}

export function getLicenseDefinitionID(id: string): string {
    try {
        return [ENDPOINT, id].join('/')
    } catch (error) {
        return ''
    }
}

class BiLoTransformatorV2 {
    licenseInformation: LicenseInformationModel

    constructor(data: LicenseInformationModel) {
        this.licenseInformation = data
    }

    toLicenseDefinition(orgId: string): Policy | undefined {
        try {

            //@ts-ignore
            if (this.licenseInformation.lizenztyp === 'Lerngruppenlizenz') {
                this.licenseInformation.lizenztyp = 'Gruppenlizenz'
            }

            let policyid = getLicenseDefinitionID(this.licenseInformation.lizenzcode + '_' + orgId)

            let actionObjects: ActionObject[] = []



            const defaultGueltigskeitbeginn = new Date().toISOString()
            const defaultGueltigskeitende = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString()

            const formatedGueltigkeitsbeginn = this.licenseInformation?.gueltigkeitsbeginn?.replace(/(\d{2})\-(\d{2})-(\d{4})/, "$2/$1/$3")
            const formatedGueltigkeitsende = this.licenseInformation?.gueltigkeitsende?.replace(/(\d{2})\-(\d{2})-(\d{4})/, "$2/$1/$3")



            let useActionObject: ActionObject = {
                action: 'use',
                refinement: [
                    {
                        // Lizenzcode
                        uid: 'lizenzcode',
                        leftOperand: 'version',
                        operator: 'eq',
                        rightOperand: this.licenseInformation.lizenzcode ?? DEFAULT.lizenzcode,
                    },
                    {
                        // Lizenzanzahl
                        uid: 'lizenzanzahl',
                        leftOperand: 'count',
                        operator: 'eq',
                        rightOperand: this.licenseInformation.lizenzanzahl.toString() ?? DEFAULT.lizenzanzahl,
                    },
                    {
                        //Kaufreferenz
                        uid: 'kaufreferenz',
                        leftOperand: 'dateTime',
                        operator: 'eq',
                        rightOperand: this.licenseInformation.kaufreferenz ?? DEFAULT.kaufreferenz,
                    },
                    {
                        // Gueltigskeitsbeginn
                        uid: 'gueltigkeitsbeginn',
                        leftOperand: 'dateTime',
                        operator: 'gteq',
                        rightOperand: this.licenseInformation.gueltigkeitsbeginn ? new Date(formatedGueltigkeitsbeginn!).toISOString() : defaultGueltigskeitbeginn,
                    },
                    {
                        // Gueltigskeitsende
                        uid: 'gueltigkeitsende',
                        leftOperand: 'dateTime',
                        operator: 'lteq',
                        rightOperand: this.licenseInformation.gueltigkeitsende ? new Date(formatedGueltigkeitsende!).toISOString() : defaultGueltigskeitende
                    },

                    // GÜltigskeitsdauer
                    {
                        uid: 'gueltigkeitsdauer',
                        leftOperand: 'elapsedTime',
                        operator: 'eq',
                        rightOperand: this.licenseInformation.gueltigkeitsdauer ?? DEFAULT.gueltigkeitsdauer,
                    },
                    // Nutzungssysteme
                    {
                        uid: 'nutzungssysteme',
                        leftOperand: 'system',
                        operator: 'eq',
                        rightOperand: this.licenseInformation.nutzungssysteme ?? DEFAULT.nutzungssysteme,
                    },
                    // Lizenztyp
                    {
                        uid: 'lizenztyp',
                        leftOperand: 'purpose',
                        operator: 'eq',
                        rightOperand: this.licenseInformation.lizenztyp ?? DEFAULT.lizenztyp,
                    },
                    // organisation
                    {
                        uid: 'organisation',
                        leftOperand: 'system',
                        operator: 'eq',
                        rightOperand: orgId,
                    }
                ]
            }

            if (this.licenseInformation.sonderlizenz === 'Lehrkraft') {
                useActionObject.refinement.push(
                    {
                        leftOperand: 'recipient',
                        operator: 'eq',
                        rightOperand: 'Lehrkraft',
                        uid: 'sonderlizenz'
                    }
                )
            }

            actionObjects.push(useActionObject)

            if (this.licenseInformation.lizenztyp === 'Gruppenlizenz') {
                let concurrentUseActionObject: ActionObject = {
                    action: 'concurrentUse',
                    refinement: [
                        {
                            uid: 'lizenzanzahl',
                            leftOperand: 'count',
                            operator: 'eq',
                            rightOperand: this.licenseInformation.lizenzanzahl.toString() ?? DEFAULT.lizenzanzahl,
                        }
                    ]
                }
                actionObjects.push(concurrentUseActionObject)
            }

            let policy: Policy = new Policy({
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
            })
            return policy
        } catch (err) {
            console.error(err)
            return undefined
        }
    }

}

export default BiLoTransformatorV2
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

import LicenseInformationModel from '../models/LicenseInformation/LicenseInformationModel'
import LicenseDefinitionModel, {
    Permission,
} from '../models/LicenseDefinition/LicenseDefinitionModel.2_1'
import LicenseDefinitionVocabulary from '../models/LicenseDefinition/LicenseDefinitionVocabulary.2_1'

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

class BiLoTransformator {
    licenseInformation: LicenseInformationModel

    constructor(data: LicenseInformationModel) {
        this.licenseInformation = data
    }

    toLicenseDefinition(): LicenseDefinitionModel | undefined {
        try {

            //@ts-ignore
            if (this.licenseInformation.lizenztyp === 'Lerngruppenlizenz') {
                this.licenseInformation.lizenztyp = 'Gruppenlizenz'
            }

            let policyid = getLicenseDefinitionID(this.licenseInformation.lizenzcode)



            let permissions: Permission[] = [
                {
                    // product-id
                    target: this.licenseInformation.product_id,
                    // lizenzgeber
                    assigner: this.licenseInformation.lizenzgeber,
                    assignee: this.licenseInformation.school_identifier,
                    action: LicenseDefinitionVocabulary.Actions.Permission.use,
                    constraints: [
                        // Lizenzanzahl
                        {
                            name: LicenseDefinitionVocabulary.Constraints.Name.count,
                            operator: LicenseDefinitionVocabulary.Constraints.Operator.eq,
                            rightoperand: this.licenseInformation.lizenzanzahl.toString() ?? DEFAULT.lizenzanzahl, //TODO: BiLoTransformator.getLizenzanzahl()
                        },
                        // Kaufreferenz
                        {
                            name: LicenseDefinitionVocabulary.Constraints.Name.dateTime,
                            operator: LicenseDefinitionVocabulary.Constraints.Operator.eq,
                            rightoperand: this.licenseInformation.kaufreferenz ?? DEFAULT.kaufreferenz, //TODO: BiLoTransformator.getKaufreferenz()
                        },
                        // Gültigskeitsbeginn
                        {
                            name: LicenseDefinitionVocabulary.Constraints.Name.dateTime,
                            operator: LicenseDefinitionVocabulary.Constraints.Operator.gteq,
                            rightoperand: new Date(this.licenseInformation?.gueltigkeitsbeginn?.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") || new Date()).valueOf(),
                        },
                        // Gültigkeitsende
                        {
                            name: LicenseDefinitionVocabulary.Constraints.Name.dateTime,
                            operator: LicenseDefinitionVocabulary.Constraints.Operator.lteq,
                            rightoperand: new Date(this.licenseInformation?.gueltigkeitsende?.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") || new Date().valueOf()).valueOf(),
                        },
                        // Gültigkeitsdauer
                        {
                            name: LicenseDefinitionVocabulary.Constraints.Name.elapsedTime,
                            operator: LicenseDefinitionVocabulary.Constraints.Operator.eq,
                            rightoperand: this.licenseInformation.gueltigkeitsdauer?.split(' ')[0] ?? DEFAULT.gueltigkeitsdauer, //TODO: BiLoTransformator.getGueltigkeitsdauer()
                        },
                        // Nutzungssysteme
                        {
                            name: LicenseDefinitionVocabulary.Constraints.Name.product,
                            operator: LicenseDefinitionVocabulary.Constraints.Operator.eq,
                            rightoperand: this.licenseInformation.nutzungssysteme ?? DEFAULT.nutzungssysteme, ////TODO: BiLoTransformator.getNutzungssysteme()
                        },
                        // Lizenztyp
                        {
                            name: LicenseDefinitionVocabulary.Constraints.Name.purpose,
                            operator: LicenseDefinitionVocabulary.Constraints.Operator.eq,
                            rightoperand: this.licenseInformation.lizenztyp, ////TODO: BiLoTransformator.getNutzungssysteme()
                        },


                    ],
                },

            ]

            // instructor license
            if (this.licenseInformation.sonderlizenz === 'Lehrkraft') {
                permissions[0]!.constraints!.push({
                    name: LicenseDefinitionVocabulary.Constraints.Name.recipient,
                    operator: LicenseDefinitionVocabulary.Constraints.Operator.eq,
                    rightoperand: 'Lehrkraft',
                })
            }

            // concurrent use
            if (this.licenseInformation.lizenztyp === 'Gruppenlizenz') {
                permissions.push(
                    {
                        target: this.licenseInformation.product_id,
                        assigner: this.licenseInformation.lizenzgeber,
                        assignee: this.licenseInformation.school_identifier,
                        action: LicenseDefinitionVocabulary.Actions.Permission.concurrentUse,
                        constraints: [
                            {
                                name: LicenseDefinitionVocabulary.Constraints.Name.count,
                                operator: LicenseDefinitionVocabulary.Constraints.Operator.eq,
                                rightoperand: this.licenseInformation.lizenzanzahl.toString() ?? DEFAULT.lizenzanzahl, //TODO: BiLoTransformator.getLizenzanzahl()
                            },
                        ],
                    },
                )

            }


            let licenseDefinition: LicenseDefinitionModel = new LicenseDefinitionModel({
                _id: policyid,
                policyid,
                policytype: LicenseDefinitionVocabulary.PolicyTypes.Agreement,
                permissions,
            })
            return licenseDefinition
        } catch (err) {

            console.error(err)
            return undefined
        }
    }

}

export default BiLoTransformator
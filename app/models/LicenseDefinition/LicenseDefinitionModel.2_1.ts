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
    BaseDatamodel,
    iBaseDatamodel,
} from 'clm-core'

type Conflict = 'perm' | 'prohibit' | 'invalid'
type Undefined = 'support' | 'ignore' | 'invalid'

export type Constraint = {
    name: string
    operator: string
    rightoperand: string
    rightoperanddatatype?: string
    rightoperandunit?: string
    status?: string
}

export type Prohibdutytype = {
    assigner?: string
    assignee?: string
    assignee_scope?: string
    target?: string
    output?: string
    action: string
    constraints?: Constraint[]
}

export type Permission = {
    assigner?: string
    assigner_scope?: string
    assignee?: string
    assignee_scope?: string
    target?: string
    output?: string
    action: string
    constraints?: Constraint[]
    duties?: Prohibdutytype[]
}

/**
 * @public
 * The payload which is passed to the constructor of {@link LicenseDefinitionModel}
 * ODRL Version 2.1 JSON Encoding
 * @description ODRL JSON Schema (Final 5 March 2015)
 * @see {@link https://www.w3.org/community/odrl/json/2.1/}
 * @see {@link https://www.w3.org/community/odrl/json/2.1/#section-Schema}
 */
export interface iLicenseDefinitionModel extends iBaseDatamodel {
    /**
     * The identifier of the LicenseDefinition object
     */
    _id: string

    policyid: string
    policytype: string
    conflict?: Conflict
    undefined?: Undefined
    inheritallowed?: boolean
    inheritfrom?: string
    inheritrelation?: string
    policyprofile?: string
    permissions?: Permission[]
    prohibitions?: Prohibdutytype[]
}

/**
 * LicenseDefinition datamodel which is used by {@link LicenseDefinitionBDTO}
 * @public
 */
export default class LicenseDefinitionModel extends BaseDatamodel implements iLicenseDefinitionModel {
    /**
     * 
     * {@inheritDoc iLicenseDefinitionModel._id}
     */
    _id: string

    policyid: string
    policytype: string
    conflict?: Conflict
    undefined?: Undefined
    inheritallowed?: boolean
    inheritfrom?: string
    inheritrelation?: string
    policyprofile?: string
    permissions?: Permission[]
    prohibitions?: Prohibdutytype[]

    constructor(payload: iLicenseDefinitionModel) {
        super(payload)
        this._id = payload.policyid

        this.policyid = payload.policyid
        this.policytype = payload.policytype

        if (payload.conflict) {
            this.conflict = payload.conflict
        }
        if (payload.undefined) {
            this.undefined = payload.undefined
        }
        if (payload.inheritallowed) {
            this.inheritallowed = payload.inheritallowed
        }
        if (payload.inheritfrom) {
            this.inheritfrom = payload.inheritfrom
        }
        if (payload.inheritrelation) {
            this.inheritrelation = payload.inheritrelation
        }
        if (payload.policyprofile) {
            this.policyprofile = payload.policyprofile
        }
        if (payload.permissions) {
            this.permissions = payload.permissions
        }
        if (payload.prohibitions) {
            this.prohibitions = payload.prohibitions
        }
    }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     Constraint:
 *       type: object
 *       required:
 *         - name
 *         - operator
 *         - rightoperand
 *       properties:
 *         name:
 *           type: string
 *         operator:
 *           type: string
 *         rightoperand:
 *           type: string
 *         rightoperanddatatype:
 *           type: string
 *         rightoperandunit:
 *           type: string
 *         status:
 *           type: string
 *       xml:
 *         name: Constraint
 *       additionalProperties: false
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     Prohibdutytype:
 *       type: object
 *       required:
 *         - action
 *       properties:
 *         assigner:
 *           type: string
 *         assignee:
 *           type: string
 *         assignee_scope:
 *           type: string
 *         target:
 *           type: string
 *         output:
 *           type: string
 *         action:
 *           type: string
 *         constraints:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Constraint'
 *       xml:
 *         name: Prohibdutytype
 *       additionalProperties: false
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       required:
 *         - action
 *       properties:
 *         assigner:
 *           type: string
 *         assigner_scope:
 *           type: string
 *         assignee:
 *           type: string
 *         target:
 *           type: string
 *         output:
 *           type: string
 *         action:
 *           type: string
 *         constraints:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Constraint'
 *         duties:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Prohibdutytype'
 *       xml:
 *         name: Permission
 *       additionalProperties: false
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     LicenseDefinition:
 *       type: object
 *       required:
 *         - policyid
 *         - policytype
 *         - policyid
 *         - policyid
 *       properties:
 *         _is:
 *           type: string
 *         policyid:
 *           type: string
 *         policytype:
 *           type: string
 *         conflict:
 *           type: string
 *           enum:
 *             - 'perm'
 *             - 'prohibit'
 *             - 'invalid'
 *         undefined:
 *           type: string
 *           enum:
 *             - 'invalid'
 *             - 'support'
 *             - 'ignore'
 *         inheritallowed:
 *           type: boolean
 *         inheritfrom:
 *           type: string
 *         inheritrelation:
 *           type: string
 *         policyprofile:
 *           type: string
 *         permissions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Permission'
 *         prohibitions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Prohibdutytype'
 *       xml:
 *         name: LicenseDefinition
 *       additionalProperties: false
 */

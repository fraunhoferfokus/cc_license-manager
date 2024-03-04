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

import LicenseDefinitionModel from './LicenseDefinitionModel.2_1'
import {
    JSONSchemaType,
} from 'ajv'

interface JsonDate extends Date { }
interface JsonPromise extends Promise<any> { }

/**
 * ODRL Version 2.1 JSON Encoding
 * @description ODRL JSON Schema (Final 5 March 2015)
 * @see {@link https://www.w3.org/community/odrl/json/2.1/}
 * @see {@link https://www.w3.org/community/odrl/json/2.1/#section-Schema}
 */
const LicenseDefinitionSchema: JSONSchemaType<LicenseDefinitionModel> = {
    title: 'ODRL JSON Schema',
    description: 'ODRL JSON Schema (Final 5 March 2015)',
    $id: 'http://www.w3.org/ns/odrl/2/jsonschema#',
    type: 'object',
    definitions: {
        Constraint: {
            type: 'array',
            items: {
                type: 'object',
                required: [
                    'name',
                    'operator',
                    'rightoperand',
                ],
                properties: {
                    name: {
                        type: 'string',
                        format: 'uri',
                    },
                    operator: {
                        type: 'string',
                        format: 'uri',
                    },
                    rightoperand: {
                        type: 'string',
                    },
                    rightoperanddatatype: {
                        type: 'string',
                    },
                    rightoperandunit: {
                        type: 'string',
                    },
                    status: {
                        type: 'string',
                    },
                },
            },
        },
        Prohibdutytype: {
            type: 'array',
            items: {
                type: 'object',
                required: [
                    'action',
                ],
                properties: {
                    assigner: {
                        type: 'string',
                        format: 'uri',
                    },
                    assignee: {
                        type: 'string',
                        format: 'uri',
                    },
                    assignee_scope: {
                        type: 'string',
                        format: 'uri',
                    },
                    target: {
                        type: 'string',
                        format: 'uri',
                    },
                    output: {
                        type: 'string',
                        format: 'uri',
                    },
                    action: {
                        type: 'string',
                        format: 'uri',
                    },
                    constraints: {
                        $ref: '#/definitions/Constraint',
                    },
                },
            },
        },
        Permission: {
            type: 'array',
            items: {
                type: 'object',
                required: [
                    'action',
                ],
                properties: {
                    assigner: {
                        type: 'string',
                        format: 'uri',
                    },
                    assignee: {
                        type: 'string',
                        format: 'uri',
                    },
                    assignee_scope: {
                        type: 'string',
                        format: 'uri',
                    },
                    target: {
                        type: 'string',
                        format: 'uri',
                    },
                    output: {
                        type: 'string',
                        format: 'uri',
                    },
                    action: {
                        type: 'string',
                        format: 'uri',
                    },
                    constraints: {
                        $ref: '#/definitions/Constraint',
                    },
                    duties: {
                        $ref: '#/definitions/Prohibdutytype',
                    },
                },
            },
        },
        JsonDate: {
            type: 'string',
            xreviver: 'JsonDate',
        },
        JsonPromise: {
            type: 'string',
            xreviver: 'JsonPromise',
        },
    },
    required: [
        'policyid',
        'policytype',
    ],
    properties: {
        policyid: {
            type: 'string',
            format: 'uri',
        },
        policytype: {
            type: 'string',
            format: 'uri',
        },
        conflict: {
            type: 'string',
            enum: [
                'perm',
                'prohibit',
                'invalid',
            ],
            nullable: true,
        },
        undefined: {
            type: 'string',
            enum: [
                'support',
                'ignore',
                'invalid',
            ],
            nullable: true,
        },
        inheritallowed: {
            type: 'boolean',
            nullable: true,
        },
        inheritfrom: {
            type: 'string',
            format: 'uri',
            nullable: true,
        },
        inheritrelation: {
            type: 'string',
            format: 'uri',
            nullable: true,
        },
        policyprofile: {
            type: 'string',
            format: 'uri',
            nullable: true,
        },
        permissions: {
            $ref: '#/definitions/Permission',
        },
        prohibitions: {
            $ref: '#/definitions/Prohibdutytype',
        },
        _id: {
            type: 'string',
            minLength: 1,
            maxLength: 255,
        },
        _rev: {
            type: 'string',
            minLength: 1,
            maxLength: 255,
            nullable: true,
        },
        createdAt: {
            $ref: '#/definitions/JsonDate',
        },
        updatedAt: {
            $ref: '#/definitions/JsonDate',
        },
        executeAfterCreateDependencies: {
            $ref: '#/definitions/JsonPromise',
        },
        executeAfterDeleteDependencies: {
            $ref: '#/definitions/JsonPromise',
        },
        beforeInsert: {
            $ref: '#/definitions/JsonPromise',
        },
        beforeUpdate: {
            $ref: '#/definitions/JsonPromise',
        },
    },
    additionalProperties: false,
}

export default LicenseDefinitionSchema
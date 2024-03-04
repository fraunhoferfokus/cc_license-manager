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
 * LicenseDefinition datamodel which is used by {@link LicenseDefinitionBDTO}
 * @public
 */
class LicenseDefinitionModel extends clm_core_1.BaseDatamodel {
    constructor(payload) {
        super(payload);
        this._id = payload.policyid;
        this.policyid = payload.policyid;
        this.policytype = payload.policytype;
        if (payload.conflict) {
            this.conflict = payload.conflict;
        }
        if (payload.undefined) {
            this.undefined = payload.undefined;
        }
        if (payload.inheritallowed) {
            this.inheritallowed = payload.inheritallowed;
        }
        if (payload.inheritfrom) {
            this.inheritfrom = payload.inheritfrom;
        }
        if (payload.inheritrelation) {
            this.inheritrelation = payload.inheritrelation;
        }
        if (payload.policyprofile) {
            this.policyprofile = payload.policyprofile;
        }
        if (payload.permissions) {
            this.permissions = payload.permissions;
        }
        if (payload.prohibitions) {
            this.prohibitions = payload.prohibitions;
        }
    }
}
exports.default = LicenseDefinitionModel;
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

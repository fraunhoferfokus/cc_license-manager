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
import { BaseFrontendDTO, iBaseFrontendDTO } from 'clm-core';
declare type Conflict = 'perm' | 'prohibit' | 'invalid';
declare type Undefined = 'support' | 'ignore' | 'invalid';
declare type Constraint = {
    name: string;
    operator: string;
    rightoperand: string;
    rightoperanddatatype?: string;
    rightoperandunit?: string;
    status?: string;
};
declare type Prohibdutytype = {
    assigner?: string;
    assignee?: string;
    assignee_scope?: string;
    target?: string;
    output?: string;
    action: string;
    constraints?: Constraint[];
};
declare type Permission = {
    assigner?: string;
    assigner_scope?: string;
    assignee?: string;
    assignee_scope?: string;
    target?: string;
    output?: string;
    action: string;
    constraints?: Constraint[];
    duties?: Prohibdutytype[];
};
interface iLicenseDefinitionFDTO extends iBaseFrontendDTO {
    _id: string;
    policyid: string;
    policytype: string;
    conflict?: Conflict;
    undefined?: Undefined;
    inheritallowed?: boolean;
    inheritfrom?: string;
    inheritrelation?: string;
    policyprofile?: string;
    permissions?: Permission[];
    prohibitions?: Prohibdutytype[];
}
/**
 * The payload which is passed to the constructor of {@link LicenseDefinitionFDTO}
 * ODRL Version 2.1 JSON Encoding
 * @description ODRL JSON Schema (Final 5 March 2015)
 * @see {@link https://www.w3.org/community/odrl/json/2.1/}
 * @see {@link https://www.w3.org/community/odrl/json/2.1/#section-Schema}
 */
export default class LicenseDefinitionFDTO extends BaseFrontendDTO implements iLicenseDefinitionFDTO {
    _id: string;
    policyid: string;
    policytype: string;
    conflict?: Conflict;
    undefined?: Undefined;
    inheritallowed?: boolean;
    inheritfrom?: string;
    inheritrelation?: string;
    policyprofile?: string;
    permissions?: Permission[];
    prohibitions?: Prohibdutytype[];
    constructor(payload: iLicenseDefinitionFDTO);
}
export {};

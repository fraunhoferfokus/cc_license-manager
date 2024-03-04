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
import { ActionObject, ActionVerb, Constraint, LogicalConstraint, Rule } from './LicenseDefinitionModel.2_2'
// import { Constraint } from './LicenseDefinitionModel.2_1';


interface iPolicyFDTO extends iBaseFrontendDTO {
    conflict?: any; // Type depends on how "conflict" is defined
    permission: Rule[]; // Type depends on how "permission" is defined
    prohibition: Rule[]; // Type depends on how "prohibition" is defined
    inheritFrom?: iPolicyFDTO | string; // Depends on whether "inheritFrom" is another Policy object or a string identifier of a Policy
    profile?: string; // Assuming a profile is represented by a string identifier
    obligation: Rule[]; // Type depends on how "obligation" is defined
    uid: string; // Assuming "uid" is a unique identifier string
    relation?: any; // Type depends on how "relation" is defined
    target?: any; // Type depends on how "target" is defined
    function?: any; // Type depends on how "function" is defined
    action?: ActionVerb | ActionObject[]; // Type depends on how "action" is defined
    constraint: Constraint[] | LogicalConstraint; // Type depends on how "constraint" is defined
    assignee?: string; // Depends on whether "assignee" is a Party object or a string identifier of a Party
    assigner?: string; // Depends on whether "assigner" is a Party object or a string identifier of a Party
}
/**
 * The payload which is passed to the constructor of {@link PolicyFDTO}
 * ODRL Version 2.1 JSON Encoding
 * @description ODRL JSON Schema (Final 5 March 2015)
 * @see {@link https://www.w3.org/community/odrl/json/2.1/}
 * @see {@link https://www.w3.org/community/odrl/json/2.1/#section-Schema}
 */
export default class PolicyFDTO extends BaseFrontendDTO implements iPolicyFDTO {
    conflict?: any;
    permission: Rule[];
    prohibition: Rule[];
    inheritFrom?: any;
    profile?: string | undefined;
    obligation: Rule[];
    uid: string;
    relation?: any;
    target?: any;
    function?: any;
    action?: ActionVerb | ActionObject[] | undefined;
    constraint: Constraint[] | LogicalConstraint;
    assignee?: string | undefined;
    assigner?: string | undefined;
    
}

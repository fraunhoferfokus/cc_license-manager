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
declare type PolicyTypes = {
    Agreement: string;
    Offer: string;
    Privacy: string;
    Request: string;
    Set: string;
    Ticket: string;
};
declare type ActionsForPermissionOrProhibition = {
    aggregate: string;
    annotate: string;
    anonymize: string;
    archive: string;
    concurrentUse: string;
    derive: string;
    digitize: string;
    display: string;
    distribute: string;
    execute: string;
    extract: string;
    give: string;
    grantUse: string;
    install: string;
    modify: string;
    move: string;
    play: string;
    present: string;
    print: string;
    read: string;
    reproduce: string;
    sell: string;
    textToSpeech: string;
    transfer: string;
    transform: string;
    translate: string;
    use: string;
};
declare type ActionsForDuty = {
    acceptTracking: string;
    attribute: string;
    compensate: string;
    delete: string;
    ensureExclusivity: string;
    include: string;
    inform: string;
    nextPolicy: string;
    obtainConsent: string;
    reviewPolicy: string;
    uninstall: string;
    watermark: string;
};
declare type NamesForConstraint = {
    absolutePosition: string;
    absoluteSize: string;
    count: string;
    dateTime: string;
    fileFormat: string;
    industry: string;
    language: string;
    deliveryChannel: string;
    elapsedTime: string;
    event: string;
    media: string;
    meteredTime: string;
    payAmount: string;
    percentage: string;
    product: string;
    purpose: string;
    recipient: string;
    relativePosition: string;
    relativeSize: string;
    resolution: string;
    spatial: string;
    timeInterval: string;
    systemDevice: string;
    version: string;
    virtualLocation: string;
};
declare type OperatorsForConstraint = {
    eq: string;
    gt: string;
    gteq: string;
    hasPart: string;
    isA: string;
    isAllOf: string;
    isAnyOf: string;
    isNoneOf: string;
    isPartOf: string;
    lt: string;
    lteq: string;
    neq: string;
};
declare type FunctionsOfTheRoleOfAParty = {
    assigner: string;
    assignee: string;
    attributedParty: string;
    consentingParty: string;
    informedParty: string;
    compensatedParty: string;
    trackingParty: string;
};
declare type ScopesOfTheRoleOfAParty = {
    Individual: string;
    Group: string;
    All: string;
    AllConnections: string;
    All2ndConnections: string;
    AllGroups: string;
};
declare type RelationOfAnAsset = {
    target: string;
    output: string;
};
/**
 * ODRL Version 2.1 Vocabulary
 * @description ODRL JSON Schema (Final 5 March 2015)
 * @see {@link https://www.w3.org/community/odrl/2-1/}
 */
interface iLicenseDefinitionVocabulary {
    PolicyTypes: PolicyTypes;
    Actions: {
        Permission: ActionsForPermissionOrProhibition;
        Prohibition: ActionsForPermissionOrProhibition;
        Duty: ActionsForDuty;
    };
    Constraints: {
        Name: NamesForConstraint;
        Operator: OperatorsForConstraint;
    };
    Role: {
        Function: FunctionsOfTheRoleOfAParty;
        Scope: ScopesOfTheRoleOfAParty;
    };
    Relation: RelationOfAnAsset;
}
declare class ODRLVocabulary implements iLicenseDefinitionVocabulary {
    PolicyTypes: PolicyTypes;
    Actions: {
        Permission: ActionsForPermissionOrProhibition;
        Prohibition: ActionsForPermissionOrProhibition;
        Duty: ActionsForDuty;
    };
    Constraints: {
        Name: NamesForConstraint;
        Operator: OperatorsForConstraint;
    };
    Role: {
        Function: FunctionsOfTheRoleOfAParty;
        Scope: ScopesOfTheRoleOfAParty;
    };
    Relation: RelationOfAnAsset;
    constructor(data: iLicenseDefinitionVocabulary);
}
declare const LicenseDefinitionVocabulary: ODRLVocabulary;
export default LicenseDefinitionVocabulary;

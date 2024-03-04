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

const policyTypes: PolicyTypes = {
    Agreement: 'http://www.w3.org/ns/odrl/2/Agreement',
    Offer: 'http://www.w3.org/ns/odrl/2/Offer',
    Privacy: 'http://www.w3.org/ns/odrl/2/Privacy',
    Request: 'http://www.w3.org/ns/odrl/2/Request',
    Set: 'http://www.w3.org/ns/odrl/2/Set',
    Ticket: 'http://www.w3.org/ns/odrl/2/Ticket',
}

const actionsForPermissionOrProhibition: ActionsForPermissionOrProhibition = {
    aggregate: 'http://www.w3.org/ns/odrl/2/aggregate',
    annotate: 'http://www.w3.org/ns/odrl/2/annotate',
    anonymize: 'http://www.w3.org/ns/odrl/2/anonymize',
    archive: 'http://www.w3.org/ns/odrl/2/archive',
    concurrentUse: 'http://www.w3.org/ns/odrl/2/concurrentUse',
    derive: 'http://www.w3.org/ns/odrl/2/derive',
    digitize: 'http://www.w3.org/ns/odrl/2/digitize',
    display: 'http://www.w3.org/ns/odrl/2/display',
    distribute: 'http://www.w3.org/ns/odrl/2/distribute',
    execute: 'http://www.w3.org/ns/odrl/2/execute',
    extract: 'http://www.w3.org/ns/odrl/2/extract',
    give: 'http://www.w3.org/ns/odrl/2/give',
    grantUse: 'http://www.w3.org/ns/odrl/2/grantUse',
    install: 'http://www.w3.org/ns/odrl/2/install',
    modify: 'http://www.w3.org/ns/odrl/2/modify',
    move: 'http://www.w3.org/ns/odrl/2/move',
    play: 'http://www.w3.org/ns/odrl/2/play',
    present: 'http://www.w3.org/ns/odrl/2/present',
    print: 'http://www.w3.org/ns/odrl/2/print',
    read: 'http://www.w3.org/ns/odrl/2/read',
    reproduce: 'http://www.w3.org/ns/odrl/2/reproduce',
    sell: 'http://www.w3.org/ns/odrl/2/sell',
    textToSpeech: 'http://www.w3.org/ns/odrl/2/textToSpeech',
    transfer: 'http://www.w3.org/ns/odrl/2/transfer',
    transform: 'http://www.w3.org/ns/odrl/2/transform',
    translate: 'http://www.w3.org/ns/odrl/2/translate',
    use: 'http://www.w3.org/ns/odrl/2/use',
}

const actionsForDuty: ActionsForDuty = {
    acceptTracking: 'http://www.w3.org/ns/odrl/2/acceptTracking',
    attribute: 'http://www.w3.org/ns/odrl/2/attribute',
    compensate: 'http://www.w3.org/ns/odrl/2/compensate',
    delete: 'http://www.w3.org/ns/odrl/2/delete',
    ensureExclusivity: 'http://www.w3.org/ns/odrl/2/ensureExclusivity',
    include: 'http://www.w3.org/ns/odrl/2/include',
    inform: 'http://www.w3.org/ns/odrl/2/inform',
    nextPolicy: 'http://www.w3.org/ns/odrl/2/nextPolicy',
    obtainConsent: 'http://www.w3.org/ns/odrl/2/obtainConsent',
    reviewPolicy: 'http://www.w3.org/ns/odrl/2/reviewPolicy',
    uninstall: 'http://www.w3.org/ns/odrl/2/uninstall',
    watermark: 'http://www.w3.org/ns/odrl/2/watermark',
}

const namesForConstraint: NamesForConstraint = {
    absolutePosition: 'http://www.w3.org/ns/odrl/2/absolutePosition',
    absoluteSize: 'http://www.w3.org/ns/odrl/2/absoluteSize',
    count: 'http://www.w3.org/ns/odrl/2/count',
    dateTime: 'http://www.w3.org/ns/odrl/2/dateTime',
    fileFormat: 'http://www.w3.org/ns/odrl/2/fileFormat',
    industry: 'http://www.w3.org/ns/odrl/2/industry',
    language: 'http://www.w3.org/ns/odrl/2/language',
    deliveryChannel: 'http://www.w3.org/ns/odrl/2/deliveryChannel',
    elapsedTime: 'http://www.w3.org/ns/odrl/2/elapsedTime',
    event: 'http://www.w3.org/ns/odrl/2/event',
    media: 'http://www.w3.org/ns/odrl/2/media',
    meteredTime: 'http://www.w3.org/ns/odrl/2/meteredTime',
    payAmount: 'http://www.w3.org/ns/odrl/2/payAmount',
    percentage: 'http://www.w3.org/ns/odrl/2/percentage',
    product: 'http://www.w3.org/ns/odrl/2/product',
    purpose: 'http://www.w3.org/ns/odrl/2/purpose',
    recipient: 'http://www.w3.org/ns/odrl/2/recipient',
    relativePosition: 'http://www.w3.org/ns/odrl/2/relativePosition',
    relativeSize: 'http://www.w3.org/ns/odrl/2/relativeSize',
    resolution: 'http://www.w3.org/ns/odrl/2/resolution',
    spatial: 'http://www.w3.org/ns/odrl/2/spatial',
    timeInterval: 'http://www.w3.org/ns/odrl/2/timeInterval',
    systemDevice: 'http://www.w3.org/ns/odrl/2/systemDevice',
    version: 'http://www.w3.org/ns/odrl/2/version',
    virtualLocation: 'http://www.w3.org/ns/odrl/2/virtualLocation',
}

const operatorsForConstraint: OperatorsForConstraint = {
    eq: 'http://www.w3.org/ns/odrl/2/eq',
    gt: 'http://www.w3.org/ns/odrl/2/gt',
    gteq: 'http://www.w3.org/ns/odrl/2/gteq',
    hasPart: 'http://www.w3.org/ns/odrl/2/hasPart',
    isA: 'http://www.w3.org/ns/odrl/2/isA',
    isAllOf: 'http://www.w3.org/ns/odrl/2/isAllOf',
    isAnyOf: 'http://www.w3.org/ns/odrl/2/isAnyOf',
    isNoneOf: 'http://www.w3.org/ns/odrl/2/isNoneOf',
    isPartOf: 'http://www.w3.org/ns/odrl/2/isPartOf',
    lt: 'http://www.w3.org/ns/odrl/2/lt',
    lteq: 'http://www.w3.org/ns/odrl/2/lteq',
    neq: 'http://www.w3.org/ns/odrl/2/neq',
}

const functionsOfTheRoleOfAParty: FunctionsOfTheRoleOfAParty = {
    assigner: 'http://www.w3.org/ns/odrl/2/assigner',
    assignee: 'http://www.w3.org/ns/odrl/2/assignee',
    attributedParty: 'http://www.w3.org/ns/odrl/2/attributedParty',
    consentingParty: 'http://www.w3.org/ns/odrl/2/consentingParty',
    informedParty: 'http://www.w3.org/ns/odrl/2/informedParty',
    compensatedParty: 'http://www.w3.org/ns/odrl/2/compensatedParty',
    trackingParty: 'http://www.w3.org/ns/odrl/2/trackingParty',
}

const scopesOfTheRoleOfAParty: ScopesOfTheRoleOfAParty = {
    Individual: 'http://www.w3.org/ns/odrl/2/Individual',
    Group: 'http://www.w3.org/ns/odrl/2/Group',
    All: 'http://www.w3.org/ns/odrl/2/All',
    AllConnections: 'http://www.w3.org/ns/odrl/2/AllConnections',
    All2ndConnections: 'http://www.w3.org/ns/odrl/2/All2ndConnections',
    AllGroups: 'http://www.w3.org/ns/odrl/2/AllGroups',
}

const relationOfAnAsset: RelationOfAnAsset = {
    target: 'http://www.w3.org/ns/odrl/2/target',
    output: 'http://www.w3.org/ns/odrl/2/output',
}

const ODRLVocabulary2_1: iLicenseDefinitionVocabulary = {
    PolicyTypes: { ...policyTypes },
    Actions: {
        Permission: { ...actionsForPermissionOrProhibition },
        Prohibition: { ...actionsForPermissionOrProhibition },
        Duty: { ...actionsForDuty },
    },
    Constraints: {
        Name: { ...namesForConstraint },
        Operator: { ...operatorsForConstraint },
    },
    Role: {
        Function: { ...functionsOfTheRoleOfAParty },
        Scope: { ...scopesOfTheRoleOfAParty },
    },
    Relation: { ...relationOfAnAsset },
}

type PolicyTypes = {
    Agreement: string
    Offer: string
    Privacy: string
    Request: string
    Set: string
    Ticket: string
}

type ActionsForPermissionOrProhibition = {
    aggregate: string
    annotate: string
    anonymize: string
    archive: string
    concurrentUse: string
    derive: string
    digitize: string
    display: string
    distribute: string
    execute: string
    extract: string
    give: string
    grantUse: string
    install: string
    modify: string
    move: string
    play: string
    present: string
    print: string
    read: string
    reproduce: string
    sell: string
    textToSpeech: string
    transfer: string
    transform: string
    translate: string
    use: string
}

type ActionsForDuty = {
    acceptTracking: string
    attribute: string
    compensate: string
    delete: string
    ensureExclusivity: string
    include: string
    inform: string
    nextPolicy: string
    obtainConsent: string
    reviewPolicy: string
    uninstall: string
    watermark: string
}

type NamesForConstraint = {
    absolutePosition: string
    absoluteSize: string
    count: string
    dateTime: string
    fileFormat: string
    industry: string
    language: string
    deliveryChannel: string
    elapsedTime: string
    event: string
    media: string
    meteredTime: string
    payAmount: string
    percentage: string
    product: string
    purpose: string
    recipient: string
    relativePosition: string
    relativeSize: string
    resolution: string
    spatial: string
    timeInterval: string
    systemDevice: string
    version: string
    virtualLocation: string
}

type OperatorsForConstraint = {
    eq: string
    gt: string
    gteq: string
    hasPart: string
    isA: string
    isAllOf: string
    isAnyOf: string
    isNoneOf: string
    isPartOf: string
    lt: string
    lteq: string
    neq: string
}

type FunctionsOfTheRoleOfAParty = {
    assigner: string
    assignee: string
    attributedParty: string
    consentingParty: string
    informedParty: string
    compensatedParty: string
    trackingParty: string
}

type ScopesOfTheRoleOfAParty = {
    Individual: string
    Group: string
    All: string
    AllConnections: string
    All2ndConnections: string
    AllGroups: string
}

type RelationOfAnAsset = {
    target: string
    output: string
}

/**
 * ODRL Version 2.1 Vocabulary
 * @description ODRL JSON Schema (Final 5 March 2015)
 * @see {@link https://www.w3.org/community/odrl/2-1/}
 */
interface iLicenseDefinitionVocabulary {
    PolicyTypes: PolicyTypes
    Actions: {
        Permission: ActionsForPermissionOrProhibition
        Prohibition: ActionsForPermissionOrProhibition
        Duty: ActionsForDuty
    }
    Constraints: {
        Name: NamesForConstraint
        Operator: OperatorsForConstraint
    }
    Role: {
        Function: FunctionsOfTheRoleOfAParty
        Scope: ScopesOfTheRoleOfAParty
    }
    Relation: RelationOfAnAsset
}

class ODRLVocabulary implements iLicenseDefinitionVocabulary {
    PolicyTypes: PolicyTypes
    Actions: {
        Permission: ActionsForPermissionOrProhibition
        Prohibition: ActionsForPermissionOrProhibition
        Duty: ActionsForDuty
    }
    Constraints: {
        Name: NamesForConstraint
        Operator: OperatorsForConstraint
    }
    Role: {
        Function: FunctionsOfTheRoleOfAParty
        Scope: ScopesOfTheRoleOfAParty
    }
    Relation: RelationOfAnAsset

    constructor(data: iLicenseDefinitionVocabulary) {
        this.PolicyTypes = data.PolicyTypes
        this.Actions = data.Actions
        this.Constraints = data.Constraints
        this.Role = data.Role
        this.Relation = data.Relation
    }
}

const LicenseDefinitionVocabulary = new ODRLVocabulary(ODRLVocabulary2_1)

export default LicenseDefinitionVocabulary

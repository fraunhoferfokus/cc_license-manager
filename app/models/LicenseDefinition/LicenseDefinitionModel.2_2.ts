import { BaseDatamodel, iBaseDatamodel } from "clm-core";

export interface DCInterface {
    "dc:abstract"?: string;
    "dc:accessRights"?: string;
    "dc:accrualMethod"?: string;
    "dc:accrualPeriodicity"?: string;
    "dc:accrualPolicy"?: string;
    "dc:alternative"?: string;
    "dc:audience"?: string;
    "dc:available"?: string;
    "dc:bibliographicCitation"?: string;
    "dc:conformsTo"?: string;
    "dc:contributor"?: string;
    "dc:coverage"?: string;
    "dc:created"?: string;
    "dc:creator"?: string;
    "dc:date"?: string;
    "dc:dateAccepted"?: string;
    "dc:dateCopyrighted"?: string;
    "dc:dateSubmitted"?: string;
    "dc:description"?: string;
    "dc:educationLevel"?: string;
    "dc:extent"?: string;
    "dc:format"?: string;
    "dc:hasFormat"?: string;
    "dc:hasPart"?: string;
    "dc:hasVersion"?: string;
    "dc:identifier"?: string;
    "dc:instructionalMethod"?: string;
    "dc:isFormatOf"?: string;
    "dc:isPartOf"?: string;
    "dc:isReferencedBy"?: string;
    "dc:isReplacedBy"?: string;
    "dc:isRequiredBy"?: string;
    "dc:issued"?: string;
    "dc:isVersionOf"?: string;
    "dc:language"?: string;
    "dc:license"?: string;
    "dc:mediator"?: string;
    "dc:medium"?: string;
    "dc:modified"?: string;
    "dc:provenance"?: string;
    "dc:publisher"?: string;
    "dc:references"?: string;
    "dc:relation"?: string;
    "dc:replaces"?: string;
    "dc:requires"?: string;
    "dc:rights"?: string;
    "dc:rightsHolder"?: string;
    "dc:source"?: string;
    "dc:spatial"?: string;
    "dc:subject"?: string;
    "dc:tableOfContents"?: string;
    "dc:temporal"?: string;
    "dc:title"?: string;
    "dc:type"?: string;
    "dc:valid"?: string;
}

export interface iPolicy extends iBaseDatamodel, DCInterface {
    "@context"?: ContextType | ({ [key: string]: string } | string)[];
    "@type"?: PolicyType | string[];
    "@id"?: string;
    conflict?: any; // Type depends on how "conflict" is defined
    permission?: Rule[]; // Type depends on how "permission" is defined
    prohibition?: Rule[]; // Type depends on how "prohibition" is defined
    inheritFrom?: iPolicy | string; // Depends on whether "inheritFrom" is another Policy object or a string identifier of a Policy
    profile?: string; // Assuming a profile is represented by a string identifier
    obligation?: Rule[]; // Type depends on how "obligation" is defined
    uid: string; // Assuming "uid" is a unique identifier string
    relation?: any; // Type depends on how "relation" is defined
    target?: any; // Type depends on how "target" is defined
    function?: any; // Type depends on how "function" is defined
    action?: ActionObject[]; // Type depends on how "action" is defined
    constraint?: Constraint[]; // Type depends on how "constraint" is defined
    assignee?: string; // Depends on whether "assignee" is a Party object or a string identifier of a Party
    assigner?: string; // Depends on whether "assigner" is a Party object or a string identifier of a Party

}

type PolicyType = "Agreement" | "Assertion" | "Offer" | "Privacy" | "Request" | "Set" | "Ticket";
type ContextType = "http://www.w3.org/ns/odrl.jsonld"




export interface Rule {
    output?: string[];
    failure?: string;
    uid?: string;
    relation?: string[];
    target?: string[];
    function?: string[];
    action: ActionObject[];
    constraint?: Constraint[];
    assignee?: string;
    assigner?: string;
}

// type ConstraintOrLogicalConstraint = Constraint[] | LogicalConstraint;

type LeftHandOperator = "absolutePosition" | "absoluteSize" | "absoluteSpatialPosition" | "absoluteTemporalPosition" | "count" | "dateTime" | "delayPeriod" | "deliveryChannel" | "device" | "elapsedTime" | "event" | "fileFormat" | "industry" | "language" | "media" | "meteredTime" | "payAmount" | "percentage" | "product" | "purpose" | "recipient" | "relativePosition" | "relativeSize" | "relativeSpatialPosition" | "relativeTemporalPosition" | "resolution" | "spatial" | "spatialCoordinates" | "system" | "systemDevice" | "timeInterval" | "unitOfCount" | "version" | "virtualLocation";


export interface Constraint {
    unit?: string;
    dataType?: string;
    operator: ConstraintOperator;
    rightOperand: string;
    rightOperandReference?: string;
    leftOperand: LeftHandOperator;
    status?: string;
    uid?: string;
}

export interface ActionObject {
    action: ActionVerb;
    refinement: Constraint[];
}

export interface LogicalConstraint {
    and?: {
        "@list": Constraint[] | UniqueRef[]
    },
    andSequence?: {
        "@list": Constraint[] | UniqueRef[]
    },
    or?: {
        "@list": Constraint[] | UniqueRef[]
    },
    xone?: {
        "@list": Constraint[] | UniqueRef[]
    },
}

type UniqueRef = {
    '@id': string;
}


export type ActionVerb = "Attribution" | "CommericalUse" | "DerivativeWorks" | "Distribution" | "Notice" | "Reproduction" | "ShareAlike" | "Sharing" | "SourceCode" | "acceptTracking" | "adHocShare" | "aggregate" | "annotate" | "anonymize" | "append" | "appendTo" | "archive" | "attachPolicy" | "attachSource" | "attribute" | "commercialize" | "compensate" | "concurrentUse" | "copy" | "delete" | "derive" | "digitize" | "display" | "distribute" | "ensureExclusivity" | "execute" | "export" | "extract" | "extractChar" | "extractPage" | "extractWord" | "give" | "grantUse" | "include" | "index" | "inform" | "install" | "lease" | "lend" | "license" | "modify" | "move" | "nextPolicy" | "obtainConsent" | "pay" | "play" | "present" | "preview" | "print" | "read" | "reproduce" | "reviewPolicy" | "secondaryUse" | "sell" | "share" | "shareAlike" | "stream" | "synchronize" | "textToSpeech" | "transfer" | "transform" | "translate" | "uninstall" | "use" | "watermark" | "write" | "writeTo";

type ConstraintOperator = "eq" | "neq" | "gt" | "gteq" | "lt" | "lteq" | 'neq' | 'isA' | 'hasPart' | 'PartOf' | 'isAllOf' | 'isAnyOf' | 'isNoneOf'







/**
 * LicenseDefinition datamodel which is used by {@link LicenseDefinitionBDTO}
 * @public
 */
export default class Policy extends BaseDatamodel implements iPolicy {
    /**
     * 
     * {@inheritDoc iLicenseDefinitionModel._id}
     */
    _id: string
    conflict?: any;
    permission: Rule[];
    prohibition: Rule[];
    inheritFrom?: string | iPolicy | undefined;
    profile?: string | undefined;
    obligation: Rule[];
    uid: string;
    relation?: any;
    target?: any;
    function?: any;
    action?: ActionObject[];
    constraint: Constraint[];
    assignee?: string | undefined;
    assigner?: string | undefined;
    "@context": "http://www.w3.org/ns/odrl.jsonld" | (string | { [key: string]: string; })[];
    "@type": PolicyType | string[];
    "@id"?: string | undefined;

    "dc:abstract"?: string;
    "dc:accessRights"?: string;
    "dc:accrualMethod"?: string;
    "dc:accrualPeriodicity"?: string;
    "dc:accrualPolicy"?: string;
    "dc:alternative"?: string;
    "dc:audience"?: string;
    "dc:available"?: string;
    "dc:bibliographicCitation"?: string;
    "dc:conformsTo"?: string;
    "dc:contributor"?: string;
    "dc:coverage"?: string;
    "dc:created"?: string;
    "dc:creator"?: string;
    "dc:date"?: string;
    "dc:dateAccepted"?: string;
    "dc:dateCopyrighted"?: string;
    "dc:dateSubmitted"?: string;
    "dc:description"?: string;
    "dc:educationLevel"?: string;
    "dc:extent"?: string;
    "dc:format"?: string;
    "dc:hasFormat"?: string;
    "dc:hasPart"?: string;
    "dc:hasVersion"?: string;
    "dc:identifier"?: string;
    "dc:instructionalMethod"?: string;
    "dc:isFormatOf"?: string;
    "dc:isPartOf"?: string;
    "dc:isReferencedBy"?: string;
    "dc:isReplacedBy"?: string;
    "dc:isRequiredBy"?: string;
    "dc:issued"?: string;
    "dc:isVersionOf"?: string;
    "dc:language"?: string;
    "dc:license"?: string;
    "dc:mediator"?: string;
    "dc:medium"?: string;
    "dc:modified"?: string;
    "dc:provenance"?: string;
    "dc:publisher"?: string;
    "dc:references"?: string;
    "dc:relation"?: string;
    "dc:replaces"?: string;
    "dc:requires"?: string;
    "dc:rights"?: string;
    "dc:rightsHolder"?: string;
    "dc:source"?: string;
    "dc:spatial"?: string;
    "dc:subject"?: string;
    "dc:tableOfContents"?: string;
    "dc:temporal"?: string;
    "dc:title"?: string;
    "dc:type"?: string;
    "dc:valid"?: string;


    constructor(payload: iPolicy) {
        super(payload)
        this["@type"] = payload['@type'] || 'Agreement'
        this["@context"] = payload['@context'] ||

            ["http://www.w3.org/ns/odrl.jsonld",
                { dc: "http://purl.org/dc/elements/1.1/" },
            ]
        this.conflict = payload.conflict
        this.permission = payload.permission || []
        this.prohibition = payload.prohibition || []
        this.constraint = payload.constraint || []
        this.obligation = payload.obligation || []
        this.inheritFrom = payload.inheritFrom
        this.profile = payload.profile
        this.uid = payload.uid
        this.relation = payload.relation
        this.target = payload.target
        this.function = payload.function
        this.action = payload.action
        this.assignee = payload.assignee
        this.assigner = payload.assigner

        // dublin core metadata
        this['dc:abstract'] = payload['dc:abstract']
        this['dc:accessRights'] = payload['dc:accessRights']
        this['dc:accrualMethod'] = payload['dc:accrualMethod']
        this['dc:accrualPeriodicity'] = payload['dc:accrualPeriodicity']
        this['dc:accrualPolicy'] = payload['dc:accrualPolicy']
        this['dc:alternative'] = payload['dc:alternative']
        this['dc:audience'] = payload['dc:audience']
        this['dc:available'] = payload['dc:available']
        this['dc:bibliographicCitation'] = payload['dc:bibliographicCitation']
        this['dc:conformsTo'] = payload['dc:conformsTo']
        this['dc:contributor'] = payload['dc:contributor']
        this['dc:coverage'] = payload['dc:coverage']
        this['dc:created'] = payload['dc:created']
        this['dc:creator'] = payload['dc:creator']
        this['dc:date'] = payload['dc:date']
        this['dc:dateAccepted'] = payload['dc:dateAccepted']
        this['dc:dateCopyrighted'] = payload['dc:dateCopyrighted']
        this['dc:dateSubmitted'] = payload['dc:dateSubmitted']
        this['dc:description'] = payload['dc:description']
        this['dc:educationLevel'] = payload['dc:educationLevel']
        this['dc:extent'] = payload['dc:extent']
        this['dc:format'] = payload['dc:format']
        this['dc:hasFormat'] = payload['dc:hasFormat']
        this['dc:hasPart'] = payload['dc:hasPart']
        this['dc:hasVersion'] = payload['dc:hasVersion']
        this['dc:identifier'] = payload['dc:identifier']
        this['dc:instructionalMethod'] = payload['dc:instructionalMethod']
        this['dc:isFormatOf'] = payload['dc:isFormatOf']
        this['dc:isPartOf'] = payload['dc:isPartOf']
        this['dc:isReferencedBy'] = payload['dc:isReferencedBy']
        this['dc:isReplacedBy'] = payload['dc:isReplacedBy']
        this['dc:isRequiredBy'] = payload['dc:isRequiredBy']
        this['dc:issued'] = payload['dc:issued']
        this['dc:isVersionOf'] = payload['dc:isVersionOf']
        this['dc:language'] = payload['dc:language']
        this['dc:license'] = payload['dc:license']
        this['dc:mediator'] = payload['dc:mediator']
        this['dc:medium'] = payload['dc:medium']
        this['dc:modified'] = payload['dc:modified']
        this['dc:provenance'] = payload['dc:provenance']
        this['dc:publisher'] = payload['dc:publisher']
        this['dc:references'] = payload['dc:references']
        this['dc:relation'] = payload['dc:relation']
        this['dc:replaces'] = payload['dc:replaces']
        this['dc:requires'] = payload['dc:requires']
        this['dc:rights'] = payload['dc:rights']
        this['dc:rightsHolder'] = payload['dc:rightsHolder']
        this['dc:source'] = payload['dc:source']
        this['dc:spatial'] = payload['dc:spatial']
        this['dc:subject'] = payload['dc:subject']
        this['dc:tableOfContents'] = payload['dc:tableOfContents']
        this['dc:temporal'] = payload['dc:temporal']
        this['dc:title'] = payload['dc:title']
        this['dc:type'] = payload['dc:type']
        this['dc:valid'] = payload['dc:valid']

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

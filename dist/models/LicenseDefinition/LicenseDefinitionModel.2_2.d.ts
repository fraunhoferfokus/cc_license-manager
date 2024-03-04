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
    "@context"?: ContextType | ({
        [key: string]: string;
    } | string)[];
    "@type"?: PolicyType | string[];
    "@id"?: string;
    conflict?: any;
    permission?: Rule[];
    prohibition?: Rule[];
    inheritFrom?: iPolicy | string;
    profile?: string;
    obligation?: Rule[];
    uid: string;
    relation?: any;
    target?: any;
    function?: any;
    action?: ActionObject[];
    constraint?: Constraint[];
    assignee?: string;
    assigner?: string;
}
declare type PolicyType = "Agreement" | "Assertion" | "Offer" | "Privacy" | "Request" | "Set" | "Ticket";
declare type ContextType = "http://www.w3.org/ns/odrl.jsonld";
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
declare type LeftHandOperator = "absolutePosition" | "absoluteSize" | "absoluteSpatialPosition" | "absoluteTemporalPosition" | "count" | "dateTime" | "delayPeriod" | "deliveryChannel" | "device" | "elapsedTime" | "event" | "fileFormat" | "industry" | "language" | "media" | "meteredTime" | "payAmount" | "percentage" | "product" | "purpose" | "recipient" | "relativePosition" | "relativeSize" | "relativeSpatialPosition" | "relativeTemporalPosition" | "resolution" | "spatial" | "spatialCoordinates" | "system" | "systemDevice" | "timeInterval" | "unitOfCount" | "version" | "virtualLocation";
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
        "@list": Constraint[] | UniqueRef[];
    };
    andSequence?: {
        "@list": Constraint[] | UniqueRef[];
    };
    or?: {
        "@list": Constraint[] | UniqueRef[];
    };
    xone?: {
        "@list": Constraint[] | UniqueRef[];
    };
}
declare type UniqueRef = {
    '@id': string;
};
export declare type ActionVerb = "Attribution" | "CommericalUse" | "DerivativeWorks" | "Distribution" | "Notice" | "Reproduction" | "ShareAlike" | "Sharing" | "SourceCode" | "acceptTracking" | "adHocShare" | "aggregate" | "annotate" | "anonymize" | "append" | "appendTo" | "archive" | "attachPolicy" | "attachSource" | "attribute" | "commercialize" | "compensate" | "concurrentUse" | "copy" | "delete" | "derive" | "digitize" | "display" | "distribute" | "ensureExclusivity" | "execute" | "export" | "extract" | "extractChar" | "extractPage" | "extractWord" | "give" | "grantUse" | "include" | "index" | "inform" | "install" | "lease" | "lend" | "license" | "modify" | "move" | "nextPolicy" | "obtainConsent" | "pay" | "play" | "present" | "preview" | "print" | "read" | "reproduce" | "reviewPolicy" | "secondaryUse" | "sell" | "share" | "shareAlike" | "stream" | "synchronize" | "textToSpeech" | "transfer" | "transform" | "translate" | "uninstall" | "use" | "watermark" | "write" | "writeTo";
declare type ConstraintOperator = "eq" | "neq" | "gt" | "gteq" | "lt" | "lteq" | 'neq' | 'isA' | 'hasPart' | 'PartOf' | 'isAllOf' | 'isAnyOf' | 'isNoneOf';
/**
 * LicenseDefinition datamodel which is used by {@link LicenseDefinitionBDTO}
 * @public
 */
export default class Policy extends BaseDatamodel implements iPolicy {
    /**
     *
     * {@inheritDoc iLicenseDefinitionModel._id}
     */
    _id: string;
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
    "@context": "http://www.w3.org/ns/odrl.jsonld" | (string | {
        [key: string]: string;
    })[];
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
    constructor(payload: iPolicy);
}
export {};
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

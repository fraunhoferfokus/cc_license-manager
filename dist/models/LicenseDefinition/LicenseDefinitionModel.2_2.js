"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clm_core_1 = require("clm-core");
/**
 * LicenseDefinition datamodel which is used by {@link LicenseDefinitionBDTO}
 * @public
 */
class Policy extends clm_core_1.BaseDatamodel {
    constructor(payload) {
        super(payload);
        this["@type"] = payload['@type'] || 'Agreement';
        this["@context"] = payload['@context'] ||
            ["http://www.w3.org/ns/odrl.jsonld",
                { dc: "http://purl.org/dc/elements/1.1/" },
            ];
        this.conflict = payload.conflict;
        this.permission = payload.permission || [];
        this.prohibition = payload.prohibition || [];
        this.constraint = payload.constraint || [];
        this.obligation = payload.obligation || [];
        this.inheritFrom = payload.inheritFrom;
        this.profile = payload.profile;
        this.uid = payload.uid;
        this.relation = payload.relation;
        this.target = payload.target;
        this.function = payload.function;
        this.action = payload.action;
        this.assignee = payload.assignee;
        this.assigner = payload.assigner;
        // dublin core metadata
        this['dc:abstract'] = payload['dc:abstract'];
        this['dc:accessRights'] = payload['dc:accessRights'];
        this['dc:accrualMethod'] = payload['dc:accrualMethod'];
        this['dc:accrualPeriodicity'] = payload['dc:accrualPeriodicity'];
        this['dc:accrualPolicy'] = payload['dc:accrualPolicy'];
        this['dc:alternative'] = payload['dc:alternative'];
        this['dc:audience'] = payload['dc:audience'];
        this['dc:available'] = payload['dc:available'];
        this['dc:bibliographicCitation'] = payload['dc:bibliographicCitation'];
        this['dc:conformsTo'] = payload['dc:conformsTo'];
        this['dc:contributor'] = payload['dc:contributor'];
        this['dc:coverage'] = payload['dc:coverage'];
        this['dc:created'] = payload['dc:created'];
        this['dc:creator'] = payload['dc:creator'];
        this['dc:date'] = payload['dc:date'];
        this['dc:dateAccepted'] = payload['dc:dateAccepted'];
        this['dc:dateCopyrighted'] = payload['dc:dateCopyrighted'];
        this['dc:dateSubmitted'] = payload['dc:dateSubmitted'];
        this['dc:description'] = payload['dc:description'];
        this['dc:educationLevel'] = payload['dc:educationLevel'];
        this['dc:extent'] = payload['dc:extent'];
        this['dc:format'] = payload['dc:format'];
        this['dc:hasFormat'] = payload['dc:hasFormat'];
        this['dc:hasPart'] = payload['dc:hasPart'];
        this['dc:hasVersion'] = payload['dc:hasVersion'];
        this['dc:identifier'] = payload['dc:identifier'];
        this['dc:instructionalMethod'] = payload['dc:instructionalMethod'];
        this['dc:isFormatOf'] = payload['dc:isFormatOf'];
        this['dc:isPartOf'] = payload['dc:isPartOf'];
        this['dc:isReferencedBy'] = payload['dc:isReferencedBy'];
        this['dc:isReplacedBy'] = payload['dc:isReplacedBy'];
        this['dc:isRequiredBy'] = payload['dc:isRequiredBy'];
        this['dc:issued'] = payload['dc:issued'];
        this['dc:isVersionOf'] = payload['dc:isVersionOf'];
        this['dc:language'] = payload['dc:language'];
        this['dc:license'] = payload['dc:license'];
        this['dc:mediator'] = payload['dc:mediator'];
        this['dc:medium'] = payload['dc:medium'];
        this['dc:modified'] = payload['dc:modified'];
        this['dc:provenance'] = payload['dc:provenance'];
        this['dc:publisher'] = payload['dc:publisher'];
        this['dc:references'] = payload['dc:references'];
        this['dc:relation'] = payload['dc:relation'];
        this['dc:replaces'] = payload['dc:replaces'];
        this['dc:requires'] = payload['dc:requires'];
        this['dc:rights'] = payload['dc:rights'];
        this['dc:rightsHolder'] = payload['dc:rightsHolder'];
        this['dc:source'] = payload['dc:source'];
        this['dc:spatial'] = payload['dc:spatial'];
        this['dc:subject'] = payload['dc:subject'];
        this['dc:tableOfContents'] = payload['dc:tableOfContents'];
        this['dc:temporal'] = payload['dc:temporal'];
        this['dc:title'] = payload['dc:title'];
        this['dc:type'] = payload['dc:type'];
        this['dc:valid'] = payload['dc:valid'];
    }
}
exports.default = Policy;
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

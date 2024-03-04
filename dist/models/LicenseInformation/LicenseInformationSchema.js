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
const LicenseInformationSchema = {
    title: 'Bildungslogin (BiLo) License-information JSON Schema',
    type: 'object',
    required: [
        'lizenzcode',
        'product_id',
        'lizenzanzahl',
        'lizenzgeber',
        'lizenztyp',
    ],
    properties: {
        lizenzcode: {
            description: 'Vom Verlag festgelegte Zeichenfolge zur eindeutigen Identifizierung und Weitergabe der Lizenz. Er muss nach der Zuweisung im Lizenzmanager für eine Nutzung des Mediums über BILDUNGSLOGIN im Zuge des Nutzerzugriffs mit vorangestelltem Verlagskürzel an das Verlagssystem weitergegeben werden.',
            examples: [
                '7bd46a45-345c-4237-a451-4444736eb011',
            ],
            type: 'string',
            minLength: 1,
            maxLength: 255,
        },
        product_id: {
            description: 'Vom Verlag festgelegte, je Verlag eindeutige Zeichenfolge zur Identifizierung des Produkts, für das die Lizenz eine Nutzungsberechtigung gibt. Anhand der Medien-ID können Produktmetadaten aus BILDUNGSLOGIN für die Anzeige im Lizenzmanager abgerufen werden. Alle Lizenzen zum gleichen Produkt (auch aus unterschiedlichen Importvorgängen) müssen in der Anzeige des Lizenzmanagers aggregiert dargestellt und die sich daraus in Summe ergebende Lizenzanzahl im Counter gemeinsam verwaltet werden.',
            examples: [
                '978-3-06-062023-4',
            ],
            type: 'string',
            minLength: 1,
            maxLength: 255,
        },
        lizenzanzahl: {
            description: 'Anzahl der Einlösungen im Verlagsssytem, zu denen der Lizenzcode berechtigt (1-n, standardmäßig 1). Eine Lizenz darf im Lizenzmanager nur so oft zugewiesen werden, wie es die Gesamt-Lizenzanzahl erlaubt (Counter). Für Gruppenlizenzen (lizenztyp=”Schullizenz” / ”Lerngruppenlizenz”) kann hier “0” eingesetzt werden, um eine unbegrenzte Anzahl Lizenzen zu definieren. Für Einzel- und Volumenlizenzen ist „0“ kein gültiger Wert.',
            examples: [
                0,
            ],
            type: 'integer',
            minimum: 0,
        },
        lizenzgeber: {
            description: 'Kürzel des Verlags, der die Lizenz ausgibt. Wird jedem Lizenzcode mit folgendem Bindestrich vorangestellt (z.B.”XYZ-” - siehe https://bildungslogin.atlassian.net/wiki/spaces/MB/pages/3801345/Lizenz-Typen+-Attribute#4.-Lizenzgeber-K%C3%BCrzel ).',
            examples: [
                'VHT',
            ],
            type: 'string',
            minLength: 1,
            maxLength: 255,
        },
        kaufreferenz: {
            description: 'Eine vom Verlag bzw. Lizenzgeber beliebig zu vergebende Information, die bei Bedarf eine eindeutige Zuordnung der Lizenz zu einer bestimmten Transaktion im Verlagssystem ermöglicht. Für die Verarbeitung nicht relevant, lediglich zur Anzeige im Lizenzmanager, z.B. für Kundensupport. Bei der Befüllung dieses Feldes ist darauf zu achten, dass nur datenschutzrechtlich unbedenkliche Daten übermittelt werden (keine personenbezogene Daten).',
            examples: [
                '1970-01-01T10:00:00 +01:00 1234567',
            ],
            type: 'string',
            minLength: 1,
            maxLength: 255,
            nullable: true,
        },
        school_identifier: {
            description: 'Offizielle Schul-ID (für zukünftige Anwendungen).',
            examples: [
                'Ni_1234-5678',
            ],
            type: 'string',
            minLength: 1,
            maxLength: 255,
            nullable: true,
        },
        nutzungssysteme: {
            description: 'Name und ggf. URL des/der Systeme, in denen bzw. über die die Mediennutzung auf Basis der Lizenz erfolgen kann. Für die Verarbeitung nicht relevant, lediglich zur Anzeige im Lizenzmanager.',
            examples: [
                'Antolin',
            ],
            type: 'string',
            minLength: 1,
            maxLength: 255,
            nullable: true,
        },
        gueltigkeitsbeginn: {
            description: 'Datum, zu dem die mit der Lizenz verbundene Nutzungsberechtigung im Verlagssystem beginnt und damit frühestens wahrgenommen werden kann (z.B. 1.9.2021). Wird die Lizenz vor Gültigkeitsbeginn zugewiesen, wird im Lizenzmanager ein entsprechender Hinweis ausgegeben.',
            examples: [
                '01-06-1970',
            ],
            type: 'string',
            pattern: '^\\s*(3[01]|[12][0-9]|0?[1-9])(.|-)(1[012]|0?[1-9])(.|-)((?:19|20)\\d{2})\\s*$',
            nullable: true,
        },
        gueltigkeitsende: {
            description: 'Datum, zu dem die mit der Lizenz verbundenen Nutzungsberechtigung im Verlagssystem erlischt (z.B. 31.12.2022). Die Zuweisung einer Lizenz nach Ablauf des Gültigkeitsendes wird im Lizenzmanager unterbunden.',
            examples: [
                '02-06-1970',
            ],
            type: 'string',
            pattern: '^\\s*(3[01]|[12][0-9]|0?[1-9])(.|-)(1[012]|0?[1-9])(.|-)((?:19|20)\\d{2})\\s*$',
            nullable: true,
        },
        gueltigkeitsdauer: {
            description: 'Gültigkeitszeitraum der Lizenz in Tagen ab Einlösung im Verlagssystem (z.B. “30 Tage, 12 Monate”), nur zur Anzeige im Lizenzmanager.',
            examples: [
                '2 days',
            ],
            type: 'string',
            minLength: 1,
            maxLength: 255,
            nullable: true,
        },
        sonderlizenz: {
            description: 'Auswahl eines Wertes, der den autorisierten Nutzerkreis einer Lizenz ggf. (weiter) einschränkt oder zusätzliche Informationen zum Lizenztyp zur Anzeige im Lizenzmanager liefert (Demo-Lizenz, Lehrer-Lizenz). Wenn dieses Feld bei einer Schullizenz den Wert “Lehrkraft” enthält, gilt die Lizenz für alle Lehrkräfte der Schule, aber nicht für Schüler; wenn sie bei einer Lerngruppenlizenz den Wert “Lehrkraft” enthält, darf sie nur einer Lerngruppe zugewiesen werden, in der ausschließlich Mitglieder mit der Rolle “Lehrer” sind.',
            examples: [
                'Lehrkraft',
            ],
            type: 'string',
            enum: [
                'Demo',
                'Lehrkraft',
            ],
            nullable: true,
        },
        lizenztyp: {
            description: 'Typ der Lizenz(en). Bisher angenommene Werte: Einzellizenz*, Volumenlizenz* Gültig für Gruppenlizenzen: (1) Schullizenz* (Gültigkeit für eine Schule) (2) Lerngruppenlizen',
            examples: [
                'Schullizenz',
            ],
            type: 'string',
            enum: [
                'Schullizenz',
                'Gruppenlizenz',
                'Volumenlizenz',
                'Einzellizenz',
            ],
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
    definitions: {
        JsonDate: {
            type: 'string',
            xreviver: 'JsonDate',
        },
        JsonPromise: {
            type: 'string',
            xreviver: 'JsonPromise',
        },
    },
    additionalProperties: false,
};
exports.default = LicenseInformationSchema;

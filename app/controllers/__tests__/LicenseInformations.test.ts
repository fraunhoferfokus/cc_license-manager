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

import dotenv from 'dotenv'
dotenv.config()

import request from 'supertest'

import APP from '../../app'

const BASE_PATH: string = (process.env.BASE_PATH)
	? (process.env.BASE_PATH.indexOf('/') == 0)
		? process.env.BASE_PATH
		: '/' + process.env.BASE_PATH
	: ''

const testPayload = {
	lizenzcode: 'TEST_LICENSE_CODE_LI',
	product_id: 'urn:test:media:example',
	lizenzanzahl: 60,
	lizenzgeber: 'https://TEST_PUBLISHER',
	kaufreferenz: '1970-01-01T00:00:01.000Z',
	nutzungssysteme: 'TEST_APP',
	gueltigkeitsdauer: '1 Tag',
	lizenztyp: 'Schullizenz'
}

describe('License Information Tests', () => {

	afterEach(async () => {
	}, 1000)

	describe('Endpoint `${BASE_PATH}/licenseInformations`', function () {
		const agent = request.agent(APP)

		const validPayload = { ...testPayload }
		it('POST valid payload', function (done) {
			agent
				.post(`${BASE_PATH}/licenseInformations`)
				.set('Content-Type', 'application/json')
				.send(validPayload)
				.expect(204)
				.end()
			done()
		})

		it('POST duplicate valid payload', function (done) {
			agent
				.post(`${BASE_PATH}/licenseInformations`)
				.set('Content-Type', 'application/json')
				.send(validPayload)
				.expect(409)
				.end()
			done()
		})

		const invalidPayload = { ...testPayload, lizenzcode: 1 }
		it('POST invalid payload', function (done) {
			agent
				.post(`${BASE_PATH}/licenseInformations`)
				.set('Content-Type', 'application/json')
				.send(invalidPayload)
				.expect(400)
				.end()
			done()
		})

	})

	describe('Endpoint `${BASE_PATH}/licenseInformations/:licenseInformationID`', function () {
		const agent = request.agent(APP)

		const validLicenseInformationID = testPayload.lizenzcode
		it('DELETE licenseDefinition', function (done) {
			agent
				.delete(`${BASE_PATH}/licenseInformations/${validLicenseInformationID}`)
				.expect(204)
				.end()
			done()
		})

	})

})

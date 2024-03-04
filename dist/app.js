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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const clm_core_1 = require("clm-core");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const EntryPointCtrl_1 = __importDefault(require("./controllers/EntryPointCtrl"));
const APP = (0, express_1.default)();
const ACCESS_CONTROL_ALLOW_HEADERS = (process.env.ACCESS_CONTROL_ALLOW_HEADERS) ? process.env.ACCESS_CONTROL_ALLOW_HEADERS.split(',') : [];
const ACCESS_CONTROL_ALLOW_METHODS = (process.env.ACCESS_CONTROL_ALLOW_METHODS) ? process.env.ACCESS_CONTROL_ALLOW_METHODS.split(',') : ['OPTIONS', 'POST', 'GET'];
APP.use(function (req, res, next) {
    if (ACCESS_CONTROL_ALLOW_HEADERS.length > 0) {
        res.header('Access-Control-Allow-Headers', ACCESS_CONTROL_ALLOW_HEADERS.join(','));
    }
    if (ACCESS_CONTROL_ALLOW_METHODS.length > 0) {
        res.header('Access-Control-Allow-Methods', ACCESS_CONTROL_ALLOW_METHODS.join(','));
    }
    next();
});
APP.use((0, cors_1.default)());
APP.use(express_1.default.json());
APP.use('/', EntryPointCtrl_1.default);
APP.use(clm_core_1.errHandler);
exports.default = APP;

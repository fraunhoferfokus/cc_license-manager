**This project incorporates elements from the open-source project [CLM](https://github.com/fraunhoferfokus/clm-core) to facilitate its functionality.**

**This microservice is based upon [license-core](https://github.com/fraunhoferfokus/cc_license-core) and extends the basic functionalities with additional features.**

# CC-LICENSE-MANAGER

Component for managing license definitions (license agreement) based on ODRL (currently in version 2.2).

Allows the import of external license definitions. Via plugin: Allows the import of BILDUNGSLOGIN license information; converts it into a license definition based on ODRL.

# Dependencies
## License Package Service
* To be able to import License Information from BILDUNGSLOGIN, relevant service credentials are required. These are required to query the corresponding API. More details: [partners/BILDUNGSLOGIN.md](./partners/BILDUNGSLOGIN.md)
## Service Authentication
* To be able to authorize license imports, relevant service credentuals are required. More details: [partners/n-21.md](./partners/n-21.md)

# Requirements:
* MariaDB Version 10x
* Redis Version 6x
* Node.js Version 20x

# Quick Start:
Install node_modules in the respective git submodules with their respective dependencies by running: 

```npm install```

It is also necessary to copy .env.default file to .env and insert the appropriate values. Please contact the owner of this repository to the values. A description of the values is also given in the file itself.

(UNIX)
```cp .env.default .env```

The following table gives an overview of the settings you can change through the environment variables:

| Name                                          | Example                                          | Required (Yes/No) | Description                                                                                           |
|-----------------------------------------------|--------------------------------------------------|-------------------|-------------------------------------------------------------------------------------------------------|
| `PROTOCOL`                                    | `http`                                           | Yes               | The protocol used for the manager service connection.                                                 |
| `HOST`                                        | `127.0.0.1`                                      | Yes               | The host address for the manager service.                                                             |
| `PORT`                                        | `3092`                                           | Yes               | The port on which the manager service is running.                                                     |
| `BASE_PATH`                                   | `/managers/licenses`                             | Yes               | The base path for the manager service's endpoints.                                                    |
| `CORS_ACCESS_CONTROL_ALLOW_ORIGIN`            | `"*"`                                            | Yes               | CORS setting for allowing requests from any origin.                                                   |
| `ODRL_VERSION`                                | `2_1`                                            | Yes               | The ODRL version used.                                                                                |
| `MARIA_CONFIG`                                | `localhost\|3306\|controlconnect\|root\|12345`   | Yes               | MariaDB configuration details: host, port, database, username, and password.                          |
| `LICENSE_INFORMATION_PROVIDER_API_PROTOCOL`   | `http`                                           | Yes               | The protocol used to connect to the license information provider API.                                |
| `LICENSE_INFORMATION_PROVIDER_API_HOST`       | `127.0.0.1`                                      | Yes               | The host address for the license information provider API.                                            |
| `LICENSE_INFORMATION_PROVIDER_API_PORT`       | `3091`                                           | Yes               | The port on which the license information provider API is running.                                    |
| `LICENSE_INFORMATION_PROVIDER_API_BASE_PATH`  | `/services/licenses/licenseInformations/download`| Yes               | The base path for the license information provider API's endpoints.                                   |
| `OIDC_BILO_CLIENT_ID`                         |                                                  | Yes                | The client ID for OIDC BILDUNGSLOGIN authentication.                                                           |
| `OIDC_BILO_CLIENT_SECRET`                     |                                                  | Yes               | The client secret for OIDC BILDUNGSLOGIN authentication.                                                       |
| `OIDC_AUTH_BILO_ENDPOINT`                     |                                                  | Yes               | The authentication endpoint for OIDC BILDUNGSLOGIN.                                                            |
| `LICENSE_BILO_API`                            |                                                  | Yes               | The API endpoint for BILDUNGSLOGIN license operations.                                                         |
| `SANIS_TOKEN_ENDPOINT`                        |                                                  | Yes               | The token endpoint for SANIS (now referred to as moin.schule).                                        |
| `SANIS_USERINFO_ENDPOINT`                     |                                                  | Yes               | The user info endpoint for SANIS (now referred to as moin.schule).                                    |
| `KEYCLOAK_EXCHANGE_TOKEN_ENDPOINT`            |                                                  | Yes               | The token exchange endpoint for Keycloak.                                                             |
| `SANIS_CLIENT_ID`                             |                                                  | Yes               | The client ID for SANIS (now referred to as moin.schule), if applicable.                              |
| `SANIS_CLIENT_SECRET`                         |                                                  | Yes               | The client secret for SANIS (now referred to as moin.schule).                                         |
| `REDIS_URL`                         |                                                  | Yes               | The url to connect to the redis database                                         |

Afterward just startup the server with following command:

```npm run dev```

# Structure
The project follows following structure

├── app/ # All source files for the busines logic of the server  
│  
└── README.md # The file you're reading now


### Changelog

The changelog can be found in the [CHANGELOG.md](CHANGELOG.md) file.

## Get in touch with a developer

Please see the file [AUTHORS.md](AUTHORS.md) to get in touch with the authors of this project.
We will be happy to answer your questions at {clm@fokus.fraunhofer.de}

## License


The project is made available under the license in the file [LICENSE.txt](license.txt)

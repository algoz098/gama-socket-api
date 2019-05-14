# Gama Socket Stack
## About
It's a prototype project for creating a entire platform for mounting several websites for multiples envirionments.
### How?
TL;DR: Has all the information for the pages.

It will hold the information for the each envirioment. It will have the dinamic data for several pages in that case, and each page will have several components for mount the pages.
### Client/Server comunication
For now we have the API and the Frontend.

The API has two interfaces: REST API and Socket

The Frontend uses VueJS with SSR. It will prefetch the data if needed. And then uses the socket for real time, faster loading, better usability, and so on.

# Documentation for API
## REST API
::: tip Before you start
Every endpoint will use you api base url. 

If you did not change the env variable for your project it will be:
```
http://localhost:3001/
```
:::
### Login
Generate a valid auth token

HTTP Request: 
```
POST: /api/v1/users/login
```
Request Parameters:
| Parameter        | Expected       | Descripion  |
| ------------- |:-------------     | :-----|
| email         | Valid email       | A valid email for registered user |
| password      | Min: 3, Max: 30   | The valid password for the email |

Response Example:
``` json
eyJhbGciOiJIUzI1NiJ9.IjVjYzYwYTU2NDU1NmZiMzYwODNiN2UzYiI.c8Dj7isfj7T_BkpLTqv0cr6URKe3CB-qjft8rL6lurU
```

### Me
Return the user's data

HTTP Request: 
```
GET: /api/v1/users/me
```
Response Example:
``` json
{
    "name": "artur",
    "email": "algoz098@gmail.com",
    "access": [
        {
            "env": "default",
            "level": "max"
        }
    ],
}
```

### Environment
Returns the environment's information

HTTP Request: 
```
GET: /api/v1/environment/:env
```
Query Parameters:
| Parameter        | Default       | Descripion  |
| ------------- |:-------------     | :-----|
| env         | DEFAULT_ENV       | If null will return the env's variable : DEFAULT_ENV |

Response Example:
``` json
{
    "name": "webgs",
    "urls": "webgs.com.br",
    "colors": [
        {
            "type": "accent",
            "color": "pink"
        }
    ],
    "pages": [
        {
            "route": "/",
            "componets": [
                {
                    "name": "default",
                    "templateFile": "default"
                }
            ]
        }
    ]
}
```

## Socket API
::: tip 
We are using Socket.IO
:::
### login
Generate a valid auth token

Socket Client Request: 
```
EMIT: login
```
Request Parameters:
| Parameter        | Expected       | Descripion  |
| ------------- |:-------------     | :-----|
| email         | Valid email       | A valid email for registered user |
| password      | Min: 3, Max: 30   | The valid password for the email |

Socket Server Emit Example:
```
EMIT: token
RESPONSE : eyJhbGciOiJIUzI1NiJ9.IjVjYzYwYTU2NDU1NmZiMzYwODNiN2UzYiI.c8Dj7isfj7T_BkpLTqv0cr6URKe3CB-qjft8rL6lurU
```
### me
Return the user's data

Socket Client Request: 
```
EMIT: me
```
Request Parameters:
| Parameter        | Expected       | Descripion  |
| ------------- |:-------------     | :-----|
| token         | login token       | If the cookie does not includes token will be searched inside the request |
Socket Server Emit Example:
```
EMIT: me
RESPONSE : 
{
    "name": "artur",
    "email": "algoz098@gmail.com",
    "access": [
        {
            "env": "default",
            "level": "max"
        }
    ],
}
```
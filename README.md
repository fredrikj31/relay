# Relay

## Environment Variables

Create a `.env` file in the project root file. The content of the file should be the following:

```shell
# API Environment Variables
API_HOST=0.0.0.0 # Optional
API_PORT=3000 # Optional
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=relay
TOKEN_PASSWORD_SALT= # Random generated string
TOKEN_JWT_PRIVATE_KEY= # Random generated string
```

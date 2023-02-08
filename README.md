# React-Youtube

## Frontend

First make sure you are in the `frontend` folder.

### Deployment

1. Create an Auth0 Application.

2. Copy the `.env.example` to `.env`
    ```bash
    cp .env.example .env
    ```
   Modify the environment in `.env` file to your needs.
    ```
   REACT_APP_AUTH0_DOMAIN=Your Auth0 Domain
   REACT_APP_AUTH0_CLIENT_ID=Your Auth0 Client ID
   REACT_APP_API_URL=Your Backend URL, do not include the trailing slash
   ```

## Backend

First make sure you are in the `backend` folder.

### Deployment

1. Copy the `docker-compose.dev.yaml` to `docker-compose.yaml`
    ```bash
    cp docker/docker-compose.dev.yaml docker/docker-compose.yaml
    ```

2. Modify the environment in `docker-compose.yaml` file to your needs.
    ```
   DUMMY_USER_ID: leave it empty right now
   AUTH0_CERT: base64(Signing Certificate in your Auth0 Application)
   APP_KEYS: strong random string, can be split by comma
   ADMIN_JWT_SECRET: strong random string
   JWT_SECRET: strong random string
   API_TOKEN_SALT: strong random string
   ```

3. Run the docker-compose
    ```bash
    docker-compose up -f docker/docker-compose.yaml -d
    ```

### Configuration

1. Login to the backend after creating the admin account.

2. Create a dummy user in User via Content Manager.
   > You can use and random information, we just need the id of the user.

3. Update the `DUMMY_USER_ID` in `docker-compose.yaml` to the id of the dummy user, and the restart the backend.
    ```bash
    docker-compose up -f docker/docker-compose.yaml -d
    ```

4. Configure permission for roles in Setting -> Roles.

   For Authenticated Users, you have to ensure you have following permissions:
   ```
   Comment: create, find
   Like: create, find, delete
   User-profile: callback, find, findOne
   Video: create, find, findOne, view
   Upload: find, findOne, upload
   ```
   For Public Users, you have to ensure you have following permissions:
   ```
   User-profile: callback, find, findOne
   Video: find, findOne, view
   Upload: findOne
    ```
   And remember to save the changes.
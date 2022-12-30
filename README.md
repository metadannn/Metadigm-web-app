# **ReactJS run and deployment**

Here is the information required to run and deploy the ReactJS application in the Amplify service.

## Variables

Found in the file `src/util/constants.ts`.

```
METADIGM_API_URL = Backend URL
STRIPE_PUBLIC_KEY = Public key from Stripe
STRIPE_RETURN_URL = The URL for redirection after payment.
```

## Run locally

Run the app.

```shell
pnpm start
```

## Amplify CLI

Install the Amplify CLI using npm.

```shell
npm install -g @aws-amplify/cli
```

## Login

Authenticate with AWS.

```shell
amplify configure
```

## Deploy

Install the Amplify CLI using npm.

```shell
amplify publish
```

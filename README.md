<!--
title: 'SNSW location API'
description: 'This app is a simple HTTP API built on Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorName: 'Charchit'
-->

# Serverless Framework Node HTTP API on AWS

This app creates a nodeJs function to be deployed and tun over AWS lambda.

It contains an API endpoint which consumes a an address as a query param and then uses 2 external API endpoints to
receive the coordinates and suburb for the provided address.

This app is running on AWS Lambda and API Gateway using the Serverless Framework. The framework saves a lot of efforts 
required to setup a lambda function along with an API gateway and logging.

# Things to note:

The address to be provided to the NSW web API is required to be enclosed in single quotes. This causes a minor issue
with using libraries like axios because the single quote is not encoded in nodejs env with axios.
It seems to be a known issue but probably not something to be fixed.
For this reason I chose to use `fetch` API.

## Usage

This API can currently be accessed at `https://vr93rqgba5.execute-api.us-east-1.amazonaws.com`

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying aws-node-http-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: aws-node-http-api-project-dev-hello (1.9 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl --request GET \
  --url 'https://vr93rqgba5.execute-api.us-east-1.amazonaws.com/?address=346%20PANORAMA%20AVENUE%20BATHURST'
```

Which should result in response similar to the following:

```json
{
  "location": {
    "longitude": "149.56705027261992",
    "latitude": "-33.42968429289573"
  },
  "suburb": "BATHURST",
  "district": "BATHURST"
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function api --path mockRequest.json
```
A `mockRequest.json` has been created to use a request body for making local or remote API calls to this API

Which should result in response similar to the following:

```
{
  "location": {
    "longitude": "149.56705027261992",
    "latitude": "-33.42968429289573"
  },
  "suburb": "BATHURST",
  "district": "BATHURST"
}
```


Alternatively, it is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).

#Simplest Serverless CRUD

A straight forward project that can Create, Remove and Update an entry in a DynamoDB instance.

## Pre requisites

`aws-cli` -> Command line client for aws

`nodejs`

`serverless-cli`

### How to run:

Configure your aws credentials using the `aws-cli`

`npm install` or `yarn`
`sls invoke -f <functionName> -p event.json`


### Deploy the service

`sls deploy`


Soon I will update more info about how to properly configure every step to have your FaaS working like a charm.


Cheers


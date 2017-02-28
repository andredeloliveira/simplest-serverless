'use strict'

var AWS = require('aws-sdk')
var uuid = require('uuid')
var _ = require('underscore')

module.exports.addShopping = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient()
  var params = JSON.parse(event.body)
  var Item = {
    id: uuid.v4(),
    storeName: params.storeName,
    cidade: params.cidade,
    estado: params.estado,
  }

  docClient.put({
    TableName: 'pascoa-virtual-shoppings',
    Item: Item
    }, (error) => {
      if (error) {
        callback(error)
      }
      callback(null, {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: "Information saved succesfully for " + JSON.stringify(event.body)
      })
  })
}


module.exports.removeShopping = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient()
  var id = event.queryStringParameters ? event.queryStringParameters.id : event.id
  var params = {
    TableName: 'pascoa-virtual-shoppings',
    Key: {
      'id': id
    },
    ConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id
    }
  }
  docClient.delete(params, (error, data) => {
    if (error) {
      callback(error)
    }
    callback(null, {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin' : '*'
      },
      body: 'Information successfully deleted with id ' + id
    })
  })
}

module.exports.updateShopping = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient()
  var store = event.body ? JSON.parse(event.body) : event;

  var params = {
    TableName: 'pascoa-virtual-shoppings',
    Key: {
      'id': store.id
    },
    UpdateExpression: 'set cidade = :cidade, estado = :estado, storeName = :storeName',
    ExpressionAttributeValues: {
      ':cidade': store.cidade,
      ':estado': store.estado,
      ':storeName': store.storeName
    },
    ReturnValues: 'UPDATED_NEW'
  }
  docClient.update(params, (error, data) => {
    if (error) {
      callback(error)
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: "Updated " + JSON.stringify(data)
      })
    }
  })
}

module.exports.getShoppings = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient()
  var params = {
    TableName: 'pascoa-virtual-shoppings',
  }
  docClient.scan(params, (error, data) => {
    if (error) {
      callback(error)
    }
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({ shoppings: data.Items }),
    })
  })
}

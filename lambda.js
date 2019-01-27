'use strict';
const ApiBuilder = require('claudia-api-builder');
const ShutdownTag = require('./shutdownTag.js');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'us-east-1' });

var api = new ApiBuilder();

var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
var params = [];
var instancesList = '';
var InstanceIds = [];

exports.handler = function(event, context) {
  ec2.describeInstances(params, function(err, data) {
    if (err) return console.log(err, err.stack);

    for (var i in data.Reservations) {
      var ins = data.Reservations[i].Instances[0];
      var tagValue = findShutDownTag(ins);
      if (tagValue === null) continue;

      instancesList +=
        '  id: ' + ins.InstanceId + '  Status: ' + ins.State.Name + '\n';
      console.log('tag value:', tagValue);
      var shutDowntag = new ShutdownTag(tagValue);
      if (shutDowntag.isShutDownHour()) InstanceIds.push(ins.InstanceId);
    }

    if (InstanceIds && InstanceIds.length) {
      stopInstances(InstanceIds);
    }
  });
};

function findShutDownTag(ins) {
  for (var j in ins.Tags) {
    if (ins.Tags[j].Key === 'shutdown') {
      return ins.Tags[j].Value;
    }
  }
  return null;
}

function stopInstances(instanceIds) {
  ec2.stopInstances({ InstanceIds: instanceIds }, function(err, data) {
    if (err) {
      console.log('Error', err);
    } else if (data) {
      console.log('Success', data.StoppingInstances);
    }
  });
}

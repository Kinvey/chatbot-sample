/**
 * Copyright (c) 2014, Kinvey, Inc. All rights reserved.
 *
 * This software contains valuable confidential and proprietary information of
 * KINVEY, INC and is subject to applicable licensing agreements.
 * Unauthorized reproduction, transmission or distribution of this file and its
 * contents is a violation of applicable laws.
 *
 * Author: mjsalinger
 */

const request = require('request');

const APP_KEY = 'kid_rkBpaDoF';
const MASTER_SECRET = '60a987627717489585543137f86ffffe';
const BASE_URI = 'https://baas.kinvey.com/appdata/' + APP_KEY + '/';

function makeRequest(method, collection, id, query, body, callback) {
  let requestUri = BASE_URI + collection + '/';

  if (id) {
    requestUri += id + '/';
  }

  if (query) {
    requestUri += '?query=' + query;
  }

  const requestOptions = {
    uri: requestUri,
    method: method,
    auth: {
      user: APP_KEY,
      pass: MASTER_SECRET
    },
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'slack-kinvey-taskbot/0.1.4'
    }
  };

  if (body) {
    requestOptions.body = body;
  }

  request(requestOptions, function(err, res, body) {
    if (err) {
      return callback(err);
    }
    callback(null, body);
  });
}

function collection(collectionName) {
  return {
    getAll: function(callback) {
      makeRequest('GET', collectionName, null, null, null, callback);
    }
  }
}

const kinvey = {
  collection: collection
};

module.exports = kinvey;
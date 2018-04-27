var request = require('request');
var Usergrid = {};

//authentication type constants
Usergrid.Client = function (options) {
  //usergrid enpoint
  this.URI = options.URI;
  this.basepath = options.basepath;

  //authentication data
  this.apiKey = options.apiKey;

};

/*
*  Main function for making requests to the API.  Can be called directly.
*
*  options object:
*  `method` - http method (GET, POST, PUT, or DELETE), defaults to GET
*  `qs` - object containing querystring values to be appended to the uri
*  `body` - object containing entity body for POST and PUT requests
*  `endpoint` - API endpoint, for example 'users/fred'
*  `mQuery` - boolean, set to true if running management query, defaults to false
*
*  @method request
*  @public
*  @params {object} options
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
Usergrid.Client.prototype.request = function (options, callback) {
  var self = this;
  var method = options.method || 'GET';
  var endpoint = options.endpoint;
  var body = options.body || {};
  var qs = options.qs || {};
  var uri;
  uri = this.URI + this.basepath + '/' + endpoint;
  qs['apiKey'] = this.apiKey;

  var callOptions = {method: method, uri: uri, json: body, qs: qs};
  request(callOptions, function (err, r, data) {

    r.body = r.body || {};
    data = data || {};

    self._end = new Date().getTime();
    if (r.statusCode === 200) {
      callback(err, data);
    } else {
      err = true;
      data.statusCode = r.statusCode;
      callback(err, data);
    }
  });
};

/*
*  Main function for creating new entities - should be called directly.
*
*  options object: options {data:{'type':'collection_type', 'key':'value'}, uuid:uuid}}
*
*  @method createEntity
*  @public
*  @params {object} options
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
Usergrid.Client.prototype.createEntity = function (options, callback) {
  // todo: replace the check for new / save on not found code with simple save
  // when users PUT on no user fix is in place.

  var getOnExist = options.getOnExist || false; //if true, will return entity if one already exists
  var options = {
    client: this,
    data: options
  }
  var entity = new Usergrid.Entity(options);
  entity.fetch(function (err, data) {
    //if the fetch doesn't find what we are looking for, or there is no error, do a save
    if(err){
      okToSave = true;
    }
    var okToSave = err || (!err && getOnExist);
    if (okToSave) {
      entity.set(options.data); //add the data again just in case
      entity.save(function (err, data) {
        if (typeof(callback) === 'function') {
          callback(err, entity, data);
        }
      });
    } else {
      if (typeof(callback) === 'function') {
        callback(err, entity, data);
      }
    }
  });

}

/*
 *  A class to Model a Usergrid Entity.
 *  Set the type and uuid of entity in the 'data' json object
 *
 *  @constructor
 *  @param {object} options {client:client, data:{'type':'collection_type', uuid:'uuid', 'key':'value'}}
 */
Usergrid.Entity = function (options) {
  if (options) {
    this._data = options.data || {};
    this._client = options.client || {};
  }
};

/*
*  adds a specific key value pair or object to the Entity's data
*  is additive - will not overwrite existing values unless they
*  are explicitly specified
*
*  @method set
*  @param {string} key || {object}
*  @param {string} value
*  @return none
*/
Usergrid.Entity.prototype.set = function (key, value) {
  if (typeof key === 'object') {
    for (var field in key) {
      this._data[field] = key[field];
    }
  } else if (typeof key === 'string') {
    if (value === null) {
      delete this._data[key];
    } else {
      this._data[key] = value;
    }
  } else {
    this._data = {};
  }
}

/*
*  Saves the entity back to the database
*
*  @method save
*  @public
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
Usergrid.Entity.prototype.save = function (callback) {
  var type = this.get('type');
  var method = 'POST';
  if (isUUID(this.get('uuid'))) {
    method = 'PUT';
    type += '/' + this.get('uuid');
  }

  //update the entity
  var self = this;
  var data = {};
  var entityData = this.get();
  //remove system specific properties
  for (var item in entityData) {
    if (item === 'metadata' || item === 'created' || item === 'modified' ||
        item === 'type' || item === 'activated' || item === 'uuid') {
      continue;
    }
    data[item] = entityData[item];
  }
  var options = {
    method: method,
    endpoint: type,
    body: data
  };
  //save the entity first
  this._client.request(options, function (err, retdata) {
    //clear out pw info if present
    if (err && self._client.logging) {
      console.log('could not save entity');
      if (typeof(callback) === 'function') {
        return callback(err, retdata, self);
      }
    } else {
      if (retdata.entities) {
        if (retdata.entities.length) {
          var entity = retdata.entities[0];
          self.set(entity);
          // var path = retdata.path;
          // //for connections, API returns type
          // while (path.substring(0, 1) === "/") {
          //   path = path.substring(1);
          // }
          // self.set('type', path);
        }
      }
        callback(err, retdata, self);
    }
  });
}

/*
*  refreshes the entity by making a GET call back to the database
*
*  @method fetch
*  @public
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
Usergrid.Entity.prototype.fetch = function (callback) {
  var type = this.get('type');
  var self = this;

  //Check for an entity type, then if a uuid is available, use that, otherwise, use the name
  try {
    if (type === undefined) {
      throw 'cannot fetch entity, no entity type specified'
    } else if (this.get('uuid')) {
      type += '/' + this.get('uuid');
    } else if (type === 'users' && this.get('username')) {
      type += '/' + this.get('username');
    } else if (this.get('name')) {
      type += '/' + encodeURIComponent(this.get('name'));
    } else if (typeof(callback) === 'function') {
      throw 'no_name_specified';
    }
  } catch (e) {
    console.log(e);
    return callback(true, {error: e}, self);
  }
  var options = {
    method: 'GET',
    endpoint: type
  };
  this._client.request(options, function (err, data) {
    if (err) {
      console.log('could not get entity');
    } else {
      if (data.user) {
        self.set(data.user);
        self._json = JSON.stringify(data.user, null, 2);
      } else if (data.entities) {
        if (data.entities.length) {
          var entity = data.entities[0];
          self.set(entity);
        }
        else{
          err = "NOT_FOUND";
        }
      }
    }
    if (typeof(callback) === 'function') {
      callback(err, data, self);
    }
  });
}

/*
*  gets a specific field or the entire data object. If null or no argument
*  passed, will return all data, else, will return a specific field
*
*  @method get
*  @param {string} field
*  @return {string} || {object} data
*/
Usergrid.Entity.prototype.get = function (field) {
  if (field) {
    return this._data[field];
  } else {
    return this._data;
  }
}

/*
* Tests if the string is a uuid
*
* @public
* @method isUUID
* @param {string} uuid The string to test
* @returns {Boolean} true if string is uuid
*/
function isUUID (uuid) {
  var uuidValueRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!uuid) return false;
  return uuidValueRegex.test(uuid);
}

exports.entity = Usergrid.Entity;
exports.client = Usergrid.Client;

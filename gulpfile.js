var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var prompt = require('prompt');

var fse = require('fs-extra');
var mustache = require('mustache');

gulp.task('start', gulpSequence('condition', 'deploy'));

gulp.task('condition', function (cb) {
  mustache.tags = ['<%', '%>'];
  var condition = [];
  condition.push({
    name: 'hasdatastore',
    description: 'Do you have cloud datastore instance? Enter - true/false',
    type: 'boolean',
    required: true
  });

  prompt.get(condition, function (err, results) {
    if (results['hasdatastore']) {
      var required_values = [];
      required_values.push({
        name: 'serviceaccount_project',
        description: 'Enter the cloud datastore project id',
        type: 'string',
        required: true
      });
      required_values.push({
        name: 'serviceaccount_private_key',
        description: 'Enter the service account private key',
        type: 'string',
        required: true
      });
      required_values.push({
        name: 'serviceaccount_token_uri',
        description: 'Enter the token uri of the service account',
        type: 'string',
        required: true
      });
      required_values.push({
        name: 'serviceaccount_client_email',
        description: 'Enter the client email of the service account',
        type: 'string',
        required: true
      });

      prompt.start();

      prompt.get(required_values, function (err, results) {
        //
        results["datastore_basepath"] = "";
        updateConfig(results, cb);
      })
      //
    }
    else {
      var required_values = [];

      required_values["serviceaccount_project"] = "replace_with_datastore_project_id";
      required_values["serviceaccount_private_key"] = "replace_with_datastore_service_account_private_key";
      required_values["serviceaccount_token_uri"] = "http://replace_with_datastore_service_account_token_uri";
      required_values["serviceaccount_client_email"] = "replace_with_datastore_service_account_email";
      required_values["datastore_basepath"] = "/connector/fhirsandbox";//fhir sandbox org

      updateConfig(required_values, cb);

    }

  })
});

function updateConfig(required_values, cb) {

  fse.copy('config.yml.orig', 'config.yml', function (error) {
    if (error) {
      cb(error);
    }
    else {
      replace_variables(['config.yml'], required_values, function (error, res) {
        mustache.tags = ['{{', '}}'];
        require('edge-launchpad')(gulp);
        cb(error, res)
      });

    }
  })

}

function replace_variables(paths, inject_object, cb) {
  mustache.escape = function (value) {
    return value;
  };
  for (var i = 0; i < paths.length; i++) {
    var path_to_template = paths[i];
    var data;
    try {
      data = fse.readFileSync(path_to_template, 'utf8')
    } catch (e) {
      console.log(e);
      cb(e);
    }
    var mu_template = String(data);
    try {
      var output = mustache.render(mu_template, inject_object)
    } catch (e) {
      console.log(e);
      cb(e);
    }
    try {
      fse.outputFileSync(path_to_template.split('.').slice(0, 2).join('.'),
          output)
    } catch (e) {
      console.log(e);
      cb(e);
    }
    output = '< yet to copy from original template >';
  }
  cb(null, inject_object);
}
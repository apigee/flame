var lib				= require('../../lib')
var async           = require('async')
var lodash          = require('lodash')
var request         = require('request')
var mustache        = require('mustache')

mustache.escape = function (value) {
    return value;
};

var adapter = function () {
    this.clean 			= clean
    this.build 			= build
    this.deploy 		= deploy
}

function build(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','building util resources')
    cb()
}

function deploy(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','deploying util resources')

    var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

    var deploy_info     = context.getDeploymentInfo()

    for (var i=0; i< items.length; i++) {
        lodash.merge(items[i], deploy_info)
        items[i].context = context
    }

    async.each(items, deploy_util, function(err){
        if(err){
            lib.print('ERROR', err)
            cb()
        } else {
            cb()
        }

    })
}

function deploy_util(item, callback) {
    var context			= item.context
    delete item.context

    if(item.action == 'base64.encode') {
        var str = mustache.render(item.value, context.getAllVariables())
        var output = new Buffer(str).toString('base64');
        context.setVariable(item.assignTo, output)
    }

    callback()

}

function clean(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','cleaning util resources')
    cb()
}

exports.adapter 			= adapter

AntiHelpers = function (options) {
  'use strict';
  
  var helpers = {};
  
  options = options || {};
  
  function Proxy (context) {
    this.context = context;
  }
  
  function Helpers () {
    
    this._helpers = helpers;
    
    this.registerAs = function (prefix) {

      _.each(helpers, function (helper, name) {
        addToProxy(name, helper);
      });
      
      Template.registerHelper(prefix, function () {
        return new Proxy(this);
      });
    };

    this.define = function (name, helper) {
      if (typeof name !== 'string') {
        throw new Error('argument "name" must be a string');
      }
      if (helpers.hasOwnProperty(name)) {
        console.warn('you are overwriting an existing helper: ' + name);
      }
      helpers[name] = helper;
      addToProxy(name, helper);
    };
  }
  
  Helpers.prototype = helpers;
  
  function addToProxy (name, helper) {
    Proxy.prototype[name] = function () {
      return helper.apply(this.context, arguments);
    };
  }
  
  return new Helpers();
};



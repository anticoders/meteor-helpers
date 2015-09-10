AntiHelpers = function (options) {
  'use strict';
  
  options = options || {};

  var helpers = {};
  var dependencies = {};
  var isReactive = !!options.reactive;
  
  function Proxy (context) {
    this.context = context;
  }
  
  function Helpers () {
    
    this._helpers = helpers;
    
    this.registerAs = function (prefix) {
      Template.registerHelper(prefix, function () {
        return new Proxy(this);
      });
    };

    this.define = function (name, helper) {
      var original;
      
      if (typeof helper === 'undefined') {
        helper = function () {};
      }
      if (typeof name !== 'string') {
        throw new Error('argument "name" must be a string');
      }
      if (typeof helper !== 'function') {
        throw new Error('argument "helper" must be a function');
      }
      if (helpers.hasOwnProperty(name)) {
        console.warn('you are overwriting an existing helper: ' + name);
      }
      
      if (isReactive) {
        if (!dependencies[name]) {
          dependencies[name] = new Tracker.Dependency();
        }
        // make sure "changed" is not called on the first run
        if (helpers.hasOwnProperty(name)) {
          dependencies[name].changed();
        }
        original = helper;
        helper = function () {
          dependencies[name].depend();
          return original.apply(this, arguments);
        };
      }
      
      // expose the helper to the javascript code ...
      helpers[name] = helper;
      
      // ... and to the templates
      Proxy.prototype[name] = function () {
        return helper.apply(this.context, arguments);
      };
    };
  }
  
  Helpers.prototype = helpers;
  
  return new Helpers();
};



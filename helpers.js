AntiHelpers = function (options) {
  'use strict';
  
  options = options || {};
  
  function Proxy (context) {
    this.context = context;
  }
  
  function Helpers () {
  }
  
  Helpers.prototype.load = function (prefix) {
    
    _.each(this, function (value, key) {
      Proxy.prototype[key] = function () {
        return value.apply(this.context, arguments);
      };
    });
    
    Template.registerHelper(prefix, function () {
      return new Proxy(this);
    });
  };
  
  return new Helpers();
};



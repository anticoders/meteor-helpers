if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Helpers = new AntiHelpers();
  
  Helpers.capitalize = function (value) {
    return value.toString().toUpperCase();
  };
  
  Helpers.createdAt = function () {
    return moment(this.createdAt).format('YYYY/MM/DD');
  };

  Helpers.yesterday = function () {
    return moment().subtract(1, 'day').toDate();
  };

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  
  Helpers.load('$');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

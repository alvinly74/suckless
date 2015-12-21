(function(root) {
  'use strict';

  var _users = { blue: {}, red: {} };
  var USER_CHANGE = "USERCHANGED";

  var clearStore = function(){
    _users = { blue: {}, red: {} };
  };

  var updateUserStore = function(users, teamColor){
    Object.keys(users).forEach(function(userId){
      _users[teamColor][userId] = users[userId];
    });
  };

  var UserStore = root.UserStore = $.extend({}, EventEmitter.prototype, {

    showUsers: function(){
      return _users;
    },

    showTeam: function(color){
      return _users[color];
    },

    showUser:function(id, teamColor){
      return _users[teamColor][id];
    },

    addUserChangeListener:function(callback){
      this.on(USER_CHANGE, callback);
    },

    removeUserChangeListener: function(callback){
      this.removeListener(USER_CHANGE,callback);
    },

    dispatcherID: AppDispatcher.register(function(payload){

      switch (payload.actionType){
        case UserConstants.USER_STORE_UPDATE:
          clearStore();
          updateUserStore(payload.users.red, 'red');
          updateUserStore(payload.users.blue, 'blue');
          UserStore.emit(USER_CHANGE);
          break;

      }
    })
  });
})(this);

(function(root) {
  'use strict';

  var _users = {};
  var USER_CHANGE = "USERCHANGED";

  var clearStore = function(){
    _users = {};
  };

  var updateUserStore = function(users){
    users.forEach(function(user){
      _users[user.summonerId] = user;
    });
  };

  var UserStore = root.UserStore = $.extend({}, EventEmitter.prototype, {

    showUsers: function(){
      return _users;
    },

    showUser:function(id){
      return _users[id];
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
          updateUserStore(payload.users);
          UserStore.emit(USER_CHANGE);
          break;

      }
    })
  });
})(this);

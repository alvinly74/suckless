(function(root) {
  'use strict';

  var _champs = {};
  var CHAMPCHANGE = "CHAMPCHANGED";

  var clearStore = function(){
    _champs = {};
  };

  var updateChampStore = function(users){
    users.forEach(function(user){
      _users[user.summonerId] = user;
    });
  };

  var ChampStore = root.ChampStore = $.extend({}, EventEmitter.prototype, {

    showUsers: function(){
      return _users;
    },

    dispatcherID: AppDispatcher.register(function(payload){

      switch (payload.actionType){
        case ChampConstants.CHAMP_STORE_UPDATE:
          clearStore();
          updateChampStore(payload.users);
          ChampStore.emit(CHAMPCHANGE);
          break;

      }
    })
  });
})(this);

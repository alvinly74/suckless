(function(root) {
  'use strict';

  var _champs = {};
  var CHAMPCHANGE = "CHAMPCHANGED";

  var clearStore = function(){
    _champs = {};
  };

  var updateChampStore = function(champs){
    _champs = champs;
  };

  var ChampStore = root.ChampStore = $.extend({}, EventEmitter.prototype, {

    showAll: function(){
      return _champs;
    },

    displayChampion: function(champId){
      return _champs[champId];
    },

    dispatcherID: AppDispatcher.register(function(payload){

      switch (payload.actionType){
        case StaticConstants.CHAMP_STORE_UPDATE:
          clearStore();
          updateChampStore(payload.champs);
          ChampStore.emit(CHAMPCHANGE);
          break;

      }
    })
  });
})(this);

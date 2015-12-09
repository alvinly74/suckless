(function(root) {
  'use strict';

  var _items = {};
  var ITEMCHANGE = "ITEMCHANGE";

  var clearStore = function(){
    _items = {};
  };

  var updateItemStore = function(items){
    Object.keys(items).forEach(function(item){
      _items[item.id] = item;
    });
  };

  var ItemStore = root.ItemStore = $.extend({}, EventEmitter.prototype, {

    showAll: function(){
      return _items;
    },
    
    displayChampion: function(itemId){
      return _items[itemId];
    },

    dispatcherID: AppDispatcher.register(function(payload){

      switch (payload.actionType){
        case StaticConstants.ITEM_STORE_UPDATE:
          clearStore();
          updateItemStore(payload.items);
          ItemStore.emit(ITEMCHANGE);
          break;

      }
    })
  });
})(this);

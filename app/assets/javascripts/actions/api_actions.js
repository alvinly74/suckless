var ApiActions = {
  updateUserStore: function(users){
    AppDispatcher.dispatch({
      actionType:UserConstants.USER_STORE_UPDATE,
      users: users
    });
  },
  updateChamps: function(champs){
    AppDispatcher.dispatch({
      actionType:StaticConstants.CHAMP_STORE_UPDATE,
      champs:champs
    });
  },

  updateItems: function(items){
    AppDispatcher.dispatch({
      actionType: StaticConstants.ITEM_STORE_UPDATE,
      items:items
    });
  }
};

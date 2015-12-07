var ApiActions = {
  updateUserStore: function(users){
    AppDispatcher.dispatch({
      actionType:UserConstants.USER_STORE_UPDATE,
      users: users
    });
  }
};

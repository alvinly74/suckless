var testUserId = '510537';
ApiUtil = {
  searchUser: function(username){
    $.ajax({
      url: "api/search/username",
      data: {username: username},
      method: "get",
      success: function(currentGame){
        console.log("Found Game");
        console.log(currentGame);
        debugger;
        ApiUtil.handleCurrentGame(currentGame);
        ApiActions.updateUserStore(currentGame.participants);
      },
      error: function(testError){
        console.log('Did not Find Game/user');

      }
    });
  },
  handleCurrentGame: function(currentGame){

  },

};

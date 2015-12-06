var testUserId = '510537';
ApiUtil = {
  searchUser: function(username){
    $.ajax({
      url: "api/search/username",
      data: {username: username},
      method: "get",
      success: function(currentGame){
        console.log("Found Game");
        ApiUtil.handleCurrentGame(currentGame);
      },
      error: function(testError){
        console.log('Did not Find Game/user');
        debugger
      }
    });
  },
  handleCurrentGame: function(currentGame){
    if (currentGame == 'problem'){
      alert("user not in a game");
    }
  }
};

var testUserId = '510537';
var ApiUtil = {
  searchUser: function(username){
    $.ajax({
      url: "api/search/username",
      data: {username: username},
      method: "get",
      success: function(currentGame){
        console.log("Found Game");
        console.log(currentGame);
        ApiActions.updateUserStore(currentGame.participants);
      },
      error: function(testError){
        alert("might not be in game");
        console.log(testError);
        console.log('Did not Find Game/user');
      }
    });
  },

  historyUser: function(username){
    $.ajax({
      url: "api/search/history-username",
      data: {username: username},
      method: "get",
      success: function(currentGame){
        console.log("Found Game");
        console.log(currentGame);
        // ApiActions.updateUserStore(currentGame.participants);
      },
      error: function(testError){
        console.log('Did not Find Game/user');
      }
    });
  },
  grabChamps: function(){
    $.ajax({
      url: "api/search/champs",
      method: "get",
      success: function(champs){
        console.log("Found Champs");
        console.log(champs);
        ApiActions.updateChamps(champs);
      },
      error: function(testError){
        console.log('Did not Find Champs');
      }
    });
  },
  grabItems: function(){
    $.ajax({
      url: "api/search/items",
      method: "get",
      success: function(items){
        console.log("Found Items");
        console.log(items);
        ApiActions.updateItems(items);
      },
      error: function(testError){
        console.log('Did not Find Items');
      }
    });
  }
};

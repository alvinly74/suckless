var testUserId = '510537';
ApiUtil = {
  searchUserOriginal: function(username){
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + username,
      data: {api_key: '6482fb35-7b68-4792-8603-6aa61b8d2076'},
      method: "get",
      success: function(user){
        ApiUtil.handleUser(user[username].id);
      }

    });
  },
  searchUser: function(username){
    $.ajax({
      url: "api/search/username",
      data: {username: username},
      method: "get",
      success: function(user){
        debugger;
        ApiUtil.handleUser(user[username].id);
      }

    });
  },

  handleUser: function(userId){
    $.ajax({
      url: 'https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/' + userId,
      data: {api_key: '6482fb35-7b68-4792-8603-6aa61b8d2076'},
      method: 'get',
      success:function(currentGame){
        debugger;
        console.log(currentGames);
      }
    });
  }
};

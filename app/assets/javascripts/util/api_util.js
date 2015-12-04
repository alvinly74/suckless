var testUserId = '510537';
ApiUtil = {
  searchUser: function(username){
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + username,
      data: {api_key: '6482fb35-7b68-4792-8603-6aa61b8d2076'},
      method: "get",
      success: function(user){
        console.log(user);
        ApiUtil.handleUser(user[username].id);
      }

    });
  },
  handleUser: function(userId){
    var beginTime = 1415523472945;
    var endTime = new Date().getTime().toString();
    $.ajax({
      url: 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + userId + "/recent",
      data: {api_key: '6482fb35-7b68-4792-8603-6aa61b8d2076'},
      method: 'get',
      success:function(games){
        console.log(games);
      }
    });
  }
};

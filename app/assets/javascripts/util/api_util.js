ApiUtil = {
  searchUser: function(username){
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + username,
      data: {api_key: '6482fb35-7b68-4792-8603-6aa61b8d2076'},
      method: "get",
      success: function(user){
        ApiUtil.handleUser(user[username].id);
      }

    });
  },
  handleUser: function(userId){
    $.ajax({
      url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/' + userId,
      data: {api_key: '6482fb35-7b68-4792-8603-6aa61b8d2076',
             beginTime: new Date().getTime()- 216000},
      method: 'get',
      success:function(games){
        console.log(games);
      }
    });
  }
};

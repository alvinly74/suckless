var SearchResult = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function(){
    return {users:UserStore.showUsers()};
  },

  componentDidMount:function(){
    UserStore.addUserChangeListener(this._onChange);
  },

  _onChange:function(){
    this.setState({users:UserStore.showUsers()});
  },

  team: function(color){
    users = Object.keys(UserStore.showTeam(color)).map(function(userId){return UserStore.showUser(userId, color);});
    return users.map(function(user){
        return <SummonerItem summoner={user}/>;
      });
  },

  render: function(){
    return (
      <div className="SearchResult">
        <a>{this.team('blue')}</a>
        <a>{this.team('red')}</a>
      </div>
    );
  }
});

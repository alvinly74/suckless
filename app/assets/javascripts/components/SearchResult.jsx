var SearchResult = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function(){
    return {users:Object.keys(UserStore.showUsers()).map(function(user){return UserStore.showUser(user);})};
  },
  componentDidMount:function(){
    UserStore.addUserChangeListener(this._onChange);
  },

  _onChange:function(){
    this.setState({users: Object.keys(UserStore.showUsers()).map(function(user){return UserStore.showUser(user);})});
    console.log(this.state.users);
  },

  usernames: function(){
    return this.state.users.map(function(user){ return user.summonerName;});
  },

  render: function(){
    return (
      <div className="SearchResult">
        <a>{this.usernames()}</a>
      </div>
    );
  }
});

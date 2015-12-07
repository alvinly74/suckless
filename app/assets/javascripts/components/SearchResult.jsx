var SearchResult = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function(){
    return {input:""};
  },
  componentDidMount:function(){

  },
  _onChange:function(){

  },
  _handleTyping:function(e){
    this.setState({input:e.target.value});
  },
  _goSearch:function(e){
  e.preventDefault();
  // this.history.pushState(null,"search");
  ApiUtil.searchUser(this.state.input.toLowerCase());
  this.setState({input: ""});
},
  render: function(){
    return (
      <div className="SearchResult">
        <a>{UserStore.showUsers()}</a>
      </div>
    );
  }
});

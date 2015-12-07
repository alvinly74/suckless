var SearchBar = React.createClass({
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
  this.history.pushState(null,"search");
  ApiUtil.searchUser(this.state.input.toLowerCase());
  this.setState({input: ""});
},
  render: function(){
    return (
      <div className="SearchBar">

        <form onSubmit={this._goSearch}>
          <input onChange={this._handleTyping}
                 onSubmit={this._goSearch}
                 value={this.state.input}
                 placeholder="Search" type="search"/>


               <input className="searchbutton Batton" type="submit" name="name" value="search"/>
        </form>
      </div>
    );
  }
});

var NavBar = React.createClass({
  getInitialState: function(){
    return {};
  },
  componentDidMount: function(){
    ApiUtil.grabChamps();
    ApiUtil.grabItems();
  },
  _onChange: function(){

  },
  _className: function(){

  },
  render: function(){
    return <SearchBar/>;


  }
});

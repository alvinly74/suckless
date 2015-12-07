$(function () {
  var root = document.getElementById('content');
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var App = React.createClass({
    render: function(){
      return (
        <div className="Wandow">
          <NavBar/>
          <div>
            {this.props.children}
          </div>
        </div>
      );
    }
  });

  var routes = (
    <Route path="/" component={App}>
      <Route path="search" component={SearchResult}></Route>
    </Route>
  );

  React.render(<Router>{routes}</Router>, root);
});

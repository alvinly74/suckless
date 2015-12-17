var SummonerItem = React.createClass({
  mixins: [ReactRouter.History],
  _team: function(){
    if(this.props.summoner.teamId == 100){
      return 'blue';
    } else {
      return 'red';
    }
  },
  rank: function(){
    if(this.props.summoner.rank){
      return (
        <div>
          <div>Rank: {this.props.summoner.rank.tier}</div>
          <div>Division: {this.props.summoner.rank.division}</div>
          <div>Points: {this.props.summoner.rank.points}</div>
        </div>
      );
    } else {
      return <div>Unranked</div>;
    }
  },
  render: function(){
    return (
      <li className="SummonerItem">
        <div>{this.props.summoner.summonerName}</div>
        <div className="champion">{ChampStore.displayChampion(this.props.summoner.championId)}</div>
        <div>Team: {this._team()}</div>
        <div>{this.rank()}</div>

      </li>
    );
  }
});

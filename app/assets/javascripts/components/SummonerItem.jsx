var SummonerItem = React.createClass({
  mixins: [ReactRouter.History],
  render: function(){
    return (
      <li className="SummonerItem">
        <div>{this.props.summoner.summonerName}</div>
        <div className="champion">{ChampStore.displayChampion(this.props.summoner.championId)}</div>
        <div>{this.props.summoner.teamId}</div>
      </li>
    );
  }
});

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
  role: function(){
    switch (this.props.summoner.commonRole[0]){
      case 1:
        return 'Duo';
      case 2:
        return 'Support';
      case 3:
        return 'Carry';
      case 4:
        return 'Solo';
      case null:
        console.log("something is wrong with Role");
        // debugger;
        break;
    }
  },
  position: function () {
    switch (this.props.summoner.commonPosition[0]){
      case 1:
        return 'Top';
      case 2:
        return 'Middle';
      case 3:
        return 'Jungle';
      case 4:
        return 'Bottom';
      case null:
        console.log("something is wrong with Position");
        // debugger;
        break;

      }
  },
  render: function(){
    console.log(this.props.summoner.summonerName);
    console.log(this.props.summoner.commonRole);
    console.log(this.props.summoner.commonPosition);
    return (
      <li className={"SummonerItem " + this._team()}>
        <div>{this.props.summoner.summonerName}</div>
        <div className="champion">{ChampStore.displayChampion(this.props.summoner.championId)}</div>
        <div>Team: {this._team()}</div>
        <div>{this.rank()}</div>
        <div>Valid Games: {this.props.summoner.validGames} </div>
        <div>Average Assists: {this.props.summoner.assists}</div>
        <div>Average Kills: {this.props.summoner.championsKilled}</div>
        <div>Average Deaths: {this.props.summoner.numDeaths}</div>
        <div>Average Minion Kills: {this.props.summoner.minionsKilled}</div>
        <div>Average Wards Placed: {this.props.summoner.wardPlaced}</div>
        <div>Win Rate: {this.props.summoner.win}</div>
      </li>
    );
  }
});

require 'net/http'
class Api::SearchController < ApplicationController
  def username
    @username = params[:username]
    result = Net::HTTP.get(URI.parse("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + @username + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
    user_id = JSON.parse(result.gsub('=>', ':'))[@username]["id"]
    spectator_game = Net::HTTP.get(URI.parse("https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/" + user_id.to_s + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
    if spectator_game[0] == "{" # verify that user is in a game
      game = JSON.parse(spectator_game.gsub('=>', ':'))
      summoner_ids = game['participants'].map{|el| el['summonerId']}.join(",")
      summoner_ranks = Net::HTTP.get(URI.parse("https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/" + summoner_ids + '/entry' + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
      ranks_hash = JSON.parse(summoner_ranks.gsub('=>', ':'))
      game['participants'].each do |player|
          rank = {}
        if ranks_hash[player['summonerId'].to_s][0]['queue'] == 'RANKED_SOLO_5x5'
          rank['tier'] = ranks_hash[player['summonerId'].to_s][0]['tier']
          rank['division'] = ranks_hash[player['summonerId'].to_s][0]['entries'][0]['division']
          rank['points'] = ranks_hash[player['summonerId'].to_s][0]['entries'][0]['leaguePoints']
        end
        player['rank'] = rank;
      end
      render json: game
    else
      render json: "error not in game"
    end
  end

  def history
    @username = params[:username]
    result = Net::HTTP.get(URI.parse("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + @username + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
    user_id = JSON.parse(result.gsub('=>', ':'))[@username]["id"]
    history = Net::HTTP.get(URI.parse('https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + user_id.to_s + '/recent?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076'))
    render json: game = JSON.parse(history.gsub('=>', ':'))
  end

  def champs
    @champs = Net::HTTP.get(URI.parse("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
    champ_object = JSON.parse(@champs.gsub('=>', ':'))
    render json: champ_object['keys']
  end

  def items
    @items = Net::HTTP.get(URI.parse("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
    item_object = JSON.parse(@items.gsub('=>', ':'))
    render json: item_object['data']
  end

end

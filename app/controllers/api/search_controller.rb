require 'net/http'
class Api::SearchController < ApplicationController
  def username
    user_id = find_user_id(params[:username])
    game_string = find_current_game(user_id)
    if in_game?(game_string)
      game = convert_json(game_string)
      summoner_ids = obtain_summoner_ids(game)
      convert_participants_to_hash(game) #efficiency for rank allocation
      ranks_hash = obtain_summoner_ranks(summoner_ids)
      fill_ranks(ranks_hash, game)
      history_hash = obtain_history(summoner_ids.split(","))
      fill_history(history_hash, game)
      render json: game
    else
      render json: "error not in game"
    end
  end

  # def history
  #   @username = params[:username]
  #   result = Net::HTTP.get(URI.parse("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + @username + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
  #   user_id = JSON.parse(result.gsub('=>', ':'))[@username]["id"]
  #   history = Net::HTTP.get(URI.parse('https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + user_id.to_s + '/recent?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076'))
  #   render json: game = JSON.parse(history.gsub('=>', ':'))
  # end

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


def find_user_id(username)
  result = Net::HTTP.get(URI.parse("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + username + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
  JSON.parse(result.gsub('=>', ':'))[username]["id"].to_s
end

def find_current_game(user_id)
  Net::HTTP.get(URI.parse("https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/" + user_id + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
end

def in_game?(game_string)
  #if first item of game_string is open curly brace, a Json object(game) has been returned)
  game_string[0] == '{'
end

def convert_json(string)
  JSON.parse(string.gsub('=>', ':'))
end

def obtain_summoner_ids(game)
  game['participants'].map{|el| el['summonerId']}.join(",")
end

def convert_participants_to_hash(game)
  build_hash = {}
  game['participants'].each do |player|
    build_hash[player['summonerId'].to_s] = player
  end
  game['participants'] = build_hash
end

def obtain_summoner_ranks(summoner_ids)
  convert_json(Net::HTTP.get(URI.parse("https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/" + summoner_ids + '/entry' + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076")))
end

def fill_ranks(ranks_hash, game)
  ranks_hash.keys.each do |summoner_id|
    rank = {}
    if ranks_hash[summoner_id][0]['queue'] == 'RANKED_SOLO_5x5'
      rank['tier'] = ranks_hash[summoner_id][0]['tier']
      rank['division'] = ranks_hash[summoner_id][0]['entries'][0]['division']
      rank['points'] = ranks_hash[summoner_id][0]['entries'][0]['leaguePoints']
    end
    game['participants'][summoner_id]['rank'] = rank;
  end
end

def obtain_history(summoner_ids)
  history_hash = {}
  summoner_ids.each do |id|
    sleep(1.25)
    result = Net::HTTP.get(URI.parse('https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + id + '/recent?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076'))
    result = convert_json(result)
    history_hash[result['summonerId'].to_s] = result['games']

  end
  history_hash
end

def fill_history(history_hash, game)
  history_hash.keys.each do |summoner_id|
    game['participants'][summoner_id]['history'] = history_hash[summoner_id]
  end
end

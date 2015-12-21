require 'net/http'
class Api::SearchController < ApplicationController
  def username
    user_id = find_user_id(params[:username])
    game_string = find_current_game(user_id)
    if in_game?(game_string)
      game = convert_json(game_string)
      summoner_ids = obtain_summoner_ids(game)
      convert_participants_to_hash!(game) #efficiency for rank allocation
      ranks_hash = obtain_summoner_ranks(summoner_ids)
      fill_ranks!(ranks_hash, game)
      history_hash = obtain_history(summoner_ids.split(","))
      fill_history!(history_hash, game)
      fill_stats!(game['participants'])
      render json: game
    else
      render json: "error not in game"
    end
  end

  def history
    user_id = find_user_id(params[:username])
    history = Net::HTTP.get(URI.parse('https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + user_id + '/recent?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076'))
    render json: game = JSON.parse(history.gsub('=>', ':'))
  end

  def champs
    champs = Net::HTTP.get(URI.parse("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
    champ_object = convert_json(champs)
    render json: champ_object['keys']
  end

  def items
    items = Net::HTTP.get(URI.parse("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
    item_object = convert_json(items)
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

def convert_participants_to_hash!(game)
  build_hash = {}
  game['participants'].each do |player|
    build_hash[player['summonerId'].to_s] = player
  end
  game['participants'] = build_hash
end

def obtain_summoner_ranks(summoner_ids)
  convert_json(Net::HTTP.get(URI.parse("https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/" + summoner_ids + '/entry' + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076")))
end

def fill_ranks!(ranks_hash, game)
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

def fill_history!(history_hash, game)
  history_hash.keys.each do |summoner_id|
    game['participants'][summoner_id]['history'] = history_hash[summoner_id]
  end
end

def fill_stats!(participants)
  participants.each do |id, player|
    player['validGames'] = find_number_valid_games(player['history'])
    role_and_position = find_usual_position_and_role(player['history'])
    player['championsKilled'] = find_average_stat(player['history'],'championsKilled')
    player['minionsKilled'] = find_average_stat(player['history'],'minionsKilled')
    player['win'] = find_average_stat(player['history'],'win')
    player['numDeaths'] = find_average_stat(player['history'],'numDeaths')
    player['assists'] = find_average_stat(player['history'],'assists')
    player['wardPlaced'] = find_average_stat(player['history'],'wardPlaced')
    player['commonRole'] = role_and_position['role']
    player['commonPosition'] = role_and_position['position']
    debugger;
  end
end

def find_number_valid_games(history)
  valid_games = []
  history.each_with_index do |game, idx|
    if valid_game?(game)
      valid_games << idx
    end
  end
  valid_games
end

def find_average_stat(player_history,stat)
  #stat can be 'championsKilled', 'minionsKilled', 'win', 'numDeaths', 'assists', 'wardPlaced'
  num_valid_games = 0
  num_stat = 0
  player_history.each do |game|
    if valid_game?(game)
      num_valid_games +=1
      case stat
      when 'win'
        num_stat += 1 if game['stats']['win']
      when 'championsKilled', 'minionsKilled', 'numDeaths', 'assists', 'wardPlaced'
        num_stat += game['stats'][stat].to_f
      end
    end
  end
  if num_valid_games >= 1
    return num_stat.to_f / num_valid_games.to_f
  else
    return 0
  end
end

def find_usual_position_and_role(player_history)
  # 'playerRole' 1 = duo, 2 = support, 3 = carry, 4 = solo
  # 'playerPosition' 1 = top, 2 = middle, 3 = jungle, 4 = bot
  role = Hash.new(0)
  position = Hash.new(0)
  player_history.each do |game|
    if valid_game?(game)
      role[game['stats']['playerRole']] +=1
      position[game['stats']['playerPosition']] +=1
    end
  end

  role_freq = [[0,0]] # [role, frequency]
  role.keys.each do | key|
    case
    when role[key] > role_freq[0][1]
      role_freq = [[key, role[key]]]
    when role[key] == role_freq[0][1]
      role_freq << [key, role[key]] # in case of tie
    end
  end
  position_freq = [[0,0]]
  position.keys.each do | key|
    case
    when position[key] > position_freq[0][1]
      position_freq = [[key, position[key]]]
    when position[key] == position_freq[0][1]
      position_freq << [key, position[key]]
    end
  end

  return {'role' => role_freq, 'position' => position_freq}
end

def valid_game?(game)
  (game['gameMode'] == 'CLASSIC' && game['gameType'] == 'MATCHED_GAME')
end

require 'net/http'
class Api::SearchController < ApplicationController
  def username
    @username = params[:username]
    result = Net::HTTP.get(URI.parse("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + @username + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
    user_id = JSON.parse(result.gsub('=>', ':'))[@username]["id"]
    spectator_game = Net::HTTP.get(URI.parse("https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/" + user_id.to_s + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
    if spectator_game[0] == "{"
      game = JSON.parse(spectator_game.gsub('=>', ':'))
      render json: game
    else
      render json: "error"
    end
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

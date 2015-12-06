require 'net/http'
class Api::SearchController < ApplicationController
  def username
    @username = params[:username]
    result = Net::HTTP.get(URI.parse("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + @username + "?api_key=6482fb35-7b68-4792-8603-6aa61b8d2076"))
    user_id = JSON.parse(result.gsub('=>', ':'))[@username]["id"]
    debugger;
    render json: user_id
  end

  def search_params

  end
end

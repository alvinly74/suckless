Rails.application.routes.draw do
  namespace :api, defaults:{format: :json} do
    get 'search/username' => 'search#username'
    get 'search/champs' => 'search#champs'
    get 'search/items' => 'search#items'
  end
    root "static_pages#root"
end

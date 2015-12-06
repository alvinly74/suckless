Rails.application.routes.draw do
  namespace :api, defaults:{format: :json} do
    get 'search/username' => 'search#username'
  end
    root "static_pages#root"
end

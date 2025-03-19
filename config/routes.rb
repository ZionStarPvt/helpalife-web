Rails.application.routes.draw do
  root "application#home"
  get 'home', to:'application#home'
  get 'donors', to: 'donor#index'
end

Rails.application.routes.draw do
  root "application#home"
  get 'home', to:'application#home'
  get 'donors', to: 'donor#index'
  devise_scope :user do
    devise_for :users, controllers: { registrations: 'users/registrations' }
    get 'register', to: 'users/registrations#new'

  end
end

Rails.application.routes.draw do
  get "home", to: "home#index"
  root to: "home#index"
  get "home", to: "application#home"
  get "donors", to: "donor#index"
  get "about", to: "home#about"
  get "donations", to: "home#donations"
  devise_scope :user do
    devise_for :users, controllers: { registrations: "users/registrations" }
    get "register", to: "users/registrations#new"
  end
end

Rails.application.routes.draw do
  root 'application#home'
  devise_scope :user do
    devise_for :users, controllers: { registrations: 'users/registrations' }
    # /      devise_for :users, :controllers => { :registrations => "registrations"}
    get 'register', to: 'users/registrations#new'

    resources :locations, only: [] do
      collection do
        get :autocomplete
      end
    end
  end
end
class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def should_authenticate_user?
    # Avoid running authenticate_user! for Devise controllers like Sessions
    return false if devise_controller?

    # Add other conditions as needed
    true
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password])
    devise_parameter_sanitizer.permit(:account_update, keys: [:email, :password, :current_password])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email])
  end

  def home
    flash.now[:notice] = "Test Flash Message"
  end
end

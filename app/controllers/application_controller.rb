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
    # Adjust the permitted keys based on your model fields
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :name, :contact_number, :email, :password])
    devise_parameter_sanitizer.permit(:account_update, keys: [ :name, :contact_number , :email, :blood_group, :location, :allow_location_access, :default_radius_for_nearby_blood_needs, :emergency_blood_request, :Notify_me_via_email, :Enable_push_notifications, :latitude, :longitude, :country_code, :phone ])
  end
end

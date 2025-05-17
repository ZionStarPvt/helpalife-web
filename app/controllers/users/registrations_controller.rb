class Users::RegistrationsController < Devise::RegistrationsController
  before_action :set_minimum_password_length, only: [ :new ]
  skip_before_action :require_no_authentication, only: [ :create, :new ]
  before_action :configure_account_update_params, only: [:update]

  def new
    self.resource = resource_class.new
  end
  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource

    end
  end
  protected

  def after_update_path_for(resource)
    edit_user_registration_path # Stay on the edit page
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [
      :name, :email, :phone, :blood_group, :latitude, :longitude,
      :country_code, :allow_location_access, :default_radius_for_nearby_blood_needs,
      :emergency_blood_request, :Notify_me_via_email, :Enable_push_notifications
    ])
  end

  private
  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :country_code, :phone, :blood_group, :latitude, :longitude, :allow_location_access, :default_radius_for_nearby_blood_needs, :emergency_blood_request, :Notify_me_via_email, :Enable_push_notifications)
  end
end

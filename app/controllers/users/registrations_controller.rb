class Users::RegistrationsController < Devise::RegistrationsController
  before_action :set_minimum_password_length, only: [ :new ]
  skip_before_action :require_no_authentication, only: [ :create, :new ]
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
  private
  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :country_code, :phone, :blood_group, :latitude, :longitude)
  end
end

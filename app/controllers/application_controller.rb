class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # Adjust the permitted keys based on your model fields
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :name, :contact_number ])
    devise_parameter_sanitizer.permit(:account_update, keys: [ :name, :contact_number ])
  end


  # app/helpers/application_helper.rb
  module ApplicationHelper
    def posted_time_ago(blood_requirement)
      if blood_requirement.created_at.present?
        "#{time_ago_in_words(blood_requirement.created_at)} ago"
      else
        "Date unknown"
      end
    end
  end

end

class BloodRequirementsController < ApplicationController
  before_action :authenticate_user!

  def new
    @blood_requirement = BloodRequirement.new
  end

  def create
    @blood_requirement = current_user.blood_requirements
                                     .where(blood_requirement_params)
                                     .first_or_create

    if @blood_requirement.save
      redirect_to root_path, notice: "Request submitted successfully."
    else
      Rails.logger.error "Creation failed: #{@blood_requirement.errors.full_messages.to_sentence}"
      redirect_to donors_path, alert: "Request failed: #{@blood_requirement.errors.full_messages.to_sentence}"
    end
  end

  private

  def blood_requirement_params
    params.require(:blood_requirement).permit(
      :required_date,
      :required_units,
      :country_code,
      :contact_number,
      :reason,
      :latitude,
      :longitude
    )
  end
end

class DonateNowController < ApplicationController
  def index
    @blood_requirements = BloodRequirement.all
  end
end

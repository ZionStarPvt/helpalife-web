class DonorController < ApplicationController
  def index
    @users = []

    if params[:blood_group].present? && params[:location].present?
      coordinates = Geocoder.coordinates(params[:location])

      if coordinates.present?
        users = User.where(blood_group: params[:blood_group])
                    .where.not(latitude: nil, longitude: nil)
                    .order(created_at: :desc)

        users.each do |user|
          user_coordinates = [user.latitude.to_f, user.longitude.to_f]
          distance = Geocoder::Calculations.distance_between(coordinates, user_coordinates)

          if distance <= 50
            location = Geocoder.search([user.latitude, user.longitude]).first
            address = [location&.city, location&.state].compact.join(', ')
            @users << {
              name: user.name,
              address: address,
              blood_group: user.blood_group,
              distance: distance.round(2)
            }
          end
        end
      end
    else
      users = User.order(created_at: :desc)

      users.each do |user|
        if user.latitude.present? && user.longitude.present?
          location = Geocoder.search([user.latitude, user.longitude]).first
          address = [location&.city, location&.state].compact.join(', ')
        else
          address = "Location not available"
        end

        @users << {
          name: user.name,
          address: address,
          blood_group: user.blood_group || "Blood group not available",
          distance: nil
        }
      end
    end
  end
end

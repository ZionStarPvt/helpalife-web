class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


  # Reverse geocode to get address from latitude & longitude
  # reverse_geocoded_by :latitude, :longitude
  # after_validation :reverse_geocode, if: ->(obj) { obj.latitude.present? && obj.longitude.present? }
end

class AddColumnToUser < ActiveRecord::Migration[8.0]
  def change
    add_column :users,:allow_location_access, :boolean, :default => true
    add_column :users,:default_radius_for_nearby_blood_needs, :string
    add_column :users,:emergency_blood_request, :boolean, :default => true
    add_column :users,:Notify_me_via_email, :boolean, :default => true
    add_column :users,:Enable_push_notifications, :boolean, :default => true
  end
end

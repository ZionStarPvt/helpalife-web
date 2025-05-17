class AddLocationToBloodRequirements < ActiveRecord::Migration[8.0]
  def change
    add_column :blood_requirements, :location, :string
  end
end

class CreateBloodRequirements < ActiveRecord::Migration[8.0]
  def change
    create_table :blood_requirements do |t|
      t.integer :user_id
      t.date     :required_date
      t.integer  :required_units
      t.float :latitude
      t.float :longitude
      t.string :country_code
      t.text :contact_number
      t.text :reason
      t.timestamps
    end
  end
end

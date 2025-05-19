class AddPatientNameToBloodRequirements < ActiveRecord::Migration[8.0]
  def change
    add_column :blood_requirements, :patient_name, :string
  end
end

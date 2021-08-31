class CreateApiKeys < ActiveRecord::Migration[6.1]
  def change
    create_table :api_keys, id: false do |t|
      t.string :id, null: false, primary_key: true
      t.string :project_id, null: false
      t.string :name
      t.string :api_key
      t.string :role

      t.timestamps
    end
    add_foreign_key :api_keys, :projects
    add_index :api_keys, :api_key, unique: true
  end
end

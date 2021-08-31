class CreateCollections < ActiveRecord::Migration[6.1]
  def change
    create_table :collections, id: false do |t|
      t.string :id, null: false, primary_key: true
      t.string :project_id, null: false
      t.string :name
      t.string :display_name
      t.string :description
      t.string :default_sort_field, null: false
      t.string :default_sort_direction, null: false

      t.timestamps
    end
    add_foreign_key :collections, :projects
    add_index :collections, :project_id
    add_index :collections, [:project_id, :name], unique: true
  end
end

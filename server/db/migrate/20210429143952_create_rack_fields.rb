class CreateRackFields < ActiveRecord::Migration[6.1]
  def change
    create_table :rack_fields, id: false do |t|
      t.string :id, null: false, primary_key: true
      t.string :collection_id, null: false
      t.string :name, null: false
      t.string :display_name, null: false
      t.string :description, null: true
      t.string :field_type, null: false
      t.integer :order, null: false
      t.boolean :sortable, default: false, null: false
      t.boolean :stored, default: true, null: false
      t.boolean :required_field, default: true, null: false

      t.timestamps
    end
    add_foreign_key :rack_fields, :collections
    add_index :rack_fields, :collection_id
  end
end

class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects, id: false do |t|
      t.string :id, null: false, primary_key: true
      t.string :user_id, null: false
      t.string :name
      t.string :display_name
      t.string :description

      t.timestamps
    end
  end
end

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users, id: false do |t|
      t.string :id, null: false, primary_key: true
      t.string :api_key

      t.timestamps
    end
    add_index :users, :api_key, unique: true
  end
end

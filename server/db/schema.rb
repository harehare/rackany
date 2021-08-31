# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_15_134219) do

  create_table "api_keys", id: :string, force: :cascade do |t|
    t.string "project_id", null: false
    t.string "name"
    t.string "api_key"
    t.string "role"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["api_key"], name: "index_api_keys_on_api_key", unique: true
  end

  create_table "collections", id: :string, force: :cascade do |t|
    t.string "project_id", null: false
    t.string "name"
    t.string "display_name"
    t.string "description"
    t.string "default_sort_field", null: false
    t.string "default_sort_direction", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["project_id", "name"], name: "index_collections_on_project_id_and_name", unique: true
    t.index ["project_id"], name: "index_collections_on_project_id"
  end

  create_table "projects", id: :string, force: :cascade do |t|
    t.string "user_id", null: false
    t.string "name"
    t.string "display_name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "rack_fields", id: :string, force: :cascade do |t|
    t.string "collection_id", null: false
    t.string "name", null: false
    t.string "display_name", null: false
    t.string "description"
    t.string "field_type", null: false
    t.integer "order", null: false
    t.boolean "sortable", default: false, null: false
    t.boolean "stored", default: true, null: false
    t.boolean "required_field", default: true, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["collection_id"], name: "index_rack_fields_on_collection_id"
  end

  create_table "users", id: :string, force: :cascade do |t|
    t.string "api_key"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["api_key"], name: "index_users_on_api_key", unique: true
  end

  create_table "web_hooks", id: :string, force: :cascade do |t|
    t.string "collection_id", null: false
    t.string "url", null: false
    t.string "description"
    t.boolean "created", default: false, null: false
    t.boolean "updated", default: false, null: false
    t.boolean "deleted", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "api_keys", "projects"
  add_foreign_key "collections", "projects"
  add_foreign_key "rack_fields", "collections"
end

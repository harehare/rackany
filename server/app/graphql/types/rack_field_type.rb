module Types
  class RackFieldType < Types::BaseObject
    field :id, ID, null: false
    field :collection_id, ID, null: false
    field :name, String, null: false
    field :display_name, String, null: false
    field :description, String, null: true
    field :field_type, Types::Enum::FieldType, null: false
    field :order, Integer, null: false
    field :sortable, Boolean, null: false
    field :required_field, Boolean, null: true
    field :stored, Boolean, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

module Types
  module Input
    class RackFieldInput < GraphQL::Schema::InputObject
      argument :id, ID, required: false
      argument :name, String, required: true
      argument :display_name, String, required: true
      argument :description, String, required: false
      argument :field_type, Types::Enum::FieldType, required: true
      argument :order, Integer, required: true
      argument :sortable, Boolean, required: true
      argument :stored, Boolean, required: false, default_value: true
      argument :required_field, Boolean, required: false, default_value: true
    end
  end
end

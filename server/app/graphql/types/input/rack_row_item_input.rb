module Types
  module Input
    class RackRowItemInput < GraphQL::Schema::InputObject
      argument :rack_field_id, ID, required: true
      argument :name, String, required: true
      argument :data, String, required: false
    end
  end
end

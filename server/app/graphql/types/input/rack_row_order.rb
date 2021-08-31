module Types
  module Input
    class RackRowOrder < GraphQL::Schema::InputObject
      argument :field, String, required: true
      argument :direction, Types::Enum::OrderDirection, required: false, default_value: 'ASC'
    end
  end
end

module Types
  module Input
    class RackRowFilter < GraphQL::Schema::InputObject
      argument :field, String, required: true
      argument :op, Types::Enum::FilterOperator, required: true, default_value: 'EQ'
      argument :value, String, required: true
    end
  end
end

require 'set'
require 'dry/monads'

module Domain
  module Values
    class Filter < Struct.new(:name, :operator, :value)
      private_class_method :new
      OPERATOR_MAPPING = {
        eq: '==',
        ne: '!=',
        lt: '<',
        gt: '>',
        lte: '<=',
        gte: '>=',
        in: 'in',
        nin: 'not_in',
        contains: 'array-contains-any',
      }.freeze

      VALID_OPERATOR =  Set.new(OPERATOR_MAPPING.keys).freeze

      def to_h
        {name: self.name, operator: self.operator, value: self.value}
      end

      class << self
        include Dry::Monads[:result]

        def valid_operator?(operator)
          VALID_OPERATOR.include?(operator)
        end

        def build(name, value, valid_fields)
          unless name
            return Failure({value => :invalid_parameter_error})
          end

          tokens = name.to_s.split('_')

          if tokens.length != 2
            return Failure({value => :invalid_parameter_error})
          end

          field, operator = tokens

          unless valid_fields.include? field
            return Failure(:parse_error)
          end

          unless OPERATOR_MAPPING[operator.intern]
            return Failure(:parse_error)
          end

          case operator
            in 'in'
              Success(new(field, OPERATOR_MAPPING[:in], value.split(',')))
            in 'nin'
              Success(new(field, OPERATOR_MAPPING[:nin], value.split(',')))
          else
            validate_field(value, valid_fields[field]).bind do |vaildated_value|
              Success(new(field, OPERATOR_MAPPING[operator.intern], vaildated_value))
            end
          end
        end

        private

        def validate_field(value, field)
          case field[:field_type]
            in 'NUMBER'
              /^[0-9]+$/ =~ value ? Success(value) : Failure({value => :invalid_parameter_error})
            in 'CHECKBOX'
              Success(value == 'true')
            in 'EMAIL'
              Success(value)
            in 'LOCATION'
              Success(value)
            in 'MARKDOWN'
              Failure({value => :invalid_parameter_error})
            in 'IMAGE'
              Failure({value => :invalid_parameter_error})
            in 'LIST'
              Success(value)
            in 'BARCODE'
              Success(value)
            in 'QRCODE'
              Success(value)
            else
              Success(value)
            end
        end
      end
    end
  end
end

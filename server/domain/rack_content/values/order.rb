require 'dry/monads'

module Domain
  module Values
    class Order < Struct.new(:name, :direction)
      private_class_method :new

      DEFAULT_SORT_FIELDS = ['created_at', 'updated_at'].freeze
      DIRECTION = ['asc', 'desc'].freeze

      def to_h
        {name: self.name, direction: self.direction}
      end

      class << self
        include Dry::Monads[:result]

        def build(name, direction, valid_field_names)
          if name.nil?
            return Failure(:parse_error)
          end

          unless DIRECTION.include? direction
            return Failure(:parse_error)
          end

          unless valid_field_names.include?(name) || DEFAULT_SORT_FIELDS.include?(name)
            return Failure(:parse_error)
          end

          Success(new(name, direction))
        end
      end
    end
  end
end

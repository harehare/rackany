require './domain/rack_content/values/filter'
require './domain/rack_content/values/order'

module Domain
  class RackContent < Struct.new(:filters, :orders)
    private_class_method :new

    class << self
      def build(params, fields)
        filters = params.each_with_object([]) do |(k, v), arr|
          Domain::Values::Filter.build(k, v, fields).bind do |filter|
              arr << filter
          end
        end

        orders = params.each_with_object([]) do |(k, v), arr|
          Domain::Values::Order.build(k, v, fields).bind do |order|
              arr << order
          end
        end

        # TODO: filter validation

        new(filters, orders)
      end
    end
  end
end

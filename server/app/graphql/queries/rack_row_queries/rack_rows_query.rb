require './domain/rack_content/rack_content'

module Queries
  module RackRowQueries
    class RackRowsQuery < Queries::AuthQuery
      include Authorization
      include Dry::Monads[:result]

      argument :project_id, ID, required: true
      argument :collection_id, ID, required: true
      argument :offset, Integer, required: false, default_value: 0
      argument :limit, Integer, required: false, default_value: 30
      argument :filters, [Types::Input::RackRowFilter], required: false
      argument :orders, [Types::Input::RackRowOrder], required: false

      type [Types::RackRowType], null: false

      def resolve(project_id:, collection_id:, offset:, limit:, filters:, orders:)
        authenticate_owner!(context, project_id, collection_id)
        params = {offset: offset, limit: limit}
        filter = filters.each_with_object({}) do |f, arr|
          arr["#{f.field}_#{f.op.downcase}"] = f.value
        end
        order = get_order(collection_id, orders)

        case GetRowsInteractor.call(params.merge(filter.merge(order)), collection_id)
        in Success(v)
          v.data
        in Failure(e)
          GraphqlErrors.handle_error(e)
        end
      end

      private

      def get_order(collection_id, orders)
        collection = Collection.find(collection_id)
        order = orders.each_with_object({}) do |o, arr|
          arr[o.field.underscore.intern] = o.direction.downcase
        end
        order ? order : {"#{collection.default_sort_field.intern}": 'desc'}
      end
    end
  end
end

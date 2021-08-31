module Queries
  module RackRowQueries
    class RackRowQuery < Queries::AuthQuery
      include Authorization
      include Dry::Monads[:result]

      argument :project_id, ID, required: true
      argument :collection_id, ID, required: true
      argument :rack_row_id, ID, required: true

      type Types::RackRowType, null: false

      def resolve(project_id:, collection_id:, rack_row_id:)
        authenticate_owner!(context, project_id, collection_id)
        case GetRowInteractor.call({project_id: project_id, collection_id: collection_id, rack_row_id: rack_row_id}, collection_id)
        in Success(v)
          v.data
        in Failure(e)
          GraphqlErrors.handle_error(e)
        end
      end

    end
  end
end

module Queries
  module RackRowQueries
    class RackRowsCountQuery < Queries::AuthQuery
      include Authorization
      include Dry::Monads[:result]

      argument :project_id, ID, required: true
      argument :collection_id, ID, required: true

      type Int, null: false

      def resolve(project_id:, collection_id:)
        authenticate_owner!(context, project_id, collection_id)
        case CountRowsInteractor.call({project_id: project_id, collection_id: collection_id}, collection_id)
        in Success(v)
          v.data
        in Failure(e)
          GraphqlErrors.handle_error(e)
        end
      end
    end
  end
end

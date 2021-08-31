module Queries
  module CollectionQueries
    class CollectionQuery < Queries::AuthQuery
      include Authorization
      include Dry::Monads[:result]

      type Types::CollectionType, null: false
      argument :id, ID, required: true
      argument :project_id, ID, required: true

      def resolve(id:, project_id:)
        authenticate_owner!(context, project_id, id)
        case GetCollectionInteractor.call({collection_id: id})
        in Success(v)
          v.data
        in Failure(e)
          GraphqlErrors.handle_error(e)
        end
      end
    end
  end
end

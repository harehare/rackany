module Queries
  module ProjectQueries
    class ProjectQuery < Queries::AuthQuery
      include Dry::Monads[:result]
      include Authorization

      type Types::ProjectType, null: false
      argument :id, ID, required: true

      def resolve(id:)
        authenticate_owner!(context, id)
        case GetProjectInteractor.call({project_id: id})
        in Success(v)
          v.data
        in Failure(e)
          GraphqlErrors.handle_error(e)
        end
      end
    end
  end
end

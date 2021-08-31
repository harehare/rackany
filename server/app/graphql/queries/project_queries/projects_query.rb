module Queries
  module ProjectQueries
    class ProjectsQuery < Queries::AuthQuery
      include Dry::Monads[:result]

      argument :offset, Integer, required: false, default_value: 0
      argument :limit, Integer, required: false, default_value: 30

      type [Types::ProjectType], null: false

      def resolve(offset:, limit:)
        case GetProjectsInteractor.call({uesr_id: context[:current_user_id], offset: offset, limit: limit})
        in Success(v)
          v.data
        in Failure(e)
          GraphqlErrors.handle_error(e)
        end
      end
    end
  end
end

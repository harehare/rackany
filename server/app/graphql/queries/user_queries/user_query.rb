module Queries
  module UserQueries
    class UserQuery < Queries::AuthQuery
      include Dry::Monads[:result]
      include Authorization

      type Types::UserType, null: false
      argument :id, ID, required: true

      def resolve(id:)
        case GetUserInteractor.call({user_id: id})
        in Success(v)
          v.data
        in Failure(e)
          GraphqlErrors.handle_error(e)
        end
      end
    end
  end
end

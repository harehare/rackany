module Queries
  class AuthQuery < Queries::BaseQuery
    def authorized?(*_args)
      raise GraphQL::ExecutionError, 'Not Authenticated' unless context[:current_user_id]

      true
    end
  end
end

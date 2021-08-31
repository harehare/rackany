module Mutations
  class AuthMutation < Mutations::BaseMutation
    def authorized?(*_args)
      raise GraphqlErrors::AuthenticationError, 'Not Authenticated' unless context[:current_user_id]

      true
    end
  end
end

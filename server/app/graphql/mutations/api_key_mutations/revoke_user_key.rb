module Mutations
  module ApiKeyMutations
    class RevokeUserKey < BaseMutation
      type Types::UserType

      def resolve
        user = User.find_by_id(context[:current_user_id])
        raise GraphqlErrors::AuthenticationError, 'No authorization' if user.nil?

        user.destroy!
        user
      end
    end
  end
end

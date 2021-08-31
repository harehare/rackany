module Mutations
  class SignUp < Mutations::AuthMutation
    type Types::UserType

    def resolve
      user = User.find_by_id(context[:current_user_id])
      if user.nil?
        user = User.new do |u|
          u.id = context[:current_user_id]
        end
        raise GraphqlErrors::InputError, 'invalid parameter' unless user.save
      end
      user
    end
  end
end

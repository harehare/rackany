module Mutations
  module ApiKeyMutations
    class CreateApiKey < Mutations::AuthMutation
      include Authorization
      argument :project_id, ID, required: true
      argument :name, String, required: true
      argument :role, Types::Enum::Role, required: true

      type Types::ApiKeyType

      def resolve(project_id:, name:, role:)
        authenticate_owner!(context, project_id)
        api_key = ApiKey.new({ project_id: project_id,
                               name: name,
                               role: role })
        raise GraphqlErrors::InputError, 'invalid parameter' unless api_key.save

        api_key
      end
    end
  end
end

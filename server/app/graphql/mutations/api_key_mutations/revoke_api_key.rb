module Mutations
  module ApiKeyMutations
    class RevokeApiKey < Mutations::AuthMutation
      include Authorization
      argument :id, ID, required: true
      argument :project_id, ID, required: true

      type Types::ApiKeyType

      def resolve(id:, project_id:)
        authenticate_owner!(context, project_id)
        api_key = ApiKey.find(id)
        api_key.destroy!
        api_key
      end
    end
  end
end

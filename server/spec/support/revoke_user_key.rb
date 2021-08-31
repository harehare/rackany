module RevokeUserKeyHelpers
  def revoke_user_key(user_id)
    mutation_string = <<~GRAPHQL
      mutation revokeUserKey($input: RevokeUserKeyInput!) {
        revokeUserKey(input: $input) {
          id
          apiKey
        }
      }
    GRAPHQL
    result = ServerSchema.execute(mutation_string, context: { current_user_id: user_id }, variables: { input: {} })
    if result['errors'].present?
      { errors: result['errors'].first['message'] }
    else
      {
        id: result['data']['revokeUserKey']['id'],
        api_key: result['data']['revokeUserKey']['apiKey']
      }
    end
  end
end

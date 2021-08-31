module SignUpHelpers
  def sign_up(user_id)
    mutation_string = <<~GRAPHQL
      mutation signUp($input: SignUpInput!) {
        signUp(input: $input) {
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
        id: result['data']['signUp']['id'],
        api_key: result['data']['signUp']['apiKey']
      }
    end
  end
end

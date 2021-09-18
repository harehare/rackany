module Authorization
  def verify_token(request)
    bearer = bearer_token(request)
    return verify_bearer_token(bearer) if bearer.present?
    api_key = api_key_token(request)
    verify_api_key(api_key) if api_key.present?
  rescue JWT::VerificationError, JWT::DecodeError => e
    logger.error(e.message)
    raise GraphqlErrors::AuthenticationError, 'Not Authenticated'
  end

  def verify_bearer_token(token)
    claims = auth_bearer_token(token)
    claims.first['sub'] if claims.present?
  end

  def verify_api_key(api_key)
    user = User.find_by({api_key: api_key})
    user.id unless user.nil?
  end

  def authenticate_owner!(context, project_id, collection_id = nil)
    collection = Collection.find_by_id(collection_id) unless collection_id.nil?
    unless collection_id.nil? || collection.nil? || collection.project_id == project_id
      raise GraphqlErrors::NotFoundError,
            'No Collection Owner'
    end

    authenticate_project_owner!(context, project_id)
  end

  private

  def authenticate_project_owner!(context, project_id)
    project = Project.find_by_id(project_id)

    raise GraphqlErrors::NotFoundError, 'No Project Owner' if project.nil?
    raise GraphqlErrors::NotFoundError, 'No Project Owner' unless project.user_id == context[:current_user_id]
  end

  def bearer_token(request)
    tokens = request.headers['Authorization'].split(' ')
    tokens.last if request.headers['Authorization'].present? && tokens.first.downcase == "bearer"
  end

  def api_key_token(request)
    tokens = request.headers['Authorization'].split(' ')
    tokens.last if request.headers['Authorization'].present? && tokens.first.downcase == "x-api-key"
  end

  def auth_bearer_token(bearer_token)
    JsonWebToken.verify(bearer_token) if bearer_token.present?
  end
end

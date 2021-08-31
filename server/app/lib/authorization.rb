module Authorization
  def verify_token(request)
    auth_token(http_token(request))
  rescue JWT::VerificationError, JWT::DecodeError => e
    logger.error(e.message)
    raise GraphqlErrors::AuthenticationError, 'Not Authenticated'
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

  def http_token(request)
    request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?
  end

  def auth_token(bearer_token)
    JsonWebToken.verify(bearer_token) if bearer_token.present?
  end
end

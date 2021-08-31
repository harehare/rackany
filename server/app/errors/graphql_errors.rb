module GraphqlErrors
  def self.handle_error(err)
    Rails.logger.debug err
    case err
      in Errors::NotFoundError
        raise NotFoundError, 'not found'
      in Errors::AuthenticationError
        raise AuthenticationError, 'authentication error'
      in Errors::InvalidParameterError
        raise InputError, 'invalid parameter'
      else
        raise InternalServerError, "internal server error, #{err}"
    end
  end

  class InternalServerError < GraphQL::ExecutionError
    def to_h
      super.merge({ 'extensions' => { 'code' => 'INTERNAL_SERVER_ERROR' } })
    end
  end

  class NotFoundError < GraphQL::ExecutionError
    def to_h
      super.merge({ 'extensions' => { 'code' => 'NOT_FOUND_ERROR' } })
    end
  end

  class InputError < GraphQL::ExecutionError
    def to_h
      super.merge({ 'extensions' => { 'code' => 'INPUT_ERROR' } })
    end
  end

  class AuthenticationError < GraphQL::ExecutionError
    def to_h
      super.merge({ 'extensions' => { 'code' => 'AUTHENTICATION_ERROR' } })
    end
  end
end

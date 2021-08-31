module Errors
  class InternalServerError < StandardError; end
  class NotFoundError < StandardError; end
  class InvalidParameterError < StandardError; end
  class AuthenticationError < StandardError; end
end

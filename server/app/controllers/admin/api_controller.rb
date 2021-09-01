require 'json'

module Admin
    class ApiController < ApplicationController
      include Dry::Monads[:result]
      include Authorization

      def rescue_error(error)
        logger.error error
        error.backtrace.each { |line| logger.error line }
        render json: { error: :internal_server_error, detail: error }, status: :internal_server_error
      end

      def docs
        case DocsInteractor.call(request, params)
        in Success(v)
          render json: v.data
        in Failure(e)
          handle_error(e)
        end
      end

    end
end

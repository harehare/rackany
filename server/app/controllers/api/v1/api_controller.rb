require 'json'

module Api
  module V1
    class ApiController < ApplicationController
      include Dry::Monads[:result]
      include Authorization

      before_action :request_start_log
      after_action :request_end_log
      rescue_from StandardError, with: :rescue_error

      def request_start_log
        logger.info({
          message: 'start request',
          endpoint: request.fullpath,
          remote_ip: request.remote_ip,
          requested_at: Time.now.iso8601
        }.to_json)
      end

      def request_end_log
        logger.info({
          message: 'end request',
          endpoint: request.fullpath,
          remote_ip: request.remote_ip,
          requested_at: Time.now.iso8601
        }.to_json)
      end

      def rescue_error(error)
        logger.error error
        error.backtrace.each { |line| logger.error line }
        render json: { error: :internal_server_error, detail: error }, status: :internal_server_error
      end

      def handle_error(err)
        case err
          in Errors::NotFoundError
            render status: :not_found
          in Errors::AuthenticationError
            render json: { error: err }, status: :unauthorized
          in Errors::InvalidParameterError
            render json: { error: err }, status: :bad_request
          else
            render json: { error: err }, status: :internal_server_error
        end
      end

      def row
        case GetRowInteractor.call_api(params, request.headers)
        in Success(v)
          render json: v.data
        in Failure(e)
          handle_error(e)
        end
      end

      def rows
        case GetRowsInteractor.call_api(params, request.headers)
        in Success(v)
          render json: v.data
        in Failure(e)
          handle_error(e)
        end
      end

      def count
        case CountRowsInteractor.call_api(params, request.headers)
        in Success(v)
          render json: v.data
        in Failure(e)
          handle_error(e)
        end
      end

      def create_row
        case CreateRowInteractor.call_api(params, request.headers)
        in Success(v)
          render json: v.data, status: :created
        in Failure(e)
          handle_error(e)
        end
      end

      def update_row
        case UpdateRowInteractor.call_api(params, request.headers)
        in Success(v)
          render json: v.data, status: :created
        in Failure(e)
          handle_error(e)
        end
      end

      def delete_row
        case DeleteRowInteractor.call_api(params, request.headers)
        in Success(v)
          render nothing: true, status: :no_content
        in Failure(e)
          handle_error(e)
        end
      end

      def get_field
        case GetFieldInteractor.call_api(params, request.headers)
        in Success(v)
          render json: v.data
        in Failure(e)
          handle_error(e)
        end
      end

      def fields
        case GetFieldsInteractor.call_api(params, request.headers)
        in Success(v)
          render json: v.data
        in Failure(e)
          handle_error(e)
        end
      end

      def create_field
        case CreateFieldInteractor.call_api(params, request.headers)
        in Success(v)
          render json: v.data, status: :created
        in Failure(e)
          handle_error(e)
        end
      end

      def update_field
        case UpdateFieldInteractor.call_api(params, request.headers)
        in Success(v)
          render json: v.data
        in Failure(e)
          handle_error(e)
        end
      end

      def delete_field
        case DeleteFieldInteractor.call_api(params, request.headers)
        in Success(v)
          render nothing: true, status: :no_content
        in Failure(e)
          handle_error(e)
        end
      end

      def docs
        case DocsInteractor.call(request, params)
        in Success(v)
          render json: v.data
        in Failure(e)
          handle_error(e)
        end
      end

      private

      def api_params
        params.to_enum.to_h.merge(params.to_enum.to_h["api"])
      end

    end
  end
end

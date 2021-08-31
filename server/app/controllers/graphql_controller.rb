require 'auth0'

class GraphqlController < ApplicationController
  include Authorization

  # rubocop:disable Metrics/AbcSize
  def execute
    claims = verify_token(request)
    query = params[:query]
    variables = prepare_variables(params[:variables])
    user_id = claims.first['sub'] if claims.present?
    context = {
      current_user_id: user_id
    }
    render json: ServerSchema.execute(query, variables: variables,
                                             context: context, operation_name: params[:operationName])
  rescue StandardError => e
    logger.error(e.message)
    raise GraphqlErrors::InternalServerError, e.message unless Rails.env.development?

    handle_error_in_development e
  end

  private

  # Handle variables in form data, JSON body, or a blank value
  def prepare_variables(variables_param)
    case variables_param
    in String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    in Hash
      variables_param
    in ActionController::Parameters
      variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
    in nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(err)
    logger.error err.message
    logger.error err.backtrace.join("\n")

    render json: { errors: [{ message: err.message, backtrace: err.backtrace }], data: {} }, status: 500
  end
end

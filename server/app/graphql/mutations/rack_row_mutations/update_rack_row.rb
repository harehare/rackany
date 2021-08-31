module Mutations
  module RackRowMutations
    class UpdateRackRow < BaseMutation
      include Authorization
      include Dry::Monads[:result]

      argument :project_id, ID, required: true
      argument :collection_id, ID, required: true
      argument :rack_row_id, ID, required: true
      argument :input, [Types::Input::RackRowItemInput], required: true

      type Types::RackRowType

      def resolve(project_id:, collection_id:, rack_row_id:, input:)
        authenticate_owner!(context, project_id, collection_id)

        params = input.each_with_object({}) do |i, arr|
          arr[i.name] = i.data
        end
        params[:rack_row_id] = rack_row_id

        case UpdateRowInteractor.call(params, collection_id)
        in Success(v)
          v.data
        in Failure(e)
          GraphqlErrors.handle_error(e)
        end
      end

    end
  end
end

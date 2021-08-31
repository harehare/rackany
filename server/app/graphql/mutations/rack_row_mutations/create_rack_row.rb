module Mutations
  module RackRowMutations
    class CreateRackRow < BaseMutation
      include Authorization
      include Dry::Monads[:result]

      argument :project_id, ID, required: true
      argument :collection_id, ID, required: true
      argument :input, [Types::Input::RackRowItemInput], required: true

      type Types::RackRowType

      def resolve(project_id:, collection_id:, input:)
        authenticate_owner!(context, project_id, collection_id)

        new_id = Firestore::RackRow.new_id
        params = input.each_with_object({}) do |i, arr|
          arr[i.name] = i.data
        end
        params[:id] = new_id

        case CreateRowInteractor.call(params, collection_id)
        in Success(v)
          v.data
        in Failure(e)
          p e
          GraphqlErrors.handle_error(e)
        end
      end

    end
  end
end

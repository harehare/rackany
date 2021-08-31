module Mutations
  module CollectionMutations
    class CreateCollection < AuthMutation
      include Authorization
      argument :input, Types::Input::Collection::CollectionInput, required: true

      type Types::CollectionType

      def resolve(input:)
        input_params = input.to_h
        authenticate_owner!(context, input_params[:project_id])
        input_params[:default_sort_field] = 'updated_at'
        input_params[:default_sort_direction] = 'DESC'
        collection = Collection.new(input_params.compact)
        raise GraphqlErrors::InputError, 'invalid parameter' unless collection.save

        collection
      end
    end
  end
end

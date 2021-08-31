module Mutations
  module CollectionMutations
    class UpdateCollection < BaseMutation
      include Authorization
      argument :input, Types::Input::Collection::CollectionInput, required: true

      type Types::CollectionType

      def resolve(input:)
        input_params = input.to_h
        authenticate_owner!(context, input_params[:project_id], input[:id])
        collection = Collection.find(input[:id])
        input_params[:default_sort_field] = get_default_sort_field(input[:id], input[:default_sort_field])
        collection.update!(input_params.compact)
        collection
      end

      def get_default_sort_field(collection_id, sort_field)
        fields = RackField.sortable_fields(collection_id)
        sortable_field_names = fields.each_with_object([]) do |field, arr|
          arr << field[:name]
        end
        sortable_field_names << 'created_at'
        sortable_field_names << 'updated_at'
        sortable_field_names.include?(sort_field) ? sort_field : 'updated_at'
      end
    end
  end
end

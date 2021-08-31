module Types
  module Input
    module Collection
      class CollectionInput < GraphQL::Schema::InputObject
        argument :id, ID, required: false
        argument :project_id, ID, required: true
        argument :name, String, required: true
        argument :display_name, String, required: true
        argument :description,  String, required: true
        argument :default_sort_field, String, required: false, default_value: 'updated_at'
        argument :default_sort_direction, String, required: false, default_value: 'DESC'
      end
    end
  end
end

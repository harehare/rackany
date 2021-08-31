module Types
  module Input
    class ProjectInput < GraphQL::Schema::InputObject
      argument :id, ID, required: false
      argument :name, String, required: true
      argument :display_name, String, required: true
      argument :description,  String, required: false
    end
  end
end

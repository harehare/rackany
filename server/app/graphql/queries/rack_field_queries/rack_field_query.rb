module Queries
  module RackFieldQueries
    class RackFieldQuery < Queries::AuthQuery
      include Authorization
      type Types::RackFieldType, null: false
      argument :id, ID, required: true
      argument :project_id, ID, required: true
      argument :collection_id, ID, required: true

      def resolve(id:, project_id:, collection_id:)
        authenticate_owner!(context, project_id, collection_id)
        RackField.find(id)
      end
    end
  end
end

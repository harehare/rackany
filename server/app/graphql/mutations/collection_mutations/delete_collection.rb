module Mutations
  module CollectionMutations
    class DeleteCollection < BaseMutation
      include Authorization
      argument :id, ID, required: true

      type Types::CollectionType

      def resolve(id:)
        collection = Collection.find(id)
        authenticate_owner!(context, collection.project_id, id)
        collection.destroy!
        collection
      end
    end
  end
end

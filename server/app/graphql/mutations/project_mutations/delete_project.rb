module Mutations
  module ProjectMutations
    class DeleteProject < BaseMutation
      include Authorization
      argument :id, ID, required: true

      type Types::ProjectType

      def resolve(id:)
        authenticate_owner!(context, id)
        project = Project.find(id)
        project.destroy!
        project
      end
    end
  end
end

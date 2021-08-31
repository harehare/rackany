module Mutations
  module ProjectMutations
    class UpdateProject < BaseMutation
      include Authorization
      argument :input, Types::Input::ProjectInput, required: true

      type Types::ProjectType

      def resolve(input:)
        authenticate_owner!(context, input[:id])
        input_params = input.to_h
        project = Project.find(input[:id])
        project.update!(input_params.compact)
        project
      end
    end
  end
end

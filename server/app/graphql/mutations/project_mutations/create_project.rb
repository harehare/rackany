module Mutations
  module ProjectMutations
    class CreateProject < Mutations::AuthMutation
      argument :input, Types::Input::ProjectInput, required: true

      type Types::ProjectType

      def resolve(input:)
        input_params = input.to_h
        input_params[:user_id] = context[:current_user_id]
        project = Project.new(input_params.compact)
        result = project.save
        raise GraphqlErrors::InputError, project.errors.messages unless result

        project
      end
    end
  end
end

module Types
  class MutationType < Types::BaseObject
    field :sign_up, mutation: Mutations::SignUp

    field :delete_rack_row, mutation: Mutations::RackRowMutations::DeleteRackRow
    field :update_rack_row, mutation: Mutations::RackRowMutations::UpdateRackRow
    field :create_rack_row, mutation: Mutations::RackRowMutations::CreateRackRow

    field :save_field, mutation: Mutations::RackFieldMutations::SaveField

    field :delete_collection, mutation: Mutations::CollectionMutations::DeleteCollection
    field :update_collection, mutation: Mutations::CollectionMutations::UpdateCollection
    field :create_collection, mutation: Mutations::CollectionMutations::CreateCollection

    field :delete_project, mutation: Mutations::ProjectMutations::DeleteProject
    field :create_project, mutation: Mutations::ProjectMutations::CreateProject
    field :update_project, mutation: Mutations::ProjectMutations::UpdateProject

    field :create_api_key, mutation: Mutations::ApiKeyMutations::CreateApiKey
    field :revoke_user_key, mutation: Mutations::ApiKeyMutations::RevokeUserKey
    field :revoke_api_key, mutation: Mutations::ApiKeyMutations::RevokeApiKey
  end
end

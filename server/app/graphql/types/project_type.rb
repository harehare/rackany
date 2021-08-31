module Types
  class ProjectType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, ID, null: false
    field :name, String, null: true
    field :display_name, String, null: true
    field :description, String, null: true
    field :collections, [Types::CollectionType], null: false
    field :api_keys, [Types::ApiKeyType], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

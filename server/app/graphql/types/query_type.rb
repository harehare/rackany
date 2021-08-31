module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :projects, resolver: Queries::ProjectQueries::ProjectsQuery
    field :project,  resolver: Queries::ProjectQueries::ProjectQuery

    field :collection, resolver: Queries::CollectionQueries::CollectionQuery

    field :rack_rows, resolver: Queries::RackRowQueries::RackRowsQuery
    field :rack_row, resolver: Queries::RackRowQueries::RackRowQuery
    field :rack_rows_count, resolver: Queries::RackRowQueries::RackRowsCountQuery

    field :rack_field, resolver: Queries::RackFieldQueries::RackFieldQuery
  end
end

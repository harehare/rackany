module RackFieldHelpers
  def create_rack_rows(user_id, project_id, collection_id, rack_fields)
    mutation_string = <<~GRAPHQL
      mutation createRackRow ($projectId: ID!, $collectionId: ID!, $input: [RackRowItemInput!]!){
        createRackRow(input: { projectId: $projectId, collectionId: $collectionId, input: $input}) {
          id
          data
        }
      }
    GRAPHQL
    result = ServerSchema.execute(mutation_string,
                                  context: { current_user_id: user_id },
                                  variables: { projectId: project_id, collectionId: collection_id,
                                               input: rack_fields.map do |f|
                                                 {
                                                   rackFieldId: f[:id],
                                                   name: f[:name],
                                                   data: field_type_value(f[:field_type])
                                                 }
                                               end })
    if result['errors'].present?
      { errors: result['errors'].first['message'] }
    else
      {
        id: result['data']['createRackRow']['id'],
        collection_id: result['data']['createRackRow']['collectionId'],
        data: result['data']['createRackRow']['data']
      }
    end
  end

  def query_rack_rows(user_id, project_id, collection_id, filters, orders)
    query_string = <<~GRAPHQL
      query rackRows($projectId: ID!, $collectionId: ID!, $filters: [RackRowFilter!], $orders: [RackRowOrder!]) {
        rackRows(projectId: $projectId, collectionId: $collectionId, filters: $filters, orders: $orders) {
          id
          collectionId
          data
        }
      }
    GRAPHQL
    result = ServerSchema.execute(query_string, context: { current_user_id: user_id },
                                                variables: { collectionId: collection_id,
                                                             projectId: project_id,
                                                             filters: filters,
                                                             orders: orders })
    if result['errors'].present?
      { errors: result['errors'].first['message'] }
    else
      result['data']['rackRows'].map do |r|
        {
          id: r['id'],
          collection_id: r['collectionId'],
          data: r['data']
        }
      end
    end
  end
end

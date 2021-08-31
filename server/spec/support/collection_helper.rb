module CollectionHelpers
  # rubocop:disable Metrics/AbcSize
  def create_collection(user_id, project_id)
    mutation_string = <<~GRAPHQL
      mutation createCollection ($input: CollectionInput!){
        createCollection(input: { input: $input}) {
          id
          name
          projectId
          displayName
          description
        }
      }
    GRAPHQL
    result = ServerSchema.execute(mutation_string,
                                  context: { current_user_id: user_id },
                                  variables: {
                                    input: { projectId: project_id, name: 'collection_name',
                                             displayName: 'collection_displayName', description: 'collection_description' }
                                  })
    if result['errors'].present?
      { errors: result['errors'].first['message'] }
    else
      {
        id: result['data']['createCollection']['id'],
        name: result['data']['createCollection']['name'],
        project_id: result['data']['createCollection']['projectId'],
        display_name: result['data']['createCollection']['displayName'],
        description: result['data']['createCollection']['description']
      }
    end
  end

  def query_collection(user_id, project_id, collection_id)
    query_string = <<~GRAPHQL
      query collection($id: ID!, $projectId: ID!) {
        collection(id: $id, projectId: $projectId) {
          id
          name
          projectId
          rackFields {
            id
            name
            description
            fieldType
            order
          }
          displayName
          description
        }
      }
    GRAPHQL
    result = ServerSchema.execute(query_string, context: { current_user_id: user_id },
                                                variables: { id: collection_id, projectId: project_id })
    if result['errors'].present?
      { errors: result['errors'].first['message'] }
    else
      {
        id: result['data']['collection']['id'],
        project_id: result['data']['collection']['projectId'],
        name: result['data']['collection']['name'],
        display_name: result['data']['collection']['displayName'],
        description: result['data']['collection']['description'],
        rack_fields: result['data']['collection']['rackFields']
      }
    end
  end
end

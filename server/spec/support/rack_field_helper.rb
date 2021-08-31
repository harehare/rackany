module RackFieldHelpers
  # rubocop:disable Metrics/MethodLength
  def create_rack_fields(user_id, project_id, collection_id)
    mutation_string = <<~GRAPHQL
      mutation saveField ($projectId: ID!, $collectionId: ID!, $input: [RackFieldInput!]!){
        saveField(input: { projectId: $projectId collectionId: $collectionId, input: $input}) {
          id
          collectionId
          name
          displayName
          description
          fieldType
          order
          sortable
          stored
        }
      }
    GRAPHQL
    result = ServerSchema.execute(mutation_string,
                                  context: { current_user_id: user_id },
                                  variables: { projectId: project_id, collectionId: collection_id,
                                               input: [
                                                 { name: 'textField', displayName: 'textField', description: 'textField Description',
                                                   fieldType: 'TEXT', order: 1, sortable: true, stored: true, requiredField: true },
                                                 { name: 'emailField', displayName: 'emailField', description: 'emailField Description',
                                                   fieldType: 'EMAIL', order: 2, sortable: true, requiredField: true },
                                                 { name: 'numberField', displayName: 'numberField', description: 'numberField Description',
                                                   fieldType: 'NUMBER', order: 3, sortable: true, requiredField: true }
                                               ] })

    if result['errors'].present?
      { errors: result['errors'].first['message'] }
    else
      result['data']['saveField'].map do |v|
        {
          id: v['id'],
          collection_id: v['collectionId'],
          name: v['name'],
          displayName: v['displayName'],
          description: v['description'],
          field_type: v['fieldType'],
          order: v['order'],
          sortable: v['sortable'],
          required_field: v['requiredField']
        }
      end
    end
  end

  def field_type_value(field_type)
    case field_type
    in 'NUMBER'
      '1000'
    in 'LIST'
      "['test']"
    in 'LOCATION'
      '[100, 100]'
    in 'EMAIL'
      'test@test.com'
    else
      'string'
    end
  end
end

def query_rack_field(user_id, project_id, collection_id, data_field_id)
  query_string = <<~GRAPHQL
    query rackField($id: ID!, $projectId: ID!, $collectionId: ID!) {
      rackField(id: $id, projectId: $projectId, collectionId: $collectionId) {
        id
        name
        displayName
        description
        fieldType
        order
      }
    }
  GRAPHQL
  result = ServerSchema.execute(query_string, context: { current_user_id: user_id },
                                              variables: { id: data_field_id, projectId: project_id, collectionId: collection_id })
  if result['errors'].present?
    { errors: result['errors'].first['message'] }
  else
    {
      id: result['data']['rackField']['id'],
      name: result['data']['rackField']['name'],
      displayName: result['data']['rackField']['displayName'],
      field_type: result['data']['rackField']['fieldType'],
      description: result['data']['rackField']['description'],
      order: result['data']['rackField']['order']
    }
  end
end

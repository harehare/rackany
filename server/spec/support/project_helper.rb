module ProjectHelpers
  # rubocop:disable Metrics/AbcSize
  def create_project(user_id)
    mutation_string = <<~GRAPHQL
      mutation createProject ($input: ProjectInput!){
       createProject(input: { input: $input}) {
         id
         name
         description
         userId
       }
      }
    GRAPHQL
    result = ServerSchema.execute(mutation_string, context: { current_user_id: user_id },
                                                   variables: {
                                                     input: { name: 'test',
                                                              displayName: "displayName",
                                                              description: 'test1' }
                                                   })
    if result['errors'].present?
      { errors: result['errors'].first['message'] }
    else
      {
        id: result['data']['createProject']['id'],
        name: result['data']['createProject']['name'],
        user_id: result['data']['createProject']['userId'],
        description: result['data']['createProject']['description']
      }
    end
  end

  def query_projects(user_id)
    query_string = <<~GRAPHQL
      query projects {
        projects {
          id
          name
          description
          collections {
            id
            name
            displayName
          }
        }
      }
    GRAPHQL
    result = ServerSchema.execute(query_string, context: { current_user_id: user_id },
                                                variables: {})
    if result['errors'].present?
      { errors: result['errors'].first['message'] }
    else
      result['data']['projects'].map do |p|
        {
          id: p['id'],
          name: p['name'],
          description: p['description']
        }
      end
    end
  end

  def query_project(user_id, project_id)
    query_string = <<~GRAPHQL
      query project($id: ID!) {
        project(id: $id) {
          id
          name
          description
        }
      }
    GRAPHQL
    result = ServerSchema.execute(query_string, context: { current_user_id: user_id },
                                                variables: { id: project_id })
    if result['errors'].present?
      { errors: result['errors'].first['message'] }
    else
      {
        id: result['data']['project']['id'],
        name: result['data']['project']['name'],
        description: result['data']['project']['description']
      }
    end
  end
end

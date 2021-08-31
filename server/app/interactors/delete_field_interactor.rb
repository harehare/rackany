require './domain/rack_content/rack_content'

class DeleteFieldInteractor < Interactor
  class << self
    include WriteInteractor

    def execute(params, _, _)
      field_id = params[:field_id]
      RackField.delete(field_id)
      field_id
    end

    def swagger(params, _, _)
      {
        path: "/api/v1/#{params[:collection_name]}/fields/{field_id}",
        methods: {
          delete: {
            summary: "Delete field",
            description: "Delete a field",
            parameters: [
              {
                name: "field_id",
                in: "path",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "204": {
                description: "204 No Content",
                content: {
                  '*/*': {
                    schema: {
                      type: "object",
                      properties: {
                        count: {
                          type: "string",
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    end

  end
end

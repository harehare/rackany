class CreateFieldInteractor < Struct.new(:data)
  class << self
    include WriteInteractor

    def execute(params, collection, fields)
      params[:collection_id] = collection.id
      params[:order] = fields.length + 1
      field = RackField.new(params)
      field.save!
      field
    end

    def swagger(params, _, _)
      {
        path: "/api/v1/#{params[:collection_name]}/fields",
        methods: {
          post: {
            summary: "Create Field",
            description: "Create a field",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    "$ref": '#/components/schemas/RackField'
                  }
                }
              }
            },
            responses: {
              "201": {
                description: "201 Created",
                content: {
                  "application/json": {
                    schema: {
                      "$ref": "#/components/schemas/RackField"
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

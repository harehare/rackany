class UpdateFieldInteractor < Interactor
  class << self
    include WriteInteractor

    def execute(params, _, _, _)
      field_id = params[:field_id]
      field = RackField.find(field_id)
      field.description = params[:description] || field.description
      field.display_name = params[:display_name] || field.display_name
      field.required_field = params[:required_field] || field.required_field
      field.sortable = params[:sortable] || field.sortable
      field.stored = params[:stored] || field.stored
      field.save!
      field
    end

    def swagger(params, _, _)
      {
        path: "/api/v1/#{params[:collection_name]}/fields/{field_id}",
        methods: {
          patch: {
            summary: "Update Field",
            description: "Update a field",
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
              "200": {
                description: "200 OK",
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

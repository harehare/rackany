require './domain/rack_content/rack_content'

class GetFieldsInteractor < Struct.new(:data)
  class << self
    include ReadInteractor

    def execute(_, _, _)
      fields.values.map do |field|
        {
          id: field.id,
          name: field.name,
          display_name: field.display_name,
          description: field.description,
          field_type: field.field_type,
          order: field.order,
          sortable: field.sortable,
          stored: field.stored,
          required: field.required_field,
          created_at: field.created_at,
          updated_at: field.updated_at,
        }
      end
    end

    def swagger(params, _, _)
      {
        path: "/api/v1/#{params[:collection_name]}/fields",
        methods: {
          get: {
            summary: "Get fields",
            description: "Returns fields",
            responses: {
              "200": {
                description: "200 OK",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        "$ref": "#/components/schemas/RackField"
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

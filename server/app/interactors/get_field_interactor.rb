require './domain/rack_content/rack_content'

class GetFieldInteractor < Interactor
  class << self
    include ReadInteractor

    def execute(params, _, _, fields)
      result = fields.filter do |field|
        params[:field_id] == field.id
      end

      raise Errors::InvalidParameterError if result.length == 0

      head = result.first

      {
        id: head.id,
        name: head.name,
        display_name: head.display_name,
        description: head.description,
        field_type: head.field_type,
        order: head.order,
        sortable: head.sortable,
        stored: head.stored,
        required: head.required_field,
        created_at: head.created_at,
        updated_at: head.updated_at,
      }
    end

    def swagger(params, _, _)
      {
        path: "/api/v1/#{params[:collection_name]}/fields/#{params[:field_id]}",
        methods: {
          get: {
            summary: "Get field",
            description: "Returns field",
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

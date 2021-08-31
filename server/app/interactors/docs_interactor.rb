class DocsInteractor < Interactor
  class << self
    include ReadWithAuthInteractor

    SWAGGER_DOCS = [
      CountRowsInteractor,
      CreateFieldInteractor,
      CreateRowInteractor,
      DeleteFieldInteractor,
      DeleteRowInteractor,
      GetFieldsInteractor,
      GetRowInteractor,
      GetRowsInteractor,
      UpdateFieldInteractor,
      UpdateRowInteractor,
    ].freeze

    def execute(params, collection, fields)
      paths = SWAGGER_DOCS.each_with_object({}) do |doc, arr|
        swagger_doc = doc.swagger(params, collection, fields)
        path = swagger_doc[:path]
        methods = swagger_doc[:methods]
        if arr[path]
          arr[path].merge!(methods)
        else
          doc = {}
          doc[path] = methods
          arr.merge!(doc)
        end
      end

      docs = {
        openapi: "3.0.0",
        info: {
          version: "1.0.0",
          title: "#{params[:collection_name]} APIs",
          description: collection.description
        },
        servers: [
          {
            url: Rails.env.development? ? "http://localhost:3000" : "https://rackany.com",
          }
        ],
        paths: paths,
        components: {
          schemas: {
            RackField: {
              type: "object",
              required: [
                "name",
                "description",
                "display_name",
                "field_type",
                "order",
                "required_field",
                "sortable",
                "stored",
                "created_at",
                "updated_at",
              ],
              properties: {
                id: {
                  type: "string"
                },
                description: {
                  type: "string"
                },
                display_name: {
                  type: "string"
                },
                field_type: {
                  type: "string"
                },
                name: {
                  type: "string"
                },
                order: {
                  type: "integer"
                },
                required_field: {
                  type: "boolean"
                },
                sortable: {
                  type: "boolean"
                },
                stored: {
                  type: "boolean"
                },
                created_at: {
                  type: "string"
                },
                updated_at: {
                  type: "string"
                }
              }
            },
          },
        }
      }
      docs
    end

  end
end

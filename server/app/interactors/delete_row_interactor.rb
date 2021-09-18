require './domain/rack_content/rack_content'

class DeleteRowInteractor < Interactor
  class << self
    include WriteInteractor

    def execute(params, _, collection, fields)
      collection_id = collection.id
      field_values = fields.values
      rack_row_id = params[:rack_row_id]

      rack_row = Firestore::RackRow.find_by_id(collection_id, field_values, rack_row_id)
      field_values.each do |field|
        case field[:field_type]
        in 'IMAGE'
          Firestore::RackRowImage.delete(rack_row.attributes[field[:name]])
        else
          # TODO:
        end
      end
      Firestore::RackRow.delete(collection_id, rack_row_id)
      rack_row_id
    end

    def swagger(params, _, _)
      {
        path: "/api/v1/#{params[:collection_name]}/{rack_row_id}",
        methods: {
          delete: {
            summary: "Delete row",
            description: "Delete a row",
            parameters: [
              {
                name: "rack_row_id",
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

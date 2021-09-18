require './domain/rack_content/rack_content'

class UpdateRowInteractor < Interactor
  class << self
    include WriteInteractor

    def execute(params, _, collection, fields)
      rack_row = Firestore::RackRow.create(collection.id, fields.values)
      body = params.each_with_object({}) do |(key, value), arr|
        arr[key] = value if fields.include?(key)
      end
      rack_row.attributes = create_update_row(collection.id, fields, params[:rack_row_id], body)
      rack_row.id = params[:rack_row_id]
      result = rack_row.save

      unless result.nil?
        raise Errors::InvalidParameterError
      end

      {id: rack_row.id, data: rack_row.attributes, created_at: rack_row.created_at, updated_at: rack_row.updated_at}
    end

    def swagger(params, _, fields)
      body = fields.values.each_with_object({}) do |field, arr|
        arr[field.name] = field.to_open_api_type
      end

      {
        path: "/api/v1/#{params[:collection_name]}/{rack_row_id}",
        methods: {
          post: {
            summary: "Update row",
            description: "Update a row",
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
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: 'object',
                    properties: body
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
                      type: 'object',
                      properties: body
                    }
                  }
                }
              }
            }
          }
        }
      }
    end

    private

    def create_update_row(collection_id, fields, rack_row_id, params)
      name_field_map = RackField.name_field_type(collection_id: collection_id)
      rack_row = Firestore::RackRow.find_by_id(collection_id, fields.values, rack_row_id)
      params.each_with_object({}) do |(k, v), arr|
        next unless name_field_map.has_key?(k)
        case name_field_map[k]
        in 'IMAGE' if Firestore::RackRowImage.is_uri(v)
          image = Firestore::RackRowImage.new(collection_id: collection_id,
                                   rack_row_id: rack_row_id,
                                   field_name: v)
          Firestore::RackRowImage.delete(rack_row.attributes[k]) unless rack_row.attributes[k].nil?
          arr[k] = image.create(v)
        else
          arr[k] = RackField.convert(name_field_map[k], v)
        end
      end
    end

  end
end

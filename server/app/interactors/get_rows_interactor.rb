require './domain/rack_content/rack_content'

class GetRowsInteractor < Struct.new(:data)
  class << self
    include ReadInteractor

    def execute(params, collection, fields)
      field_values = fields.values
      rack_row = Domain::RackContent.build(params.to_enum.to_h, fields)
      stored_fields = field_values.each_with_object({}) do |field, arr|
        arr[field.name] = field if field.stored
      end

      if rack_row.orders.length == 0
        Domain::Values::Order.build(collection.default_sort_field,
                                    collection.default_sort_direction.downcase, fields).bind do |default_order|
          rack_row.orders << default_order
        end
      end if

      offset = params[:offset] || 0
      limit = params[:limit] || 30

      Firestore::RackRow.find(collection.id, field_values, rack_row, {offset: offset, limit: limit}).map do |row|
        row.attributes.delete_if{|k, _|
          stored_fields.include? k
        }
        data = row.attributes.each_with_object({}) do |(k, v), arr|
          case stored_fields[k].field_type
          in "IMAGE" unless v.nil?
            arr[k] = Firestore::RackRowImage.url(v)
          else
            arr[k] = v
          end
        end
        {id: row.id, data: data, created_at: row.created_at, updated_at: row.updated_at}
      end
    end

    def swagger(params, _, fields)
      paramsters = fields.values.flat_map do |field|
        Domain::Values::Filter::OPERATOR_MAPPING.keys.map do |k|
          {
            name: "#{field.name}_#{k}",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          }
        end
      end
      response = fields.values.each_with_object({}) do |field, arr|
        arr[field.name] = field.to_open_api_type
      end

      {
        path: "/api/v1/#{params[:collection_name]}",
        methods: {
          get: {
            summary: "Get entries",
            description: "Returns entries matching the query filters",
            parameters: paramsters,
            responses: {
              "200": {
                description: "200 OK",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: 'object',
                        properties: response
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

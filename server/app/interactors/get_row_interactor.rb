require 'rqrcode'
require 'redcarpet'
require 'chunky_png'
require 'barby/barcode/code_128'
require 'barby/outputter/png_outputter'
require './domain/rack_content/rack_content'

class GetRowInteractor < Struct.new(:data)
  class << self
    include ReadInteractor

    def execute(params, collection, fields)
      field_values = fields.values
      stored_fields = field_values.each_with_object({}) do |field, arr|
        arr[field.name] = field if field.stored
      end

      row = Firestore::RackRow.find_by_id(collection.id, field_values, params[:rack_row_id])
      raise Errors::NotFoundError if row.nil?

      image_urls = fields.values.each_with_object({}) do |field, arr|
        arr[field.name] = Firestore::RackRowImage.url(row.attributes[field.name]) if field.field_type == "IMAGE"
      end

      markdown = Redcarpet::Markdown.new(MarkdownRender.new(image_urls))

      data = row.attributes.each_with_object({}) do |(k, v), arr|
        next unless stored_fields.include?(k)

        show_param = params["#{k}_show"]

        case stored_fields[k].field_type
        in "IMAGE" if !v.nil?
          arr[k] = Firestore::RackRowImage.url(v)
        in "QRCODE" if show_param === "true"
          arr[k] = RQRCode::QRCode.new(v, size: '3', level: :h).to_img.resize(200, 200).to_data_url
        in "BARCODE" if show_param === "true"
          arr[k] = Barby::Code128B.new(v).to_image(xdim: 3).to_data_url
        in "MARKDOWN" if show_param === "true"
          arr[k] = markdown.render(v)
        else
          arr[k] = v
        end
      end

      {id: row.id, data: data, created_at: row.created_at, updated_at: row.updated_at}
    end

    def swagger(params, collection, fields)
      response = fields.values.each_with_object({}) do |field, arr|
        arr[field.name] = field.to_open_api_type
      end

      {
        path: "/api/v1/#{params[:collection_name]}/{rack_row_id}",
        methods: {
          get: {
            summary: "Get an entry",
            description: "Returns an entry by id",
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
              "200": {
                description: "200 OK",
                content: {
                  "application/json": {
                    schema: {
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
    end

  end
end

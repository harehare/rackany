require './domain/rack_content/rack_content'

class CountRowsInteractor < Struct.new(:data)
  class << self
    include ReadInteractor

    def execute(_, collection, _)
      Firestore::RackRow.count(collection.id)
    end

    def swagger(params, _, _)
      {
        path: "/api/v1/#{params[:collection_name]}/count",
        methods: {
          get: {
            summary: "Count entries",
            description: "Returns the count of all entries",
            responses: {
              "200": {
                description: "200 OK",
                content: {
                  '*/*': {
                    schema: {
                      type: "object",
                      properties: {
                        count: {
                          type: "integer",
                          format: "int64"
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

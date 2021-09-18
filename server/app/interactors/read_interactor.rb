module ReadInteractor
  include Dry::Monads[:result]
  include Dry::Monads[:try]

  def call(params, collection_id=nil)
    collection = Collection.find(collection_id) unless collection_id.nil?
    field = fields(collection_id) unless collection.nil?
    result = Try { execute(params, collection&.project, collection, field) }
    result.to_result.bind do |r|
      Success(new(r))
    end
  end

  def call_api(params, headers)
    api_key_validates(bearer_token(headers), params[:collection_name]).bind do |args|
      args => {project:, collection:}
      Try { execute(params, project, collection, fields(collection.id)) }.to_result.bind do |r|
        Success(new(r))
      end
    end
  end

  def api_key_validates(api_key, collection_name = nil)
    api_key_info = ApiKey.find_by(api_key: api_key)

    return Failure(Errors::AuthenticationError) if api_key_info.nil?

    project = Project.find(api_key_info.project_id)

    return Failure(Errors::AuthenticationError) unless project
    return Success({project: project, collection: nil}) if collection_name.nil?

    collection = Collection.find_by(project_id: api_key_info.project_id, name: collection_name)

    return Failure(Errors::AuthenticationError) if collection.nil?
    return Failure(Errors::AuthenticationError) unless collection.name == collection_name

    Success({project: project, collection: collection})
  end

  def fields(collection_id)
    # TODO: get from caches
    RackField.fields_by_collection_id(collection_id).each_with_object({}) do |field, arr|
      arr[field.name] = field
    end
  end

  def bearer_token(headers)
    pattern = /^bearer /i
    header  = headers['authorization'] || headers['Authorization']
    header.gsub(pattern, '') if header && header.match(pattern)
  end
end

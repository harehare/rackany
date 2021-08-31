module ReadWithAuthInteractor
  include Dry::Monads[:result]
  include Dry::Monads[:try]
  include Authorization

  def call(request, params)
    claims = Try { verify_token(request) }

    if claims.error?
        return Failure(:not_authorized)
    end

    user_id = claims.value!.first['sub'] if claims.present?

    validates(user_id, params[:project_id], params[:collection_name]).bind do |args|
      args => {collection:}
      Try { execute(params, collection, fields(collection.id)) }.bind do |result|
        Success(new(result))
      end
    end
  end

  def validates(user_id, project_id, collection_name)
    collection = Collection.find_by(project_id: project_id, name: collection_name)

    unless collection.name == collection_name
      return Failure(:not_authorized)
    end

    project = Project.find(collection.project_id)

    if project.nil?
      return Failure(:not_authorized)
    end

    unless project.user_id == user_id
      return Failure(:not_authorized)
    end

    Success({collection: collection})
  end

  def fields(collection_id)
    # TODO: get from caches
    RackField.fields_by_collection_id(collection_id).each_with_object({}) do |field, arr|
      arr[field.name] = field
    end
  end

end

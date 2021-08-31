module WriteInteractor
  include Dry::Monads[:result]
  include Dry::Monads[:try]
  include ReadInteractor

  def call_api(params, headers)
    validates(bearer_token(headers), params[:collection_name]).bind do |args|
      args => {api_key:, collection:}

      unless api_key.is_write_key
        return Failure(Errors::AuthenticationError)
      end

      res = Try { execute(params, collection, fields(collection.id)) }
      res.to_result.bind do |r|
        r.bind do |v|
          Success(new(v))
        end
      end

    end
  end

end

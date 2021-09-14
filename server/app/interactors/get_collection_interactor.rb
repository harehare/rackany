class GetCollectionInteractor < Struct.new(:data)
  class << self
    include ReadInteractor

    def execute(params, _, _)
      Collection.find(params[:collection_id])
    end

  end
end

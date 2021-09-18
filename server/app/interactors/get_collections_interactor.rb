class GetCollectionInteractor < Interactor
  class << self
    include ReadInteractor

    def execute(params, project, _, _)
      project.collections
    end

  end
end

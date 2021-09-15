class GetProjectInteractor < Interactor
  class << self
    include ReadInteractor

    def execute(params, _, _)
      Project.find(params[:project_id])
    end

  end
end

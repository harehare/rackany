class GetProjectsInteractor < Interactor
  class << self
    include ReadInteractor

    def execute(params, _, _, _)
      Project.where(user_id: params[:uesr_id]).offset(params[:offset]).limit(params[:limit]).order(:updated_at)
    end

  end
end

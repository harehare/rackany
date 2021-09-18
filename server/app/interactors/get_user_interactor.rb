class GetUserInteractor < Interactor
  class << self
    include ReadInteractor

    def execute(params, _, _, _)
      User.find(params[:user_id])
    end

  end
end

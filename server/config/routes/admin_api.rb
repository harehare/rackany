Rails.application.routes.draw do
  namespace 'admin' do
    get "/:collection_name/docs", to: "api#docs"
  end
end

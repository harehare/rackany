Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do

      get "/:collection_name", to: "api#rows"
      get "/:collection_name/docs", to: "api#docs"
      get "/:collection_name/count", to: "api#count"
      get "/:collection_name/fields", to: "api#fields"
      get "/:collection_name/fields/:field_id", to: "api#get_field"
      get "/:collection_name/:rack_row_id", to: "api#row"

      post "/:collection_name/fields", to: "api#create_field"
      post "/:collection_name", to: "api#create_row"

      patch "/:collection_name/fields/:field_id", to: "api#update_field"
      patch "/:collection_name/:rack_row_id", to: "api#update_row"

      delete "/:collection_name/fields/:field_id", to: "api#delete_field"
      delete "/:collection_name/:rack_row_id", to: "api#delete_row"

    end
  end
end

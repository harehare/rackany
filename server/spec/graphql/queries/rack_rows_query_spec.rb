require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe Queries::RackRowQueries::RackRowsQuery do
  describe 'rack rows query' do
    it 'query succeed' do
      user_id = 'test_id'
      sign_up(user_id)
      project = create_project(user_id)
      collection = create_collection(user_id, project[:id])
      rack_fields = create_rack_fields(user_id, project[:id], collection[:id])
      create_rack_rows(user_id, project[:id], collection[:id], rack_fields)
      result = query_rack_rows(user_id, project[:id], collection[:id], [],
                               [{ field: 'updated_at', direction: 'DESC' }])

      expect(result.length).to eq 1
      expect(result.first[:collection_id]).to eq collection[:id]
      expect(result.first[:data][:textField]).to eq 'string'
      expect(result.first[:data][:emailField]).to eq 'test@test.com'
      expect(result.first[:data][:numberField]).to eq 1000
    end
    it 'create error' do
      user_id = 'test_id'
      sign_up(user_id)
      project = create_project(user_id)
      collection = create_collection(user_id, project[:id])
      rack_fields = create_rack_fields(user_id, project[:id], collection[:id])
      create_rack_rows(user_id, project[:id], collection[:id], rack_fields)
      result = query_rack_rows('test2_id', project[:id], collection[:id], [],
                               [{ field: 'updatedAt', direction: 'DESC' }])

      expect(result[:errors]).to eq 'No Project Owner'
    end
  end
end

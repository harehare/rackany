require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe Queries::RackRowQueries::RackRowsQuery do
  describe 'rack rows query' do

    let!(:user) { sign_up('test_id') }
    let(:project) { create_project(user[:id]) }
    let(:collection) { create_collection(user[:id], project[:id]) }
    let(:rack_fields) { create_rack_fields(user[:id], project[:id], collection[:id]) }

    it 'query succeed' do
      result = query_rack_rows(user[:id], project[:id], collection[:id], [],
                               [{ field: 'updated_at', direction: 'DESC' }])

      expect(result.length).to eq 1
      expect(result.first[:collection_id]).to eq collection[:id]
      expect(result.first[:data][:textField]).to eq 'string'
      expect(result.first[:data][:emailField]).to eq 'test@test.com'
      expect(result.first[:data][:numberField]).to eq 1000
    end
    it 'create error' do
      create_rack_rows(user[:id], project[:id], collection[:id], rack_fields)
      result = query_rack_rows('test2_id', project[:id], collection[:id], [],
                               [{ field: 'updatedAt', direction: 'DESC' }])

      expect(result[:errors]).to eq 'No Project Owner'
    end
  end
end

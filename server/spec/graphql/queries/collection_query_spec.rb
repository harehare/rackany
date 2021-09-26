require 'rails_helper'

RSpec.describe Queries::CollectionQueries::CollectionQuery do
  describe 'collection query' do

    let!(:user) { sign_up('test_id') }
    let(:project) { create_project('test_id') }
    let(:collection) { create_collection('test_id', project[:id]) }

    it 'query succeed' do
      rack_fields = create_rack_fields('test_id', project[:id], collection[:id])
      result = query_collection('test_id', project[:id], collection[:id])
      expect(result[:id]).to eq collection[:id]
      expect(result[:name]).to eq collection[:name]
      expect(result[:description]).to eq collection[:description]
      expect(result[:project_id]).to eq collection[:project_id]
      expect(result[:rack_fields].length).to eq rack_fields.length
    end
    it 'query failed' do
      result = query_collection('test2_id', project[:id], collection[:id])
      expect(result[:errors]).to eq 'No Project Owner'
    end
  end
end

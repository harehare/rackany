require 'rails_helper'

RSpec.describe Queries::ProjectQueries::ProjectQuery do
  describe 'project query' do
    it 'query succeed' do
      sign_up('test_id')
      project = create_project('test_id')
      result = query_project('test_id', project[:id])

      expect(result[:id]).to eq project[:id]
      expect(result[:name]).to eq project[:name]
      expect(result[:description]).to eq project[:description]
    end
    it 'query error' do
      result = query_project(nil, 'test')
      expect(result[:errors]).to eq 'Not Authenticated'
    end
    it 'not found error' do
      sign_up('test_id')
      result = query_project('test_id', 'test')
      expect(result[:errors]).to eq 'No Project Owner'
    end
  end
end

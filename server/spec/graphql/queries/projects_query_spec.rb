require 'rails_helper'

RSpec.describe Queries::ProjectQueries::ProjectsQuery do
  describe 'projects query' do
    it 'query succeed' do
      sign_up('test_id')
      project = create_project('test_id')
      projects = query_projects('test_id')

      expect(projects.length).to eq 1
      expect(projects.first[:id]).to eq project[:id]
      expect(projects.first[:name]).to eq project[:name]
      expect(projects.first[:description]).to eq project[:description]
    end
    it 'create error' do
      result = query_projects(nil)
      expect(result[:errors]).to eq 'Not Authenticated'
    end
  end
end

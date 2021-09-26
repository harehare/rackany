require 'rails_helper'

RSpec.describe Queries::ProjectQueries::ProjectsQuery do
  describe 'projects query' do

    let!(:user) { sign_up('test_id') }
    let!(:project) { create_project('test_id') }

    it 'query succeed' do
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

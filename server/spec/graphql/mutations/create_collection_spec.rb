require 'rails_helper'

RSpec.describe Mutations::CollectionMutations::CreateCollection do
  describe 'create collection' do
    it 'create succeed' do
      sign_up('test_id')
      project = create_project('test_id')
      result = create_collection('test_id', project[:id])
      expect(result[:name]).to eq 'collection_name'
      expect(result[:project_id]).to eq project[:id]
      expect(result[:display_name]).to eq 'collection_displayName'
      expect(result[:description]).to eq 'collection_description'
    end
    it 'create error' do
      sign_up('test2_id')
      project = create_project('test2_id')
      result = create_collection('test_id', project[:id])
      expect(result[:errors]).to eq 'No Project Owner'
    end
  end
end

require 'rails_helper'

RSpec.describe Mutations::RackFieldMutations::SaveField do
  describe 'save fields' do
    it 'save succeed' do
      sign_up('test_id')
      project = create_project('test_id')
      collection = create_collection('test_id', project[:id])
      result = create_rack_fields('test_id', project[:id], collection[:id])
      expect(result.length).to eq 3
    end
    it 'save error' do
      sign_up('test_id')
      project = create_project('test_id')
      collection = create_collection('test_id', project[:id])
      result = create_rack_fields('test2_id', project[:id], collection[:id])
      expect(result[:errors]).to eq 'No Project Owner'
    end
  end
end

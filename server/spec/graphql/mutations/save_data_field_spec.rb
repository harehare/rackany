require 'rails_helper'

RSpec.describe Mutations::RackFieldMutations::SaveField do
  describe 'save fields' do

    let!(:user) { sign_up('test_id') }
    let(:project) { create_project('test_id') }
    let(:collection) { create_collection('test_id', project[:id]) }

    it 'save succeed' do
      result = create_rack_fields('test_id', project[:id], collection[:id])
      expect(result.length).to eq 3
    end
    it 'save error' do
      result = create_rack_fields('test2_id', project[:id], collection[:id])
      expect(result[:errors]).to eq 'No Project Owner'
    end
  end
end

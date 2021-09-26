require 'rails_helper'

RSpec.describe Mutations::RackRowMutations::CreateRackRow do
  describe 'create rack row' do

    let(:project) { create_project('test_id') }

    it 'create succeed' do
      sign_up('test_id')
      expect(project[:name]).to eq 'test'
      expect(project[:user_id]).to eq 'test_id'
      expect(project[:description]).to eq 'test1'
    end
    it 'create error' do
      result = create_project(nil)
      expect(result[:errors]).to eq 'Not Authenticated'
    end
  end
end

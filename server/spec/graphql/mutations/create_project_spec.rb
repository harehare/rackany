require 'rails_helper'

RSpec.describe Mutations::RackRowMutations::CreateRackRow do
  describe 'create rack row' do
    it 'create succeed' do
      sign_up('test_id')
      result = create_project('test_id')
      expect(result[:name]).to eq 'test'
      expect(result[:user_id]).to eq 'test_id'
      expect(result[:description]).to eq 'test1'
    end
    it 'create error' do
      result = create_project(nil)
      expect(result[:errors]).to eq 'Not Authenticated'
    end
  end
end

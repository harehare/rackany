require 'rails_helper'

RSpec.describe Mutations::SignUp do
  describe 'signup' do
    it 'signup succeed' do
      result = sign_up('test_id')
      expect(result[:id]).to eq 'test_id'
    end
    it 'signup error' do
      result = sign_up(nil)
      expect(result[:errors]).to eq 'Not Authenticated'
    end
  end
end

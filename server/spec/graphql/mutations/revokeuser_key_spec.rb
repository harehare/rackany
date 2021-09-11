require 'rails_helper'

RSpec.describe Mutations::ApiKeyMutations::RevokeUserKey do
  describe 'revoke user key' do
    it 'revoke user key succeed' do
      user = sign_up('test_id')
      result = revoke_user_key('test_id')
      expect(result[:id]).to eq 'test_id'
      expect(result[:api_key]).to eq user[:api_key]
    end
  end
end

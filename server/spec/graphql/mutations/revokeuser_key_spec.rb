require 'rails_helper'

RSpec.describe Mutations::ApiKeyMutations::RevokeUserKey do
  describe 'revoke user key' do

    let(:user) { sign_up('test_id') }
    let(:user_key) { revoke_user_key('test_id') }

    it 'revoke user key succeed' do
      expect(user_key[:id]).to eq 'test_id'
      expect(user_key[:api_key]).to eq user[:api_key]
    end
  end
end

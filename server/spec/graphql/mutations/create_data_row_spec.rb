require 'rails_helper'

RSpec.describe Mutations::RackRowMutations::CreateRackRow do
  describe 'create save data rows' do
    it 'create succeed' do
      sign_up('test_id')
      project = create_project('test_id')
      collection = create_collection('test_id', project[:id])
      rack_fields = create_rack_fields('test_id', project[:id], collection[:id])
      result = create_rack_rows('test_id', project[:id], collection[:id], rack_fields)

      expect(result[:collection_id]).to eq collection[:id]
      expect(result[:data]["textField"]).to eq field_type_value('TEXT')
      expect(result[:data]["emailField"]).to eq field_type_value('EMAIL')
      expect(result[:data]["numberField"]).to eq field_type_value('NUMBER').to_i
    end
  end
end

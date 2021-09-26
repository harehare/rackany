require 'rails_helper'

RSpec.describe Queries::RackFieldQueries::RackFieldQuery do
  describe 'rack field query' do

    let!(:user) { sign_up('test_id') }
    let(:project) { create_project('test_id') }
    let(:collection) { create_collection('test_id', project[:id]) }

    it 'query succeed' do
      rack_fields = create_rack_fields('test_id', project[:id], collection[:id])
      result = query_rack_field('test_id', project[:id], collection[:id], rack_fields.first[:id])

      expect(result[:id]).to eq rack_fields.first[:id]
      expect(result[:name]).to eq rack_fields.first[:name]
      expect(result[:description]).to eq rack_fields.first[:description]
      expect(result[:field_type]).to eq rack_fields.first[:field_type]
      expect(result[:order]).to eq rack_fields.first[:order]
    end
    it 'query failed' do
      rack_fields = create_rack_fields('test_id', project[:id], collection[:id])
      result = query_rack_field('test_id2', project[:id], collection[:id], rack_fields.first[:id])

      expect(result[:errors]).to eq 'No Project Owner'
    end
  end
end

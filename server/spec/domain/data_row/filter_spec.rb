require 'spec_helper'

RSpec.describe Domain::Values::Filter do
  it 'build filter' do
    Domain::Values::Filter::OPERATOR_MAPPING.each do |k, v|
      expect(Domain::Values::Filter.build("filter_#{k}", '10,10', Set['filter']).value_or(Domain::Values::Filter.build('filter_eq', 10, Set['filter'])).operator).to eq v
    end
  end
end

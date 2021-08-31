require 'spec_helper'

RSpec.describe Domain::Values::Order do
  it 'build order' do
    expect(Domain::Values::Order.build('test', 'desc', Set['test']).value_or(Domain::Values::Order.build('test', 'desc', Set['test'])).direction).to eq 'desc'
  end
end

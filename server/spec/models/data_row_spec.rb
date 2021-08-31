require 'rails_helper'

RSpec.describe Firestore::RackRow, type: :model do
  it 'create, get and delete doc' do
    collection_id = 'test_collection_id'.freeze
    fields = [
      { name: 'test1', field_type: 'TEXT', required_field: true, sortable: false },
      { name: 'test2', field_type: 'TEXT', required_field: true, sortable: false }
    ].freeze
    data = Firestore::RackRow.create(collection_id, fields)
    data.attributes = { test1: 'test1', test2: 'test2' }
    data.save

    rack_row = Firestore::RackRow.find(collection_id, fields, {})
    expect(rack_row.length).to be 1

    Firestore::RackRow.delete(collection_id, rack_row.first.id)
  end

  it 'validate number doc' do
    collection_id = 'test_collection_id2'.freeze
    fields = [
      { name: 'test', field_type: 'NUMBER', required_field: true, sortable: false}
    ].freeze
    data = Firestore::RackRow.create(collection_id, fields)

    [
      [{ test: 'test'}, 1],
      [{ test: 10}, nil],
    ].each do |input, expected|
      data.attributes = input
      result = data.save
      expect(result[:test].length).to be expected unless result.nil?
      expect(result).to be nil if result.nil?
      Firestore::RackRow.delete(collection_id, data.id)
    end
  end

  it 'validate text doc' do
    collection_id = 'test_collection_id3'.freeze
    fields = [
      { name: 'test', field_type: 'TEXT', required_field: true, sortable: false}
    ].freeze
    data = Firestore::RackRow.create(collection_id, fields)

    [
      [{ test: ''}, 1],
      [{ test: 'test'}, nil],
    ].each do |input, expected|
      data.attributes = input
      result =  data.save
      expect(result[:test].length).to be 1 unless result.nil?
      expect(result).to be nil if result.nil?
      Firestore::RackRow.delete(collection_id, data.id)
    end
  end

  it 'validate email doc' do
    collection_id = 'test_collection_id4'.freeze
    fields = [
      { name: 'test', field_type: 'EMAIL', required_field: true, sortable: false }
    ].freeze
    data = Firestore::RackRow.create(collection_id, fields)

    [
      [{ test: 'test'}, 1],
      [{ test: 'test@gmail.com'}, nil],
    ].each do |input, expected|
      data.attributes = input
      result = data.save
      expect(result[:test].length).to be 1 unless result.nil?
      expect(result).to be nil if result.nil?
      Firestore::RackRow.delete(collection_id, data.id)
    end
  end

  it 'validate image doc' do
    collection_id = 'test_collection_id5'.freeze
    fields = [
      { name: 'test',field_type: 'IMAGE', required_field: true, sortable: false}
    ].freeze
    data = Firestore::RackRow.create(collection_id, fields)

    [
      [{ test: 'htte://test'}, 1],
      [{ test: 'http://test.com'}, nil],
    ].each do |input, expected|
      data.attributes = input
      result = data.save
      expect(result[:test].length).to be 1 unless result.nil?
      expect(result).to be nil if result.nil?
      Firestore::RackRow.delete(collection_id, data.id)
    end
  end

  it 'validate markdown doc' do
    collection_id = 'test_collection_id6'.freeze
    fields = [
      { name: 'test', field_type: 'MARKDOWN', required_field: true, sortable: false }
    ].freeze
    data = Firestore::RackRow.create(collection_id, fields)

    [
      [{ test: ''}, 1],
      [{ test: 'markdown'}, nil],
    ].each do |input, expected|
      data.attributes = input
      result = data.save
      expect(result[:test].length).to be 1 unless result.nil?
      expect(result).to be nil if result.nil?
      Firestore::RackRow.delete(collection_id, data.id)
    end
  end

  it 'validate location doc' do
    collection_id = 'test_collection_id7'.freeze
    fields = [
      { name: 'test', field_type: 'LOCATION', required_field: true, sortable: false }
    ].freeze
    data = Firestore::RackRow.create(collection_id, fields)
    [
      [{ test: [1, 2, 3] }, 1],
      [{ test: [1, 2] }, nil],
    ].each do |input, expected|
      data.attributes = input
      result = data.save
      expect(result[:test].length).to be expected unless result.nil?
      expect(result).to be nil if result.nil?
      Firestore::RackRow.delete(collection_id, data.id)
    end
  end

  it 'search doc' do
    collection_id = 'test_collection_id8'.freeze
    fields = [
      { name: 'test', field_type: 'TEXT', required_field: true, sortable: false }
    ].freeze
    data = Firestore::RackRow.create(collection_id, fields)
    [
      [{ test: 'test' }, [{name: 'test', operator: '==', value: 'test'}], 1],
    ].each do |input, filters, expected|
      data.attributes = input
      data.save
      delete_id1 = data.id
      data.attributes = { test: 'test2' }
      data.save
      delete_id2 = data.id
      expect(Firestore::RackRow.find(collection_id, fields, {filters: filters, orders: []}).length).to be expected
      Firestore::RackRow.delete(collection_id, delete_id1)
      Firestore::RackRow.delete(collection_id, delete_id2)
    end
  end

  it 'order doc' do
    collection_id = 'test_collection_id9'.freeze
    fields = [
      { name: 'test', field_type: 'TEXT', required_field: true, sortable: true },
      { name: 'test2', field_type: 'TEXT', required_field: true, sortable: true },
      { name: 'test3', field_type: 'NUMBER', required_field: true, sortable: true },
    ].freeze
    data = Firestore::RackRow.create(collection_id, fields)
    [
      [{ test: 'test', test2: 'test', test3: 3 }, [{name: 'test', desc: true}], 'test2'],
      [{ test: 'test1', test2: 'test1', test3: 1 }, [{name: 'test3', desc: false}], 'test1'],
    ].each do |input, orders, expected|
      data.attributes = input
      data.save
      delete_id1 = data.id
      data.attributes = { test: 'test2', test2: 'test2', test3: 2 }
      data.save
      delete_id2 = data.id
      expect(Firestore::RackRow.find(collection_id, fields, {filters: [], orders: orders}).first.test).to eq expected
      Firestore::RackRow.delete(collection_id, delete_id1)
      Firestore::RackRow.delete(collection_id, delete_id2)
    end
  end
end

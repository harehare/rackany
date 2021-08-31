# == Schema Information
#
# Table name: rack_fields
#
#  id             :string           not null, primary key
#  description    :string
#  display_name   :string           not null
#  field_type     :string           not null
#  name           :string           not null
#  order          :integer          not null
#  required_field :boolean          default(TRUE), not null
#  sortable       :boolean          default(FALSE), not null
#  stored         :boolean          default(TRUE), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  collection_id  :string           not null
#
# Indexes
#
#  index_rack_fields_on_collection_id  (collection_id)
#
# Foreign Keys
#
#  collection_id  (collection_id => collections.id)
#
class RackField < ApplicationRecord
  include IdGenerator

  belongs_to :collection

  scope :sortable_fields, lambda { |collection_id|
    where(collection_id: collection_id, sortable: true)
  }

  scope :fields_by_collection_id, lambda { |collection_id|
    Rails.cache.fetch("collection/#{collection_id}/fields/fields_by_collection_id", expires_in: 5.minutes) do
      where(collection_id: collection_id).order(:order)
    end
  }

  scope :fields_by_name, lambda { |collection_name|
    where(collection_name: collection_name).order(:order)
  }

  scope :field_type , lambda { |collection_id|
    Rails.cache.fetch("collection/#{collection_id}/fields/field_type", expires_in: 5.minutes) do
      RackField.where(collection_id).each_with_object({}) do |field, arr|
        arr[field.id] = field.field_type
      end
    end
  }

  scope :name_field_type , lambda { |collection_id|
    Rails.cache.fetch("collection/#{collection_id}/fields/name_field_type", expires_in: 5.minutes) do
      RackField.where(collection_id).each_with_object({}) do |field, arr|
        arr[field.name] = field.field_type
      end
    end
  }

  def self.convert(field_type, data)
    case field_type
    in 'NUMBER'
      /[0-9]+/.match(data) &to_s.to_i
    in 'LOCATION'
      tokens = data.split(',')
      [tokens[0], tokens[1]] if tokens.length == 2
    in 'EMAIL'
      /^\S+@\S+\.\S+$/.match(data) &to_s
    in 'CHECKBOX'
      data == 'true'
    in 'LIST'
      data.split("\n")
    else
      data
    end
  end

  def to_json_schema_type
    case field_type
    in 'NUMBER'
      'integer'
    in 'LIST'
      'array'
    in 'LOCATION'
      'array'
    in 'CHECKBOX'
      'boolean'
    in 'IMAGE'
      %w[string null]
    else
      'string'
    end
  end

  def to_open_api_type
    case field_type
    in 'NUMBER'
      {type: "integer"}
    in 'LIST'
      {type: 'array', items: {type: 'string'}}
    in 'LOCATION'
      {type: 'array', items: {type: 'string'}}
    in 'CHECKBOX'
      {type: 'boolean'}
    in 'IMAGE'
      {type: 'string', nullable: true}
    else
      {type: 'string'}
    end
  end

end

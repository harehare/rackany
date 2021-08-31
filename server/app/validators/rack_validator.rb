require 'json-schema'

class RackValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    JSON::Validator.validate!(RackField.to_json_schema(record.collection_id), value, strict: true)
  rescue JSON::Schema::ValidationError => e
    record.errors.add(attribute, (options[:message] || e.message))
  end
end

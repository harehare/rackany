require 'json-schema'

class JsonValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    JSON::Validator.validate!(options[:schema], value, strict: true)
  rescue JSON::Schema::ValidationError => e
    record.errors[attribute].add(options[:message] || e.message)
  end
end

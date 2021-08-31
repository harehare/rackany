# == Schema Information
#
# Table name: api_keys
#
#  id         :string           not null, primary key
#  api_key    :string
#  name       :string
#  role       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  project_id :string           not null
#
# Indexes
#
#  index_api_keys_on_api_key  (api_key) UNIQUE
#
# Foreign Keys
#
#  project_id  (project_id => projects.id)
#
class ApiKey < ApplicationRecord
  include IdGenerator
  has_secure_token :api_key, length: 64

  belongs_to :project

  def is_write_key
    self.role == "READ_AND_WRITE"
  end
end

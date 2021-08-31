# == Schema Information
#
# Table name: users
#
#  id         :string           not null, primary key
#  api_key    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_users_on_api_key  (api_key) UNIQUE
#
class User < ApplicationRecord
  has_secure_token :api_key, length: 64

  has_many :projects
end

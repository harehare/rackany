# == Schema Information
#
# Table name: projects
#
#  id           :string           not null, primary key
#  description  :string
#  display_name :string
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :string           not null
#
class Project < ApplicationRecord
  include IdGenerator

  has_many :collections, dependent: :destroy
  has_many :api_keys, dependent: :destroy
  belongs_to :user
end

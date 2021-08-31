# == Schema Information
#
# Table name: collections
#
#  id                     :string           not null, primary key
#  default_sort_direction :string           not null
#  default_sort_field     :string           not null
#  description            :string
#  display_name           :string
#  name                   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  project_id             :string           not null
#
# Indexes
#
#  index_collections_on_project_id           (project_id)
#  index_collections_on_project_id_and_name  (project_id,name) UNIQUE
#
# Foreign Keys
#
#  project_id  (project_id => projects.id)
#
class Collection < ApplicationRecord
  include IdGenerator

  belongs_to :project
  has_many :rack_fields, dependent: :destroy
  # , strict_loading: true
end

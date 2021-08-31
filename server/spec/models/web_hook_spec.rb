# == Schema Information
#
# Table name: web_hooks
#
#  id            :string           not null, primary key
#  created       :boolean          default(FALSE), not null
#  deleted       :boolean          default(FALSE), not null
#  description   :string
#  updated       :boolean          default(FALSE), not null
#  url           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  collection_id :string           not null
#
require 'rails_helper'

RSpec.describe WebHook, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

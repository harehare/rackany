require 'google/cloud/firestore'

module Firestore
  class Firestore
    class_attribute :connection

    self.connection = Google::Cloud::Firestore.new(
      project_id: ENV['FIREBASE_PROJECT_ID']
    )
  end
end

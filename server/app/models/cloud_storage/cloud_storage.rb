require "google/cloud/storage"

module CloudStorage
  class CloudStorage
    class_attribute :storage
    class_attribute :bucket

    self.storage = Google::Cloud::Storage.new(project_id: ENV["FIREBASE_PROJECT_ID"])
    self.bucket = storage.bucket ENV["FIREBASE_STORAGE_BUCKET_ID"]
  end
end

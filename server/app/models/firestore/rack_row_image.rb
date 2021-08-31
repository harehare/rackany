module Firestore
  class RackRowImage < CloudStorage::CloudStorage
    include ActiveModel::Model
    include ActiveModel::Attributes
    include ActiveModel::Validations

    attribute :collection_id, :string
    attribute :rack_row_id, :string
    attribute :field_name, :string

    def create(data_uri)
      uri = to_uri(data_uri)
      file_path = get_file_path(uri)
      image = base64_decode(uri)
      self.bucket.create_file(StringIO.new(image), file_path)
      file_path
    end

    def delete(file_path)
      file = bucket.file file_path
      file.delete
    end

    class << self
      def is_uri(data_uri)
        uri = URI.parse(data_uri)
        uri.scheme == "data"
      end

      def url(file_path)
        file = bucket.file file_path
        file.signed_url expires: 604800
      end
    end

    private

    def to_uri(data_uri)
      uri = URI.parse(data_uri)
      if uri.scheme != "data"
        raise "Image shuold be data uri"
      end
      uri
    end

    def get_file_path(data_uri)
      ext = extension(data_uri)
      "#{collection_id}/#{Digest::SHA256.hexdigest(rack_row_id + field_name)}#{ext}"
    end

    def base64_decode(uri)
      opaque = uri.opaque
      data = opaque[opaque.index(",") + 1, opaque.size]
      Base64.decode64(data)
    end

    def extension(uri)
      opaque = uri.opaque
      mime_type = opaque[0, opaque.index(";")]
      case mime_type
      when 'image/png' then
        '.png'
      when 'image/jpeg' then
        '.jpg'
      else
        raise "Unsupport Content-Type"
      end
    end
  end
end

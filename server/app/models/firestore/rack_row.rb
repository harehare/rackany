module Firestore
  class RackRow < Firestore
    include ActiveModel::Model
    include ActiveModel::Attributes
    include ActiveModel::Validations

    attribute :id, :string
    attribute :collection_id, :string
    attribute :fields, array: true
    attribute :data
    attribute :created_at, :datetime
    attribute :updated_at, :datetime

    COL_NAME = 'rows'.freeze
    COUNT_NAME = 'count'.freeze

    define_model_callbacks :save
    class_attribute :rack_rows
    before_save :rows_validation

    self.rack_rows = connection.col 'rack_row'

    def attributes=(hash)
      hash.each do |key, value|
        send("#{key}=", value)
      end
    end

    def attributes
      fields.each_with_object({}) do |field, arr|
        arr[field[:name]] = instance_variable_get("@#{field[:name]}")
      end
    end

    def save
      run_callbacks(:save) do
        return errors.messages unless valid?

        attrs = attributes
        attrs[:updated_at] = connection.field_server_time

        if self.id.nil?
          self.id = SecureRandom.uuid
        end

        data_ref = rack_rows.doc(collection_id).col(COL_NAME).doc(id)
        count_ref = rack_rows.doc(collection_id).col(COUNT_NAME).doc(COUNT_NAME)
        connection.transaction do |tx|
          data = tx.get(data_ref).data
          if data.nil?
            attrs[:created_at] = connection.field_server_time
            tx.set data_ref, attrs
            if tx.get(count_ref).data.nil?
              tx.set count_ref, { count: connection.field_increment(1) }
            else
              tx.update count_ref, { count: connection.field_increment(1) }
            end
          else
            attrs[:created_at] = data[:created_at]
            tx.set data_ref, attrs
          end
        end
      end
    end

    class << self

      def new_id
        SecureRandom.uuid
      end

      # rubocop:disable Metrics/MethodLength,Metrics/AbcSize
      def create(collection_id, fields)
        model = RackRow.new
        model.collection_id = collection_id
        model.fields = fields
        class << model
          def setup(fields)
            fields.each do |field|
              self.class.define_method("#{field[:name]}=") do |value|
                instance_variable_set("@#{field[:name]}", value)
              end
              self.class.clear_validators!
              add_field(field)
            end
          end

          private

          def add_field(field)
            self.class.attr_accessor field[:name].intern

            case field[:field_type]

            in 'NUMBER'
              self.class.validates field[:name].intern, numericality: true, presence: field[:required_field]
            in 'CHECKBOX'
              self.class.validates_inclusion_of field[:name].intern, in: [true, false], presence: field[:required_field]
            in 'EMAIL'
              self.class.validates field[:name].intern, email: true, presence: field[:required_field]
            in 'LOCATION'
              self.class.validates field[:name].intern, length: { maximum: 2, too_long: 'Length of the location array must be 2' }, presence: field[:required_field]
            in 'MARKDOWN'
              self.class.validates field[:name].intern, presence: field[:required_field]
            in 'IMAGE'
              self.class.validates field[:name].intern, presence: field[:required_field]
            in 'LIST'
              self.class.validates field[:name].intern, presence: field[:required_field]
            in 'BARCODE'
              self.class.validates field[:name].intern, presence: field[:required_field]
            in 'QRCODE'
              self.class.validates field[:name].intern, presence: field[:required_field]
            else
              self.class.validates field[:name].intern, presence: field[:required_field]
            end
          end
        end

        model.setup(fields)
        model
      end

      def count(collection_id)
        snapshot = rack_rows.doc(collection_id).col(COUNT_NAME).doc(COUNT_NAME).get
        return 0 if snapshot.data.nil?
        snapshot.data[:count]
      end

      def find(collection_id, fields, options, pagination = {offset: 0, limit: 30})
        field_map = create_field_map(fields)
        rack_row = create(collection_id, fields)

        query_ref = rack_rows.doc(collection_id).col(COL_NAME)
        options.filters.each do |filter|
          query_ref = query_ref.where filter.name, filter.operator, filter.value
        end
        options.orders.each do |order|
          query_ref = query_ref.order(order.name, order.direction)
        end

        query_ref.offset(pagination[:offset]).limit(pagination[:limit]).get.map do |row|
          data = rack_row.class.new(row_params(row))
          data.collection_id = collection_id
          data.fields = fields
          data.data = row_data(field_map, row_params(row))
          data
        end
      end

      def find_by_id(collection_id, fields, rack_row_id)
        field_map = create_field_map(fields)
        rack_row = create(collection_id, fields)
        snapshort = rack_rows.doc(collection_id).col(COL_NAME).doc(rack_row_id).get

        return nil if snapshort.data.nil?

        row_data = row_params(snapshort)

        data = rack_row.class.new(row_data) unless snapshort.nil?
        data.id = snapshort.document_id
        data.collection_id = collection_id
        data.fields = fields
        data.data = row_data(field_map, row_params(snapshort))
        data.created_at = row_data[:created_at]
        data
      end

      def delete(collection_id, rack_row_id)
        data_ref = rack_rows.doc(collection_id).col(COL_NAME).doc(rack_row_id)
        count_ref = rack_rows.doc(collection_id).col(COUNT_NAME).doc(COUNT_NAME)
        connection.transaction do |tx|
          tx.delete data_ref
          tx.update count_ref, { count: connection.field_increment(-1) }
        end
      end

      private

      def create_field_map(fields)
        fields.each_with_object({}) do |field, arr|
          arr[field[:name].intern] = field
        end
      end

      def row_params(row)
        row.data.merge({ id: row.document_id })
      end

      def row_data(field_map, row)
        row.select {|k, _| field_map.include?(k) }
      end
    end

    private

    def rows_validation
      unless valid?
        return errors.messages
      end
    end
  end
end

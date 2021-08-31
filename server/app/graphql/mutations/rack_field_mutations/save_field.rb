module Mutations
  module RackFieldMutations
    class SaveField < BaseMutation
      include Authorization
      argument :project_id, ID, required: true
      argument :collection_id, ID, required: true
      argument :input, [Types::Input::RackFieldInput], required: true

      type [Types::RackFieldType]

      def resolve(project_id:, collection_id:, input:)
        authenticate_owner!(context, project_id)
        RackField.where(collection_id: collection_id).destroy_all
        fields = to_f(collection_id, input)
        RackField.insert_all fields
        fields
      end

      private

      def to_f(collection_id, input)
        input.map do |i|
          now = Time.now
          i.to_h.update({
                          id: i.id.nil? ? SecureRandom.uuid : i.id,
                          collection_id: collection_id,
                          created_at: now,
                          updated_at: now
                        }).compact
        end
      end
    end
  end
end

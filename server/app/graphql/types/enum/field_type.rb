module Types
  module Enum
    class FieldType < Types::BaseEnum
      value 'TEXT'
      value 'NUMBER'
      value 'CHECKBOX'
      value 'EMAIL'
      value 'LOCATION'
      value 'MARKDOWN'
      value 'IMAGE'
      value 'LIST'
      value 'BARCODE'
      value 'QRCODE'
    end
  end
end

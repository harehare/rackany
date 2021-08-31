class MarkdownRender < Redcarpet::Render::HTML
  attr_accessor :image_urls

  def initialize(image_urls)
    self.image_urls = image_urls
    super()
  end

  def image(link, title, alt_text)
    unless self.image_map.include?(link)
      return "<img src=\"#{sanitize(link)}\" alt=\"#{sanitize(alt_text)}\" />"
    end

    path = self.image_map[link]
    image_url = Firestore::RackRowImage.url(path)

    "<img src=\"#{image_url}\" alt=\"#{sanitize(alt_text)}\" />"
  end

end

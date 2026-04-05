/*
  # Seed Perfume Catalog Data

  1. Data Added
    - Insert 20+ perfume products with various brands and fragrance types
    - Include images, prices, descriptions, and ratings
    - All perfumes are in stock by default

  2. Purpose
    - Populate the catalog with realistic perfume data for the e-commerce app
    - Provide variety of brands, fragrances, and price points
*/

INSERT INTO perfumes (name, brand, fragrance_type, description, price, volume_ml, rating, in_stock, image_url)
VALUES
  ('Eau de Parfum Classique', 'Luxe Scents', 'floral', 'A timeless floral blend with notes of rose and jasmine', 89.99, 50, 4.5, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Ocean Breeze', 'Fresh Spirit', 'fresh', 'Crisp aquatic fragrance with citrus notes', 64.99, 100, 4.3, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Dark Oud Nights', 'Premium Wood', 'woody', 'Rich oud with sandalwood and cedarwood base', 129.99, 50, 4.7, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Amber Dreams', 'Exotic Spice', 'oriental', 'Warm amber with vanilla and spice notes', 99.99, 50, 4.4, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Citrus Zest', 'Energy Line', 'fresh', 'Energizing blend of bergamot and lemon', 54.99, 100, 4.2, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Rose Elegance', 'Floral Boutique', 'floral', 'Delicate rose with peony and lilac', 84.99, 50, 4.6, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Sandalwood Harmony', 'Natural Essence', 'woody', 'Smooth sandalwood with vanilla undertones', 74.99, 75, 4.1, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Vanilla Bliss', 'Sweet Luxe', 'oriental', 'Creamy vanilla with caramel notes', 69.99, 50, 4.5, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Jasmine Night', 'Evening Elegance', 'floral', 'Intoxicating jasmine with musk base', 94.99, 50, 4.8, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Lavender Serenity', 'Calm Essence', 'fresh', 'Soothing lavender with herbal notes', 59.99, 100, 4.3, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Patchouli Mystery', 'Dark Spice', 'woody', 'Deep patchouli with leather accents', 109.99, 50, 4.6, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Tuberose Captive', 'Sensual Florals', 'floral', 'Lush tuberose with coconut undertones', 119.99, 50, 4.9, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Cedar Wood Charm', 'Woody Collection', 'woody', 'Crisp cedarwood with juniper', 79.99, 75, 4.2, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Coconut Paradise', 'Tropical Dreams', 'fresh', 'Exotic coconut with pineapple splash', 64.99, 100, 4.0, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Musk Elegance', 'Classic Scents', 'oriental', 'Soft musk with almond and tonka', 89.99, 50, 4.4, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Iris Sophistication', 'Premium Floral', 'floral', 'Refined iris with violet and almond', 104.99, 50, 4.7, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Ginger Spice', 'Spiced Collection', 'oriental', 'Warm ginger with cinnamon and clove', 74.99, 50, 4.3, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Peach Sunset', 'Fruity Fresh', 'fresh', 'Ripe peach with apricot and citrus', 59.99, 100, 4.2, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Vetiver Green', 'Nature Line', 'woody', 'Fresh vetiver with grass and green notes', 69.99, 100, 4.1, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Magnolia Bloom', 'Spring Collection', 'floral', 'Magnificent magnolia with green leaves', 79.99, 50, 4.5, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Incense Mystique', 'Spiritual Scents', 'oriental', 'Burning incense with amber and resin', 139.99, 50, 4.8, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Apple Blossom', 'Garden Fresh', 'floral', 'Fresh apple with white floral notes', 64.99, 100, 4.3, true, 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=200');

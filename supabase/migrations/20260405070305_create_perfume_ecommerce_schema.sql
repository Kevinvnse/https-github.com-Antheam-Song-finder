/*
  # Create Perfume E-Commerce Database Schema

  1. New Tables
    - `perfumes`: Perfume products catalog
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `brand` (text)
      - `fragrance_type` (text): floral, oriental, fresh, woody, etc.
      - `volume_ml` (integer): bottle size in ml
      - `rating` (numeric): average rating
      - `in_stock` (boolean)
      - `created_at` (timestamp)

    - `cart_items`: Shopping cart items
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `perfume_id` (uuid, foreign key to perfumes)
      - `quantity` (integer)
      - `created_at` (timestamp)

    - `orders`: User orders
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `total_price` (numeric)
      - `status` (text): pending, completed, shipped, delivered
      - `created_at` (timestamp)

    - `order_items`: Items in each order
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `perfume_id` (uuid, foreign key to perfumes)
      - `quantity` (integer)
      - `price` (numeric): price at time of purchase
      - `created_at` (timestamp)

    - `profiles`: User profiles
      - `id` (uuid, primary key, foreign key to auth.users)
      - `email` (text)
      - `full_name` (text)
      - `address` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Users can only access their own cart, orders, and profile
    - Perfumes catalog is public for viewing
    - Public can insert new cart items for authenticated users

  3. Indexes
    - Index on perfumes.brand and fragrance_type for filtering
    - Index on cart_items.user_id for fast cart lookup
    - Index on orders.user_id for user's order history
*/

CREATE TABLE IF NOT EXISTS perfumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL,
  image_url text,
  brand text NOT NULL,
  fragrance_type text,
  volume_ml integer DEFAULT 50,
  rating numeric(3, 1) DEFAULT 0,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  address text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  perfume_id uuid NOT NULL REFERENCES perfumes(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, perfume_id)
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_price numeric(10, 2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  perfume_id uuid NOT NULL REFERENCES perfumes(id),
  quantity integer NOT NULL,
  price numeric(10, 2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE perfumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfumes are viewable by everyone"
  ON perfumes FOR SELECT
  USING (true);

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own cart"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own cart"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can insert order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX idx_perfumes_brand ON perfumes(brand);
CREATE INDEX idx_perfumes_fragrance_type ON perfumes(fragrance_type);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);

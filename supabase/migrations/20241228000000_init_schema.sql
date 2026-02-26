-- 20241228000000_init_schema.sql

CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT, -- optional icon name if needed
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    thumbnail_url TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    read_time INT DEFAULT 5,
    author_name TEXT NOT NULL DEFAULT 'DevLog User',
    author_avatar_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public categories are viewable by everyone."
ON categories FOR SELECT USING (true);

CREATE POLICY "Public posts are viewable by everyone."
ON posts FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Authenticated users can insert categories"
ON categories FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
ON categories FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete categories"
ON categories FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert posts"
ON posts FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
ON posts FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete posts"
ON posts FOR DELETE TO authenticated USING (true);

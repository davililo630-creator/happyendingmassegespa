CREATE POLICY "Admins can read provider photos" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'providers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can upload provider photos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'providers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update provider photos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'providers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete provider photos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'providers' AND public.has_role(auth.uid(), 'admin'));

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'providers',
  'providers',
  false,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;
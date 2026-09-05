CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');
CREATE TYPE public.booking_status AS ENUM ('pending','confirmed','completed','cancelled');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE SEQUENCE public.booking_ref_seq START 1001;

CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('HE-' || to_char(now(),'YYMM') || '-' || lpad(nextval('public.booking_ref_seq')::text, 4, '0')),
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  service text NOT NULL,
  price integer NOT NULL DEFAULT 0,
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  notes text,
  status public.booking_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.bookings TO anon;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
GRANT USAGE ON SEQUENCE public.booking_ref_seq TO anon, authenticated, service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request a booking" ON public.bookings
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view bookings" ON public.bookings
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update bookings" ON public.bookings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete bookings" ON public.bookings
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER bookings_touch_updated_at BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
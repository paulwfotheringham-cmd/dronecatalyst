update public.crm_connections
set latitude = -33.4489,
    longitude = -70.6693,
    updated_at = now()
where lower(city) = 'santiago'
  and lower(country) in ('chile', 'cl')
  and (latitude = 20 and longitude = 0 or latitude is null or longitude is null);

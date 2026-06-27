update public.crm_connections
set latitude = 29.7604,
    longitude = -95.3698,
    updated_at = now()
where lower(city) = 'houston'
  and latitude = 20
  and longitude = 0;

-- Westport client portal: password Westport, redirect to /clients/westport

update public.platform_users
set
  display_name = 'Westport',
  password_hash = 'westport-salt-v2:b1345145c01b845414a74df6661a4435e15aa0beda5a26d3a05b1cbc93dcf491a12086caea33f397194be44a4d36872621902f80f10f0064d69ea9f6c073c422',
  redirect_path = '/clients/westport',
  updated_at = now()
where username = 'westport';

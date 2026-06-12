/* ============================================
   TopRidge Portal — JS
   ============================================ */

// TODO: Replace with environment variables
// const SUPABASE_URL = '';
// const SUPABASE_ANON_KEY = '';

/* --- Auth Gating --- */
function checkPortalAuth() {
  const partner = sessionStorage.getItem('topridge_partner');
  if (!partner) {
    window.location.href = '/portal/login';
    return null;
  }
  return JSON.parse(partner);
}

function setPortalAuth(data) {
  sessionStorage.setItem('topridge_partner', JSON.stringify(data));
}

/* --- Login --- */
function handlePortalLogin(form) {
  const email = form.querySelector('#partner-email').value.trim();
  const code = form.querySelector('#partner-code').value.trim();
  const errorEl = document.getElementById('portal-error');
  
  if (!email || !code) {
    errorEl.textContent = 'Please enter your approved partner email and Partner ID.';
    errorEl.style.display = 'block';
    return;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorEl.textContent = 'Please enter a valid email address.';
    errorEl.style.display = 'block';
    return;
  }
  
  // TODO: Supabase lookup to verify partner status
  // const { data, error } = await supabase
  //   .from('partner_applications')
  //   .select('*')
  //   .eq('email', email)
  //   .eq('partner_code', code)
  //   .eq('status', 'approved')
  //   .single();
  
  // MVP: Accept any non-empty code and store in session
  // In production, replace with Supabase verification
  const partnerData = {
    email: email,
    partner_code: code,
    name: '',
    brokerage: '',
    license: ''
  };
  
  setPortalAuth(partnerData);
  window.location.href = '/portal/submit';
}

/* --- Client Request Submission --- */
function submitClientRequest(form) {
  // Validate using shared validation from partner-network.js if loaded,
  // otherwise inline validation
  let valid = true;
  
  form.querySelectorAll('.pn-form-group').forEach(function(g) {
    g.classList.remove('error');
  });
  
  form.querySelectorAll('[required]').forEach(function(field) {
    const group = field.closest('.pn-form-group');
    if (!group) return;
    if (field.type === 'checkbox' && !field.checked) {
      group.classList.add('error'); valid = false;
    } else if (field.type === 'radio') {
      const name = field.name;
      const checked = form.querySelector(`input[name="${name}"]:checked`);
      if (!checked) { group.classList.add('error'); valid = false; }
    } else if (field.value.trim() === '') {
      group.classList.add('error'); valid = false;
    }
  });
  
  // Client permission required
  const permission = form.querySelector('select[name="client_permission"]');
  if (permission && permission.value !== 'yes') {
    const g = permission.closest('.pn-form-group');
    if (g) { g.classList.add('error'); valid = false; }
  }
  
  // At least one service checked
  const services = form.querySelectorAll('input[name="service_needed"]:checked');
  if (services.length === 0) {
    valid = false;
  }
  
  // Required consent checkboxes
  form.querySelectorAll('.pn-checkbox input[type="checkbox"][required]').forEach(function(cb) {
    if (!cb.checked) {
      const wrapper = cb.closest('.pn-checkbox');
      if (wrapper) wrapper.style.color = '#dc2626';
      valid = false;
    } else {
      const wrapper = cb.closest('.pn-checkbox');
      if (wrapper) wrapper.style.color = '';
    }
  });
  
  if (!valid) return;
  
  const data = {};
  const formData = new FormData(form);
  const serviceNeeded = [];
  form.querySelectorAll('input[name="service_needed"]:checked').forEach(function(cb) {
    serviceNeeded.push(cb.value);
  });
  
  for (const [key, value] of formData.entries()) {
    if (key === 'service_needed') continue;
    data[key] = value;
  }
  data.service_needed = serviceNeeded;
  data.client_permission = data.client_permission === 'yes';
  
  console.log('Client Request Data:', data);
  
  // TODO: Supabase insert to client_requests table
  // const response = await fetch(`${SUPABASE_URL}/rest/v1/client_requests`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'apikey': SUPABASE_ANON_KEY,
  //     'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
  //   },
  //   body: JSON.stringify(data)
  // });
  
  // TODO: Send notification email via Resend
  // Env: TOPRIDGE_NOTIFICATION_EMAIL, RESEND_API_KEY
  
  form.style.display = 'none';
  document.getElementById('form-success').classList.add('success');
  document.getElementById('form-success').style.display = 'block';
}

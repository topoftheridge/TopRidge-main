/* ============================================
   TopRidge Partner Network — Shared JS
   ============================================ */

// TODO: Replace with environment variables
// const SUPABASE_URL = '';
// const SUPABASE_ANON_KEY = '';

/* --- FAQ Accordion --- */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.pn-faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const item = btn.parentElement;
      const answer = item.querySelector('.pn-faq-a');
      const isActive = item.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.pn-faq-item').forEach(function(i) {
        i.classList.remove('active');
        i.querySelector('.pn-faq-a').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});

/* --- Form Validation & Submission --- */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return phone.replace(/\D/g, '').length >= 7;
}

function validateForm(form) {
  let valid = true;
  
  // Clear previous errors
  form.querySelectorAll('.pn-form-group').forEach(function(g) {
    g.classList.remove('error');
  });
  
  // Required fields
  form.querySelectorAll('[required]').forEach(function(field) {
    const group = field.closest('.pn-form-group');
    if (!group) return;
    
    if (field.type === 'checkbox' && !field.checked) {
      group.classList.add('error');
      valid = false;
    } else if (field.value.trim() === '') {
      group.classList.add('error');
      valid = false;
    }
  });
  
  // Email validation
  form.querySelectorAll('input[type="email"]').forEach(function(field) {
    if (field.value && !validateEmail(field.value)) {
      const group = field.closest('.pn-form-group');
      if (group) { group.classList.add('error'); valid = false; }
    }
  });
  
  // Phone validation
  form.querySelectorAll('input[type="tel"]').forEach(function(field) {
    if (field.value && !validatePhone(field.value)) {
      const group = field.closest('.pn-form-group');
      if (group) { group.classList.add('error'); valid = false; }
    }
  });
  
  // Required checkboxes (consent)
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
  
  return valid;
}

function collectFormData(form) {
  const data = {};
  const formData = new FormData(form);
  
  // Handle checkboxes with same name (multi-select)
  const checkboxGroups = {};
  form.querySelectorAll('.pn-checkbox-group input[type="checkbox"]').forEach(function(cb) {
    if (!checkboxGroups[cb.name]) checkboxGroups[cb.name] = [];
    if (cb.checked) checkboxGroups[cb.name].push(cb.value);
  });
  
  for (const [key, value] of formData.entries()) {
    if (checkboxGroups[key]) continue;
    data[key] = value;
  }
  
  Object.assign(data, checkboxGroups);
  return data;
}

function submitPartnerApplication(form) {
  if (!validateForm(form)) return;
  
  const data = collectFormData(form);
  console.log('Partner Application Data:', data);
  
  // TODO: Supabase insert
  // const response = await fetch(`${SUPABASE_URL}/rest/v1/partner_applications`, {
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

function submitVendorApplication(form) {
  if (!validateForm(form)) return;
  
  const data = collectFormData(form);
  console.log('Vendor Application Data:', data);
  
  // TODO: Supabase insert to vendor_applications table
  // TODO: Send notification email via Resend
  
  form.style.display = 'none';
  document.getElementById('form-success').classList.add('success');
  document.getElementById('form-success').style.display = 'block';
}

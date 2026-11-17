/* Shared greeting + time/festival theme for Vikash's websites.
   India time is used for greetings and the date-based festival calendar.
   Festival dates are maintained for 2026-2027; lunar dates may vary by region/moon sighting. */
(function () {
  'use strict';
  if (window.__vikashSharedExperienceLoaded) return;
  window.__vikashSharedExperienceLoaded = true;

  const FESTIVALS = {
    '2026-11-24': { name: 'Guru Nanak Jayanti', icon: '🪯', palette: 'saffron' },
    '2026-12-25': { name: 'Christmas', icon: '🎄', palette: 'christmas' },
    '2027-01-01': { name: 'New Year', icon: '🎉', palette: 'newyear' },
    '2027-01-14': { name: 'Makar Sankranti', icon: '🪁', palette: 'saffron' },
    '2027-01-15': { name: 'Pongal', icon: '🌾', palette: 'saffron' },
    '2027-01-26': { name: 'Republic Day', icon: '🇮🇳', palette: 'tricolour' },
    '2027-02-06': { name: 'Maha Shivratri', icon: '🔱', palette: 'indigo' },
    '2027-03-10': { name: 'Eid al-Fitr', icon: '🌙', palette: 'eid' },
    '2027-03-22': { name: 'Holi', icon: '🎨', palette: 'holi' },
    '2027-04-15': { name: 'Ram Navami', icon: '🙏', palette: 'saffron' },
    '2027-05-17': { name: 'Eid al-Adha', icon: '🌙', palette: 'eid' },
    '2027-05-20': { name: 'Buddha Purnima', icon: '🪷', palette: 'lotus' },
    '2027-08-15': { name: 'Independence Day', icon: '🇮🇳', palette: 'tricolour' },
    '2027-08-17': { name: 'Raksha Bandhan', icon: '🪷', palette: 'lotus' },
    '2027-08-25': { name: 'Janmashtami', icon: '🦚', palette: 'indigo' },
    '2027-09-03': { name: 'Ganesh Chaturthi', icon: '🐘', palette: 'saffron' },
    '2027-09-30': { name: 'Navratri', icon: '🪔', palette: 'saffron' },
    '2027-10-09': { name: 'Dussehra', icon: '🏹', palette: 'saffron' },
    '2027-10-29': { name: 'Diwali', icon: '🪔', palette: 'diwali' },
    '2027-11-04': { name: 'Chhath Puja', icon: '🌅', palette: 'saffron' },
    '2027-11-14': { name: 'Guru Nanak Jayanti', icon: '🪯', palette: 'saffron' },
    '2027-12-25': { name: 'Christmas', icon: '🎄', palette: 'christmas' }
  };

  const PALETTES = {
    day: { bg:'#f4f8ff', surface:'#ffffff', text:'#172b4d', muted:'#5b6d83', accent:'#2563eb', accent2:'#0f766e', border:'#dce6f2', deep:'#173b63', soft:'#eaf2ff' },
    evening: { bg:'#fff7ed', surface:'#fffdf9', text:'#392b32', muted:'#76616a', accent:'#c65b35', accent2:'#9b4f73', border:'#f0d9c8', deep:'#713d45', soft:'#ffeadb' },
    night: { bg:'#101a2b', surface:'#17263b', text:'#edf3ff', muted:'#b5c2d5', accent:'#80aaff', accent2:'#5dd0c0', border:'#34465f', deep:'#0a1322', soft:'#20344e' },
    diwali: { bg:'#fff8e8', surface:'#fffdf5', text:'#432719', muted:'#795b42', accent:'#d97706', accent2:'#0f8b72', border:'#f2d49a', deep:'#78350f', soft:'#ffedc2' },
    holi: { bg:'#fff1f7', surface:'#fffaff', text:'#3f2451', muted:'#745a7d', accent:'#c026d3', accent2:'#0891b2', border:'#f0c9e7', deep:'#701a75', soft:'#fce7f3' },
    eid: { bg:'#effcf5', surface:'#ffffff', text:'#123b2c', muted:'#527568', accent:'#087f5b', accent2:'#b58b32', border:'#ccebd9', deep:'#064e3b', soft:'#dcfce7' },
    christmas: { bg:'#f0faf4', surface:'#ffffff', text:'#17382b', muted:'#587366', accent:'#16804a', accent2:'#b42332', border:'#cfe8d7', deep:'#14532d', soft:'#dcfce7' },
    tricolour: { bg:'#fffaf1', surface:'#ffffff', text:'#24364a', muted:'#607080', accent:'#e87522', accent2:'#16804a', border:'#e5dfd2', deep:'#173b63', soft:'#e8f5e9' },
    saffron: { bg:'#fff8ef', surface:'#fffdf8', text:'#3c2b1c', muted:'#78634d', accent:'#e87522', accent2:'#16804a', border:'#f0ddc5', deep:'#8a3d12', soft:'#ffedd5' },
    indigo: { bg:'#f3f2ff', surface:'#ffffff', text:'#25234b', muted:'#66658c', accent:'#5145cd', accent2:'#c28b2c', border:'#dcd9f5', deep:'#312e81', soft:'#e9e7ff' },
    lotus: { bg:'#fff4f8', surface:'#ffffff', text:'#46273a', muted:'#806174', accent:'#c04c83', accent2:'#0f8b72', border:'#f1d5e4', deep:'#831843', soft:'#fce7f3' },
    newyear: { bg:'#f2f7ff', surface:'#ffffff', text:'#172b4d', muted:'#5b6d83', accent:'#3456c7', accent2:'#0f8b72', border:'#dce6f2', deep:'#172554', soft:'#e0e7ff' }
  };

  function indiaNow() {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone:'Asia/Kolkata', year:'numeric', month:'2-digit', day:'2-digit',
      hour:'2-digit', minute:'2-digit', weekday:'long', hourCycle:'h23'
    }).formatToParts(new Date());
    const p = Object.fromEntries(parts.map(x => [x.type, x.value]));
    return { year:+p.year, month:+p.month, day:+p.day, hour:+p.hour, minute:+p.minute,
      weekday:p.weekday, date:p.year+'-'+p.month+'-'+p.day };
  }

  function applyTheme(now, festival) {
    const period = now.hour >= 5 && now.hour < 17 ? 'day' : now.hour >= 17 && now.hour < 21 ? 'evening' : 'night';
    const palette = PALETTES[festival ? festival.palette : period] || PALETTES.day;
    const root = document.documentElement;
    root.dataset.vikashTheme = festival ? festival.palette : period;
    root.style.colorScheme = period === 'night' && !festival ? 'dark' : 'light';
    const set = (k,v) => root.style.setProperty(k,v);
    set('--vx-bg',palette.bg); set('--vx-surface',palette.surface); set('--vx-text',palette.text);
    set('--vx-muted',palette.muted); set('--vx-accent',palette.accent); set('--vx-accent2',palette.accent2);
    set('--vx-border',palette.border); set('--vx-deep',palette.deep); set('--vx-soft',palette.soft);

    /* Shared design tokens used by the individual sites. */
    set('--bg',palette.bg); set('--bg2',palette.surface); set('--bg3',palette.soft); set('--bg4',palette.soft); set('--surf',palette.surface); set('--surf2',palette.soft); ['--white','--surface','--card-bg'].forEach(k=>set(k,palette.surface));
    ['--txt','--ink','--brown'].forEach(k=>set(k,palette.text)); set('--cream',palette.bg); set('--navy',palette.deep);
    ['--txt2','--txt3','--muted','--slate'].forEach(k=>set(k,palette.muted));
    ['--blue','--blue2','--accent','--saffron','--orange'].forEach(k=>set(k,palette.accent));
    ['--blue3','--teal','--accent2','--green','--jade'].forEach(k=>set(k,palette.accent2));
    ['--bdr','--bdr2','--border','--line','--rule','--steel'].forEach(k=>set(k,palette.border));
    ['--soft','--ice','--tint','--warm','--bg4'].forEach(k=>set(k,palette.soft));
    if (period === 'night' && !festival) {
      set('--bg',palette.bg); set('--bg2',palette.surface); set('--bg3','#1d3049');
      set('--cream',palette.bg); set('--white',palette.surface); set('--card-bg',palette.surface);
      set('--surf',palette.surface); set('--surface',palette.surface);
    }
  }

  function greeting(now) {
    if (now.hour >= 5 && now.hour < 12) return 'Good morning';
    if (now.hour >= 12 && now.hour < 17) return 'Good afternoon';
    if (now.hour >= 17 && now.hour < 21) return 'Good evening';
    return 'Good night';
  }

  function createPopup(now, festival) {
    if (document.getElementById('vx-shared-greeting')) return;
    const key = 'vx_greeting_seen_' + location.pathname + '_' + now.date;
    try { if (localStorage.getItem(key)) return; } catch (_) {}
    const title = festival ? 'Happy ' + festival.name + '!' : greeting(now) + '!';
    const subtitle = 'Happy ' + now.weekday + ' · ' + now.date.split('-').reverse().join('/');
    const overlay = document.createElement('div');
    overlay.id = 'vx-shared-greeting';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-labelledby','vx-shared-title');
    overlay.innerHTML = '<div class="vx-greeting-card"><button class="vx-greeting-close" type="button" aria-label="Close">×</button><div class="vx-greeting-icon">'+(festival?festival.icon:(now.hour>=5&&now.hour<12?'☀️':now.hour<17?'🌤️':now.hour<21?'🌇':'🌙'))+'</div><div class="vx-greeting-kicker">A message from this website</div><h2 id="vx-shared-title"></h2><p class="vx-greeting-day"></p><p class="vx-greeting-copy"></p><button class="vx-greeting-ok" type="button">Continue</button></div>';
    const style = document.createElement('style');
    style.id = 'vx-shared-greeting-style';
    style.textContent = '#vx-shared-greeting{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:18px;background:rgba(7,16,30,.62);backdrop-filter:blur(7px)}.vx-greeting-card{position:relative;width:min(100%,420px);padding:32px 26px 26px;text-align:center;border-radius:24px;background:var(--vx-surface,#fff);color:var(--vx-text,#172b4d);border:1px solid var(--vx-border);box-shadow:0 24px 80px #0004;font-family:inherit}.vx-greeting-icon{font-size:42px;margin-bottom:10px}.vx-greeting-kicker{font-size:11px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:var(--vx-accent)}.vx-greeting-card h2{font-size:clamp(25px,6vw,32px);line-height:1.15;margin:10px 24px 8px;color:var(--vx-text)}.vx-greeting-day{font-weight:750;color:var(--vx-accent2);margin:0 0 12px}.vx-greeting-copy{color:var(--vx-muted);line-height:1.65;margin:0 0 22px}.vx-greeting-ok{border:0;border-radius:999px;padding:12px 28px;background:var(--vx-accent);color:#fff;font-weight:800;cursor:pointer}.vx-greeting-close{position:absolute;right:12px;top:10px;border:0;background:transparent;color:var(--vx-muted);font-size:28px;cursor:pointer}';
    document.head.appendChild(style);
    overlay.querySelector('#vx-shared-title').textContent = title;
    overlay.querySelector('.vx-greeting-day').textContent = subtitle;
    overlay.querySelector('.vx-greeting-copy').textContent = festival
      ? 'Wishing you and your family happiness, peace and new beginnings.'
      : 'Wishing you a positive day. Explore the latest updates and services on this website.';
    const close = () => { overlay.remove(); try { localStorage.setItem(key,'1'); } catch (_) {} };
    overlay.querySelectorAll('button').forEach(b=>b.addEventListener('click',close));
    overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
    document.body.appendChild(overlay);
  }

  function updateExistingPopup(now, festival) {
    const title = document.querySelector('#tasteHubPromoTitle, #dc-morning-title, #greeting-title, #dt-popup-title, .dt-popup-title');
    if (!title) return;
    const old = title.dataset.vxOriginal || title.textContent.trim();
    if (!title.dataset.vxOriginal) title.dataset.vxOriginal = old;
    const nextTitle = festival ? 'Happy ' + festival.name + '!' : greeting(now) + '!';
    if (title.textContent !== nextTitle) title.textContent = nextTitle;
    const day = 'Happy ' + now.weekday + ' · ' + now.date.split('-').reverse().join('/');
    const line = document.querySelector('#tasteHubGreetingLine, #greeting-message, #dc-greeting-message, #dt-popup-sub');
    if (line) {
      if (!line.dataset.vxOriginal) line.dataset.vxOriginal = line.textContent;
      const nextLine = day + ' — ' + line.dataset.vxOriginal;
      if (line.textContent !== nextLine) line.textContent = nextLine;
    }
    const icon = document.querySelector('#tasteHubGreetingIcon, #dc-greeting-icon, .dt-popup-icon');
    if (icon && festival && icon.textContent !== festival.icon) icon.textContent = festival.icon;
  }

  function init() {
    const now = indiaNow();
    const festival = FESTIVALS[now.date] || null;
    applyTheme(now, festival);
    window.setInterval(() => { const current = indiaNow(); applyTheme(current, FESTIVALS[current.date] || null); }, 10 * 60 * 1000);

    const hasExistingGreeting = !!document.querySelector(
      '#dc-morning-popup, #tasteHubPromo, #greeting-backdrop, #dt-popup-backdrop'
    );
    if (hasExistingGreeting) {
      updateExistingPopup(now, festival);
      const observer = new MutationObserver(() => updateExistingPopup(now, festival));
      observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','style']});
      window.setTimeout(()=>observer.disconnect(),12000);
    } else {
      window.setTimeout(()=>createPopup(now,festival),850);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
/* ===== TurkDrive – shared script ===== */
const RATE_USD = 40; // 1 USD = 40 TRY (عدّل السعر حسب الحاجة)
let currency = localStorage.getItem('td_cur') || 'TRY';
const translations = {
  'TurkDrive | تأجير السيارات في تركيا': ['TurkDrive | Araç Kiralama', 'TurkDrive | Car Rental in Turkey'],
  'حجز سيارة | TurkDrive': ['Araç Kiralama | TurkDrive', 'Book a Car | TurkDrive'],
  'اللغة': ['Dil', 'Language'],
  'صورة 1': ['Görsel 1', 'Image 1'],
  'صورة 2': ['Görsel 2', 'Image 2'],
  'صورة 3': ['Görsel 3', 'Image 3'],
  'صورة 4': ['Görsel 4', 'Image 4'],
  'صورة سيارة BMW Series 5': ['BMW 5 Serisi araç fotoğrafı', 'BMW Series 5 car photo'],
  'صورة سيارة Mercedes C-Class': ['Mercedes C-Serisi araç fotoğrafı', 'Mercedes C-Class car photo'],
  'صورة سيارة Hyundai Tucson': ['Hyundai Tucson araç fotoğrafı', 'Hyundai Tucson car photo'],
  'صورة سيارة Renault Megane': ['Renault Megane araç fotoğrafı', 'Renault Megane car photo'],
  'الرئيسية': ['Ana Sayfa', 'Home'],
  'أسطول السيارات': ['Araç Filosu', 'Our Fleet'],
  'من نحن': ['Hakkımızda', 'About Us'],
  'اتصل بنا': ['İletişim', 'Contact'],
  'حسابي': ['Hesabım', 'My account'],
  'القائمة': ['Menü', 'Menu'],
  'الخدمة الأولى لتأجير السيارات الفاخرة في تركيا': ['Türkiye’de lüks araç kiralamada bir numara', 'Turkey’s premier luxury car rental service'],
  'استأجر سيارتك المثالية في تركيا بكل سهولة وأمان': ['Türkiye’de hayalinizdeki aracı kolayca ve güvenle kiralayın', 'Rent your ideal car in Turkey with ease and confidence'],
  'نقدم لك أسطولاً متنوعاً من أحدث السيارات مع تأمين شامل، دعم فني على مدار الساعة، وتوصيل مجاني للمطارات الرئيسية.': ['Kapsamlı sigorta, 7/24 destek ve büyük havalimanlarına ücretsiz teslimat ile en yeni araçlardan oluşan geniş filomuzdan yararlanın.', 'Choose from our diverse fleet of the latest cars, with comprehensive insurance, 24/7 support, and free delivery to major airports.'],
  'مكان الاستلام والتسليم': ['Alış ve teslim noktası', 'Pick-up and drop-off location'],
  'مطار إسطنبول (IST)': ['İstanbul Havalimanı (IST)', 'Istanbul Airport (IST)'],
  'مطار صبيحة (SAW)': ['Sabiha Gökçen Havalimanı (SAW)', 'Sabiha Gökçen Airport (SAW)'],
  'مطار أنطاليا (AYT)': ['Antalya Havalimanı (AYT)', 'Antalya Airport (AYT)'],
  'مطار أنقرة (ESB)': ['Ankara Havalimanı (ESB)', 'Ankara Airport (ESB)'],
  'تواريخ الإيجار': ['Kiralama tarihleri', 'Rental dates'],
  '١٢ أكتوبر - ١٩ أكتوبر': ['12 Ekim - 19 Ekim', 'October 12 - October 19'],
  'فئة السيارة': ['Araç kategorisi', 'Car category'],
  'جميع الفئات (SUV, Sedan)': ['Tüm kategoriler (SUV, Sedan)', 'All categories (SUV, Sedan)'],
  'فاخرة': ['Lüks', 'Luxury'],
  'عائلية SUV': ['Aile SUV', 'Family SUV'],
  'اقتصادية': ['Ekonomik', 'Economy'],
  'ابحث عن سيارة': ['Araç ara', 'Find a car'],
  'لماذا تختارنا؟': ['Neden biz?', 'Why choose us?'],
  'معايير عالمية لتجربة قيادة استثنائية': ['Olağanüstü bir sürüş deneyimi için dünya standartları', 'World-class standards for an exceptional driving experience'],
  'تأمين شامل 100%': ['%100 kapsamlı sigorta', '100% comprehensive insurance'],
  'تأمين ضد الحوادث والسرقة يضمن لك راحة البال طوال فترة رحلتك في كافة المدن التركية.': ['Kaza ve hırsızlığa karşı sigorta ile Türkiye’nin tüm şehirlerindeki yolculuğunuz boyunca içiniz rahat olsun.', 'Accident and theft coverage gives you peace of mind throughout your trip in every Turkish city.'],
  'خدمة عملاء 24/7': ['7/24 müşteri hizmetleri', '24/7 customer service'],
  'دعم فني متواصل بلغتك العربية والإنجليزية والتركية لمساعدتك في أي وقت وأي مكان.': ['Her zaman, her yerde size yardımcı olmak için Arapça, İngilizce ve Türkçe kesintisiz destek.', 'Round-the-clock support in Arabic, English, and Turkish, wherever you are.'],
  'بدون رسوم خفية': ['Gizli ücret yok', 'No hidden fees'],
  'شفافية كاملة في الأسعار، ما تشاهده في موقعنا هو ما تدفعه بالضبط دون أي تكاليف إضافية مفاجئة.': ['Fiyatlarımız tamamen şeffaftır; sitemizde gördüğünüz tutar, sürpriz ek ücret olmadan ödeyeceğiniz tutardır.', 'Our pricing is fully transparent: what you see on our website is exactly what you pay, with no surprise charges.'],
  'استلام من المطار': ['Havalimanından teslim alma', 'Airport pick-up'],
  'سنكون بانتظارك فور وصولك في كافة مطارات تركيا الرئيسية لتسليمك السيارة بسرعة وسهولة.': ['Aracınızı hızlı ve kolayca teslim etmek için Türkiye’nin tüm büyük havalimanlarında varışınızda sizi bekliyor olacağız.', 'We’ll be waiting for you at all major airports in Turkey to hand over your car quickly and easily.'],
  'أبرز السيارات المتاحة للإيجار': ['Kiralanabilir öne çıkan araçlar', 'Featured cars available for rent'],
  'الكل': ['Tümü', 'All'],
  'رجال أعمال': ['Premium', 'Executive'],
  'أوتوماتيك': ['Otomatik', 'Automatic'],
  'بنزين': ['Benzin', 'Petrol'],
  'ديزل': ['Dizel', 'Diesel'],
  '5 مقاعد': ['5 koltuk', '5 seats'],
  '/ يوم': ['/ gün', '/ day'],
  'احجز الآن': ['Hemen kirala', 'Book now'],
  'آراء العملاء': ['Müşteri yorumları', 'Customer reviews'],
  'تجربتهم معنا في تركيا': ['Türkiye’de bizimle yaşadıkları deneyim', 'Their experience with us in Turkey'],
  '"تجربة رائعة جداً! استلمت السيارة من مطار صبيحة في أفضل حالة، وكانت نظيفة تماماً وفي أفضل حالة. التعامل كان احترافي والموظف كان بانتظارنا في الوقت المحدد."': ['“Harika bir deneyimdi! Aracı Sabiha Gökçen Havalimanı’nda mükemmel ve tertemiz durumda teslim aldım. Hizmet profesyoneldi ve görevli tam zamanında bizi bekliyordu.”', '“A great experience! I picked up the car in excellent, spotless condition at Sabiha Gökçen Airport. The service was professional, and the staff member was waiting right on time.”'],
  'أحمد عبدالله': ['Ahmed Abdullah', 'Ahmed Abdullah'],
  'أ.ع': ['A.A', 'A.A'],
  'السعودية، الرياض': ['Suudi Arabistan, Riyad', 'Saudi Arabia, Riyadh'],
  '"الأسعار واضحة تماماً بدون أي رسوم مخفية كما وعدونا. قمت باستئجار هيونداي توسان لرحلة عائلية إلى طرابزون وكانت السيارة ممتازة جداً في المرتفعات."': ['“Fiyatlar söylendiği gibi tamamen şeffaf ve gizli ücret yok. Trabzon’a aile gezimiz için Hyundai Tucson kiraladım; araç dağ yollarında mükemmeldi.”', '“The prices were completely transparent, with no hidden fees as promised. I rented a Hyundai Tucson for a family trip to Trabzon, and it was excellent on the mountain roads.”'],
  'محمد رجب': ['Mehmet Recep', 'Mohammed Ragab'],
  'م.ر': ['M.R', 'M.R'],
  'الإمارات، دبي': ['BAE, Dubai', 'UAE, Dubai'],
  '"خدمة العملاء متواجدون على مدار الساعة، واجهت استفساراً بسيطاً وتم الرد خلال دقائق. أنصح بشدة بالتعامل مع TurkDrive لكل زائر لتركيا."': ['“Müşteri hizmetleri günün her saati ulaşılabilir. Küçük bir sorum oldu ve dakikalar içinde yanıt aldım. Türkiye’yi ziyaret eden herkese TurkDrive’ı kesinlikle tavsiye ederim.”', '“Customer service is available around the clock. I had a quick question and got a reply within minutes. I highly recommend TurkDrive to anyone visiting Turkey.”'],
  'سارة كمال': ['Sara Kamal', 'Sarah Kamal'],
  'س.ك': ['S.K', 'S.K'],
  'قطر، الدوحة': ['Katar, Doha', 'Qatar, Doha'],
  'جاهز لبدء رحلتك في تركيا؟': ['Türkiye yolculuğunuza başlamaya hazır mısınız?', 'Ready to start your journey in Turkey?'],
  'احجز سيارتك الآن واحصل على خصم 15% على إجمالي حجزك الأول مع توصيل مجاني للمطار.': ['Aracınızı şimdi kiralayın, ilk rezervasyonunuzda toplam tutar üzerinden %15 indirim ve ücretsiz havalimanı teslimatı kazanın.', 'Book your car now and get 15% off your first booking, plus free airport delivery.'],
  'تصفح الأسطول': ['Filoyu keşfet', 'Browse the fleet'],
  '© TurkDrive 2024. جميع الحقوق محفوظة.': ['© TurkDrive 2024. Tüm hakları saklıdır.', '© TurkDrive 2024. All rights reserved.'],
  'سياسة الخصوصية': ['Gizlilik politikası', 'Privacy policy'],
  'الشروط والأحكام': ['Şartlar ve koşullar', 'Terms and conditions'],
  'حجز مباشر': ['Doğrudan rezervasyon', 'Direct booking'],
  '• إسطنبول، مطار إسطنبول (IST)': ['• İstanbul, İstanbul Havalimanı (IST)', '• Istanbul, Istanbul Airport (IST)'],
  'مرسيدس-بنز C200 الفاخرة': ['Lüks Mercedes-Benz C200', 'Mercedes-Benz C200 Luxury'],
  'BMW Series 5 الفاخرة': ['Lüks BMW 5 Serisi', 'BMW 5 Series Luxury'],
  'هيونداي توسان SUV': ['Hyundai Tucson SUV', 'Hyundai Tucson SUV'],
  'رينو ميغان الاقتصادية': ['Ekonomik Renault Megane', 'Renault Megane Economy'],
  'أكمل بياناتك لحجز سيارة الأحلام بكل سهولة وبدون دفع مسبق.': ['Hayalinizdeki aracı kolayca ve ön ödeme yapmadan kiralamak için bilgilerinizi tamamlayın.', 'Complete your details to book your dream car easily, with no upfront payment.'],
  'ضمان أفضل سعر': ['En iyi fiyat garantisi', 'Best price guarantee'],
  'بدون رسوم إلغاء': ['İptal ücreti yok', 'No cancellation fees'],
  'متاح فوراً للاستلام': ['Hemen teslim alınabilir', 'Available for immediate pick-up'],
  'مواصفات السيارة': ['Araç özellikleri', 'Car specifications'],
  'المقاعد': ['Koltuklar', 'Seats'],
  'مقاعد جلدية فاخرة': ['Premium deri koltuklar', 'Premium leather seats'],
  'التكييف': ['Klima', 'Air conditioning'],
  'مكيف هواء رقمي': ['Dijital klima', 'Digital climate control'],
  'الملاحة': ['Navigasyon', 'Navigation'],
  'نظام GPS متطور': ['Gelişmiş GPS sistemi', 'Advanced GPS system'],
  'الرؤية': ['Görüş', 'Visibility'],
  'كاميرا خلفية °360': ['360° arka görüş kamerası', '360° rear-view camera'],
  'بحاجة للمساعدة في الحجز؟': ['Rezervasyon için yardıma mı ihtiyacınız var?', 'Need help with your booking?'],
  'فريق خدمة العملاء جاهز للإجابة على استفساراتكم عبر الواتساب على مدار الساعة.': ['Müşteri hizmetleri ekibimiz WhatsApp üzerinden sorularınızı yanıtlamak için 7/24 hazır.', 'Our customer support team is available 24/7 on WhatsApp to answer your questions.'],
  'تواصل عبر واتساب': ['WhatsApp üzerinden iletişim', 'Contact us on WhatsApp'],
  'معلومات المستأجر': ['Kiracı bilgileri', 'Renter information'],
  'الاسم الكامل (حسب الرخصة)': ['Ad soyad (ehliyetteki gibi)', 'Full name (as shown on licence)'],
  'مثال: أحمد محمد أحمد': ['Örnek: Ahmet Mehmet Yılmaz', 'Example: Alex Morgan'],
  'البريد الإلكتروني': ['E-posta adresi', 'Email address'],
  'رقم الهاتف': ['Telefon numarası', 'Phone number'],
  'رقم رخصة القيادة / جواز السفر': ['Ehliyet / pasaport numarası', 'Driver’s licence / passport number'],
  'رقم الهوية أو الوثيقة الرسمية': ['Kimlik veya resmi belge numarası', 'ID or official document number'],
  'ملاحظات إضافية (اختياري)': ['Ek notlar (isteğe bağlı)', 'Additional notes (optional)'],
  'مثال: طلب مقعد أطفال، سائق إضافي، أو وقت استلام محدد...': ['Örnek: çocuk koltuğu, ek sürücü veya belirli bir teslim alma saati...', 'Example: child seat, additional driver, or a specific pick-up time...'],
  'سعر اليوم (مرسيدس C200)': ['Günlük fiyat (Mercedes C200)', 'Daily rate (Mercedes C200)'],
  'عدد الأيام': ['Gün sayısı', 'Number of days'],
  'رسوم التأمين الشامل': ['Kapsamlı sigorta ücreti', 'Comprehensive insurance fee'],
  'مجاناً': ['Ücretsiz', 'Free'],
  'ضريبة القيمة المضافة (%20)': ['KDV (%20)', 'VAT (20%)'],
  'الإجمالي الكلي': ['Genel toplam', 'Grand total'],
  'تأكيد الحجز والدفع لاحقاً عند الاستلام': ['Rezervasyonu onayla, teslim alırken öde', 'Confirm booking and pay on pick-up'],
  'حجز آمن 100% - لا يتطلب بطاقة ائتمانية لإتمام الحجز': ['%100 güvenli rezervasyon - rezervasyon için kredi kartı gerekmez', '100% secure booking - no credit card required to book'],
  '✓ تم تأكيد الحجز بنجاح! سنتواصل معك قريباً.': ['✓ Rezervasyonunuz onaylandı! Yakında sizinle iletişime geçeceğiz.', '✓ Booking confirmed! We’ll be in touch soon.'],
  'يرجى إكمال الحقول المطلوبة بشكل صحيح': ['Lütfen gerekli alanları doğru şekilde doldurun', 'Please complete the required fields correctly']
};

let language = ['ar', 'tr', 'en'].includes(localStorage.getItem('td_lang'))
  ? localStorage.getItem('td_lang')
  : 'ar';

function translate(value) {
  const entry = translations[value];
  return language === 'ar' || !entry ? value : entry[language === 'tr' ? 0 : 1];
}

const textNodes = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (textWalker.nextNode()) {
  const node = textWalker.currentNode;
  if (node.nodeValue.trim()) textNodes.push({ node, source: node.nodeValue });
}
const translatableAttributes = [];
const sourceTitle = document.title;
document.querySelectorAll('[placeholder], [aria-label]').forEach(el => {
  ['placeholder', 'aria-label'].forEach(attribute => {
    if (el.hasAttribute(attribute)) {
      translatableAttributes.push({ el, attribute, source: el.getAttribute(attribute) });
    }
  });
});
document.querySelectorAll('input[value]').forEach(el => {
  translatableAttributes.push({ el, attribute: 'value', source: el.value });
});

function renderLanguage() {
  const isArabic = language === 'ar';
  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  textNodes.forEach(({ node, source }) => {
    const leading = source.match(/^\s*/)[0];
    const trailing = source.match(/\s*$/)[0];
    const value = source.trim();
    node.nodeValue = leading + translate(value) + trailing;
  });
  translatableAttributes.forEach(({ el, attribute, source }) => {
    el.setAttribute(attribute, translate(source));
  });
  document.querySelectorAll('.language-select').forEach(select => {
    select.value = language;
  });
  document.title = translate(sourceTitle);
}

document.querySelectorAll('.language-select').forEach(select =>
  select.addEventListener('change', () => {
    language = select.value;
    localStorage.setItem('td_lang', language);
    renderLanguage();
    if (window.updateCarTitle) window.updateCarTitle();
    renderPrices();
  }));

const fmt = (tryVal) => currency === 'USD'
  ? '$ ' + Math.round(tryVal / RATE_USD).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')
  : '₺ ' + Math.round(tryVal).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US');

function renderPrices() {
  document.querySelectorAll('[data-try]').forEach(el => {
    el.textContent = fmt(+el.dataset.try);
  });
  document.querySelectorAll('.currency button').forEach(b =>
    b.classList.toggle('on', b.dataset.cur === currency));
  if (window.updateTotal) window.updateTotal();
}

document.querySelectorAll('.currency button').forEach(b =>
  b.addEventListener('click', () => {
    currency = b.dataset.cur;
    localStorage.setItem('td_cur', currency);
    renderPrices();
  }));

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => nav.classList.remove('open'))
  );
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuBtn.contains(event.target)) {
      nav.classList.remove('open');
    }
  });
}

// Toast
function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

/* ---------- Home: fleet filter + search ---------- */
document.querySelectorAll('.tab').forEach(tab =>
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
    tab.classList.add('on');
    const f = tab.dataset.filter;
    document.querySelectorAll('.car-card').forEach(c =>
      c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f));
  }));

const searchBtn = document.getElementById('searchBtn');
if (searchBtn) searchBtn.addEventListener('click', () => {
  document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' });
  const cat = document.getElementById('catSelect').value;
  const tab = document.querySelector(`.tab[data-filter="${cat}"]`) ||
              document.querySelector('.tab[data-filter="all"]');
  tab.click();
});

/* ---------- Booking page ---------- */
const form = document.getElementById('bookingForm');
if (form) {
  const CARS = {
    mercedes: { name: 'مرسيدس-بنز C200 الفاخرة', price: 2500, g: 'g3', image: 'images/cars/mercedes.jpg' },
    bmw:      { name: 'BMW Series 5 الفاخرة',     price: 3500, g: 'g4', image: 'images/cars/bmw.jpg' },
    hyundai:  { name: 'هيونداي توسان SUV',        price: 2200, g: 'g2', image: 'images/cars/hyundai.jpg' },
    renault:  { name: 'رينو ميغان الاقتصادية',    price: 1400, g: 'g1', image: 'images/cars/renault.jpg' },
  };
  const key = new URLSearchParams(location.search).get('car') || 'mercedes';
  const car = CARS[key] || CARS.mercedes;

  window.updateCarTitle = () => {
    document.getElementById('carTitle').textContent = translate(car.name);
  };
  window.updateCarTitle();
  document.getElementById('dayPrice').dataset.try = car.price;
  document.querySelectorAll('.main-view,.thumb').forEach((el, i) => {
    if (el.classList.contains('main-view')) el.className = 'main-view ' + car.g;
  });
  const galleryImages = [...new Set([car.image, ...Object.values(CARS).map(item => item.image)])];
  const mainView = document.querySelector('.main-view');
  mainView.style.backgroundImage = `url("${car.image}")`;
  document.querySelectorAll('.thumb').forEach((thumb, index) => {
    thumb.dataset.img = galleryImages[index % galleryImages.length];
    thumb.style.backgroundImage = `url("${thumb.dataset.img}")`;
  });

  let days = 3;
  const VAT = 0.20;
  const daysEl = document.getElementById('days');

  window.updateTotal = () => {
    const sub = car.price * days;
    const vat = sub * VAT;
    document.getElementById('vat').textContent = fmt(vat);
    document.getElementById('total').textContent = fmt(sub + vat);
  };

  document.getElementById('plus').addEventListener('click', () => {
    if (days < 30) days++; daysEl.textContent = days; updateTotal();
  });
  document.getElementById('minus').addEventListener('click', () => {
    if (days > 1) days--; daysEl.textContent = days; updateTotal();
  });

  // Gallery
  const main = document.querySelector('.main-view');
  document.querySelectorAll('.thumb').forEach(t =>
    t.addEventListener('click', () => {
      document.querySelectorAll('.thumb').forEach(x => x.classList.remove('on'));
      t.classList.add('on');
      main.style.filter = `hue-rotate(${t.dataset.hue || 0}deg)`;
      if (t.dataset.img) main.style.backgroundImage = `url("${t.dataset.img}")`;
    }));

  // Validation
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(i => {
      const bad = !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value));
      i.classList.toggle('err', bad);
      if (bad) ok = false;
    });
    toast(translate(ok ? '✓ تم تأكيد الحجز بنجاح! سنتواصل معك قريباً.' : 'يرجى إكمال الحقول المطلوبة بشكل صحيح'));
  });
  form.addEventListener('input', e => e.target.classList.remove('err'));
}

renderLanguage();
renderPrices();

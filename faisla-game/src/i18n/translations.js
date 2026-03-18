/**
 * UI translations for Faisla Game.
 * Keys are used throughout the app via useT() hook.
 */

export const translations = {
  'en-IN': {
    // Nav
    nav_home: 'Home',
    nav_play: 'Play',
    nav_learn: 'Learn',

    // Home
    home_badge: "India's Farmer Decision Game",
    home_h1: 'Survive the Season.',
    home_h2: 'Keep your farm out of debt.',
    home_desc: 'Every swipe is a real decision Indian farmers face — loans, insurance, mandi prices, government schemes, and more. Can you balance all four pillars for a full year?',
    home_cta: '🚜 Start New Season',
    home_schemes_title: 'Real Govt Schemes in the Game',

    // Features
    feat_swipe_title: 'Binary Choices',
    feat_swipe_desc: 'Swipe left or right on loans, insurance, mandi rates, and more.',
    feat_pillars_title: 'Four Pillars',
    feat_pillars_desc: 'Balance Family, Crops, Finance, and Resilience each season.',
    feat_offline_title: 'Offline-First',
    feat_offline_desc: 'Works without internet. Add to Home Screen for app feel.',
    feat_real_title: 'Real Scenarios',
    feat_real_desc: 'Based on actual financial decisions rural farmers face daily.',

    // Schemes
    scheme_kcc_name: 'KCC – Kisan Credit Card',
    scheme_kcc_desc: 'Low-interest crop loans for farmers',
    scheme_pmfby_name: 'PMFBY Insurance',
    scheme_pmfby_desc: 'Pradhan Mantri Fasal Bima Yojana',
    scheme_pmkisan_name: 'PM-KISAN',
    scheme_pmkisan_desc: '₹6,000/year direct income support',
    scheme_enam_name: 'e-NAM Mandi',
    scheme_enam_desc: 'Online national agriculture market',
    scheme_shg_name: 'SHG Loans',
    scheme_shg_desc: 'Self Help Group micro-credit access',
    scheme_soil_name: 'Soil Health Card',
    scheme_soil_desc: 'Free soil testing and crop advice',

    // Play screen
    play_season: 'Season',
    play_day: 'Day',
    play_balance: 'Keep family, field, money, and safety in balance.',
    play_best: 'Best',
    play_try_again: '🔄 Try Again',
    play_game_over: 'Game Over',
    play_season_complete: 'Season Complete!',
    play_this_run: 'This run',
    play_best_run: 'Best run',

    // Loss reasons
    loss_family: 'Your family welfare dropped to zero — stress and hardship forced you to stop.',
    loss_crops: 'Your crops failed completely — the field could not sustain another season.',
    loss_finance: 'Your finances collapsed — debt and cash flow left the farm insolvent.',
    loss_resilience: 'Your resilience ran out — repeated shocks left you unable to recover.',
    loss_year: 'You completed a full farming year. Few farmers manage such balance.',
    loss_default: 'Your farm could not continue this season.',

    // Season phases
    phase_pre_sowing: 'Pre-Sowing',
    phase_sowing: 'Sowing',
    phase_growing: 'Growing',
    phase_harvest: 'Harvest',
    phase_off_season: 'Off-Season',

    // Card choices
    card_swipe_left: '← LEFT',
    card_swipe_right: 'RIGHT →',

    // Learn screen
    learn_title: 'How Faisla works',
    learn_subtitle: 'A simulation of real farmer decisions across one agricultural year.',
    learn_pillars_title: 'The Four Pillars',
    learn_p1: 'You play as a small Indian farmer across one agricultural year.',
    learn_p2: 'Each card is a real decision: loan offers, insurance, mandi prices, fraud calls, and more.',
    learn_p3: 'Every swipe changes four pillars: Family Welfare, Crop Health, Financial Standing, and Risk Resilience.',
    learn_p4: 'If any pillar collapses, the season ends — but you keep the learning, not the loss.',
    learn_p5: 'Fully offline-first. Your progress is saved locally. No account needed.',
    learn_p6: 'Scenarios are based on real government schemes like KCC, PMFBY, PM-KISAN, and e-NAM.',
    pillar_family_label: 'Family Welfare',
    pillar_family_desc: 'Health, happiness, and social stability',
    pillar_crops_label: 'Crop Health',
    pillar_crops_desc: 'Soil, seeds, and harvest quality',
    pillar_finance_label: 'Financial Standing',
    pillar_finance_desc: 'Cash flow, debt, and savings',
    pillar_resilience_label: 'Risk Resilience',
    pillar_resilience_desc: 'Ability to absorb shocks and recover',
  },

  'hi-IN': {
    // Nav
    nav_home: 'होम',
    nav_play: 'खेलें',
    nav_learn: 'सीखें',

    // Home
    home_badge: 'भारत का किसान निर्णय खेल',
    home_h1: 'मौसम में टिके रहो।',
    home_h2: 'खेत को कर्ज़ से बचाओ।',
    home_desc: 'हर स्वाइप एक असली फैसला है जो भारतीय किसान रोज़ लेते हैं — कर्ज़, बीमा, मंडी भाव, सरकारी योजनाएं और भी बहुत कुछ। क्या आप पूरे साल चारों स्तंभों को संतुलित रख सकते हैं?',
    home_cta: '🚜 नया मौसम शुरू करें',
    home_schemes_title: 'खेल में असली सरकारी योजनाएं',

    // Features
    feat_swipe_title: 'दो विकल्प',
    feat_swipe_desc: 'कर्ज़, बीमा, मंडी दर और अन्य पर बाएं या दाएं स्वाइप करें।',
    feat_pillars_title: 'चार स्तंभ',
    feat_pillars_desc: 'हर मौसम में परिवार, फसल, वित्त और लचीलापन संतुलित रखें।',
    feat_offline_title: 'ऑफलाइन-फर्स्ट',
    feat_offline_desc: 'बिना इंटरनेट के काम करता है। होम स्क्रीन पर जोड़ें।',
    feat_real_title: 'असली परिदृश्य',
    feat_real_desc: 'ग्रामीण किसानों के वास्तविक वित्तीय फैसलों पर आधारित।',

    // Schemes
    scheme_kcc_name: 'KCC – किसान क्रेडिट कार्ड',
    scheme_kcc_desc: 'किसानों के लिए कम ब्याज पर फसल ऋण',
    scheme_pmfby_name: 'PMFBY बीमा',
    scheme_pmfby_desc: 'प्रधानमंत्री फसल बीमा योजना',
    scheme_pmkisan_name: 'PM-KISAN',
    scheme_pmkisan_desc: '₹6,000/वर्ष प्रत्यक्ष आय सहायता',
    scheme_enam_name: 'e-NAM मंडी',
    scheme_enam_desc: 'ऑनलाइन राष्ट्रीय कृषि बाज़ार',
    scheme_shg_name: 'SHG ऋण',
    scheme_shg_desc: 'स्वयं सहायता समूह माइक्रो-क्रेडिट',
    scheme_soil_name: 'मृदा स्वास्थ्य कार्ड',
    scheme_soil_desc: 'मुफ्त मिट्टी परीक्षण और फसल सलाह',

    // Play screen
    play_season: 'मौसम',
    play_day: 'दिन',
    play_balance: 'परिवार, खेत, पैसा और सुरक्षा को संतुलित रखें।',
    play_best: 'सर्वश्रेष्ठ',
    play_try_again: '🔄 फिर कोशिश करें',
    play_game_over: 'खेल समाप्त',
    play_season_complete: 'मौसम पूरा हुआ!',
    play_this_run: 'यह दौर',
    play_best_run: 'सर्वश्रेष्ठ दौर',

    // Loss reasons
    loss_family: 'आपके परिवार का कल्याण शून्य हो गया — तनाव और कठिनाई ने आपको रोक दिया।',
    loss_crops: 'आपकी फसल पूरी तरह बर्बाद हो गई — खेत अगले मौसम को नहीं झेल सका।',
    loss_finance: 'आपकी वित्तीय स्थिति ढह गई — कर्ज़ और नकदी प्रवाह ने खेत को दिवालिया कर दिया।',
    loss_resilience: 'आपका लचीलापन खत्म हो गया — बार-बार के झटकों से उबरना असंभव हो गया।',
    loss_year: 'आपने पूरा कृषि वर्ष पूरा किया। बहुत कम किसान ऐसा संतुलन बना पाते हैं।',
    loss_default: 'आपका खेत इस मौसम में आगे नहीं चल सका।',

    // Season phases
    phase_pre_sowing: 'बुवाई से पहले',
    phase_sowing: 'बुवाई',
    phase_growing: 'उगाई',
    phase_harvest: 'कटाई',
    phase_off_season: 'ऑफ-सीज़न',

    // Card choices
    card_swipe_left: '← बाएं',
    card_swipe_right: 'दाएं →',

    // Learn screen
    learn_title: 'फैसला कैसे काम करता है',
    learn_subtitle: 'एक कृषि वर्ष में असली किसान फैसलों का अनुकरण।',
    learn_pillars_title: 'चार स्तंभ',
    learn_p1: 'आप एक छोटे भारतीय किसान के रूप में एक कृषि वर्ष खेलते हैं।',
    learn_p2: 'हर कार्ड एक असली फैसला है: कर्ज़ के प्रस्ताव, बीमा, मंडी भाव, धोखाधड़ी कॉल और अधिक।',
    learn_p3: 'हर स्वाइप चार स्तंभों को बदलता है: परिवार कल्याण, फसल स्वास्थ्य, वित्तीय स्थिति और जोखिम लचीलापन।',
    learn_p4: 'यदि कोई भी स्तंभ गिर जाए, मौसम समाप्त होता है — लेकिन आप सीख लेकर जाते हैं।',
    learn_p5: 'पूरी तरह ऑफलाइन-फर्स्ट। आपकी प्रगति स्थानीय रूप से सहेजी जाती है।',
    learn_p6: 'परिदृश्य KCC, PMFBY, PM-KISAN और e-NAM जैसी असली सरकारी योजनाओं पर आधारित हैं।',
    pillar_family_label: 'परिवार कल्याण',
    pillar_family_desc: 'स्वास्थ्य, खुशी और सामाजिक स्थिरता',
    pillar_crops_label: 'फसल स्वास्थ्य',
    pillar_crops_desc: 'मिट्टी, बीज और फसल की गुणवत्ता',
    pillar_finance_label: 'वित्तीय स्थिति',
    pillar_finance_desc: 'नकदी प्रवाह, कर्ज़ और बचत',
    pillar_resilience_label: 'जोखिम लचीलापन',
    pillar_resilience_desc: 'झटकों को झेलने और उबरने की क्षमता',
  },

  'ta-IN': {
    // Nav
    nav_home: 'முகப்பு',
    nav_play: 'விளையாடு',
    nav_learn: 'கற்றுக்கொள்',

    // Home
    home_badge: 'இந்தியாவின் விவசாயி முடிவு விளையாட்டு',
    home_h1: 'பருவத்தில் தப்பிப்பிழை.',
    home_h2: 'உங்கள் பண்ணையை கடனிலிருந்து காப்பாற்றுங்கள்.',
    home_desc: 'ஒவ்வொரு ஸ்வைப்பும் இந்திய விவசாயிகள் எதிர்கொள்ளும் உண்மையான முடிவு — கடன்கள், காப்பீடு, மண்டி விலைகள், அரசு திட்டங்கள் மற்றும் பலவற்றை உள்ளடக்கியது. ஒரு முழு ஆண்டும் நான்கு தூண்களையும் சமநிலைப்படுத்த முடியுமா?',
    home_cta: '🚜 புதிய பருவம் தொடங்கு',
    home_schemes_title: 'விளையாட்டில் உண்மையான அரசு திட்டங்கள்',

    // Features
    feat_swipe_title: 'இரண்டு தேர்வுகள்',
    feat_swipe_desc: 'கடன்கள், காப்பீடு, மண்டி விகிதங்கள் மற்றும் பலவற்றில் இடது அல்லது வலது ஸ்வைப் செய்யுங்கள்.',
    feat_pillars_title: 'நான்கு தூண்கள்',
    feat_pillars_desc: 'ஒவ்வொரு பருவத்திலும் குடும்பம், பயிர்கள், நிதி மற்றும் நெகிழ்ச்சியை சமநிலைப்படுத்துங்கள்.',
    feat_offline_title: 'ஆஃப்லைன்-ஃபர்ஸ்ட்',
    feat_offline_desc: 'இணையம் இல்லாமல் செயல்படுகிறது. முகப்புத் திரையில் சேர்க்கவும்.',
    feat_real_title: 'உண்மையான காட்சிகள்',
    feat_real_desc: 'கிராமப்புற விவசாயிகள் தினமும் எதிர்கொள்ளும் நிதி முடிவுகளை அடிப்படையாகக் கொண்டது.',

    // Schemes
    scheme_kcc_name: 'KCC – கிசான் கிரெடிட் கார்டு',
    scheme_kcc_desc: 'விவசாயிகளுக்கு குறைந்த வட்டியில் பயிர் கடன்கள்',
    scheme_pmfby_name: 'PMFBY காப்பீடு',
    scheme_pmfby_desc: 'பிரதான் மந்திரி பசல் பீமா யோஜனா',
    scheme_pmkisan_name: 'PM-KISAN',
    scheme_pmkisan_desc: '₹6,000/ஆண்டு நேரடி வருமான ஆதரவு',
    scheme_enam_name: 'e-NAM மண்டி',
    scheme_enam_desc: 'ஆன்லைன் தேசிய விவசாய சந்தை',
    scheme_shg_name: 'SHG கடன்கள்',
    scheme_shg_desc: 'சுய உதவி குழு மைக்ரோ-கிரெடிட்',
    scheme_soil_name: 'மண் ஆரோக்கிய அட்டை',
    scheme_soil_desc: 'இலவச மண் பரிசோதனை மற்றும் பயிர் ஆலோசனை',

    // Play screen
    play_season: 'பருவம்',
    play_day: 'நாள்',
    play_balance: 'குடும்பம், வயல், பணம் மற்றும் பாதுகாப்பை சமநிலைப்படுத்துங்கள்.',
    play_best: 'சிறந்தது',
    play_try_again: '🔄 மீண்டும் முயற்சி செய்',
    play_game_over: 'விளையாட்டு முடிந்தது',
    play_season_complete: 'பருவம் முடிந்தது!',
    play_this_run: 'இந்த சுற்று',
    play_best_run: 'சிறந்த சுற்று',

    // Loss reasons
    loss_family: 'உங்கள் குடும்ப நலன் பூஜ்யமாக குறைந்தது — மன அழுத்தம் மற்றும் கஷ்டம் உங்களை நிறுத்தியது.',
    loss_crops: 'உங்கள் பயிர்கள் முழுமையாக தோல்வியடைந்தன — வயல் மற்றொரு பருவத்தை தாங்க முடியவில்லை.',
    loss_finance: 'உங்கள் நிதி நிலை சரிந்தது — கடன் மற்றும் பணப்புழக்கம் பண்ணையை திவாலாக்கியது.',
    loss_resilience: 'உங்கள் நெகிழ்ச்சி தீர்ந்தது — திரும்பத்திரும்ப வரும் அதிர்ச்சிகளிலிருந்து மீள முடியவில்லை.',
    loss_year: 'நீங்கள் ஒரு முழு விவசாய ஆண்டை முடித்தீர்கள். சில விவசாயிகளே இத்தகைய சமநிலையை பராமரிக்கிறார்கள்.',
    loss_default: 'உங்கள் பண்ணை இந்த பருவத்தில் தொடர முடியவில்லை.',

    // Season phases
    phase_pre_sowing: 'விதைப்புக்கு முன்',
    phase_sowing: 'விதைப்பு',
    phase_growing: 'வளர்ச்சி',
    phase_harvest: 'அறுவடை',
    phase_off_season: 'ஆஃப்-சீசன்',

    // Card choices
    card_swipe_left: '← இடது',
    card_swipe_right: 'வலது →',

    // Learn screen
    learn_title: 'ஃபைஸ்லா எப்படி செயல்படுகிறது',
    learn_subtitle: 'ஒரு விவசாய ஆண்டில் உண்மையான விவசாயி முடிவுகளின் உருவகப்படுத்துதல்.',
    learn_pillars_title: 'நான்கு தூண்கள்',
    learn_p1: 'நீங்கள் ஒரு சிறிய இந்திய விவசாயியாக ஒரு விவசாய ஆண்டு விளையாடுகிறீர்கள்.',
    learn_p2: 'ஒவ்வொரு அட்டையும் ஒரு உண்மையான முடிவு: கடன் சலுகைகள், காப்பீடு, மண்டி விலைகள், மோசடி அழைப்புகள் மற்றும் பலவற்றை உள்ளடக்கியது.',
    learn_p3: 'ஒவ்வொரு ஸ்வைப்பும் நான்கு தூண்களை மாற்றுகிறது: குடும்ப நலன், பயிர் ஆரோக்கியம், நிதி நிலை மற்றும் ஆபத்து நெகிழ்ச்சி.',
    learn_p4: 'ஏதேனும் ஒரு தூண் சரிந்தால், பருவம் முடிகிறது — ஆனால் நீங்கள் கற்றுக்கொண்டதை வைத்திருக்கிறீர்கள்.',
    learn_p5: 'முழுமையாக ஆஃப்லைன்-ஃபர்ஸ்ட். உங்கள் முன்னேற்றம் உள்ளூரில் சேமிக்கப்படுகிறது.',
    learn_p6: 'காட்சிகள் KCC, PMFBY, PM-KISAN மற்றும் e-NAM போன்ற உண்மையான அரசு திட்டங்களை அடிப்படையாகக் கொண்டவை.',
    pillar_family_label: 'குடும்ப நலன்',
    pillar_family_desc: 'ஆரோக்கியம், மகிழ்ச்சி மற்றும் சமூக நிலைத்தன்மை',
    pillar_crops_label: 'பயிர் ஆரோக்கியம்',
    pillar_crops_desc: 'மண், விதைகள் மற்றும் அறுவடை தரம்',
    pillar_finance_label: 'நிதி நிலை',
    pillar_finance_desc: 'பணப்புழக்கம், கடன் மற்றும் சேமிப்பு',
    pillar_resilience_label: 'ஆபத்து நெகிழ்ச்சி',
    pillar_resilience_desc: 'அதிர்ச்சிகளை உறிஞ்சி மீளும் திறன்',
  },
}

/** @param {'en-IN'|'hi-IN'|'ta-IN'} lang */
export function t(lang, key) {
  return translations[lang]?.[key] ?? translations['en-IN'][key] ?? key
}

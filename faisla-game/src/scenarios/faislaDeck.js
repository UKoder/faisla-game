// Core Scenario Engine deck for Faisla.
// This stays fully local and is loaded once on app start.

/**
 * @typedef {Object} PillarEffects
 * @property {number} family
 * @property {number} crops
 * @property {number} finance
 * @property {number} resilience
 */

/**
 * @typedef {Object} CardChoice
 * @property {string} label
 * @property {string} description
 */

/**
 * @typedef {Object} FaislaCard
 * @property {string} id
 * @property {'pre_sowing'|'sowing'|'growing'|'harvest'|'off_season'} seasonPhase
 * @property {string} title
 * @property {string} prompt
 * @property {string=} prompt_hi   Hindi translation of prompt
 * @property {string=} prompt_ta   Tamil translation of prompt
 * @property {CardChoice} left
 * @property {CardChoice} right
 * @property {PillarEffects} effectsLeft
 * @property {PillarEffects} effectsRight
 * @property {('elder'|'bank_mitr'|'scammer'|'self')} narrator
 * @property {string[]} tags
 * @property {string=} audioKey
 * @property {boolean=} endGame
 * @property {boolean=} triggerDebtTrap
 */

/** @type {FaislaCard[]} */
export const faislaDeck = [
  {
    id: 'loan_informal_vs_bank',
    seasonPhase: 'pre_sowing',
    title: 'Money for Seeds',
    title_hi: 'बीज के लिए पैसे',
    title_ta: 'விதைகளுக்கு பணம்',
    prompt:
      'You need ₹40,000 for seeds and fertilizer. The village moneylender offers instant cash at 5% per month. The bank loan needs paperwork and a week of waiting.',
    prompt_hi:
      'आपको बीज और खाद के लिए ₹40,000 चाहिए। गाँव का साहूकार 5% प्रति माह पर तुरंत नकद देता है। बैंक ऋण के लिए कागज़ात और एक हफ्ते का इंतज़ार करना होगा।',
    prompt_ta:
      'உங்களுக்கு விதைகள் மற்றும் உரத்திற்கு ₹40,000 தேவை. கிராம கடன்காரர் மாதம் 5% வட்டியில் உடனடியாக பணம் தருகிறார். வங்கி கடனுக்கு ஆவணங்களும் ஒரு வாரம் காத்திருக்கவும் வேண்டும்.',
    left: {
      label: 'Take fast money from sahukar',
      description: 'No delay, but very high interest and pressure.',
    },
    right: {
      label: 'Wait for KCC/bank loan',
      description: 'Slower, but regulated interest and protections.',
    },
    left_label_hi: 'साहूकार से तुरंत पैसे लें', left_desc_hi: 'देरी नहीं, लेकिन बहुत अधिक ब्याज और दबाव।',
    right_label_hi: 'KCC/बैंक ऋण का इंतज़ार करें', right_desc_hi: 'धीमा, लेकिन नियमित ब्याज और सुरक्षा।',
    left_label_ta: 'சாஹுகாரிடம் உடனடி பணம் வாங்கு', left_desc_ta: 'தாமதம் இல்லை, ஆனால் மிக அதிக வட்டி மற்றும் அழுத்தம்.',
    right_label_ta: 'KCC/வங்கி கடனுக்கு காத்திரு', right_desc_ta: 'மெதுவாக, ஆனால் கட்டுப்படுத்தப்பட்ட வட்டி மற்றும் பாதுகாப்பு.',
    effectsLeft:  { family: 5,   crops: 10, finance: -20, resilience: -10 },
    effectsRight: { family: -5,  crops: 0,  finance: 10,  resilience: 15  },
    narrator: 'bank_mitr',
    tags: ['debt', 'credit', 'planning'],
    triggerDebtTrap: true,
    audioKey: 'pre_sowing.loan_choice',
  },
  {
    id: 'crop_insurance',
    seasonPhase: 'sowing',
    title: 'Crop Insurance Premium',
    title_hi: 'फसल बीमा प्रीमियम',
    title_ta: 'பயிர் காப்பீடு பிரீமியம்',
    prompt:
      'The krishi officer suggests buying crop insurance before sowing. Premium is ₹800 per acre. Last year you skipped it and monsoon was on time.',
    prompt_hi:
      'कृषि अधिकारी बुवाई से पहले फसल बीमा खरीदने का सुझाव देता है। प्रीमियम ₹800 प्रति एकड़ है। पिछले साल आपने इसे छोड़ दिया था और मानसून समय पर आया था।',
    prompt_ta:
      'விவசாய அதிகாரி விதைப்பதற்கு முன் பயிர் காப்பீடு வாங்க பரிந்துரைக்கிறார். பிரீமியம் ஏக்கருக்கு ₹800. கடந்த ஆண்டு நீங்கள் தவிர்த்தீர்கள், மழையும் சரியான நேரத்தில் வந்தது.',
    left: {
      label: 'Skip insurance, save money',
      description: 'Hope that weather stays normal again.',
    },
    right: {
      label: 'Pay premium, stay covered',
      description: 'Small cost now to avoid big loss later.',
    },
    left_label_hi: 'बीमा छोड़ें, पैसे बचाएं', left_desc_hi: 'उम्मीद है कि मौसम फिर सामान्य रहेगा।',
    right_label_hi: 'प्रीमियम दें, सुरक्षित रहें', right_desc_hi: 'अभी छोटी लागत, बाद में बड़े नुकसान से बचाव।',
    left_label_ta: 'காப்பீடு தவிர், பணம் சேமி', left_desc_ta: 'வானிலை மீண்டும் சாதாரணமாக இருக்கும் என நம்பு.',
    right_label_ta: 'பிரீமியம் செலுத்து, பாதுகாப்பாக இரு', right_desc_ta: 'இப்போது சிறிய செலவு, பின்னர் பெரிய இழப்பு தவிர்க்கலாம்.',
    effectsLeft:  { family: 5, crops: 0,  finance: 5,  resilience: -20 },
    effectsRight: { family: 0, crops: 0,  finance: -5, resilience: 15  },
    narrator: 'elder',
    tags: ['insurance', 'risk'],
    audioKey: 'sowing.insurance',
  },
  {
    id: 'fraud_otp_call',
    seasonPhase: 'growing',
    title: 'Fraud Call: Kisan Subsidy',
    title_hi: 'धोखाधड़ी कॉल: किसान सब्सिडी',
    title_ta: 'மோசடி அழைப்பு: கிசான் மானியம்',
    prompt:
      'You get a call saying your Kisan subsidy will stop unless you share your ATM OTP "for verification". The caller sounds urgent and official.',
    prompt_hi:
      'आपको एक कॉल आती है जिसमें कहा जाता है कि जब तक आप "सत्यापन के लिए" अपना ATM OTP नहीं देते, आपकी किसान सब्सिडी बंद हो जाएगी। कॉलर की आवाज़ तत्काल और आधिकारिक लगती है।',
    prompt_ta:
      'உங்கள் கிசான் மானியம் நிறுத்தப்படும் என்று ஒரு அழைப்பு வருகிறது, "சரிபார்ப்புக்காக" ATM OTP கொடுக்க வேண்டும் என்கிறார்கள். அழைப்பாளர் அவசரமாகவும் அதிகாரப்பூர்வமாகவும் பேசுகிறார்.',
    left: {
      label: 'Share OTP to keep subsidy',
      description: 'Trust the caller and protect the money.',
    },
    right: {
      label: 'Cut the call, visit bank',
      description: 'Never share OTP on phone.',
    },
    left_label_hi: 'सब्सिडी बचाने के लिए OTP दें', left_desc_hi: 'कॉलर पर भरोसा करें और पैसे बचाएं।',
    right_label_hi: 'कॉल काटें, बैंक जाएं', right_desc_hi: 'फोन पर कभी OTP न दें।',
    left_label_ta: 'மானியம் காக்க OTP கொடு', left_desc_ta: 'அழைப்பாளரை நம்பி பணம் காப்பாற்று.',
    right_label_ta: 'அழைப்பை வெட்டு, வங்கிக்கு செல்', right_desc_ta: 'தொலைபேசியில் OTP கொடுக்காதே.',
    effectsLeft:  { family: -25, crops: -5, finance: -30, resilience: -15 },
    effectsRight: { family: 5,   crops: 0,  finance: 10,  resilience: 20  },
    narrator: 'scammer',
    tags: ['fraud_call', 'digital_safety'],
    audioKey: 'growing.fraud_otp',
    triggerDebtTrap: true,
  },
  {
    id: 'mandi_low_price',
    seasonPhase: 'harvest',
    title: 'Mandi Prices Crash',
    title_hi: 'मंडी भाव गिरे',
    title_ta: 'மண்டி விலை சரிவு',
    prompt:
      'Mandi price this week is very low due to oversupply. You can sell now or wait 2 weeks, but must arrange storage.',
    prompt_hi:
      'इस हफ्ते मंडी में अधिक आपूर्ति के कारण भाव बहुत कम है। आप अभी बेच सकते हैं या 2 हफ्ते इंतज़ार कर सकते हैं, लेकिन भंडारण की व्यवस्था करनी होगी।',
    prompt_ta:
      'இந்த வாரம் அதிக விநியோகம் காரணமாக மண்டி விலை மிகவும் குறைவாக உள்ளது. இப்போது விற்கலாம் அல்லது 2 வாரங்கள் காத்திருக்கலாம், ஆனால் சேமிப்பு ஏற்பாடு செய்ய வேண்டும்.',
    left: {
      label: 'Sell immediately at low price',
      description: 'Clear stock, avoid storage risk.',
    },
    right: {
      label: 'Store grain, wait for better rate',
      description: 'Spend on storage hoping prices recover.',
    },
    left_label_hi: 'कम कीमत पर तुरंत बेचें', left_desc_hi: 'स्टॉक खाली करें, भंडारण जोखिम से बचें।',
    right_label_hi: 'अनाज रखें, बेहतर भाव का इंतज़ार करें', right_desc_hi: 'भंडारण पर खर्च करें, उम्मीद है कीमतें बढ़ेंगी।',
    left_label_ta: 'குறைந்த விலையில் உடனே விற்று', left_desc_ta: 'சரக்கு காலி செய், சேமிப்பு ஆபத்து தவிர்.',
    right_label_ta: 'தானியம் வை, சிறந்த விலைக்கு காத்திரு', right_desc_ta: 'சேமிப்பில் செலவு செய், விலை ஏறும் என நம்பு.',
    effectsLeft:  { family: 0, crops: 0,  finance: -10, resilience: -5 },
    effectsRight: { family: 0, crops: -5, finance: 10,  resilience: 5  },
    narrator: 'self',
    tags: ['mandi', 'price_fluctuation'],
    audioKey: 'harvest.mandi_price',
  },
  {
    id: 'festival_spend_vs_savings',
    seasonPhase: 'off_season',
    title: 'Festival Spending',
    title_hi: 'त्योहार पर खर्च',
    title_ta: 'திருவிழா செலவு',
    prompt:
      'Festival season is here. Children want new clothes and sweets. You planned to keep ₹10,000 aside for next season input cost.',
    prompt_hi:
      'त्योहार का मौसम आ गया है। बच्चे नए कपड़े और मिठाई चाहते हैं। आपने अगले सीज़न की लागत के लिए ₹10,000 अलग रखने की योजना बनाई थी।',
    prompt_ta:
      'திருவிழா காலம் வந்துவிட்டது. குழந்தைகள் புதிய ஆடைகளும் இனிப்புகளும் வேண்டும் என்கிறார்கள். அடுத்த சீசன் செலவுக்காக ₹10,000 ஒதுக்க திட்டமிட்டிருந்தீர்கள்.',
    left: {
      label: 'Spend most savings on festival',
      description: 'Make family happy today, worry later.',
    },
    right: {
      label: 'Limit spending, protect savings',
      description: 'Celebrate simply, secure next season.',
    },
    left_label_hi: 'त्योहार पर ज़्यादातर बचत खर्च करें', left_desc_hi: 'आज परिवार को खुश करें, बाद की चिंता बाद में।',
    right_label_hi: 'खर्च सीमित करें, बचत बचाएं', right_desc_hi: 'सादगी से मनाएं, अगला सीज़न सुरक्षित करें।',
    left_label_ta: 'திருவிழாவில் பெரும்பாலான சேமிப்பை செலவழி', left_desc_ta: 'இன்று குடும்பத்தை மகிழ்விடு, கவலை பிறகு.',
    right_label_ta: 'செலவை கட்டுப்படுத்து, சேமிப்பை காப்பாற்று', right_desc_ta: 'எளிமையாக கொண்டாடு, அடுத்த சீசனை பாதுகாக்கு.',
    effectsLeft:  { family: 20, crops: 0, finance: -20, resilience: -10 },
    effectsRight: { family: -5, crops: 0, finance: 15,  resilience: 10  },
    narrator: 'elder',
    tags: ['savings', 'consumption'],
    audioKey: 'off_season.festival',
  },
  {
    id: 'health_emergency',
    seasonPhase: 'growing',
    title: 'Health Emergency at Home',
    title_hi: 'घर में स्वास्थ्य आपातकाल',
    title_ta: 'வீட்டில் சுகாதார அவசரநிலை',
    prompt:
      'Your father suddenly falls ill. Private hospital asks for a large advance. Government hospital is farther and crowded but much cheaper.',
    prompt_hi:
      'आपके पिता अचानक बीमार पड़ जाते हैं। प्राइवेट अस्पताल बड़ी अग्रिम राशि माँगता है। सरकारी अस्पताल दूर और भीड़भाड़ वाला है लेकिन बहुत सस्ता है।',
    prompt_ta:
      'உங்கள் தந்தை திடீரென்று நோய்வாய்ப்படுகிறார். தனியார் மருத்துவமனை பெரிய முன்பணம் கேட்கிறது. அரசு மருத்துவமனை தூரத்தில் இருக்கிறது, நெரிசலாக இருக்கும், ஆனால் மிகவும் மலிவானது.',
    left: {
      label: 'Go to private hospital now',
      description: 'Best care, but big bill and maybe loans.',
    },
    right: {
      label: 'Use govt hospital, manage delay',
      description: 'Cheaper, but more stress and waiting.',
    },
    left_label_hi: 'अभी प्राइवेट अस्पताल जाएं', left_desc_hi: 'सबसे अच्छी देखभाल, लेकिन बड़ा बिल और शायद कर्ज़।',
    right_label_hi: 'सरकारी अस्पताल जाएं, देरी सहें', right_desc_hi: 'सस्ता, लेकिन अधिक तनाव और प्रतीक्षा।',
    left_label_ta: 'இப்போதே தனியார் மருத்துவமனை செல்', left_desc_ta: 'சிறந்த சிகிச்சை, ஆனால் பெரிய பில் மற்றும் கடன்.',
    right_label_ta: 'அரசு மருத்துவமனை பயன்படுத்து, தாமதம் சமாளி', right_desc_ta: 'மலிவானது, ஆனால் அதிக மன அழுத்தம் மற்றும் காத்திருப்பு.',
    effectsLeft:  { family: 15, crops: -5, finance: -25, resilience: -10 },
    effectsRight: { family: 0,  crops: 0,  finance: 5,   resilience: 10  },
    narrator: 'self',
    tags: ['health', 'shock_expense'],
  },
  {
    id: 'monsoon_delay',
    seasonPhase: 'sowing',
    title: 'Monsoon Delay',
    title_hi: 'मानसून देरी',
    title_ta: 'பருவமழை தாமதம்',
    prompt:
      'Rain is delayed by two weeks. You can still sow high-risk, high-yield crop or switch to a more resilient but lower-profit variety.',
    prompt_hi:
      'बारिश दो हफ्ते देर से आ रही है। आप अभी भी अधिक जोखिम वाली, अधिक उपज देने वाली फसल बो सकते हैं या कम मुनाफे वाली लेकिन अधिक मज़बूत किस्म पर स्विच कर सकते हैं।',
    prompt_ta:
      'மழை இரண்டு வாரங்கள் தாமதமாகிறது. அதிக ஆபத்து, அதிக மகசூல் தரும் பயிரை விதைக்கலாம் அல்லது குறைந்த லாபம் ஆனால் அதிக நிலைத்தன்மை கொண்ட வகைக்கு மாறலாம்.',
    left: {
      label: 'Stick to high-risk crop',
      description: 'Chase higher profit despite delay.',
    },
    right: {
      label: 'Switch to resilient crop',
      description: 'Accept lower profit for stability.',
    },
    left_label_hi: 'अधिक जोखिम वाली फसल रखें', left_desc_hi: 'देरी के बावजूद अधिक मुनाफे की कोशिश।',
    right_label_hi: 'मज़बूत फसल पर स्विच करें', right_desc_hi: 'स्थिरता के लिए कम मुनाफा स्वीकार करें।',
    left_label_ta: 'அதிக ஆபத்துள்ள பயிரில் தொடர்', left_desc_ta: 'தாமதம் இருந்தாலும் அதிக லாபம் தேடு.',
    right_label_ta: 'நிலையான பயிருக்கு மாறு', right_desc_ta: 'நிலைத்தன்மைக்காக குறைந்த லாபம் ஏற்று.',
    effectsLeft:  { family: 0, crops: -20, finance: 15,  resilience: -10 },
    effectsRight: { family: 0, crops: 10,  finance: -5,  resilience: 15  },
    narrator: 'elder',
    tags: ['monsoon', 'risk'],
  },
  {
    id: 'input_shop_credit',
    seasonPhase: 'pre_sowing',
    title: 'Input Shop Credit',
    title_hi: 'इनपुट दुकान उधार',
    title_ta: 'உள்ளீடு கடை கடன்',
    prompt:
      'Local agri shop offers seeds and fertilizer on "udhaar" if you promise to sell harvest through them at a fixed lower price.',
    prompt_hi:
      'स्थानीय कृषि दुकान "उधार" पर बीज और खाद देती है, अगर आप उनके माध्यम से तय कम कीमत पर फसल बेचने का वादा करें।',
    prompt_ta:
      'உள்ளூர் விவசாய கடை "உதார்" முறையில் விதைகளும் உரமும் தருகிறது, நீங்கள் அவர்கள் மூலம் நிர்ணயிக்கப்பட்ட குறைந்த விலையில் அறுவடையை விற்க வேண்டும் என்று வாக்குறுதி கொடுத்தால்.',
    left: {
      label: 'Accept shop credit tie-up',
      description: 'Easy inputs now, less freedom later.',
    },
    right: {
      label: 'Arrange cash elsewhere',
      description: 'More effort now, more options later.',
    },
    left_label_hi: 'दुकान का उधार स्वीकार करें', left_desc_hi: 'अभी आसान इनपुट, बाद में कम आज़ादी।',
    right_label_hi: 'कहीं और से नकद जुटाएं', right_desc_hi: 'अभी अधिक मेहनत, बाद में अधिक विकल्प।',
    left_label_ta: 'கடை கடன் ஒப்பந்தம் ஏற்று', left_desc_ta: 'இப்போது எளிய உள்ளீடு, பின்னர் குறைந்த சுதந்திரம்.',
    right_label_ta: 'வேறு இடத்தில் பணம் ஏற்பாடு செய்', right_desc_ta: 'இப்போது அதிக முயற்சி, பின்னர் அதிக விருப்பங்கள்.',
    effectsLeft:  { family: 5,  crops: 5, finance: -15, resilience: -5  },
    effectsRight: { family: -5, crops: 0, finance: 10,  resilience: 10  },
    narrator: 'bank_mitr',
    tags: ['debt', 'market_access'],
  },
  {
    id: 'self_help_group',
    seasonPhase: 'off_season',
    title: 'Join Self Help Group',
    title_hi: 'स्वयं सहायता समूह में शामिल हों',
    title_ta: 'சுய உதவி குழுவில் சேரு',
    prompt:
      'Women in your family are invited to a Self Help Group that encourages small monthly savings and gives low-interest loans.',
    prompt_hi:
      'आपके परिवार की महिलाओं को एक स्वयं सहायता समूह में आमंत्रित किया गया है जो छोटी मासिक बचत को प्रोत्साहित करता है और कम ब्याज पर ऋण देता है।',
    prompt_ta:
      'உங்கள் குடும்பத்தில் உள்ள பெண்கள் ஒரு சுய உதவி குழுவில் சேர அழைக்கப்படுகிறார்கள், இது சிறிய மாதாந்திர சேமிப்பை ஊக்குவிக்கிறது மற்றும் குறைந்த வட்டியில் கடன் தருகிறது.',
    left: {
      label: 'Ignore SHG, keep cash at home',
      description: 'Avoid meetings and paperwork.',
    },
    right: {
      label: 'Join SHG and start saving',
      description: 'Build small buffer and credit history.',
    },
    left_label_hi: 'SHG नज़रअंदाज़ करें, घर पर नकद रखें', left_desc_hi: 'बैठकों और कागज़ात से बचें।',
    right_label_hi: 'SHG में शामिल हों और बचत शुरू करें', right_desc_hi: 'छोटा बफर और क्रेडिट इतिहास बनाएं।',
    left_label_ta: 'SHG புறக்கணி, வீட்டில் பணம் வை', left_desc_ta: 'கூட்டங்கள் மற்றும் ஆவணங்களை தவிர்.',
    right_label_ta: 'SHG-ல் சேர், சேமிக்க தொடங்கு', right_desc_ta: 'சிறிய இருப்பு மற்றும் கடன் வரலாறு உருவாக்கு.',
    effectsLeft:  { family: 0,  crops: 0, finance: -5, resilience: -10 },
    effectsRight: { family: 10, crops: 0, finance: 10, resilience: 15  },
    narrator: 'bank_mitr',
    tags: ['savings', 'formal_credit'],
  },
  {
    id: 'end_of_year_review',
    seasonPhase: 'off_season',
    title: 'Year-End Review',
    title_hi: 'साल के अंत की समीक्षा',
    title_ta: 'ஆண்டு இறுதி மதிப்பாய்வு',
    prompt:
      'You look back at the whole year. Did savings grow? Are debts under control? Did the family feel secure?',
    prompt_hi:
      'आप पूरे साल पर नज़र डालते हैं। क्या बचत बढ़ी? क्या कर्ज़ नियंत्रण में है? क्या परिवार सुरक्षित महसूस करता है?',
    prompt_ta:
      'நீங்கள் முழு ஆண்டையும் திரும்பிப் பார்க்கிறீர்கள். சேமிப்பு வளர்ந்ததா? கடன்கள் கட்டுப்பாட்டில் உள்ளதா? குடும்பம் பாதுகாப்பாக உணர்ந்ததா?',
    left: {
      label: 'Ignore and repeat same pattern',
      description: 'Do not change anything next year.',
    },
    right: {
      label: 'Plan budget for next season',
      description: 'Write simple plan for expenses and savings.',
    },
    left_label_hi: 'नज़रअंदाज़ करें और वही दोहराएं', left_desc_hi: 'अगले साल कुछ न बदलें।',
    right_label_hi: 'अगले सीज़न का बजट बनाएं', right_desc_hi: 'खर्च और बचत के लिए सरल योजना लिखें।',
    left_label_ta: 'புறக்கணி, அதே முறையை திரும்பு', left_desc_ta: 'அடுத்த ஆண்டு எதுவும் மாற்றாதே.',
    right_label_ta: 'அடுத்த சீசனுக்கு பட்ஜெட் திட்டமிடு', right_desc_ta: 'செலவு மற்றும் சேமிப்புக்கு எளிய திட்டம் எழுது.',
    effectsLeft:  { family: -10, crops: 0, finance: -10, resilience: -15 },
    effectsRight: { family: 10,  crops: 0, finance: 10,  resilience: 15  },
    narrator: 'self',
    tags: ['planning', 'reflection'],
    endGame: true,
  },
  // ── New Govt Scheme Cards ──
  {
    id: 'pm_kisan_registration',
    seasonPhase: 'pre_sowing',
    title: 'PM-KISAN Registration',
    title_hi: 'PM-KISAN पंजीकरण',
    title_ta: 'PM-KISAN பதிவு',
    prompt:
      'A government officer visits your village offering to register farmers for PM-KISAN — ₹6,000 per year direct to your bank. It needs Aadhaar and land records.',
    prompt_hi:
      'एक सरकारी अधिकारी आपके गाँव में आता है और किसानों को PM-KISAN के लिए पंजीकृत करने की पेशकश करता है — सीधे आपके बैंक में ₹6,000 प्रति वर्ष। इसके लिए आधार और भूमि रिकॉर्ड चाहिए।',
    prompt_ta:
      'ஒரு அரசு அதிகாரி உங்கள் கிராமத்திற்கு வந்து PM-KISAN திட்டத்தில் விவசாயிகளை பதிவு செய்ய வழங்குகிறார் — ஆண்டுக்கு ₹6,000 நேரடியாக உங்கள் வங்கிக்கு. ஆதார் மற்றும் நில ஆவணங்கள் தேவை.',
    left: {
      label: 'Skip, too much paperwork',
      description: 'Avoid the hassle of documents.',
    },
    right: {
      label: 'Register for PM-KISAN',
      description: 'Get ₹6,000/year guaranteed income support.',
    },
    left_label_hi: 'छोड़ें, बहुत कागज़ात हैं', left_desc_hi: 'दस्तावेज़ों की परेशानी से बचें।',
    right_label_hi: 'PM-KISAN के लिए पंजीकरण करें', right_desc_hi: '₹6,000/वर्ष की गारंटीड आय सहायता पाएं।',
    left_label_ta: 'தவிர், அதிக ஆவணங்கள்', left_desc_ta: 'ஆவண சிக்கலை தவிர்.',
    right_label_ta: 'PM-KISAN-ல் பதிவு செய்', right_desc_ta: '₹6,000/ஆண்டு உத்தரவாத வருமான ஆதரவு பெறு.',
    effectsLeft: {
      family: 0,
      crops: 0,
      finance: -10,
      resilience: -5,
    },
    effectsRight: {
      family: 5,
      crops: 0,
      finance: 15,
      resilience: 10,
    },
    narrator: 'bank_mitr',
    tags: ['pm_kisan', 'govt_scheme', 'income_support'],
    audioKey: 'pre_sowing.pm_kisan',
  },
  {
    id: 'soil_health_card',
    seasonPhase: 'pre_sowing',
    title: 'Soil Health Card Advice',
    title_hi: 'मृदा स्वास्थ्य कार्ड सलाह',
    title_ta: 'மண் ஆரோக்கிய அட்டை ஆலோசனை',
    prompt:
      'The Krishi Vigyan Kendra offers a free Soil Health Card test. Results will tell you exactly which fertilizers your soil needs, saving money and improving yield.',
    prompt_hi:
      'कृषि विज्ञान केंद्र एक मुफ्त मृदा स्वास्थ्य कार्ड परीक्षण प्रदान करता है। परिणाम आपको बताएंगे कि आपकी मिट्टी को किन उर्वरकों की ज़रूरत है, जिससे पैसे बचेंगे और उपज बढ़ेगी।',
    prompt_ta:
      'கிருஷி விஞ்ஞான் கேந்திரா இலவச மண் ஆரோக்கிய அட்டை சோதனை வழங்குகிறது. முடிவுகள் உங்கள் மண்ணுக்கு எந்த உரங்கள் தேவை என்று சரியாக சொல்லும், பணம் மிச்சமாகும், மகசூல் அதிகரிக்கும்.',
    left: {
      label: 'Use same fertilizer as always',
      description: 'Stick to what you know.',
    },
    right: {
      label: 'Get soil tested, follow advice',
      description: 'Spend less on fertilizer, grow more.',
    },
    left_label_hi: 'हमेशा की तरह वही खाद डालें', left_desc_hi: 'जो जानते हैं उसी पर टिके रहें।',
    right_label_hi: 'मिट्टी परीक्षण कराएं, सलाह मानें', right_desc_hi: 'खाद पर कम खर्च, अधिक उपज।',
    left_label_ta: 'எப்போதும் போல் அதே உரம் பயன்படுத்து', left_desc_ta: 'தெரிந்ததில் தொடர்.',
    right_label_ta: 'மண் பரிசோதனை செய், ஆலோசனை பின்பற்று', right_desc_ta: 'உரத்தில் குறைந்த செலவு, அதிக மகசூல்.',
    effectsLeft: {
      family: 0,
      crops: -10,
      finance: -5,
      resilience: -5,
    },
    effectsRight: {
      family: 0,
      crops: 20,
      finance: 10,
      resilience: 10,
    },
    narrator: 'elder',
    tags: ['soil_health', 'govt_scheme', 'crop_management'],
    audioKey: 'pre_sowing.soil_health',
  },
  {
    id: 'enam_mandi',
    seasonPhase: 'harvest',
    title: 'e-NAM Online Mandi',
    title_hi: 'e-NAM ऑनलाइन मंडी',
    title_ta: 'e-NAM ஆன்லைன் மண்டி',
    prompt:
      'A CSC operator shows you e-NAM — the national online mandi where you can list your produce and get bids from buyers across India, often at better prices.',
    prompt_hi:
      'एक CSC ऑपरेटर आपको e-NAM दिखाता है — राष्ट्रीय ऑनलाइन मंडी जहाँ आप अपनी उपज सूचीबद्ध कर सकते हैं और पूरे भारत के खरीदारों से बोलियाँ प्राप्त कर सकते हैं, अक्सर बेहतर कीमतों पर।',
    prompt_ta:
      'ஒரு CSC ஆபரேட்டர் உங்களுக்கு e-NAM காட்டுகிறார் — தேசிய ஆன்லைன் மண்டி, அங்கு நீங்கள் உங்கள் விளைபொருட்களை பட்டியலிட்டு இந்தியா முழுவதும் உள்ள வாங்குபவர்களிடம் இருந்து ஏலம் பெறலாம், பெரும்பாலும் சிறந்த விலையில்.',
    left: {
      label: 'Sell at local mandi as usual',
      description: 'Familiar process, but middlemen take a cut.',
    },
    right: {
      label: 'Try e-NAM for better price',
      description: 'More effort, but direct buyer access.',
    },
    left_label_hi: 'हमेशा की तरह स्थानीय मंडी में बेचें', left_desc_hi: 'परिचित प्रक्रिया, लेकिन बिचौलिए कमीशन लेते हैं।',
    right_label_hi: 'बेहतर कीमत के लिए e-NAM आज़माएं', right_desc_hi: 'अधिक मेहनत, लेकिन सीधे खरीदार तक पहुंच।',
    left_label_ta: 'வழக்கம் போல் உள்ளூர் மண்டியில் விற்று', left_desc_ta: 'பரிச்சயமான செயல்முறை, ஆனால் தரகர்கள் கமிஷன் எடுப்பார்கள்.',
    right_label_ta: 'சிறந்த விலைக்கு e-NAM முயற்சி செய்', right_desc_ta: 'அதிக முயற்சி, ஆனால் நேரடி வாங்குபவர் அணுகல்.',
    effectsLeft: {
      family: 0,
      crops: 0,
      finance: -5,
      resilience: 0,
    },
    effectsRight: {
      family: 5,
      crops: 0,
      finance: 20,
      resilience: 10,
    },
    narrator: 'bank_mitr',
    tags: ['enam', 'mandi', 'market_access', 'govt_scheme'],
    audioKey: 'harvest.enam',
  },
  {
    id: 'kcc_renewal',
    seasonPhase: 'pre_sowing',
    title: 'KCC Loan Renewal',
    title_hi: 'KCC ऋण नवीनीकरण',
    title_ta: 'KCC கடன் புதுப்பிப்பு',
    prompt:
      'Your Kisan Credit Card limit is up for renewal. The bank officer says you can increase the limit to ₹1.5 lakh at 4% interest under the interest subvention scheme.',
    prompt_hi:
      'आपके किसान क्रेडिट कार्ड की सीमा नवीनीकरण के लिए है। बैंक अधिकारी कहता है कि आप ब्याज सहायता योजना के तहत 4% ब्याज पर सीमा ₹1.5 लाख तक बढ़ा सकते हैं।',
    prompt_ta:
      'உங்கள் கிசான் கிரெடிட் கார்டு வரம்பு புதுப்பிப்புக்கு வந்துள்ளது. வங்கி அதிகாரி வட்டி மானிய திட்டத்தின் கீழ் 4% வட்டியில் வரம்பை ₹1.5 லட்சமாக அதிகரிக்கலாம் என்கிறார்.',
    left: {
      label: 'Keep current limit, avoid more debt',
      description: 'Stay cautious with borrowing.',
    },
    right: {
      label: 'Increase KCC limit for better inputs',
      description: 'More capital at subsidized rate.',
    },
    left_label_hi: 'मौजूदा सीमा रखें, अधिक कर्ज़ से बचें', left_desc_hi: 'उधार लेने में सावधान रहें।',
    right_label_hi: 'बेहतर इनपुट के लिए KCC सीमा बढ़ाएं', right_desc_hi: 'सब्सिडी दर पर अधिक पूंजी।',
    left_label_ta: 'தற்போதைய வரம்பை வை, அதிக கடன் தவிர்', left_desc_ta: 'கடன் வாங்குவதில் கவனமாக இரு.',
    right_label_ta: 'சிறந்த உள்ளீட்டிற்கு KCC வரம்பை அதிகரி', right_desc_ta: 'மானிய விகிதத்தில் அதிக மூலதனம்.',
    effectsLeft: {
      family: 0,
      crops: -5,
      finance: 5,
      resilience: 5,
    },
    effectsRight: {
      family: 0,
      crops: 15,
      finance: 10,
      resilience: 5,
    },
    narrator: 'bank_mitr',
    tags: ['kcc', 'credit', 'govt_scheme'],
    audioKey: 'pre_sowing.kcc_renewal',
  },
  {
    id: 'drip_irrigation_subsidy',
    seasonPhase: 'sowing',
    title: 'Drip Irrigation Subsidy',
    title_hi: 'ड्रिप सिंचाई सब्सिडी',
    title_ta: 'சொட்டு நீர்ப்பாசன மானியம்',
    prompt:
      'Under PM Krishi Sinchai Yojana, you can get 55% subsidy on drip irrigation. Upfront cost is ₹25,000 but it will save water and boost yield for years.',
    prompt_hi:
      'PM कृषि सिंचाई योजना के तहत आपको ड्रिप सिंचाई पर 55% सब्सिडी मिल सकती है। अग्रिम लागत ₹25,000 है लेकिन यह वर्षों तक पानी बचाएगा और उपज बढ़ाएगा।',
    prompt_ta:
      'PM கிருஷி சிஞ்சாய் யோஜனா திட்டத்தின் கீழ் சொட்டு நீர்ப்பாசனத்தில் 55% மானியம் பெறலாம். முன்பணம் ₹25,000 ஆனால் இது பல ஆண்டுகளாக தண்ணீர் சேமிக்கும், மகசூல் அதிகரிக்கும்.',
    left: {
      label: 'Skip, upfront cost is too high',
      description: 'Cannot afford it right now.',
    },
    right: {
      label: 'Apply for subsidy and install',
      description: 'Long-term water and cost savings.',
    },
    left_label_hi: 'छोड़ें, अग्रिम लागत बहुत अधिक है', left_desc_hi: 'अभी इसे वहन नहीं कर सकते।',
    right_label_hi: 'सब्सिडी के लिए आवेदन करें और लगाएं', right_desc_hi: 'दीर्घकालिक पानी और लागत बचत।',
    left_label_ta: 'தவிர், முன்பணம் மிக அதிகம்', left_desc_ta: 'இப்போது வாங்க முடியாது.',
    right_label_ta: 'மானியத்திற்கு விண்ணப்பி, நிறுவு', right_desc_ta: 'நீண்டகால தண்ணீர் மற்றும் செலவு சேமிப்பு.',
    effectsLeft: {
      family: 0,
      crops: -5,
      finance: 5,
      resilience: -10,
    },
    effectsRight: {
      family: 0,
      crops: 20,
      finance: -10,
      resilience: 20,
    },
    narrator: 'elder',
    tags: ['irrigation', 'subsidy', 'govt_scheme'],
    audioKey: 'sowing.drip_irrigation',
  },
  {
    id: 'fake_seed_dealer',
    seasonPhase: 'sowing',
    title: 'Cheap Seeds at the Market',
    title_hi: 'बाज़ार में सस्ते बीज',
    title_ta: 'சந்தையில் மலிவான விதைகள்',
    prompt:
      'A travelling vendor sells certified-looking seeds at 40% less than the agri shop. No bill, no guarantee. Your neighbour bought them last year and lost half his crop.',
    prompt_hi:
      'एक घूमने वाला विक्रेता कृषि दुकान से 40% कम कीमत पर प्रमाणित दिखने वाले बीज बेचता है। कोई बिल नहीं, कोई गारंटी नहीं। आपके पड़ोसी ने पिछले साल ये खरीदे और आधी फसल खो दी।',
    prompt_ta:
      'ஒரு பயணி வியாபாரி விவசாய கடையை விட 40% குறைவான விலையில் சான்றிதழ் போல் தெரியும் விதைகளை விற்கிறார். பில் இல்லை, உத்தரவாதம் இல்லை. உங்கள் அண்டை வீட்டார் கடந்த ஆண்டு வாங்கி பாதி பயிரை இழந்தார்.',
    left: {
      label: 'Buy cheap seeds, save money',
      description: 'Risk it for the short-term saving.',
    },
    right: {
      label: 'Buy certified seeds with receipt',
      description: 'Pay more, but quality is guaranteed.',
    },
    left_label_hi: 'सस्ते बीज खरीदें, पैसे बचाएं', left_desc_hi: 'अल्पकालिक बचत के लिए जोखिम लें।',
    right_label_hi: 'रसीद के साथ प्रमाणित बीज खरीदें', right_desc_hi: 'अधिक दें, लेकिन गुणवत्ता की गारंटी।',
    left_label_ta: 'மலிவான விதைகள் வாங்கு, பணம் சேமி', left_desc_ta: 'குறுகிய கால சேமிப்புக்கு ஆபத்து எடு.',
    right_label_ta: 'ரசீதுடன் சான்றிதழ் விதைகள் வாங்கு', right_desc_ta: 'அதிகம் செலுத்து, ஆனால் தரம் உத்தரவாதம்.',
    effectsLeft: {
      family: 0,
      crops: -25,
      finance: 5,
      resilience: -15,
    },
    effectsRight: {
      family: 0,
      crops: 15,
      finance: -10,
      resilience: 10,
    },
    narrator: 'scammer',
    tags: ['seeds', 'fraud', 'crop_management'],
    audioKey: 'sowing.fake_seeds',
  },
  {
    id: 'warehouse_receipt',
    seasonPhase: 'harvest',
    title: 'Warehouse Receipt Loan',
    title_hi: 'गोदाम रसीद ऋण',
    title_ta: 'கிடங்கு ரசீது கடன்',
    prompt:
      'A NABARD-linked warehouse offers to store your grain and give you a loan against it — so you can wait for better prices without needing cash immediately.',
    prompt_hi:
      'NABARD से जुड़ा एक गोदाम आपके अनाज को संग्रहीत करने और उसके बदले ऋण देने की पेशकश करता है — ताकि आप तुरंत नकद की ज़रूरत के बिना बेहतर कीमतों का इंतज़ार कर सकें।',
    prompt_ta:
      'NABARD இணைந்த ஒரு கிடங்கு உங்கள் தானியங்களை சேமித்து அதற்கு எதிராக கடன் தர வழங்குகிறது — உடனடியாக பணம் தேவையில்லாமல் சிறந்த விலைக்காக காத்திருக்கலாம்.',
    left: {
      label: 'Sell now, avoid storage hassle',
      description: 'Quick cash, but at today\'s low price.',
    },
    right: {
      label: 'Store and take warehouse loan',
      description: 'Get cash now and sell later at better rate.',
    },
    left_label_hi: 'अभी बेचें, भंडारण की झंझट से बचें', left_desc_hi: 'जल्दी नकद, लेकिन आज की कम कीमत पर।',
    right_label_hi: 'रखें और गोदाम ऋण लें', right_desc_hi: 'अभी नकद पाएं और बाद में बेहतर दर पर बेचें।',
    left_label_ta: 'இப்போது விற்று, சேமிப்பு சிக்கல் தவிர்', left_desc_ta: 'விரைவான பணம், ஆனால் இன்றைய குறைந்த விலையில்.',
    right_label_ta: 'சேமி, கிடங்கு கடன் வாங்கு', right_desc_ta: 'இப்போது பணம் பெறு, பின்னர் சிறந்த விலையில் விற்று.',
    effectsLeft: {
      family: 0,
      crops: 0,
      finance: -5,
      resilience: -5,
    },
    effectsRight: {
      family: 0,
      crops: 5,
      finance: 15,
      resilience: 15,
    },
    narrator: 'bank_mitr',
    tags: ['warehouse', 'nabard', 'post_harvest', 'govt_scheme'],
    audioKey: 'harvest.warehouse_receipt',
  },
  {
    id: 'crop_diversification',
    seasonPhase: 'pre_sowing',
    title: 'Crop Diversification Advice',
    title_hi: 'फसल विविधीकरण सलाह',
    title_ta: 'பயிர் பல்வகைப்படுத்தல் ஆலோசனை',
    prompt:
      'The agriculture department advises growing pulses alongside wheat this season under the National Food Security Mission. Pulses fix nitrogen and fetch good MSP.',
    prompt_hi:
      'कृषि विभाग राष्ट्रीय खाद्य सुरक्षा मिशन के तहत इस सीज़न गेहूँ के साथ दालें उगाने की सलाह देता है। दालें नाइट्रोजन स्थिर करती हैं और अच्छा MSP मिलता है।',
    prompt_ta:
      'தேசிய உணவு பாதுகாப்பு இயக்கத்தின் கீழ் இந்த சீசனில் கோதுமையுடன் பருப்பு வகைகளை வளர்க்க விவசாய துறை அறிவுறுத்துகிறது. பருப்புகள் நைட்ரஜனை நிலைப்படுத்தும், நல்ல MSP கிடைக்கும்.',
    left: {
      label: 'Stick to single crop wheat',
      description: 'Familiar, but risky if prices fall.',
    },
    right: {
      label: 'Diversify with pulses',
      description: 'Better soil health and income spread.',
    },
    left_label_hi: 'एकल फसल गेहूँ पर टिके रहें', left_desc_hi: 'परिचित, लेकिन कीमतें गिरने पर जोखिम।',
    right_label_hi: 'दालों के साथ विविधता लाएं', right_desc_hi: 'बेहतर मिट्टी स्वास्थ्य और आय विविधता।',
    left_label_ta: 'ஒற்றை பயிர் கோதுமையில் தொடர்', left_desc_ta: 'பரிச்சயமானது, ஆனால் விலை குறைந்தால் ஆபத்து.',
    right_label_ta: 'பருப்புகளுடன் பல்வகைப்படுத்து', right_desc_ta: 'சிறந்த மண் ஆரோக்கியம் மற்றும் வருமான பரவல்.',
    effectsLeft: {
      family: 0,
      crops: -5,
      finance: 0,
      resilience: -10,
    },
    effectsRight: {
      family: 5,
      crops: 15,
      finance: 10,
      resilience: 15,
    },
    narrator: 'elder',
    tags: ['diversification', 'msp', 'govt_scheme', 'planning'],
    audioKey: 'pre_sowing.diversification',
  },

  // ── 20 New Cards ──
  {
    id: 'pesticide_overuse',
    seasonPhase: 'growing',
    title: 'Pest Attack on Crops',
    title_hi: 'फसल पर कीट हमला',
    title_ta: 'பயிரில் பூச்சி தாக்குதல்',
    prompt:
      'A pest attack is spreading across your field. The agri shop recommends a strong chemical pesticide. Your neighbour suggests calling the Krishi helpline (1800-180-1551) for free advice first.',
    prompt_hi:
      'आपके खेत में कीट हमला फैल रहा है। कृषि दुकान एक तेज़ रासायनिक कीटनाशक की सिफारिश करती है। आपका पड़ोसी पहले मुफ्त सलाह के लिए कृषि हेल्पलाइन (1800-180-1551) पर कॉल करने का सुझाव देता है।',
    prompt_ta:
      'உங்கள் வயலில் பூச்சி தாக்குதல் பரவுகிறது. விவசாய கடை வலுவான இரசாயன பூச்சிக்கொல்லி பரிந்துரைக்கிறது. உங்கள் அண்டை வீட்டார் முதலில் இலவச ஆலோசனைக்கு கிருஷி ஹெல்ப்லைன் (1800-180-1551) அழைக்க பரிந்துரைக்கிறார்.',
    left: {
      label: 'Spray heavy pesticide immediately',
      description: 'Quick fix but costly and harms soil.',
    },
    right: {
      label: 'Call helpline, get proper advice',
      description: 'Free guidance, right treatment.',
    },
    left_label_hi: 'तुरंत तेज़ कीटनाशक छिड़कें', left_desc_hi: 'जल्दी समाधान लेकिन महंगा और मिट्टी को नुकसान।',
    right_label_hi: 'हेल्पलाइन पर कॉल करें, सही सलाह लें', right_desc_hi: 'मुफ्त मार्गदर्शन, सही उपचार।',
    left_label_ta: 'உடனே கடுமையான பூச்சிக்கொல்லி தெளி', left_desc_ta: 'விரைவான தீர்வு ஆனால் விலையுயர்ந்தது, மண்ணை பாதிக்கும்.',
    right_label_ta: 'ஹெல்ப்லைன் அழை, சரியான ஆலோசனை பெறு', right_desc_ta: 'இலவச வழிகாட்டுதல், சரியான சிகிச்சை.',
    effectsLeft: { family: 0, crops: 5, finance: -15, resilience: -10 },
    effectsRight: { family: 0, crops: 15, finance: 5, resilience: 10 },
    narrator: 'elder',
    tags: ['pest', 'crop_management', 'helpline'],
  },
  {
    id: 'child_school_fees',
    seasonPhase: 'off_season',
    title: 'Children\'s School Fees',
    title_hi: 'बच्चों की स्कूल फीस',
    title_ta: 'குழந்தைகளின் பள்ளி கட்டணம்',
    prompt:
      'School fees are due. You can withdraw from your small savings or take a short-term loan from the SHG at low interest.',
    prompt_hi:
      'स्कूल की फीस देनी है। आप अपनी छोटी बचत से निकाल सकते हैं या SHG से कम ब्याज पर अल्पकालिक ऋण ले सकते हैं।',
    prompt_ta:
      'பள்ளி கட்டணம் செலுத்த வேண்டும். உங்கள் சிறிய சேமிப்பிலிருந்து எடுக்கலாம் அல்லது SHG-யிடம் குறைந்த வட்டியில் குறுகிய கால கடன் வாங்கலாம்.',
    left: {
      label: 'Withdraw from savings',
      description: 'Drain the buffer you built.',
    },
    right: {
      label: 'Take SHG loan, keep savings intact',
      description: 'Small interest, but savings stay safe.',
    },
    left_label_hi: 'बचत से निकालें', left_desc_hi: 'बनाया हुआ बफर खाली करें।',
    right_label_hi: 'SHG ऋण लें, बचत बचाएं', right_desc_hi: 'थोड़ा ब्याज, लेकिन बचत सुरक्षित रहती है।',
    left_label_ta: 'சேமிப்பிலிருந்து எடு', left_desc_ta: 'கட்டிய இருப்பை காலி செய்.',
    right_label_ta: 'SHG கடன் வாங்கு, சேமிப்பை காப்பாற்று', right_desc_ta: 'சிறிய வட்டி, ஆனால் சேமிப்பு பாதுகாப்பாக இருக்கும்.',
    effectsLeft: { family: 10, crops: 0, finance: -15, resilience: -10 },
    effectsRight: { family: 10, crops: 0, finance: -5, resilience: 5 },
    narrator: 'self',
    tags: ['education', 'savings', 'family'],
  },
  {
    id: 'tractor_rental',
    seasonPhase: 'pre_sowing',
    title: 'Tractor for Ploughing',
    title_hi: 'जुताई के लिए ट्रैक्टर',
    title_ta: 'உழவுக்கு டிராக்டர்',
    prompt:
      'Ploughing season is here. You can rent a tractor from a neighbour at ₹1,200/hour or use bullocks which is slower but free.',
    prompt_hi:
      'जुताई का मौसम आ गया है। आप पड़ोसी से ₹1,200/घंटे पर ट्रैक्टर किराए पर ले सकते हैं या बैलों का उपयोग कर सकते हैं जो धीमा है लेकिन मुफ्त है।',
    prompt_ta:
      'உழவு காலம் வந்துவிட்டது. அண்டை வீட்டாரிடம் ₹1,200/மணி நேரத்திற்கு டிராக்டர் வாடகைக்கு எடுக்கலாம் அல்லது மாடுகளை பயன்படுத்தலாம், அது மெதுவாக இருக்கும் ஆனால் இலவசம்.',
    left: {
      label: 'Use bullocks, save money',
      description: 'Slower, but no cash outflow.',
    },
    right: {
      label: 'Rent tractor, finish faster',
      description: 'Costs money but saves time and effort.',
    },
    left_label_hi: 'बैलों का उपयोग करें, पैसे बचाएं', left_desc_hi: 'धीमा, लेकिन नकद खर्च नहीं।',
    right_label_hi: 'ट्रैक्टर किराए पर लें, जल्दी खत्म करें', right_desc_hi: 'पैसे लगते हैं लेकिन समय और मेहनत बचती है।',
    left_label_ta: 'மாடுகளை பயன்படுத்து, பணம் சேமி', left_desc_ta: 'மெதுவாக, ஆனால் பணம் செலவில்லை.',
    right_label_ta: 'டிராக்டர் வாடகை, விரைவாக முடி', right_desc_ta: 'பணம் செலவாகும் ஆனால் நேரம் மற்றும் முயற்சி மிச்சம்.',
    effectsLeft: { family: -5, crops: 5, finance: 10, resilience: 0 },
    effectsRight: { family: 5, crops: 15, finance: -10, resilience: 5 },
    narrator: 'self',
    tags: ['mechanisation', 'planning', 'cost'],
  },
  {
    id: 'msp_awareness',
    seasonPhase: 'harvest',
    title: 'MSP or Open Market?',
    title_hi: 'MSP या खुला बाज़ार?',
    title_ta: 'MSP அல்லது திறந்த சந்தை?',
    prompt:
      'Government procurement at MSP is open at the nearby mandi. A private trader offers ₹50 more per quintal but wants you to sign a contract with delayed payment.',
    prompt_hi:
      'पास की मंडी में MSP पर सरकारी खरीद खुली है। एक निजी व्यापारी प्रति क्विंटल ₹50 अधिक देता है लेकिन देरी से भुगतान के साथ अनुबंध पर हस्ताक्षर करना चाहता है।',
    prompt_ta:
      'அருகிலுள்ள மண்டியில் MSP விலையில் அரசு கொள்முதல் திறந்திருக்கிறது. ஒரு தனியார் வியாபாரி குவிண்டாலுக்கு ₹50 அதிகம் தருகிறார் ஆனால் தாமதமான கட்டணத்துடன் ஒப்பந்தம் கையெழுத்திட வேண்டும்.',
    left: {
      label: 'Sell to private trader for more',
      description: 'Higher price but payment risk.',
    },
    right: {
      label: 'Sell at MSP, guaranteed payment',
      description: 'Slightly lower but safe and immediate.',
    },
    left_label_hi: 'अधिक के लिए निजी व्यापारी को बेचें', left_desc_hi: 'अधिक कीमत लेकिन भुगतान जोखिम।',
    right_label_hi: 'MSP पर बेचें, गारंटीड भुगतान', right_desc_hi: 'थोड़ा कम लेकिन सुरक्षित और तत्काल।',
    left_label_ta: 'அதிகத்திற்கு தனியார் வியாபாரிக்கு விற்று', left_desc_ta: 'அதிக விலை ஆனால் கட்டண ஆபத்து.',
    right_label_ta: 'MSP-ல் விற்று, உத்தரவாத கட்டணம்', right_desc_ta: 'சற்று குறைவு ஆனால் பாதுகாப்பான மற்றும் உடனடி.',
    effectsLeft: { family: 0, crops: 0, finance: 10, resilience: -15 },
    effectsRight: { family: 5, crops: 0, finance: 10, resilience: 15 },
    narrator: 'bank_mitr',
    tags: ['msp', 'harvest', 'market_access'],
  },
  {
    id: 'water_sharing_dispute',
    seasonPhase: 'growing',
    title: 'Water Canal Dispute',
    title_hi: 'पानी नहर विवाद',
    title_ta: 'நீர் கால்வாய் தகராறு',
    prompt:
      'Your neighbour is blocking the irrigation canal that feeds your field. You can confront him directly or report to the Gram Panchayat for mediation.',
    prompt_hi:
      'आपका पड़ोसी उस सिंचाई नहर को बंद कर रहा है जो आपके खेत को पानी देती है। आप सीधे उससे बात कर सकते हैं या मध्यस्थता के लिए ग्राम पंचायत को रिपोर्ट कर सकते हैं।',
    prompt_ta:
      'உங்கள் அண்டை வீட்டார் உங்கள் வயலுக்கு தண்ணீர் வழங்கும் பாசன கால்வாயை தடுக்கிறார். நேரடியாக அவரிடம் பேசலாம் அல்லது மத்தியஸ்தத்திற்கு கிராம பஞ்சாயத்தில் புகார் செய்யலாம்.',
    left: {
      label: 'Confront neighbour directly',
      description: 'Faster but risks conflict and stress.',
    },
    right: {
      label: 'Report to Gram Panchayat',
      description: 'Slower but peaceful resolution.',
    },
    left_label_hi: 'पड़ोसी से सीधे बात करें', left_desc_hi: 'तेज़ लेकिन संघर्ष और तनाव का जोखिम।',
    right_label_hi: 'ग्राम पंचायत को रिपोर्ट करें', right_desc_hi: 'धीमा लेकिन शांतिपूर्ण समाधान।',
    left_label_ta: 'அண்டை வீட்டாரை நேரடியாக எதிர்கொள்', left_desc_ta: 'விரைவானது ஆனால் மோதல் மற்றும் மன அழுத்தம் ஆபத்து.',
    right_label_ta: 'கிராம பஞ்சாயத்தில் புகார் செய்', right_desc_ta: 'மெதுவாக ஆனால் அமைதியான தீர்வு.',
    effectsLeft: { family: -10, crops: 5, finance: 0, resilience: -10 },
    effectsRight: { family: 5, crops: 10, finance: 0, resilience: 10 },
    narrator: 'elder',
    tags: ['water', 'conflict', 'community'],
  },
  {
    id: 'organic_farming_switch',
    seasonPhase: 'pre_sowing',
    title: 'Switch to Organic Farming',
    title_hi: 'जैविक खेती पर स्विच करें',
    title_ta: 'இயற்கை விவசாயத்திற்கு மாறு',
    prompt:
      'An NGO offers training and certification support for organic farming under Paramparagat Krishi Vikas Yojana. First year yield may drop but premium prices follow.',
    prompt_hi:
      'एक NGO परंपरागत कृषि विकास योजना के तहत जैविक खेती के लिए प्रशिक्षण और प्रमाणन सहायता प्रदान करता है। पहले साल उपज कम हो सकती है लेकिन बाद में प्रीमियम कीमतें मिलती हैं।',
    prompt_ta:
      'ஒரு NGO பரம்பரகத் கிருஷி விகாஸ் யோஜனா திட்டத்தின் கீழ் இயற்கை விவசாயத்திற்கு பயிற்சி மற்றும் சான்றிதழ் ஆதரவு வழங்குகிறது. முதல் ஆண்டு மகசூல் குறையலாம் ஆனால் பிரீமியம் விலைகள் கிடைக்கும்.',
    left: {
      label: 'Stay with conventional farming',
      description: 'Predictable yield, no transition risk.',
    },
    right: {
      label: 'Start organic transition',
      description: 'Short-term pain, long-term premium.',
    },
    left_label_hi: 'पारंपरिक खेती जारी रखें', left_desc_hi: 'अनुमानित उपज, कोई बदलाव जोखिम नहीं।',
    right_label_hi: 'जैविक बदलाव शुरू करें', right_desc_hi: 'अल्पकालिक दर्द, दीर्घकालिक प्रीमियम।',
    left_label_ta: 'வழக்கமான விவசாயத்தில் தொடர்', left_desc_ta: 'கணிக்கக்கூடிய மகசூல், மாற்ற ஆபத்து இல்லை.',
    right_label_ta: 'இயற்கை மாற்றம் தொடங்கு', right_desc_ta: 'குறுகிய கால வலி, நீண்டகால பிரீமியம்.',
    effectsLeft: { family: 0, crops: 5, finance: 5, resilience: -5 },
    effectsRight: { family: 5, crops: -10, finance: -5, resilience: 20 },
    narrator: 'bank_mitr',
    tags: ['organic', 'pkvy', 'govt_scheme', 'long_term'],
  },
  {
    id: 'hailstorm_damage',
    seasonPhase: 'growing',
    title: 'Hailstorm Hits the Field',
    title_hi: 'खेत में ओलावृष्टि',
    title_ta: 'வயலில் ஆலங்கட்டி மழை',
    prompt:
      'Unexpected hailstorm damages 30% of your standing crop. You can file a claim under PMFBY if you enrolled, or absorb the loss and move on.',
    prompt_hi:
      'अप्रत्याशित ओलावृष्टि आपकी खड़ी फसल का 30% नुकसान करती है। अगर आपने नामांकन किया है तो PMFBY के तहत दावा दायर कर सकते हैं, या नुकसान सहकर आगे बढ़ सकते हैं।',
    prompt_ta:
      'எதிர்பாராத ஆலங்கட்டி மழை உங்கள் நிற்கும் பயிரில் 30% சேதம் செய்கிறது. நீங்கள் பதிவு செய்திருந்தால் PMFBY திட்டத்தின் கீழ் கோரிக்கை தாக்கல் செய்யலாம், அல்லது இழப்பை ஏற்று முன்னேறலாம்.',
    left: {
      label: 'Absorb the loss, no insurance',
      description: 'You skipped insurance this season.',
    },
    right: {
      label: 'File PMFBY claim immediately',
      description: 'Get compensated for the damage.',
    },
    left_label_hi: 'नुकसान सहें, बीमा नहीं', left_desc_hi: 'आपने इस सीज़न बीमा छोड़ा था।',
    right_label_hi: 'तुरंत PMFBY दावा दायर करें', right_desc_hi: 'नुकसान का मुआवज़ा पाएं।',
    left_label_ta: 'இழப்பை ஏற்று, காப்பீடு இல்லை', left_desc_ta: 'இந்த சீசனில் காப்பீடு தவிர்த்தீர்கள்.',
    right_label_ta: 'உடனே PMFBY கோரிக்கை தாக்கல் செய்', right_desc_ta: 'சேதத்திற்கு இழப்பீடு பெறு.',
    effectsLeft: { family: -10, crops: -20, finance: -15, resilience: -15 },
    effectsRight: { family: 5, crops: -5, finance: 10, resilience: 10 },
    narrator: 'self',
    tags: ['pmfby', 'insurance', 'weather_shock'],
  },
  {
    id: 'mobile_banking',
    seasonPhase: 'off_season',
    title: 'Mobile Banking Setup',
    title_hi: 'मोबाइल बैंकिंग सेटअप',
    title_ta: 'மொபைல் பேங்கிங் அமைப்பு',
    prompt:
      'A Bank Mitr visits and offers to set up mobile banking on your phone so you can check balance, transfer money, and receive PM-KISAN without visiting the branch.',
    prompt_hi:
      'एक बैंक मित्र आता है और आपके फोन पर मोबाइल बैंकिंग सेट करने की पेशकश करता है ताकि आप शाखा जाए बिना बैलेंस चेक कर सकें, पैसे ट्रांसफर कर सकें और PM-KISAN प्राप्त कर सकें।',
    prompt_ta:
      'ஒரு வங்கி மித்ர் வந்து உங்கள் தொலைபேசியில் மொபைல் பேங்கிங் அமைக்க வழங்குகிறார், இதனால் கிளைக்கு செல்லாமல் இருப்பு சரிபார்க்கலாம், பணம் அனுப்பலாம், PM-KISAN பெறலாம்.',
    left: {
      label: 'Decline, prefer branch visits',
      description: 'Familiar but time-consuming.',
    },
    right: {
      label: 'Set up mobile banking',
      description: 'Convenient and faster access to money.',
    },
    left_label_hi: 'मना करें, शाखा जाना पसंद करें', left_desc_hi: 'परिचित लेकिन समय लेने वाला।',
    right_label_hi: 'मोबाइल बैंकिंग सेट करें', right_desc_hi: 'सुविधाजनक और पैसों तक तेज़ पहुंच।',
    left_label_ta: 'மறு, கிளை வருகையை விரும்பு', left_desc_ta: 'பரிச்சயமானது ஆனால் நேரம் எடுக்கும்.',
    right_label_ta: 'மொபைல் பேங்கிங் அமை', right_desc_ta: 'வசதியான மற்றும் பணத்திற்கு விரைவான அணுகல்.',
    effectsLeft: { family: 0, crops: 0, finance: -5, resilience: -5 },
    effectsRight: { family: 5, crops: 0, finance: 10, resilience: 15 },
    narrator: 'bank_mitr',
    tags: ['digital', 'banking', 'financial_inclusion'],
  },
  {
    id: 'labour_shortage',
    seasonPhase: 'harvest',
    title: 'Harvest Labour Shortage',
    title_hi: 'कटाई मज़दूरों की कमी',
    title_ta: 'அறுவடை தொழிலாளர் பற்றாக்குறை',
    prompt:
      'Many farm labourers have gone to the city for MGNREGA work. You can hire expensive migrant labour or rent a harvesting machine from the FPO.',
    prompt_hi:
      'कई खेत मजदूर MGNREGA काम के लिए शहर चले गए हैं। आप महंगे प्रवासी मजदूर रख सकते हैं या FPO से हार्वेस्टिंग मशीन किराए पर ले सकते हैं।',
    prompt_ta:
      'பல விவசாய தொழிலாளர்கள் MGNREGA வேலைக்காக நகரத்திற்கு சென்றுவிட்டனர். விலையுயர்ந்த புலம்பெயர் தொழிலாளர்களை வேலைக்கு அமர்த்தலாம் அல்லது FPO-விடம் அறுவடை இயந்திரம் வாடகைக்கு எடுக்கலாம்.',
    left: {
      label: 'Hire expensive migrant labour',
      description: 'Gets done but costs much more.',
    },
    right: {
      label: 'Rent harvester from FPO',
      description: 'Efficient and cheaper per acre.',
    },
    left_label_hi: 'महंगे प्रवासी मजदूर रखें', left_desc_hi: 'काम हो जाएगा लेकिन बहुत अधिक लागत।',
    right_label_hi: 'FPO से हार्वेस्टर किराए पर लें', right_desc_hi: 'कुशल और प्रति एकड़ सस्ता।',
    left_label_ta: 'விலையுயர்ந்த புலம்பெயர் தொழிலாளர் வேலைக்கு அமர்த்து', left_desc_ta: 'வேலை முடியும் ஆனால் மிக அதிக செலவு.',
    right_label_ta: 'FPO-விடம் அறுவடை இயந்திரம் வாடகை', right_desc_ta: 'திறமையான மற்றும் ஏக்கருக்கு மலிவானது.',
    effectsLeft: { family: 5, crops: 10, finance: -20, resilience: -5 },
    effectsRight: { family: 0, crops: 15, finance: -5, resilience: 10 },
    narrator: 'self',
    tags: ['labour', 'mechanisation', 'fpo'],
  },
  {
    id: 'fpo_membership',
    seasonPhase: 'off_season',
    title: 'Join Farmer Producer Organisation',
    title_hi: 'किसान उत्पादक संगठन में शामिल हों',
    title_ta: 'விவசாயி உற்பத்தியாளர் அமைப்பில் சேரு',
    prompt:
      'A Farmer Producer Organisation (FPO) is forming in your block. Membership costs ₹500 but gives access to bulk input buying, storage, and collective bargaining.',
    prompt_hi:
      'आपके ब्लॉक में एक किसान उत्पादक संगठन (FPO) बन रहा है। सदस्यता ₹500 है लेकिन थोक इनपुट खरीद, भंडारण और सामूहिक सौदेबाजी की सुविधा मिलती है।',
    prompt_ta:
      'உங்கள் பகுதியில் ஒரு விவசாயி உற்பத்தியாளர் அமைப்பு (FPO) உருவாகிறது. உறுப்பினர் கட்டணம் ₹500 ஆனால் மொத்த உள்ளீடு கொள்முதல், சேமிப்பு மற்றும் கூட்டு பேரம் பேசும் வாய்ப்பு கிடைக்கும்.',
    left: {
      label: 'Skip FPO, farm independently',
      description: 'No cost, but no collective benefit.',
    },
    right: {
      label: 'Join FPO, pay membership',
      description: 'Small cost, big long-term gains.',
    },
    left_label_hi: 'FPO छोड़ें, स्वतंत्र रूप से खेती करें', left_desc_hi: 'कोई लागत नहीं, लेकिन सामूहिक लाभ भी नहीं।',
    right_label_hi: 'FPO में शामिल हों, सदस्यता दें', right_desc_hi: 'छोटी लागत, बड़े दीर्घकालिक लाभ।',
    left_label_ta: 'FPO தவிர், சுதந்திரமாக விவசாயம் செய்', left_desc_ta: 'செலவு இல்லை, ஆனால் கூட்டு நன்மையும் இல்லை.',
    right_label_ta: 'FPO-ல் சேர், உறுப்பினர் கட்டணம் செலுத்து', right_desc_ta: 'சிறிய செலவு, பெரிய நீண்டகால ஆதாயம்.',
    effectsLeft: { family: 0, crops: 0, finance: 5, resilience: -10 },
    effectsRight: { family: 10, crops: 10, finance: 10, resilience: 20 },
    narrator: 'bank_mitr',
    tags: ['fpo', 'collective', 'market_access', 'govt_scheme'],
  },
  {
    id: 'groundwater_depletion',
    seasonPhase: 'sowing',
    title: 'Borewell Running Dry',
    title_hi: 'बोरवेल सूख रहा है',
    title_ta: 'போர்வெல் வறண்டு போகிறது',
    prompt:
      'Your borewell water level is dropping. You can dig deeper at high cost or switch to a less water-intensive crop this season.',
    prompt_hi:
      'आपके बोरवेल का जल स्तर गिर रहा है। आप अधिक लागत पर गहरा खोद सकते हैं या इस सीज़न कम पानी वाली फसल पर स्विच कर सकते हैं।',
    prompt_ta:
      'உங்கள் போர்வெல் நீர் மட்டம் குறைகிறது. அதிக செலவில் ஆழமாக தோண்டலாம் அல்லது இந்த சீசனில் குறைந்த தண்ணீர் தேவைப்படும் பயிருக்கு மாறலாம்.',
    left: {
      label: 'Dig deeper borewell',
      description: 'Expensive and uncertain outcome.',
    },
    right: {
      label: 'Switch to low-water crop',
      description: 'Saves water and reduces risk.',
    },
    left_label_hi: 'गहरा बोरवेल खोदें', left_desc_hi: 'महंगा और अनिश्चित परिणाम।',
    right_label_hi: 'कम पानी वाली फसल पर स्विच करें', right_desc_hi: 'पानी बचाता है और जोखिम कम करता है।',
    left_label_ta: 'ஆழமான போர்வெல் தோண்டு', left_desc_ta: 'விலையுயர்ந்தது மற்றும் நிச்சயமற்ற முடிவு.',
    right_label_ta: 'குறைந்த தண்ணீர் பயிருக்கு மாறு', right_desc_ta: 'தண்ணீர் சேமிக்கும், ஆபத்தை குறைக்கும்.',
    effectsLeft: { family: 0, crops: 10, finance: -25, resilience: -10 },
    effectsRight: { family: 0, crops: 5, finance: 5, resilience: 15 },
    narrator: 'elder',
    tags: ['water', 'climate', 'crop_management'],
  },
  {
    id: 'agri_app_advisory',
    seasonPhase: 'growing',
    title: 'Kisan Suvidha App Alert',
    title_hi: 'किसान सुविधा ऐप अलर्ट',
    title_ta: 'கிசான் சுவிதா ஆப் எச்சரிக்கை',
    prompt:
      'The Kisan Suvidha app sends an alert warning of disease risk in your crop type this week. Acting now costs ₹2,000 in preventive spray. Ignoring it is free.',
    prompt_hi:
      'किसान सुविधा ऐप इस हफ्ते आपकी फसल के प्रकार में बीमारी के जोखिम की चेतावनी भेजता है। अभी कार्रवाई करने पर निवारक स्प्रे में ₹2,000 लगेंगे। इसे नज़रअंदाज़ करना मुफ्त है।',
    prompt_ta:
      'கிசான் சுவிதா ஆப் இந்த வாரம் உங்கள் பயிர் வகையில் நோய் அபாயம் குறித்து எச்சரிக்கை அனுப்புகிறது. இப்போது நடவடிக்கை எடுக்க தடுப்பு தெளிப்புக்கு ₹2,000 செலவாகும். புறக்கணிப்பது இலவசம்.',
    left: {
      label: 'Ignore the alert, save money',
      description: 'Risk disease spreading to full crop.',
    },
    right: {
      label: 'Act on alert, spray preventively',
      description: 'Small cost prevents big loss.',
    },
    left_label_hi: 'अलर्ट नज़रअंदाज़ करें, पैसे बचाएं', left_desc_hi: 'पूरी फसल में बीमारी फैलने का जोखिम।',
    right_label_hi: 'अलर्ट पर कार्रवाई करें, निवारक स्प्रे करें', right_desc_hi: 'छोटी लागत बड़े नुकसान से बचाती है।',
    left_label_ta: 'எச்சரிக்கையை புறக்கணி, பணம் சேமி', left_desc_ta: 'முழு பயிரிலும் நோய் பரவும் ஆபத்து.',
    right_label_ta: 'எச்சரிக்கையில் நடவடிக்கை எடு, தடுப்பு தெளி', right_desc_ta: 'சிறிய செலவு பெரிய இழப்பை தடுக்கும்.',
    effectsLeft: { family: 0, crops: -20, finance: 5, resilience: -10 },
    effectsRight: { family: 0, crops: 15, finance: -10, resilience: 10 },
    narrator: 'bank_mitr',
    tags: ['digital', 'crop_management', 'advisory'],
  },
  {
    id: 'land_lease',
    seasonPhase: 'pre_sowing',
    title: 'Lease Extra Land',
    title_hi: 'अतिरिक्त ज़मीन पट्टे पर लें',
    title_ta: 'கூடுதல் நிலம் குத்தகைக்கு எடு',
    prompt:
      'A neighbour is migrating to the city and offers to lease his 2 acres to you at ₹8,000/acre per season. More land means more income but also more risk and input cost.',
    prompt_hi:
      'एक पड़ोसी शहर जा रहा है और अपनी 2 एकड़ ज़मीन ₹8,000/एकड़ प्रति सीज़न पर पट्टे पर देने की पेशकश करता है। अधिक ज़मीन का मतलब अधिक आय लेकिन अधिक जोखिम और लागत भी।',
    prompt_ta:
      'ஒரு அண்டை வீட்டார் நகரத்திற்கு குடிபெயர்கிறார், தனது 2 ஏக்கரை சீசனுக்கு ₹8,000/ஏக்கர் விலையில் குத்தகைக்கு தர வழங்குகிறார். அதிக நிலம் என்பது அதிக வருமானம் ஆனால் அதிக ஆபத்தும் செலவும்.',
    left: {
      label: 'Decline, manage current land only',
      description: 'Less risk, less reward.',
    },
    right: {
      label: 'Lease the land, expand farming',
      description: 'More income potential but higher cost.',
    },
    left_label_hi: 'मना करें, मौजूदा ज़मीन ही संभालें', left_desc_hi: 'कम जोखिम, कम इनाम।',
    right_label_hi: 'ज़मीन पट्टे पर लें, खेती बढ़ाएं', right_desc_hi: 'अधिक आय की संभावना लेकिन अधिक लागत।',
    left_label_ta: 'மறு, தற்போதைய நிலத்தை மட்டும் நிர்வகி', left_desc_ta: 'குறைந்த ஆபத்து, குறைந்த பலன்.',
    right_label_ta: 'நிலம் குத்தகை, விவசாயம் விரிவாக்கு', right_desc_ta: 'அதிக வருமான சாத்தியம் ஆனால் அதிக செலவு.',
    effectsLeft: { family: 0, crops: 0, finance: 5, resilience: 5 },
    effectsRight: { family: 0, crops: 15, finance: -15, resilience: -5 },
    narrator: 'self',
    tags: ['land', 'expansion', 'risk'],
  },
  {
    id: 'cold_storage_access',
    seasonPhase: 'harvest',
    title: 'Cold Storage for Vegetables',
    title_hi: 'सब्ज़ियों के लिए शीत भंडारण',
    title_ta: 'காய்கறிகளுக்கு குளிர் சேமிப்பு',
    prompt:
      'You grew tomatoes this season. Prices are low now but a cold storage facility 10 km away can preserve them for 3 weeks at ₹500/quintal.',
    prompt_hi:
      'आपने इस सीज़न टमाटर उगाए। अभी कीमतें कम हैं लेकिन 10 किमी दूर एक शीत भंडारण सुविधा ₹500/क्विंटल पर 3 हफ्ते तक उन्हें संरक्षित कर सकती है।',
    prompt_ta:
      'இந்த சீசனில் தக்காளி வளர்த்தீர்கள். இப்போது விலைகள் குறைவாக உள்ளன ஆனால் 10 கிமீ தூரத்தில் உள்ள குளிர் சேமிப்பு வசதி ₹500/குவிண்டாலில் 3 வாரங்கள் பாதுகாக்கும்.',
    left: {
      label: 'Sell now at low price',
      description: 'Avoid storage cost and transport.',
    },
    right: {
      label: 'Store and wait for price rise',
      description: 'Pay storage, hope prices recover.',
    },
    left_label_hi: 'अभी कम कीमत पर बेचें', left_desc_hi: 'भंडारण लागत और परिवहन से बचें।',
    right_label_hi: 'रखें और कीमत बढ़ने का इंतज़ार करें', right_desc_hi: 'भंडारण दें, उम्मीद है कीमतें बढ़ेंगी।',
    left_label_ta: 'இப்போது குறைந்த விலையில் விற்று', left_desc_ta: 'சேமிப்பு செலவு மற்றும் போக்குவரத்து தவிர்.',
    right_label_ta: 'சேமி, விலை உயர்வுக்கு காத்திரு', right_desc_ta: 'சேமிப்பு செலுத்து, விலை ஏறும் என நம்பு.',
    effectsLeft: { family: 0, crops: 0, finance: -10, resilience: -5 },
    effectsRight: { family: 0, crops: 0, finance: 15, resilience: 10 },
    narrator: 'self',
    tags: ['cold_storage', 'vegetables', 'post_harvest'],
  },
  {
    id: 'fake_agri_loan_app',
    seasonPhase: 'pre_sowing',
    title: 'Instant Loan App for Farmers',
    title_hi: 'किसानों के लिए तत्काल ऋण ऐप',
    title_ta: 'விவசாயிகளுக்கு உடனடி கடன் ஆப்',
    prompt:
      'An ad on your phone offers instant ₹50,000 "Kisan Loan" in 10 minutes with no documents. The app asks for your Aadhaar and bank details upfront.',
    prompt_hi:
      'आपके फोन पर एक विज्ञापन बिना दस्तावेज़ के 10 मिनट में तत्काल ₹50,000 "किसान ऋण" की पेशकश करता है। ऐप पहले आपका आधार और बैंक विवरण माँगता है।',
    prompt_ta:
      'உங்கள் தொலைபேசியில் ஒரு விளம்பரம் ஆவணங்கள் இல்லாமல் 10 நிமிடத்தில் உடனடி ₹50,000 "கிசான் கடன்" வழங்குகிறது. ஆப் முதலில் உங்கள் ஆதார் மற்றும் வங்கி விவரங்களை கேட்கிறது.',
    left: {
      label: 'Apply on the app immediately',
      description: 'Sounds easy but could be a scam.',
    },
    right: {
      label: 'Ignore, visit your bank instead',
      description: 'Safer, even if slower.',
    },
    left_label_hi: 'ऐप पर तुरंत आवेदन करें', left_desc_hi: 'आसान लगता है लेकिन धोखाधड़ी हो सकती है।',
    right_label_hi: 'नज़रअंदाज़ करें, बैंक जाएं', right_desc_hi: 'सुरक्षित, भले ही धीमा हो।',
    left_label_ta: 'ஆப்பில் உடனே விண்ணப்பி', left_desc_ta: 'எளிதாக தெரிகிறது ஆனால் மோசடியாக இருக்கலாம்.',
    right_label_ta: 'புறக்கணி, வங்கிக்கு செல்', right_desc_ta: 'பாதுகாப்பானது, மெதுவாக இருந்தாலும்.',
    effectsLeft: { family: -15, crops: 0, finance: -30, resilience: -20 },
    effectsRight: { family: 5, crops: 0, finance: 10, resilience: 20 },
    narrator: 'scammer',
    tags: ['fraud', 'digital_safety', 'loan'],
    triggerDebtTrap: true,
  },
  {
    id: 'rainwater_harvesting',
    seasonPhase: 'off_season',
    title: 'Rainwater Harvesting Pit',
    title_hi: 'वर्षा जल संचयन गड्ढा',
    title_ta: 'மழை நீர் சேகரிப்பு குழி',
    prompt:
      'NABARD offers 50% subsidy to build a farm pond for rainwater harvesting. It will reduce dependence on borewell and help in dry spells.',
    prompt_hi:
      'NABARD वर्षा जल संचयन के लिए खेत तालाब बनाने पर 50% सब्सिडी देता है। इससे बोरवेल पर निर्भरता कम होगी और सूखे के दौरान मदद मिलेगी।',
    prompt_ta:
      'NABARD மழை நீர் சேகரிப்புக்கு பண்ணை குளம் கட்ட 50% மானியம் வழங்குகிறது. இது போர்வெல் சார்பை குறைக்கும், வறட்சி காலத்தில் உதவும்.',
    left: {
      label: 'Skip, no time for construction',
      description: 'Avoid disruption this season.',
    },
    right: {
      label: 'Build farm pond with subsidy',
      description: 'Long-term water security.',
    },
    left_label_hi: 'छोड़ें, निर्माण का समय नहीं', left_desc_hi: 'इस सीज़न व्यवधान से बचें।',
    right_label_hi: 'सब्सिडी से खेत तालाब बनाएं', right_desc_hi: 'दीर्घकालिक जल सुरक्षा।',
    left_label_ta: 'தவிர், கட்டுமானத்திற்கு நேரம் இல்லை', left_desc_ta: 'இந்த சீசனில் இடையூறு தவிர்.',
    right_label_ta: 'மானியத்துடன் பண்ணை குளம் கட்டு', right_desc_ta: 'நீண்டகால நீர் பாதுகாப்பு.',
    effectsLeft: { family: 0, crops: -5, finance: 5, resilience: -15 },
    effectsRight: { family: 0, crops: 10, finance: -5, resilience: 25 },
    narrator: 'bank_mitr',
    tags: ['water', 'nabard', 'climate', 'govt_scheme'],
  },
  {
    id: 'crop_loan_waiver_rumour',
    seasonPhase: 'off_season',
    title: 'Loan Waiver Rumour',
    title_hi: 'ऋण माफी की अफवाह',
    title_ta: 'கடன் தள்ளுபடி வதந்தி',
    prompt:
      'There is a rumour that the government will announce a farm loan waiver before elections. Some farmers are stopping repayments to wait. Your KCC repayment is due.',
    prompt_hi:
      'अफवाह है कि सरकार चुनाव से पहले कृषि ऋण माफी की घोषणा करेगी। कुछ किसान इंतज़ार के लिए भुगतान रोक रहे हैं। आपकी KCC चुकौती देय है।',
    prompt_ta:
      'தேர்தலுக்கு முன் அரசு விவசாய கடன் தள்ளுபடி அறிவிக்கும் என்று வதந்தி உள்ளது. சில விவசாயிகள் காத்திருக்க திருப்பிச் செலுத்துவதை நிறுத்துகிறார்கள். உங்கள் KCC திருப்பிச் செலுத்தும் தேதி வந்துவிட்டது.',
    left: {
      label: 'Stop repayment, wait for waiver',
      description: 'Risk your credit score on a rumour.',
    },
    right: {
      label: 'Repay on time, stay safe',
      description: 'Protect credit history regardless.',
    },
    left_label_hi: 'चुकौती रोकें, माफी का इंतज़ार करें', left_desc_hi: 'अफवाह पर अपना क्रेडिट स्कोर जोखिम में डालें।',
    right_label_hi: 'समय पर चुकाएं, सुरक्षित रहें', right_desc_hi: 'चाहे कुछ भी हो, क्रेडिट इतिहास बचाएं।',
    left_label_ta: 'திருப்பிச் செலுத்துவதை நிறுத்து, தள்ளுபடிக்கு காத்திரு', left_desc_ta: 'வதந்தியில் உங்கள் கடன் மதிப்பை ஆபத்தில் போடு.',
    right_label_ta: 'சரியான நேரத்தில் திருப்பிச் செலுத்து, பாதுகாப்பாக இரு', right_desc_ta: 'எப்படியிருந்தாலும் கடன் வரலாற்றை காப்பாற்று.',
    effectsLeft: { family: 0, crops: 0, finance: -20, resilience: -20 },
    effectsRight: { family: 0, crops: 0, finance: 10, resilience: 15 },
    narrator: 'elder',
    tags: ['loan_waiver', 'credit', 'risk'],
    triggerDebtTrap: true,
  },
  {
    id: 'custom_hiring_centre',
    seasonPhase: 'sowing',
    title: 'Custom Hiring Centre',
    title_hi: 'कस्टम हायरिंग सेंटर',
    title_ta: 'கஸ்டம் ஹையரிங் சென்டர்',
    prompt:
      'A government-supported Custom Hiring Centre has opened nearby offering tractors, seeders, and sprayers at subsidised rental. You usually borrow from a landlord.',
    prompt_hi:
      'पास में एक सरकार समर्थित कस्टम हायरिंग सेंटर खुला है जो सब्सिडी वाले किराए पर ट्रैक्टर, सीडर और स्प्रेयर देता है। आप आमतौर पर जमींदार से उधार लेते हैं।',
    prompt_ta:
      'அருகில் ஒரு அரசு ஆதரவு கஸ்டம் ஹையரிங் சென்டர் திறந்துள்ளது, மானிய வாடகையில் டிராக்டர்கள், விதைப்பான்கள், தெளிப்பான்கள் வழங்குகிறது. நீங்கள் வழக்கமாக நிலப்பிரபுவிடம் கடன் வாங்குவீர்கள்.',
    left: {
      label: 'Borrow from landlord as usual',
      description: 'Familiar but creates obligation.',
    },
    right: {
      label: 'Use Custom Hiring Centre',
      description: 'Fair price, no social obligation.',
    },
    left_label_hi: 'हमेशा की तरह जमींदार से उधार लें', left_desc_hi: 'परिचित लेकिन दायित्व बनाता है।',
    right_label_hi: 'कस्टम हायरिंग सेंटर का उपयोग करें', right_desc_hi: 'उचित कीमत, कोई सामाजिक दायित्व नहीं।',
    left_label_ta: 'வழக்கம் போல் நிலப்பிரபுவிடம் கடன் வாங்கு', left_desc_ta: 'பரிச்சயமானது ஆனால் கடமை உருவாக்கும்.',
    right_label_ta: 'கஸ்டம் ஹையரிங் சென்டர் பயன்படுத்து', right_desc_ta: 'நியாயமான விலை, சமூக கடமை இல்லை.',
    effectsLeft: { family: -5, crops: 5, finance: 0, resilience: -10 },
    effectsRight: { family: 5, crops: 10, finance: -5, resilience: 15 },
    narrator: 'bank_mitr',
    tags: ['mechanisation', 'chc', 'govt_scheme'],
  },
  {
    id: 'ayushman_bharat',
    seasonPhase: 'growing',
    title: 'Ayushman Bharat Card',
    title_hi: 'आयुष्मान भारत कार्ड',
    title_ta: 'ஆயுஷ்மான் பாரத் அட்டை',
    prompt:
      'Your wife needs a minor surgery. You can use the Ayushman Bharat PM-JAY card at an empanelled hospital for free treatment, or go to a private clinic and pay ₹30,000.',
    prompt_hi:
      'आपकी पत्नी को एक छोटी सर्जरी की ज़रूरत है। आप एक सूचीबद्ध अस्पताल में मुफ्त इलाज के लिए आयुष्मान भारत PM-JAY कार्ड का उपयोग कर सकते हैं, या निजी क्लिनिक जाकर ₹30,000 दे सकते हैं।',
    prompt_ta:
      'உங்கள் மனைவிக்கு சிறிய அறுவை சிகிச்சை தேவை. பட்டியலிடப்பட்ட மருத்துவமனையில் இலவச சிகிச்சைக்கு ஆயுஷ்மான் பாரத் PM-JAY அட்டை பயன்படுத்தலாம், அல்லது தனியார் கிளினிக்கில் ₹30,000 செலுத்தலாம்.',
    left: {
      label: 'Pay at private clinic quickly',
      description: 'Faster but drains savings.',
    },
    right: {
      label: 'Use Ayushman Bharat card',
      description: 'Free treatment, just needs the card.',
    },
    left_label_hi: 'प्राइवेट क्लिनिक में जल्दी दें', left_desc_hi: 'तेज़ लेकिन बचत खाली हो जाती है।',
    right_label_hi: 'आयुष्मान भारत कार्ड का उपयोग करें', right_desc_hi: 'मुफ्त इलाज, बस कार्ड चाहिए।',
    left_label_ta: 'தனியார் கிளினிக்கில் விரைவாக செலுத்து', left_desc_ta: 'விரைவானது ஆனால் சேமிப்பை காலி செய்யும்.',
    right_label_ta: 'ஆயுஷ்மான் பாரத் அட்டை பயன்படுத்து', right_desc_ta: 'இலவச சிகிச்சை, அட்டை மட்டும் தேவை.',
    effectsLeft: { family: 10, crops: 0, finance: -25, resilience: -10 },
    effectsRight: { family: 15, crops: 0, finance: 5, resilience: 10 },
    narrator: 'bank_mitr',
    tags: ['health', 'ayushman', 'govt_scheme'],
  },
  {
    id: 'migration_temptation',
    seasonPhase: 'off_season',
    title: 'City Job Offer',
    title_hi: 'शहर में नौकरी का प्रस्ताव',
    title_ta: 'நகர வேலை வாய்ப்பு',
    prompt:
      'Your cousin calls from the city — a construction company needs workers at ₹600/day. You could go for 3 months and send money home, but the farm needs attention.',
    prompt_hi:
      'आपका चचेरा भाई शहर से फोन करता है — एक निर्माण कंपनी को ₹600/दिन पर मजदूर चाहिए। आप 3 महीने जाकर घर पैसे भेज सकते हैं, लेकिन खेत पर ध्यान देना ज़रूरी है।',
    prompt_ta:
      'உங்கள் உறவினர் நகரத்திலிருந்து அழைக்கிறார் — ஒரு கட்டுமான நிறுவனத்திற்கு ₹600/நாள் கூலியில் தொழிலாளர்கள் தேவை. 3 மாதங்கள் சென்று வீட்டிற்கு பணம் அனுப்பலாம், ஆனால் பண்ணைக்கு கவனம் தேவை.',
    left: {
      label: 'Go to city for seasonal work',
      description: 'Extra income but farm is unattended.',
    },
    right: {
      label: 'Stay, prepare farm for next season',
      description: 'No extra income but farm stays ready.',
    },
    left_label_hi: 'मौसमी काम के लिए शहर जाएं', left_desc_hi: 'अतिरिक्त आय लेकिन खेत बिना देखभाल के।',
    right_label_hi: 'रहें, अगले सीज़न के लिए खेत तैयार करें', right_desc_hi: 'अतिरिक्त आय नहीं लेकिन खेत तैयार रहता है।',
    left_label_ta: 'மौசம் வேலைக்கு நகரம் செல்', left_desc_ta: 'கூடுதல் வருமானம் ஆனால் பண்ணை கவனிக்கப்படாது.',
    right_label_ta: 'தங்கு, அடுத்த சீசனுக்கு பண்ணை தயார் செய்', right_desc_ta: 'கூடுதல் வருமானம் இல்லை ஆனால் பண்ணை தயாராக இருக்கும்.',
    effectsLeft: { family: 5, crops: -15, finance: 20, resilience: -10 },
    effectsRight: { family: 0, crops: 15, finance: -5, resilience: 10 },
    narrator: 'self',
    tags: ['migration', 'off_season', 'income'],
  },
]

export function getShuffledDeck() {
  const copy = [...faislaDeck]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

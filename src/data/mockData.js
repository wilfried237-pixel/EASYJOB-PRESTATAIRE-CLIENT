const AFRICA = [
  {code:'CI',flag:'🇨🇮',fr:"Côte d'Ivoire",en:"Ivory Coast",cities:[
    {name:'Abidjan',d:['Cocody','Yopougon','Plateau','Marcory','Abobo','Treichville','Adjamé','Riviera','Angré','2 Plateaux','Bingerville','Koumassi']},
    {name:'Bouaké',d:['Centre','Koko','Air France','N\'Gattakro']},
    {name:'Yamoussoukro',d:['Habitat','Attiégouakro','N\'Zuessy']},
    {name:'San-Pédo',d:['Centre','Bardot']},{name:'Daloa',d:['Lobia','Tazibouo']},{name:'Korhogo',d:['Résidentiel','Commerce']},
  ]},
  {code:'SN',flag:'🇸🇳',fr:'Sénégal',en:'Senegal',cities:[
    {name:'Dakar',d:['Plateau','Almadies','Parcelles Assainies','Médina','Ouakam','Ngor','Yoff','Les Mamelles','Point E','Fann']},
    {name:'Saint-Louis',d:['Île','Sor','Rives du Fleuve']},{name:'Thiès',d:['Nord','Sud']},
    {name:'Ziguinchor',d:['Centre','Boucotte']},{name:'Kaolack',d:['Médina Baye']},
  ]},
  {code:'ML',flag:'🇲🇱',fr:'Mali',en:'Mali',cities:[
    {name:'Bamako',d:['Commune I','Commune II','Commune III','Commune IV','Commune V','Commune VI','ACI 2000','Hamdallaye']},
    {name:'Sikasso',d:['Centre','Wayerma']},{name:'Mopti',d:['Komoguel']},{name:'Kayes',d:['Centre']},
  ]},
  {code:'GH',flag:'🇬🇭',fr:'Ghana',en:'Ghana',cities:[
    {name:'Accra',d:['East Legon','Osu','Labone','Cantonments','Tema','Airport Residential','Adenta','Spintex']},
    {name:'Kumasi',d:['Ahodwo','KNUST Area','Asokwa','Bantama']},
    {name:'Takoradi',d:['Harbour','Market Circle']},{name:'Cape Coast',d:['Centre']},
  ]},
  {code:'NG',flag:'🇳🇬',fr:'Nigéria',en:'Nigeria',cities:[
    {name:'Lagos',d:['Victoria Island','Lekki','Ikeja','Surulere','Yaba','Ajah','Ikoyi','Oniru','Magodo']},
    {name:'Abuja',d:['Maitama','Wuse','Garki','Asokoro','Utako','Gwarinpa']},
    {name:'Kano',d:['GRA','Nassarawa']},{name:'Port Harcourt',d:['GRA','Mile 4']},
    {name:'Ibadan',d:['Bodija','Agodi']},{name:'Benin City',d:['GRA','New Benin']},
  ]},
  {code:'CM',flag:'🇨🇲',fr:'Cameroun',en:'Cameroon',cities:[
    {name:'Douala',d:['Akwa','Bonanjo','Makepe','Bonapriso','Bali','Logpom']},
    {name:'Yaoundé',d:['Bastos','Centre Admin','Mvan','Essos','Odza','Mendong']},
    {name:'Bafoussam',d:['Kamkop']},{name:'Garoua',d:['Plateau']},
  ]},
  {code:'MA',flag:'🇲🇦',fr:'Maroc',en:'Morocco',cities:[
    {name:'Casablanca',d:['Maarif','Ain Diab','Ain Sebaa','Hay Hassani','Anfa','CIL']},
    {name:'Rabat',d:['Agdal','Hassan','Souissi','Hay Riad']},
    {name:'Marrakech',d:['Guéliz','Hivernage','Palmeraie']},{name:'Fès',d:['Médina','Ville Nouvelle']},
    {name:'Tanger',d:['Centre','Malabata']},{name:'Agadir',d:['Centre','Talborjt']},
  ]},
  {code:'TN',flag:'🇹🇳',fr:'Tunisie',en:'Tunisia',cities:[
    {name:'Tunis',d:['El Menzah','La Marsa','Carthage','Lac 1','Lac 2','Cité El Khadra']},
    {name:'Sfax',d:['Centre','Route de Tunis']},{name:'Sousse',d:['Kantaoui']},{name:'Monastir',d:['Centre']},
  ]},
  {code:'EG',flag:'🇪🇬',fr:'Égypte',en:'Egypt',cities:[
    {name:'Le Caire',d:['Zamalek','Maadi','Heliopolis','Mohandessin','New Cairo','5th Settlement']},
    {name:'Alexandrie',d:['Sidi Bishr','Smouha']},{name:'Giza',d:['Sheikh Zayed','6th October']},
  ]},
  {code:'KE',flag:'🇰🇪',fr:'Kenya',en:'Kenya',cities:[
    {name:'Nairobi',d:['Westlands','Karen','Kilimani','CBD','Lavington','Kileleshwa','Runda']},
    {name:'Mombasa',d:['Nyali','Likoni']},{name:'Kisumu',d:['Milimani']},{name:'Nakuru',d:['Milimani']},
  ]},
  {code:'ZA',flag:'🇿🇦',fr:'Afrique du Sud',en:'South Africa',cities:[
    {name:'Johannesburg',d:['Sandton','Rosebank','Melville','Soweto','Randburg']},
    {name:'Cape Town',d:['Waterfront','Green Point','Sea Point','Woodstock','Claremont']},
    {name:'Durban',d:['Umhlanga','Berea']},{name:'Pretoria',d:['Centurion','Hatfield']},
  ]},
  {code:'TZ',flag:'🇹🇿',fr:'Tanzanie',en:'Tanzania',cities:[
    {name:'Dar es Salaam',d:['Masaki','Oyster Bay','Upanga','Mikocheni']},{name:'Zanzibar',d:['Stone Town']},
  ]},
  {code:'ET',flag:'🇪🇹',fr:'Éthiopie',en:'Ethiopia',cities:[
    {name:'Addis-Abeba',d:['Bole','Kazanchis','CMC','Sarbet']},{name:'Dire Dawa',d:['Centre']},
  ]},
  {code:'RW',flag:'🇷🇼',fr:'Rwanda',en:'Rwanda',cities:[
    {name:'Kigali',d:['Nyarutarama','Remera','Kimihurura','Kacyiru','Gikondo']},
  ]},
  {code:'BJ',flag:'🇧🇯',fr:'Bénin',en:'Benin',cities:[
    {name:'Cotonou',d:['Cadjèhoun','Akpakpa','Fidjrossè','Haie Vive']},{name:'Porto-Novo',d:['Centre']},
  ]},
  {code:'TG',flag:'🇹🇬',fr:'Togo',en:'Togo',cities:[
    {name:'Lomé',d:['Bè','Tokoin','Adidogomé','Djidjolé']},{name:'Kpalimé',d:['Centre']},
  ]},
  {code:'BF',flag:'🇧🇫',fr:'Burkina Faso',en:'Burkina Faso',cities:[
    {name:'Ouagadougou',d:['Wemtenga','Pissy','Tampouy','Zone du Bois','Kalgondin']},
    {name:'Bobo-Dioulasso',d:['Secteur 22','Accart-Ville']},
  ]},
  {code:'GN',flag:'🇬🇳',fr:'Guinée',en:'Guinea',cities:[
    {name:'Conakry',d:['Kaloum','Dixinn','Matam','Ratoma','Matoto']},
  ]},
  {code:'CD',flag:'🇨🇩',fr:'RD Congo',en:'DR Congo',cities:[
    {name:'Kinshasa',d:['Gombe','Lingwala','Ngaliema','Kintambo','Limete']},
    {name:'Lubumbashi',d:['Centre','Kampemba']},
  ]},
  {code:'AO',flag:'🇦🇴',fr:'Angola',en:'Angola',cities:[
    {name:'Luanda',d:['Maianga','Ingombota','Talatona','Kilamba']},
  ]},
]

// ══════════════════════════════════════════════════
// CATÉGORIES
// ══════════════════════════════════════════════════
const CATS = [
  {id:1,  emoji:'💻', fr:'Développement Web & Mobile', en:'Web & Mobile Dev',      color:'#5C6BC0', count:1284},
  {id:2,  emoji:'🎨', fr:'Design & Créatif',           en:'Design & Creative',     color:'#E91E63', count:967},
  {id:3,  emoji:'✍️', fr:'Rédaction & Traduction',     en:'Writing & Translation', color:'#F5A623', count:542},
  {id:4,  emoji:'📱', fr:'Marketing Digital',          en:'Digital Marketing',     color:'#1DBF73', count:731},
  {id:5,  emoji:'✂️', fr:'Coiffure & Beauté',          en:'Hair & Beauty',         color:'#FF6B35', count:892},
  {id:6,  emoji:'🪡', fr:'Couture & Mode',             en:'Tailoring & Fashion',   color:'#9C27B0', count:634},
  {id:7,  emoji:'🔧', fr:'Plomberie & BTP',            en:'Plumbing & Building',   color:'#2196F3', count:445},
  {id:8,  emoji:'⚡', fr:'Électricité',                en:'Electrical',            color:'#FFC107', count:388},
  {id:9,  emoji:'🚗', fr:'Mécanique Auto',             en:'Auto Mechanic',         color:'#F44336', count:521},
  {id:10, emoji:'🍳', fr:'Cuisine & Traiteur',         en:'Cooking & Catering',    color:'#FF9800', count:378},
  {id:11, emoji:'🧹', fr:'Ménage & Nettoyage',         en:'Cleaning',              color:'#00BCD4', count:612},
  {id:12, emoji:'📷', fr:'Photo & Vidéo',              en:'Photo & Video',         color:'#673AB7', count:463},
  {id:13, emoji:'🎵', fr:'Musique & Audio',            en:'Music & Audio',         color:'#E91E63', count:219},
  {id:14, emoji:'📚', fr:'Cours & Formation',          en:'Tutoring & Training',   color:'#009688', count:847},
]

// ══════════════════════════════════════════════════
// MOCK FREELANCERS
// ══════════════════════════════════════════════════
const FLS = [
  {id:1, av:'AT', nom:'Awa Traoré',        title:'Senior Full-Stack Developer',        country:'CI',city:'Abidjan',district:'Cocody',
   catId:1, badge:'top', note:4.9, avis:134, tarifH:15000, missions:312, dispo:true, verifie:true, whatsapp:'225070100001',
   bio:'8+ ans React, Node.js, PostgreSQL. Ex Orange Digital Center. Livraison soignée, communication claire.',
   skills:['React','Node.js','PostgreSQL','TypeScript','React Native','AWS'],
   xp:'expert', langs:['fr','en'],
   education:[{school:'École Polytechnique Abidjan',degree:'Master Informatique',year:'2016'}],
   work:[{company:'Orange Digital Center',role:'Lead Developer',period:'2018–2023'}],
   reviews:[{av:'JK',auteur:'Jean K.',note:5,text:'Exceptionnel, livré dans les délais.',date:'Il y a 2j'},
             {av:'AS',auteur:'Amira S.',note:5,text:'Best developer I worked with.',date:'Il y a 1 sem'}]},
  {id:2, av:'MC', nom:'Moussa Coulibaly',  title:'Plombier & Électricien certifié',    country:'CI',city:'Abidjan',district:'Abobo',
   catId:7, badge:'premium', note:4.8, avis:87, tarifH:8000, missions:204, dispo:true, verifie:true, whatsapp:'225070100002',
   bio:'12 ans d\'expérience. CAP + BTS. Disponible 7j/7, intervention rapide.',
   skills:['Plomberie','Électricité','Climatisation','Soudure'],
   xp:'expert', langs:['fr'],
   education:[{school:'CAFOP Abidjan',degree:'CAP Plomberie',year:'2012'}],
   work:[{company:'SODECI',role:'Technicien',period:'2013–2019'}],
   reviews:[{av:'KA',auteur:'Kofi A.',note:5,text:'Intervention en 1h, très pro!',date:'Il y a 3j'}]},
  {id:3, av:'FD', nom:'Fatou Diallo',      title:'UX/UI Designer & Motion Designer',  country:'SN',city:'Dakar',district:'Almadies',
   catId:2, badge:'premium', note:5.0, avis:198, tarifH:20000, missions:445, dispo:true, verifie:true, whatsapp:'221770100003',
   bio:'10+ ans en UX/UI. Figma expert. Ancienne Publicis Dakar. Branding, motion, web.',
   skills:['Figma','Adobe XD','Motion Design','Branding','Illustrator','After Effects'],
   xp:'expert', langs:['fr','en'],
   education:[{school:'École des Beaux-Arts de Dakar',degree:'Master Design',year:'2014'}],
   work:[{company:'Publicis Dakar',role:'Senior UX Designer',period:'2016–2022'}],
   reviews:[{av:'AB',auteur:'Amine B.',note:5,text:'Logo parfait, au-delà des attentes!',date:'Il y a 5j'}]},
  {id:4, av:'KA', nom:'Kwame Asante',      title:'Digital Marketing & SEO Expert',    country:'GH',city:'Accra',district:'East Legon',
   catId:4, badge:null, note:4.7, avis:62, tarifH:12000, missions:118, dispo:true, verifie:true, whatsapp:'233201000004',
   bio:'Spécialiste marchés africains. Google Ads certifié, croissance organique prouvée.',
   skills:['SEO','Google Ads','Social Media','Analytics','Email Marketing'],
   xp:'intermediate', langs:['en'],
   education:[{school:'KNUST',degree:'BSc Marketing',year:'2018'}],
   work:[{company:'Jumia Ghana',role:'Digital Marketing Manager',period:'2019–2022'}],
   reviews:[{av:'DM',auteur:'David M.',note:5,text:'Instagram 2K → 50K in 6 months!',date:'Il y a 1 sem'}]},
  {id:5, av:'AS', nom:'Aminata Sanogo',    title:'Chef Traiteur & Pâtissière',        country:'CI',city:'Abidjan',district:'Marcory',
   catId:10, badge:'top', note:5.0, avis:76, tarifH:18000, missions:134, dispo:true, verifie:true, whatsapp:'225070100005',
   bio:'Formée au Maroc et en France. Cuisine africaine, asiatique, européenne. Traiteur événements.',
   skills:['Cuisine africaine','Pâtisserie','Buffet','Traiteur','Cuisine fusion'],
   xp:'expert', langs:['fr'],
   education:[{school:'Institut Paul Bocuse Marrakech',degree:'Diplôme Chef',year:'2015'}],
   work:[{company:'Hôtel Ivoire Abidjan',role:'Chef Pâtissière',period:'2016–2021'}],
   reviews:[{av:'ST',auteur:'Salima T.',note:5,text:'Traiteur de mariage parfait!',date:'Il y a 2j'}]},
  {id:6, av:'IB', nom:'Ibrahim Hassan',    title:'Photographe & Vidéaste professionnel',country:'MA',city:'Casablanca',district:'Maarif',
   catId:12, badge:null, note:4.6, avis:43, tarifH:16000, missions:89, dispo:false, verifie:true, whatsapp:'212610100006',
   bio:'7 ans. Mariage, corporate, publicité. Drone certifié. Adobe Premiere, DaVinci.',
   skills:['Photo','Vidéo','Drone','Premiere Pro','Lightroom','DaVinci Resolve'],
   xp:'expert', langs:['fr','en','ar'],
   education:[{school:'ESAV Marrakech',degree:'Licence Arts Visuels',year:'2017'}],
   work:[{company:'Freelance',role:'Photographe indépendant',period:'2018–présent'}],
   reviews:[{av:'NB',auteur:'Nadia B.',note:5,text:'Photos de mariage magnifiques!',date:'Il y a 3 sem'}]},
  {id:7, av:'MK', nom:'Mariam Kone',       title:'Couturière Créatrice & Styliste',   country:'ML',city:'Bamako',district:'ACI 2000',
   catId:6, badge:'premium', note:4.9, avis:156, tarifH:9000, missions:287, dispo:true, verifie:true, whatsapp:'223600100007',
   bio:'15 ans. Wax, bazin, soirée. Modèles sur mesure. Atelier à Bamako.',
   skills:['Wax','Bazin','Tenues de soirée','Broderie','Modélisme'],
   xp:'expert', langs:['fr'],
   education:[{school:'Institut de Mode de Bamako',degree:'BTS Stylisme',year:'2009'}],
   work:[{company:'Atelier Kone',role:'Fondatrice & Designer',period:'2010–présent'}],
   reviews:[{av:'AD',auteur:'Aissatou D.',note:5,text:'Robe de mariage extraordinaire!',date:'Il y a 4j'}]},
  {id:8, av:'OD', nom:'Oluwaseun Adeyemi', title:'Mobile Developer — React Native & Flutter',country:'NG',city:'Lagos',district:'Lekki',
   catId:1, badge:'top', note:4.8, avis:91, tarifH:25000, missions:176, dispo:true, verifie:true, whatsapp:'234801000008',
   bio:'6+ ans. 50+ apps publiées sur Play Store & App Store. Ex Flutterwave.',
   skills:['React Native','Flutter','Firebase','REST API','TypeScript'],
   xp:'expert', langs:['en'],
   education:[{school:'University of Lagos',degree:'BSc Computer Science',year:'2018'}],
   work:[{company:'Flutterwave',role:'Mobile Developer',period:'2019–2022'}],
   reviews:[{av:'CO',auteur:'Chidi O.',note:5,text:'Built our fintech app in 6 weeks. Excellent!',date:'Il y a 5j'}]},
]

// ══════════════════════════════════════════════════
// MOCK MISSIONS
// ══════════════════════════════════════════════════
const MISSIONS = [
  {id:1,titre:'Build e-commerce website with mobile money',titreF:'Site e-commerce avec Mobile Money',
   desc:'Full e-commerce with MTN/Orange/Wave integration. React + Node backend required.',
   budget:{type:'range',min:500000,max:1200000},catId:1,country:'CI',city:'Abidjan',urgent:true,
   deadline:'2025-08-20',props:8,statut:'ouverte',postedAt:'Il y a 2h',client:{nom:'StartupCI',av:'SC',note:4.9}},
  {id:2,titre:'Logo + Brand Identity pour restaurant',titreF:'Logo + Brand Identity restaurant',
   desc:"Création logo, charte graphique, menus. Restaurant africain moderne à Dakar.",
   budget:{type:'fixed',min:150000,max:0},catId:2,country:'SN',city:'Dakar',urgent:false,
   deadline:'2025-08-30',props:12,statut:'ouverte',postedAt:'Il y a 6h',client:{nom:'Resto Dakar',av:'RD',note:4.7}},
  {id:3,titre:'Social media management — 3 months',titreF:'Gestion réseaux sociaux 3 mois',
   desc:"Instagram, Facebook, TikTok. Création contenu, community management, reporting.",
   budget:{type:'range',min:200000,max:400000},catId:4,country:'MA',city:'Casablanca',urgent:false,
   deadline:'2025-09-01',props:5,statut:'ouverte',postedAt:'Il y a 1j',client:{nom:'BrandMa',av:'BM',note:4.8}},
  {id:4,titre:'Tressage box braids à domicile',titreF:'Tressage box braids domicile',
   desc:'Box braids longueur dos, extensions fournies. Déplacement à Cocody.',
   budget:{type:'fixed',min:18000,max:0},catId:5,country:'CI',city:'Abidjan',district:'Cocody',urgent:true,
   deadline:'2025-07-25',props:3,statut:'ouverte',postedAt:'Il y a 30min',client:{nom:'Adja K.',av:'AK',note:5.0}},
  {id:5,titre:'Food delivery mobile app — Flutter',titreF:'App mobile livraison food Flutter',
   desc:'GPS tracking, real-time orders and provider dispatch. Startup Ghana.',
   budget:{type:'range',min:1500000,max:3000000},catId:1,country:'GH',city:'Accra',urgent:false,
   deadline:'2025-10-01',props:6,statut:'ouverte',postedAt:'Il y a 3h',client:{nom:'FoodGH',av:'FG',note:4.6}},
  {id:6,titre:'Robe de mariée bazin sur mesure',titreF:'Robe de mariée bazin sur mesure',
   desc:'Bazin riche brodé. Modèle à discuter, essayage à Bamako.',
   budget:{type:'range',min:120000,max:250000},catId:6,country:'ML',city:'Bamako',urgent:false,
   deadline:'2025-08-10',props:4,statut:'ouverte',postedAt:'Il y a 1j',client:{nom:'Kadiatou S.',av:'KS',note:4.9}},
]

// ══════════════════════════════════════════════════
// QUIZ 7 QUESTIONS — Règles plateforme, vérification, qualité
// ══════════════════════════════════════════════════
const QUIZ = [
  { q: {fr:"Pourquoi est-il important de choisir un profil avec le badge '✓ Vérifié' ?",
         en:"Why is it important to choose a profile with the '✓ Verified' badge?"},
    opts:{
      fr:["C'est un simple symbole décoratif","Le freelance a prouvé son identité — ses documents ont été validés par EasyJob","Seuls les abonnés premium ont ce badge","Cela signifie qu'il travaille gratuitement"],
      en:["It's just a decorative symbol","The freelancer proved their identity — documents validated by EasyJob","Only premium subscribers get this badge","It means they work for free"]
    }, correct:1 },
  { q: {fr:"Combien de temps prend la vérification d'un profil freelance sur EasyJob ?",
         en:"How long does freelancer profile verification take on EasyJob?"},
    opts:{
      fr:["Quelques secondes, c'est automatique","24 à 48 heures maximum","Une semaine minimum","Un mois en moyenne"],
      en:["A few seconds, it's automatic","24 to 48 hours maximum","At least 1 week","About a month on average"]
    }, correct:1 },
  { q: {fr:"Avant de choisir un freelance, que doit vérifier le client en priorité ?",
         en:"Before choosing a freelancer, what should a client check first?"},
    opts:{
      fr:["Uniquement le prix le plus bas","Le badge de vérification, les avis des précédents clients et le portfolio","Envoyer un message à tous les freelances","Publier sans lire les profils"],
      en:["Only the lowest price","The verification badge, past client reviews and portfolio","Message all freelancers","Post without reading profiles"]
    }, correct:1 },
  { q: {fr:"Quel est le délai recommandé pour répondre à un message sur EasyJob ?",
         en:"What is the recommended response time for messages on EasyJob?"},
    opts:{
      fr:["Une semaine","3 jours maximum","Moins de 24 heures","Quand vous avez le temps"],
      en:["One week","3 days maximum","Less than 24 hours","Whenever you have time"]
    }, correct:2 },
  { q: {fr:"Quelle action améliore le plus la visibilité de votre profil EasyJob ?",
         en:"Which action most improves your EasyJob profile visibility?"},
    opts:{
      fr:["Créer plusieurs comptes","Avoir un profil complet à 100%, des avis positifs et livrer dans les délais","Postuler à toutes les missions sans lire","Partager son numéro personnel dans le chat"],
      en:["Create multiple accounts","100% complete profile, positive reviews and on-time delivery","Apply to every mission without reading","Share your personal number in chat"]
    }, correct:1 },
  { q: {fr:"Qu'est-ce qui est strictement interdit dans le chat EasyJob ?",
         en:"What is strictly forbidden in the EasyJob chat?"},
    opts:{
      fr:["Envoyer son portfolio en PDF","Expliquer en détail son service","Partager son numéro WhatsApp personnel pour contourner la plateforme","Demander des précisions sur la mission"],
      en:["Send your portfolio as PDF","Explain your service in detail","Share your personal WhatsApp to bypass the platform","Ask for mission clarifications"]
    }, correct:2 },
  { q: {fr:"Comment obtenir le badge '✓ Vérifié' sur EasyJob ?",
         en:"How to get the '✓ Verified' badge on EasyJob?"},
    opts:{
      fr:["En complétant 10 missions","En uploadant une pièce d'identité valide et en réussissant le quiz de la plateforme","En renseignant son quartier","En étant recommandé par 5 clients"],
      en:["By completing 10 missions","By uploading valid ID and passing the platform quiz","By adding your district","By being recommended by 5 clients"]
    }, correct:1 },
]

// ══════════════════════════════════════════════════
// SKILLS AUTOCOMPLETE
// ══════════════════════════════════════════════════
const SKILLS = [
  'React','Node.js','Python','PHP','Laravel','WordPress','Flutter','React Native','Vue.js','Angular','TypeScript','Django',
  'Figma','Adobe XD','Photoshop','Illustrator','Premiere Pro','After Effects','Canva','InDesign',
  'SEO','Google Ads','Facebook Ads','Instagram Marketing','TikTok Marketing','Email Marketing','Content Strategy',
  'Plomberie','Électricité','Maçonnerie','Carrelage','Peinture bâtiment','Menuiserie','Soudure','Climatisation',
  'Coiffure','Tressage','Coloration','Maquillage','Soin du visage','Extensions',
  'Couture','Broderie','Bazin','Wax','Modélisme','Retouche vêtements',
  'Cuisine africaine','Pâtisserie','Traiteur','Barman','Cuisine fusion',
  'Photographie','Vidéographie','Drone FPV','Montage vidéo','Color grading',
  'Piano','Guitare','Djembé','Mixage audio','Mastering','Enregistrement',
  'Excel','PowerPoint','Comptabilité','Fiscalité','Business Plan','Finance',
  'Traduction Fr-En','Rédaction web','Copywriting','Correction d\'épreuves',
]

// ══════════════════════════════════════════════════
// MOCK DATA INIT
// ══════════════════════════════════════════════════
const INIT_DATA = {
  freelancers: FLS,
  missions: MISSIONS,
  convs: [
    {id:1,flId:1,lastMsg:"D'accord, je livre dans 5 jours.",time:'14:23',unread:2,
     msgs:[{from:'client',msg:"Bonjour Awa, j'ai besoin d'une app React.",t:'14:00'},
           {from:'fl',msg:"Bonjour ! Envoyez les détails svp.",t:'14:05'},
           {from:'client',msg:"C'est une app de gestion d'inventaire.",t:'14:15'},
           {from:'fl',msg:"D'accord, je livre dans 5 jours.",t:'14:23'}]},
    {id:2,flId:3,lastMsg:"Le logo sera prêt demain.",time:'11:45',unread:1,
     msgs:[{from:'client',msg:"Fatou, quand sera prêt mon logo ?",t:'11:30'},
           {from:'fl',msg:"Le logo sera prêt demain.",t:'11:45'}]},
  ],
  notifs: [
    {id:1,type:'msg',msg:"Awa T. a répondu à votre mission 'E-commerce'",t:'5 min',read:false,icon:'💬'},
    {id:2,type:'hired',msg:"Votre proposition pour 'Logo Restaurant' a été acceptée !",t:'1h',read:false,icon:'✅'},
    {id:3,type:'mission',msg:"Nouvelle proposition reçue — mission App Mobile",t:'2h',read:true,icon:'📩'},
    {id:4,type:'review',msg:"Kwame A. vous a laissé un avis 5 ⭐",t:'Hier',read:true,icon:'⭐'},
    {id:5,type:'system',msg:"Votre identité a été vérifiée par EasyJob ✓",t:'2j',read:true,icon:'🛡️'},
  ],
  myJobs: [
    {id:1,title:'E-commerce website',flId:1,status:'en_cours',amount:800000,date:'En cours',emoji:'💻'},
    {id:2,title:'Logo Restaurant Dakar',flId:3,status:'terminee',amount:150000,date:'Il y a 3j',emoji:'🎨'},
    {id:3,title:'Tressage box braids',flId:null,status:'ouverte',amount:0,date:'Il y a 30min',emoji:'✂️'},
  ],
  proposals: [],
  txns: [
    {id:1,type:'in',label:'Mission E-commerce — acompte',amount:400000,date:"Aujourd'hui 14h23"},
    {id:2,type:'out',label:'Retrait Wave',amount:200000,date:'Hier 10h15'},
    {id:3,type:'in',label:'Mission Logo Restaurant',amount:135000,date:'Il y a 3j'},
    {id:4,type:'out',label:'Commission EasyJob (10%)',amount:15000,date:'Il y a 3j'},
    {id:5,type:'in',label:'Mission App Mobile Flutter',amount:1350000,date:'Il y a 1 sem'},
  ],
}

// ══════════════════════════════════════════════════
// LOGGER
// ══════════════════════════════════════════════════

export { AFRICA, CATS, FLS, MISSIONS, QUIZ, SKILLS, INIT_DATA }

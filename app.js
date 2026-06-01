/**
 * UPSC QCAB Generator — app.js
 * Modular, no-framework, no-build-tool vanilla JS
 * Questions embedded directly — works with file:// and GitHub Pages
 */

'use strict';

/* ============================================================
   SECTION 1: EMBEDDED QUESTION DATA (no fetch needed)
   ============================================================ */
const QUESTIONS_DATA = [{"id":1,"year":2024,"paper":"GS1","subject":"Art & Culture","subtopic":"Rock-cut Architecture","keywords":["art","culture","heritage"],"qno":"Q1","question":"The rock-cut architecture represents one of the most important sources of our knowledge of early Indian art and history. Discuss.","marks":10,"source":"UPSC"},{"id":2,"year":2024,"paper":"GS1","subject":"History","subtopic":"Modern India","keywords":["partition","independence","1947"],"qno":"Q2","question":"The Partition of India in 1947 was not merely a political division but a civilisational rupture. Critically examine.","marks":15,"source":"UPSC"},{"id":3,"year":2024,"paper":"GS1","subject":"Geography","subtopic":"Climatology","keywords":["monsoon","rainfall","climate","variability"],"qno":"Q3","question":"Discuss the factors responsible for the variability of Indian monsoon and its impact on agriculture.","marks":15,"source":"UPSC"},{"id":4,"year":2024,"paper":"GS1","subject":"Society","subtopic":"Women","keywords":["women","empowerment","gender"],"qno":"Q4","question":"Empowering women is the key to control population growth. Discuss.","marks":10,"source":"UPSC"},{"id":5,"year":2024,"paper":"GS1","subject":"World History","subtopic":"Cold War","keywords":["cold war","USA","USSR","bipolar"],"qno":"Q5","question":"The Cold War era witnessed the emergence of a bipolar world order. Critically analyse the factors that led to the eventual collapse of the Soviet Union.","marks":15,"source":"UPSC"},{"id":6,"year":2024,"paper":"GS2","subject":"Polity","subtopic":"Constitutional Amendments","keywords":["constitution","amendment","parliament"],"qno":"Q1","question":"Critically examine the role of the Parliament in amending the Constitution and its impact on the basic structure doctrine.","marks":15,"source":"UPSC"},{"id":7,"year":2024,"paper":"GS2","subject":"Governance","subtopic":"E-Governance","keywords":["e-governance","digital","technology","service delivery"],"qno":"Q2","question":"E-governance is not just about technology adoption; it is about transformation of governance. Critically examine with examples.","marks":15,"source":"UPSC"},{"id":8,"year":2024,"paper":"GS2","subject":"IR","subtopic":"India-China","keywords":["china","India","border","LAC"],"qno":"Q3","question":"The India-China border dispute continues to be a challenge to bilateral relations. Critically examine the status and prospects for resolution.","marks":15,"source":"UPSC"},{"id":9,"year":2024,"paper":"GS2","subject":"Social Justice","subtopic":"Health","keywords":["health","Ayushman Bharat","healthcare","insurance"],"qno":"Q4","question":"Ayushman Bharat Pradhan Mantri Jan Arogya Yojana has brought a revolution in health care financing. Critically examine the achievements and challenges.","marks":10,"source":"UPSC"},{"id":10,"year":2024,"paper":"GS3","subject":"Economy","subtopic":"Growth","keywords":["GDP","growth","economic development"],"qno":"Q1","question":"India's economic growth story has been commendable in recent years. Critically analyse the key drivers of India's GDP growth and the structural challenges that remain.","marks":15,"source":"UPSC"},{"id":11,"year":2024,"paper":"GS3","subject":"Agriculture","subtopic":"MSP","keywords":["MSP","farmers","agriculture","price support"],"qno":"Q2","question":"The Minimum Support Price mechanism has been a cornerstone of Indian agricultural policy. Critically evaluate its effectiveness and suggest reforms.","marks":15,"source":"UPSC"},{"id":12,"year":2024,"paper":"GS3","subject":"Science & Tech","subtopic":"Artificial Intelligence","keywords":["AI","artificial intelligence","technology","ethics"],"qno":"Q3","question":"Artificial Intelligence is transforming the world. Discuss the opportunities and challenges that AI presents for India's development.","marks":15,"source":"UPSC"},{"id":13,"year":2024,"paper":"GS3","subject":"Environment","subtopic":"Climate Change","keywords":["climate change","Paris Agreement","carbon","emissions"],"qno":"Q4","question":"India's commitments under the Paris Agreement have been ambitious. Critically examine the progress made and the challenges ahead in meeting these targets.","marks":15,"source":"UPSC"},{"id":14,"year":2024,"paper":"GS3","subject":"Security","subtopic":"Internal Security","keywords":["terrorism","naxalism","internal security"],"qno":"Q5","question":"Left Wing Extremism continues to pose a challenge to India's internal security. Critically examine the government's strategy and suggest measures for effective management.","marks":15,"source":"UPSC"},{"id":15,"year":2024,"paper":"GS4","subject":"Theory","subtopic":"Ethics in Public Life","keywords":["ethics","probity","integrity","public service"],"qno":"Q1","question":"What do you understand by 'probity in governance'? How can it be ensured in the context of India's administrative machinery?","marks":10,"source":"UPSC"},{"id":16,"year":2024,"paper":"GS4","subject":"Case Studies","subtopic":"Administrative Ethics","keywords":["case study","dilemma","civil servant","whistle blower"],"qno":"Q2","question":"A civil servant discovers financial irregularities in a scheme being implemented by her department. Her immediate superior is allegedly involved. What are the ethical issues involved? What course of action will you take?","marks":20,"source":"UPSC"},{"id":17,"year":2023,"paper":"GS1","subject":"Art & Culture","subtopic":"Gandhara Art","keywords":["Gandhara","Greco-Bactrian","art","sculpture"],"qno":"Q1","question":"Highlight the Central Asian and Greco-Bactrian elements in the Gandhara art.","marks":10,"source":"UPSC"},{"id":18,"year":2023,"paper":"GS1","subject":"History","subtopic":"1857 Revolt","keywords":["1857","revolt","uprising","British rule"],"qno":"Q2","question":"The 1857 uprising was the culmination of the recurrent, big and small local rebellions that had occurred in the preceding hundred years of British rule. Elucidate.","marks":15,"source":"UPSC"},{"id":19,"year":2023,"paper":"GS1","subject":"History","subtopic":"Indian Renaissance","keywords":["renaissance","national identity","nineteenth century"],"qno":"Q3","question":"Examine the linkages between the nineteenth century's 'Indian Renaissance' and the emergence of national identity.","marks":15,"source":"UPSC"},{"id":20,"year":2023,"paper":"GS1","subject":"Geography","subtopic":"Ecology","keywords":["coral","global warming","reef","ocean"],"qno":"Q4","question":"Assess the impact of global warming on the coral life system with examples.","marks":10,"source":"UPSC"},{"id":21,"year":2023,"paper":"GS1","subject":"Geography","subtopic":"Biogeography","keywords":["mangroves","coastal ecology","deforestation"],"qno":"Q5","question":"Discuss the causes of depletion of mangroves and explain their importance in maintaining coastal ecology.","marks":10,"source":"UPSC"},{"id":22,"year":2023,"paper":"GS1","subject":"Geography","subtopic":"Economic Geography","keywords":["regional","manufacturing","employment","resource"],"qno":"Q6","question":"Can the strategy of regional resource-based manufacturing help in promoting employment in India?","marks":10,"source":"UPSC"},{"id":23,"year":2023,"paper":"GS1","subject":"Geography","subtopic":"Economic Geography","keywords":["agro-based","food processing","North-West India","localisation"],"qno":"Q7","question":"Discuss the factors for localisation of agro-based food processing industries of North-West India.","marks":10,"source":"UPSC"},{"id":24,"year":2023,"paper":"GS1","subject":"Society","subtopic":"Culture","keywords":["Indian society","culture","unique","sustaining"],"qno":"Q8","question":"What makes Indian society unique in sustaining its culture? Discuss.","marks":10,"source":"UPSC"},{"id":25,"year":2023,"paper":"GS1","subject":"Society","subtopic":"Population","keywords":["women","population","growth","empowerment"],"qno":"Q9","question":"Empowering women is the key to control population growth. Discuss.","marks":10,"source":"UPSC"},{"id":26,"year":2023,"paper":"GS1","subject":"Society","subtopic":"Secularism","keywords":["secularism","cultural practices","challenges"],"qno":"Q10","question":"What are the challenges to our cultural practices in the name of secularism?","marks":10,"source":"UPSC"},{"id":27,"year":2023,"paper":"GS1","subject":"History","subtopic":"Modern India","keywords":["nationalist","Gandhian","voices","movement"],"qno":"Q11","question":"Many voices had strengthened and enriched the nationalist movement during the Gandhian phase. Elaborate.","marks":15,"source":"UPSC"},{"id":28,"year":2023,"paper":"GS1","subject":"History","subtopic":"Modern India","keywords":["British","transfer of power","1940s","partition"],"qno":"Q12","question":"Assess the role of British imperial power in complicating the process of transfer of power during the 1940s.","marks":15,"source":"UPSC"},{"id":29,"year":2023,"paper":"GS2","subject":"Polity","subtopic":"Judiciary","keywords":["judiciary","independence","appointment","collegium"],"qno":"Q1","question":"Critically examine the independence of the judiciary in India. How does the collegium system impact judicial appointments?","marks":15,"source":"UPSC"},{"id":30,"year":2023,"paper":"GS2","subject":"Governance","subtopic":"Decentralisation","keywords":["panchayat","decentralisation","local government","73rd amendment"],"qno":"Q2","question":"73rd Constitutional Amendment Act has empowered local self-governments but they still face several challenges. Critically examine.","marks":15,"source":"UPSC"},{"id":31,"year":2023,"paper":"GS2","subject":"IR","subtopic":"Neighbourhood Policy","keywords":["neighbourhood","India","foreign policy","SAARC"],"qno":"Q3","question":"India's 'Neighbourhood First' policy has been at the centre of its foreign policy. Critically analyse its outcomes and challenges.","marks":15,"source":"UPSC"},{"id":32,"year":2023,"paper":"GS3","subject":"Economy","subtopic":"Infrastructure","keywords":["infrastructure","NIP","investment","development"],"qno":"Q1","question":"National Infrastructure Pipeline (NIP) is a step in the right direction for boosting infrastructure in India. Critically examine.","marks":15,"source":"UPSC"},{"id":33,"year":2023,"paper":"GS3","subject":"Disaster Management","subtopic":"Urban Flooding","keywords":["urban flooding","disaster","cities","resilience"],"qno":"Q2","question":"Urban flooding has become a recurring problem in Indian cities. Discuss the causes and suggest measures for urban flood management.","marks":15,"source":"UPSC"},{"id":34,"year":2023,"paper":"GS3","subject":"Environment","subtopic":"Biodiversity","keywords":["biodiversity","conservation","species","extinction"],"qno":"Q3","question":"India is one of the 17 megadiverse countries of the world. Discuss the threats to biodiversity and the measures taken for its conservation.","marks":15,"source":"UPSC"},{"id":35,"year":2023,"paper":"GS4","subject":"Theory","subtopic":"Emotional Intelligence","keywords":["emotional intelligence","governance","administrator"],"qno":"Q1","question":"Discuss the role of emotional intelligence in effective governance. How can administrators develop emotional intelligence?","marks":15,"source":"UPSC"},{"id":36,"year":2022,"paper":"GS1","subject":"Art & Culture","subtopic":"Temple Architecture","keywords":["temple","Dravidian","Nagara","architecture"],"qno":"Q1","question":"Discuss the features of Dravidian and Nagara styles of temple architecture and highlight their differences.","marks":10,"source":"UPSC"},{"id":37,"year":2022,"paper":"GS1","subject":"Geography","subtopic":"Geomorphology","keywords":["plate tectonics","earthquake","volcanic","geomorphology"],"qno":"Q2","question":"Explain Plate Tectonic theory and discuss its role in the formation of fold mountains.","marks":15,"source":"UPSC"},{"id":38,"year":2022,"paper":"GS1","subject":"Geography","subtopic":"Oceanography","keywords":["ocean currents","temperature","marine","salinity"],"qno":"Q3","question":"Discuss the factors affecting ocean currents and their significance for climate and marine life.","marks":15,"source":"UPSC"},{"id":39,"year":2022,"paper":"GS1","subject":"History","subtopic":"Ancient India","keywords":["Maurya","Ashoka","Buddhism","administration"],"qno":"Q4","question":"How did Ashoka's conversion to Buddhism influence his administrative policies and diplomatic relations?","marks":15,"source":"UPSC"},{"id":40,"year":2022,"paper":"GS2","subject":"Social Justice","subtopic":"Education","keywords":["education","NEP","policy","reform"],"qno":"Q1","question":"National Education Policy 2020 is a comprehensive reform initiative for the Indian education system. Critically evaluate its key provisions and implementation challenges.","marks":15,"source":"UPSC"},{"id":41,"year":2022,"paper":"GS3","subject":"Science & Tech","subtopic":"Space Technology","keywords":["ISRO","space","satellite","technology"],"qno":"Q1","question":"India's space programme has achieved significant milestones in recent years. Critically examine India's achievements in space technology and the future roadmap.","marks":15,"source":"UPSC"},{"id":42,"year":2022,"paper":"GS3","subject":"Security","subtopic":"Cyber Security","keywords":["cyber security","digital","threats","protection"],"qno":"Q2","question":"Cyber threats are increasingly becoming a challenge to national security. Discuss the nature of cyber threats India faces and the measures taken to address them.","marks":15,"source":"UPSC"},{"id":43,"year":2022,"paper":"GS4","subject":"Theory","subtopic":"Integrity","keywords":["integrity","civil servant","values","ethics"],"qno":"Q1","question":"'Integrity without knowledge is weak and useless, and knowledge without integrity is dangerous and dreadful.' Discuss this statement in the context of a civil servant.","marks":15,"source":"UPSC"},{"id":44,"year":2021,"paper":"GS1","subject":"Geography","subtopic":"Climatology","keywords":["western disturbances","north India","rainfall","winter"],"qno":"Q1","question":"Discuss the formation of Western Disturbances and their impact on the weather conditions in northern India.","marks":10,"source":"UPSC"},{"id":45,"year":2021,"paper":"GS1","subject":"History","subtopic":"Freedom Struggle","keywords":["non-cooperation","Gandhi","civil disobedience","movement"],"qno":"Q2","question":"Discuss how the Non-Cooperation Movement of 1920-22 transformed the nature of India's freedom struggle.","marks":15,"source":"UPSC"},{"id":46,"year":2021,"paper":"GS2","subject":"Polity","subtopic":"Federalism","keywords":["federalism","centre-state","cooperative","India"],"qno":"Q1","question":"India has been witnessing significant changes in the dynamics of centre-state relations. Critically examine the challenges and prospects for cooperative federalism.","marks":15,"source":"UPSC"},{"id":47,"year":2021,"paper":"GS3","subject":"Agriculture","subtopic":"Organic Farming","keywords":["organic farming","sustainable","agriculture","chemicals"],"qno":"Q1","question":"Organic farming in India has a promising future but it is faced with several challenges. Discuss.","marks":15,"source":"UPSC"},{"id":48,"year":2021,"paper":"GS3","subject":"Economy","subtopic":"Banking","keywords":["NPA","banking","reform","RBI"],"qno":"Q2","question":"Non-Performing Assets have been a major challenge for the Indian banking sector. Critically examine the causes and the government's measures to tackle the NPA problem.","marks":15,"source":"UPSC"},{"id":49,"year":2020,"paper":"GS1","subject":"Geography","subtopic":"Geomorphology","keywords":["earthquake","seismic zones","India","disaster"],"qno":"Q1","question":"Explain the mechanism of earthquake and the seismic vulnerability of India. Discuss the measures for disaster preparedness.","marks":15,"source":"UPSC"},{"id":50,"year":2020,"paper":"GS3","subject":"Environment","subtopic":"Climate Change","keywords":["climate change","sustainable development","carbon","India"],"qno":"Q1","question":"Assess the impact of climate change on India's water resources and discuss adaptation strategies.","marks":15,"source":"UPSC"},{"id":51,"year":2020,"paper":"GS4","subject":"Case Studies","subtopic":"Corruption","keywords":["corruption","ethical dilemma","officer","integrity"],"qno":"Q1","question":"A senior government officer is approached by a politician to favourably consider a project that is not in the public interest. Describe the ethical issues and the course of action you would take.","marks":20,"source":"UPSC"},{"id":52,"year":2019,"paper":"GS1","subject":"Art & Culture","subtopic":"Gandhara Art","keywords":["Gandhara","Greco-Bactrian","Buddhist","sculpture"],"qno":"Q1","question":"Highlight the Central Asian and Greco-Bactrian elements in the Gandhara art.","marks":10,"source":"UPSC"},{"id":53,"year":2019,"paper":"GS1","subject":"History","subtopic":"1857 Revolt","keywords":["1857","rebellion","British","local uprisings"],"qno":"Q2","question":"The 1857 uprising was the culmination of the recurrent, big and small local rebellions that had occurred in the preceding hundred years of British rule. Elucidate.","marks":15,"source":"UPSC"},{"id":54,"year":2019,"paper":"GS1","subject":"Geography","subtopic":"Oceanography","keywords":["tides","ocean","gravitational","lunar"],"qno":"Q3","question":"Explain the factors governing the formation of ocean tides and their significance for coastal areas.","marks":10,"source":"UPSC"},{"id":55,"year":2019,"paper":"GS3","subject":"Agriculture","subtopic":"Irrigation","keywords":["irrigation","water management","drought","Pradhan Mantri"],"qno":"Q1","question":"Pradhan Mantri Krishi Sinchayee Yojana has been launched to achieve 'Har Khet Ko Pani'. Discuss the relevance of water use efficiency for achieving this goal.","marks":15,"source":"UPSC"},{"id":56,"year":2019,"paper":"GS2","subject":"IR","subtopic":"India-US","keywords":["India","US","relations","strategic"],"qno":"Q1","question":"The India-US relationship has transformed from estrangement to engagement over the last two decades. Examine the key factors that have shaped this transformation.","marks":15,"source":"UPSC"},{"id":57,"year":2018,"paper":"GS1","subject":"Geography","subtopic":"Geomorphology","keywords":["weathering","erosion","landforms","physical geography"],"qno":"Q1","question":"How do weathering and mass wasting differ from erosion? Describe the processes of chemical weathering with examples.","marks":15,"source":"UPSC"},{"id":58,"year":2018,"paper":"GS1","subject":"History","subtopic":"Ancient India","keywords":["Indus Valley","civilization","decline","Harappan"],"qno":"Q2","question":"Explain the factors responsible for the decline of Indus Valley Civilisation.","marks":15,"source":"UPSC"},{"id":59,"year":2018,"paper":"GS3","subject":"Economy","subtopic":"GST","keywords":["GST","tax reform","one nation one tax","indirect tax"],"qno":"Q1","question":"GST has been described as 'one country one tax'. Critically examine the benefits and challenges of GST implementation in India.","marks":15,"source":"UPSC"},{"id":60,"year":2018,"paper":"GS4","subject":"Theory","subtopic":"Compassion","keywords":["compassion","ethics","governance","welfare"],"qno":"Q1","question":"'The quality of moral insight is essentially the ability to feel compassion for others.' Evaluate this statement in the context of public administration.","marks":10,"source":"UPSC"},{"id":61,"year":2017,"paper":"GS1","subject":"Geography","subtopic":"Climatology","keywords":["El Nino","La Nina","ENSO","monsoon impact"],"qno":"Q1","question":"What are the consequences of El Ni\u00f1o and La Ni\u00f1a on the Indian Monsoon? Discuss.","marks":15,"source":"UPSC"},{"id":62,"year":2017,"paper":"GS2","subject":"Polity","subtopic":"DPSP","keywords":["DPSP","fundamental rights","directive principles","conflict"],"qno":"Q1","question":"What do you understand by the directive principles of state policy? Examine the relationship between the Directive Principles and Fundamental Rights.","marks":15,"source":"UPSC"},{"id":63,"year":2017,"paper":"GS3","subject":"Science & Tech","subtopic":"Biotechnology","keywords":["biotechnology","GM crops","genetic modification","agriculture"],"qno":"Q1","question":"What are the benefits and concerns of genetically modified crops? Critically examine India's policy on GM crops.","marks":15,"source":"UPSC"},{"id":64,"year":2016,"paper":"GS1","subject":"Geography","subtopic":"Settlement Geography","keywords":["urbanisation","smart cities","migration","urban growth"],"qno":"Q1","question":"Smart cities in India are still in the planning stage. Critically examine the concept of smart cities and the challenges in their implementation.","marks":15,"source":"UPSC"},{"id":65,"year":2016,"paper":"GS3","subject":"Disaster Management","subtopic":"Flood Management","keywords":["floods","Ganga","flood management","disaster"],"qno":"Q1","question":"Frequent floods in different parts of India are caused by a combination of factors. Discuss the causes and suggest flood management measures.","marks":15,"source":"UPSC"},{"id":66,"year":2024,"paper":"Geography Optional P1","subject":"Geography Optional P1","subtopic":"Geomorphology","keywords":["plate tectonics","mountains","geomorphology","isostasy"],"qno":"Q1","question":"Explain the concept of isostasy and discuss its implications for understanding crustal dynamics.","marks":20,"source":"UPSC"},{"id":67,"year":2024,"paper":"Geography Optional P1","subject":"Geography Optional P1","subtopic":"Climatology","keywords":["jet streams","upper atmosphere","westerlies","climate"],"qno":"Q2","question":"Discuss the role of jet streams in controlling weather and climate of the mid-latitudes.","marks":20,"source":"UPSC"},{"id":68,"year":2024,"paper":"Geography Optional P1","subject":"Geography Optional P1","subtopic":"Oceanography","keywords":["ocean floor","relief","ridges","trenches"],"qno":"Q3","question":"Describe the major relief features of the ocean floor and explain the process of their formation.","marks":20,"source":"UPSC"},{"id":69,"year":2024,"paper":"Geography Optional P1","subject":"Geography Optional P1","subtopic":"Biogeography","keywords":["biomes","tropical rainforest","ecosystem","ecology"],"qno":"Q4","question":"Explain the characteristics of tropical rainforest biome and discuss the threats to its biodiversity.","marks":20,"source":"UPSC"},{"id":70,"year":2024,"paper":"Geography Optional P2","subject":"Geography Optional P2","subtopic":"Population Geography","keywords":["demographic transition","fertility","mortality","population policy"],"qno":"Q1","question":"Critically examine the demographic transition model and its applicability to developing countries.","marks":20,"source":"UPSC"},{"id":71,"year":2024,"paper":"Geography Optional P2","subject":"Geography Optional P2","subtopic":"Economic Geography","keywords":["SEZ","industrial location","economic growth","export"],"qno":"Q2","question":"Discuss the theory of industrial location and analyse the performance of Special Economic Zones in India.","marks":20,"source":"UPSC"},{"id":72,"year":2024,"paper":"Geography Optional P2","subject":"Geography Optional P2","subtopic":"Regional Development","keywords":["regional imbalance","development","planning","India"],"qno":"Q3","question":"Regional imbalances in development continue to persist in India despite planned development. Critically examine the causes and suggest remedies.","marks":20,"source":"UPSC"},{"id":73,"year":2023,"paper":"Geography Optional P1","subject":"Geography Optional P1","subtopic":"Geomorphology","keywords":["karst topography","limestone","dissolution","caves"],"qno":"Q1","question":"Describe the characteristic features of karst topography and explain the processes responsible for its formation.","marks":20,"source":"UPSC"},{"id":74,"year":2023,"paper":"Geography Optional P1","subject":"Geography Optional P1","subtopic":"Models","keywords":["Von Thunen","agricultural location","land use","model"],"qno":"Q2","question":"Critically evaluate Von Thunen's model of agricultural land use in the context of modern agriculture.","marks":20,"source":"UPSC"},{"id":75,"year":2023,"paper":"Geography Optional P2","subject":"Geography Optional P2","subtopic":"Political Geography","keywords":["boundaries","international borders","conflicts","geopolitics"],"qno":"Q1","question":"Discuss the role of political boundaries in shaping geopolitical conflicts in South Asia.","marks":20,"source":"UPSC"},{"id":76,"year":2022,"paper":"Geography Optional P1","subject":"Geography Optional P1","subtopic":"Climatology","keywords":["global warming","greenhouse gases","sea level rise","climate change"],"qno":"Q1","question":"Discuss the causes of global warming and its impact on ocean levels and coastal areas.","marks":20,"source":"UPSC"},{"id":77,"year":2022,"paper":"Geography Optional P2","subject":"Geography Optional P2","subtopic":"Transport","keywords":["golden quadrilateral","highway","road transport","connectivity"],"qno":"Q1","question":"Critically examine the impact of the Golden Quadrilateral project on regional development in India.","marks":20,"source":"UPSC"},{"id":78,"year":2021,"paper":"Geography Optional P1","subject":"Geography Optional P1","subtopic":"Environmental Geography","keywords":["environmental degradation","sustainability","ecology","human impact"],"qno":"Q1","question":"Discuss the concept of ecological footprint and examine India's environmental challenges in the context of sustainable development.","marks":20,"source":"UPSC"},{"id":79,"year":2021,"paper":"Geography Optional P2","subject":"Geography Optional P2","subtopic":"Agriculture","keywords":["green revolution","food security","India","Punjab"],"qno":"Q1","question":"Critically assess the impact of the Green Revolution on India's food security and the environmental and social issues associated with it.","marks":20,"source":"UPSC"},{"id":80,"year":2024,"paper":"Essay","subject":"Essay","subtopic":"Ethics & Values","keywords":["ethics","values","society","human"],"qno":"Essay 1","question":"Character is higher than intellect.","marks":125,"source":"UPSC"},{"id":81,"year":2024,"paper":"Essay","subject":"Essay","subtopic":"Governance","keywords":["governance","technology","future","AI"],"qno":"Essay 2","question":"The future of governance lies not in artificial intelligence but in genuine empathy.","marks":125,"source":"UPSC"},{"id":82,"year":2023,"paper":"Essay","subject":"Essay","subtopic":"Environment","keywords":["environment","climate","nature","conservation"],"qno":"Essay 1","question":"A ship in harbour is safe, but that is not what ships are for.","marks":125,"source":"UPSC"},{"id":83,"year":2023,"paper":"Essay","subject":"Essay","subtopic":"Economy","keywords":["economic growth","development","India","aspirations"],"qno":"Essay 2","question":"Child is the father of man.","marks":125,"source":"UPSC"},{"id":84,"year":2022,"paper":"GS3","subject":"Disaster Management","subtopic":"Cyclone Management","keywords":["cyclone","disaster management","Odisha","early warning"],"qno":"Q1","question":"Discuss the role of early warning systems in disaster management with specific reference to cyclone management in India.","marks":15,"source":"UPSC"},{"id":85,"year":2022,"paper":"GS1","subject":"Society","subtopic":"Tribal Issues","keywords":["tribal","scheduled tribes","forest rights","India"],"qno":"Q1","question":"Examine the issues related to the rights of Scheduled Tribes over forest lands and the challenges in implementing the Forest Rights Act.","marks":15,"source":"UPSC"},{"id":86,"year":2021,"paper":"GS4","subject":"Theory","subtopic":"Attitude","keywords":["attitude","behaviour","social influence","cognitive dissonance"],"qno":"Q1","question":"Distinguish between 'attitude' and 'aptitude'. How do attitudes influence behaviour and what role does social influence play in shaping attitudes?","marks":15,"source":"UPSC"},{"id":87,"year":2020,"paper":"GS2","subject":"Governance","subtopic":"RTI","keywords":["RTI","transparency","accountability","information"],"qno":"Q1","question":"The Right to Information Act has been a landmark legislation in promoting transparency and accountability in governance. Critically examine its impact and limitations.","marks":15,"source":"UPSC"},{"id":88,"year":2019,"paper":"GS4","subject":"Theory","subtopic":"Foundational Values","keywords":["honesty","objectivity","dedication","public service"],"qno":"Q1","question":"What do you understand by the term 'foundational values for civil services'? Illustrate any three such values with their relevance in the present context.","marks":10,"source":"UPSC"},{"id":89,"year":2018,"paper":"GS2","subject":"Social Justice","subtopic":"Poverty","keywords":["poverty","MGNREGS","rural employment","social security"],"qno":"Q1","question":"MGNREGS has been one of the largest social security schemes in the world. Critically examine its impact on rural poverty and the challenges faced.","marks":15,"source":"UPSC"},{"id":90,"year":2017,"paper":"GS3","subject":"Economy","subtopic":"Digital Economy","keywords":["digital payments","demonetisation","cashless economy","fintech"],"qno":"Q1","question":"Demonetisation and push towards digital payments \u2014 critically examine the impact on the Indian economy and the challenges in achieving a cashless society.","marks":15,"source":"UPSC"}];

/* ============================================================
   SECTION 2: STATE
   ============================================================ */
const State = {
  allQuestions:      [],
  filteredQuestions: [],
  selectedIds:       new Set(),
  currentMode:       'pyq',
  customParsed:      [],

  get selectedQuestions() {
    return this.allQuestions.filter(q => this.selectedIds.has(q.id));
  },
  get selectedCount()  { return this.selectedIds.size; },
  get selectedMarks()  {
    return this.selectedQuestions.reduce((s, q) => s + q.marks, 0);
  }
};

/* ============================================================
   SECTION 3: DATA LAYER — now uses embedded data, no fetch
   ============================================================ */
const DataLayer = (() => {

  function loadQuestions() {
    // Use embedded data — works with file:// and any HTTP host
    State.allQuestions     = QUESTIONS_DATA;
    State.filteredQuestions = [...QUESTIONS_DATA];
  }

  function getUniqueValues(field) {
    return [...new Set(State.allQuestions.map(q => q[field]).filter(v => v !== undefined && v !== null && v !== ''))]
      .sort((a, b) => typeof a === 'number' ? b - a : String(a).localeCompare(String(b)));
  }

  return { loadQuestions, getUniqueValues };
})();

/* ============================================================
   SECTION 4: DOM REFERENCES
   ============================================================ */
const DOM = {
  tabPyq:            () => document.getElementById('tab-pyq'),
  tabCustom:         () => document.getElementById('tab-custom'),
  panelPyq:          () => document.getElementById('panel-pyq'),
  panelCustom:       () => document.getElementById('panel-custom'),

  filterYear:        () => document.getElementById('filter-year'),
  filterPaper:       () => document.getElementById('filter-paper'),
  filterSubject:     () => document.getElementById('filter-subject'),
  filterSubtopic:    () => document.getElementById('filter-subtopic'),
  filterSearch:      () => document.getElementById('filter-search'),
  btnApply:          () => document.getElementById('btn-apply-filter'),
  btnReset:          () => document.getElementById('btn-reset-filter'),
  filterCount:       () => document.getElementById('filter-count'),

  selectedBar:       () => document.getElementById('selected-bar'),
  selectedCount:     () => document.getElementById('selected-count'),
  selectedMarks:     () => document.getElementById('selected-marks'),
  btnClearSel:       () => document.getElementById('btn-clear-selection'),
  btnGeneratePyq:    () => document.getElementById('btn-generate-pyq'),

  tbody:             () => document.getElementById('question-tbody'),
  selectAll:         () => document.getElementById('select-all'),

  customInput:       () => document.getElementById('custom-input'),
  textareaCounter:   () => document.getElementById('textarea-counter'),
  btnParsePreview:   () => document.getElementById('btn-parse-preview'),
  btnGenerateCustom: () => document.getElementById('btn-generate-custom'),
  customPreview:     () => document.getElementById('custom-preview'),
  previewList:       () => document.getElementById('preview-list'),
  customError:       () => document.getElementById('custom-error'),

  pdfModal:          () => document.getElementById('pdf-modal'),
  modalClose:        () => document.getElementById('modal-close'),
  modalCancel:       () => document.getElementById('modal-cancel'),
  modalConfirm:      () => document.getElementById('modal-confirm'),
  pdfFooterCode:     () => document.getElementById('pdf-footer-code'),
  pdfTitleInput:     () => document.getElementById('pdf-title'),
  modalSummary:      () => document.getElementById('modal-summary'),

  toast:             () => document.getElementById('toast')
};

/* ============================================================
   SECTION 5: UTILITIES
   ============================================================ */
const Utils = (() => {
  let toastTimer = null;

  function showToast(message, type = 'default') {
    const el = DOM.toast();
    el.textContent = message;
    el.className = `toast toast--${type}`;
    el.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('hidden'), 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  return { showToast, escapeHtml };
})();

/* ============================================================
   SECTION 6: FILTERS
   ============================================================ */
const Filters = (() => {

  function populateSelect(selectEl, values, placeholder) {
    selectEl.innerHTML = `<option value="">${placeholder}</option>`;
    values.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      selectEl.appendChild(opt);
    });
  }

  function initFilterDropdowns() {
    populateSelect(DOM.filterYear(),     DataLayer.getUniqueValues('year'),     'All Years');
    populateSelect(DOM.filterPaper(),    DataLayer.getUniqueValues('paper'),    'All Papers');
    populateSelect(DOM.filterSubject(),  DataLayer.getUniqueValues('subject'),  'All Subjects');
    populateSelect(DOM.filterSubtopic(), DataLayer.getUniqueValues('subtopic'), 'All Subtopics');
  }

  function getFilterValues() {
    return {
      year:     DOM.filterYear().value,
      paper:    DOM.filterPaper().value,
      subject:  DOM.filterSubject().value,
      subtopic: DOM.filterSubtopic().value,
      search:   DOM.filterSearch().value.trim().toLowerCase()
    };
  }

  function applyFilters() {
    const f = getFilterValues();
    State.filteredQuestions = State.allQuestions.filter(q => {
      if (f.year     && String(q.year) !== f.year)    return false;
      if (f.paper    && q.paper        !== f.paper)   return false;
      if (f.subject  && q.subject      !== f.subject) return false;
      if (f.subtopic && q.subtopic     !== f.subtopic)return false;
      if (f.search) {
        const haystack = [
          q.question, q.paper, q.subject, q.subtopic,
          String(q.year), ...(q.keywords || [])
        ].join(' ').toLowerCase();
        if (!haystack.includes(f.search)) return false;
      }
      return true;
    });
    Table.render();
    updateFilterCount();
  }

  function resetFilters() {
    DOM.filterYear().value     = '';
    DOM.filterPaper().value    = '';
    DOM.filterSubject().value  = '';
    DOM.filterSubtopic().value = '';
    DOM.filterSearch().value   = '';
    State.filteredQuestions = [...State.allQuestions];
    Table.render();
    updateFilterCount();
  }

  function updateFilterCount() {
    DOM.filterCount().textContent =
      `${State.filteredQuestions.length} of ${State.allQuestions.length} questions`;
  }

  return { initFilterDropdowns, applyFilters, resetFilters, updateFilterCount };
})();

/* ============================================================
   SECTION 7: TABLE — Render & Selection
   ============================================================ */
const Table = (() => {

  function render() {
    const tbody = DOM.tbody();
    tbody.innerHTML = '';

    if (State.filteredQuestions.length === 0) {
      tbody.innerHTML = '<tr class="empty-row"><td colspan="6">No questions match your filters. Try adjusting or resetting.</td></tr>';
      syncSelectAll();
      return;
    }

    const fragment = document.createDocumentFragment();
    State.filteredQuestions.forEach(q => fragment.appendChild(buildRow(q)));
    tbody.appendChild(fragment);
    syncSelectAll();
  }

  function buildRow(q) {
    const tr = document.createElement('tr');
    tr.dataset.id = q.id;
    if (State.selectedIds.has(q.id)) tr.classList.add('row--selected');

    tr.innerHTML = `
      <td class="col-check">
        <label class="checkbox-wrapper">
          <input type="checkbox" class="row-checkbox" data-id="${q.id}" ${State.selectedIds.has(q.id) ? 'checked' : ''} />
          <span class="checkmark"></span>
        </label>
      </td>
      <td class="col-year"><span class="tag tag--year">${q.year}</span></td>
      <td class="col-paper"><span class="tag tag--paper">${Utils.escapeHtml(q.paper)}</span></td>
      <td class="col-subject" style="font-size:0.8rem;color:var(--ink-muted);">${Utils.escapeHtml(q.subject || '')}</td>
      <td class="col-question"><span class="question-text">${Utils.escapeHtml(q.question)}</span></td>
      <td class="col-marks"><span class="tag tag--marks">${q.marks}</span></td>
    `;

    tr.querySelector('.row-checkbox').addEventListener('change', e => {
      toggleRow(q.id, e.target.checked);
    });

    // Click on row (not on checkbox/label) also toggles
    tr.addEventListener('click', e => {
      if (e.target.classList.contains('row-checkbox') ||
          e.target.classList.contains('checkmark') ||
          e.target.closest('label')) return;
      const cb = tr.querySelector('.row-checkbox');
      cb.checked = !cb.checked;
      toggleRow(q.id, cb.checked);
    });

    return tr;
  }

  function toggleRow(id, checked) {
    if (checked) State.selectedIds.add(id);
    else          State.selectedIds.delete(id);
    const tr = DOM.tbody().querySelector(`tr[data-id="${id}"]`);
    if (tr) tr.classList.toggle('row--selected', checked);
    syncSelectAll();
    updateSelectedBar();
  }

  function syncSelectAll() {
    const cb = DOM.selectAll();
    const visibleIds       = State.filteredQuestions.map(q => q.id);
    const selectedVisible  = visibleIds.filter(id => State.selectedIds.has(id));

    if (selectedVisible.length === 0) {
      cb.checked = false; cb.indeterminate = false;
    } else if (selectedVisible.length === visibleIds.length) {
      cb.checked = true;  cb.indeterminate = false;
    } else {
      cb.checked = false; cb.indeterminate = true;
    }
  }

  function handleSelectAll(checked) {
    State.filteredQuestions.forEach(q => {
      if (checked) State.selectedIds.add(q.id);
      else          State.selectedIds.delete(q.id);
    });
    render();
    updateSelectedBar();
  }

  function updateSelectedBar() {
    const count = State.selectedCount;
    DOM.selectedCount().textContent = `${count} question${count !== 1 ? 's' : ''} selected`;
    DOM.selectedMarks().textContent = count > 0 ? `${State.selectedMarks} total marks` : '';
    DOM.selectedBar().style.opacity = count > 0 ? '1' : '0.7';
  }

  function clearSelection() {
    State.selectedIds.clear();
    render();
    updateSelectedBar();
  }

  return { render, updateSelectedBar, clearSelection, handleSelectAll };
})();

/* ============================================================
   SECTION 8: CUSTOM QUESTION PARSER
   ============================================================ */
const CustomParser = (() => {

  // Accepts: Q1. text [15] | Q1. text (15) | 1. text 15 marks | Q1. text 15
  const PATTERN =
    /^(?:Q\s*)?(\d+)[.)]\s*(.+?)\s*[\[(](\d+)[\])][.)?\s]*$|^(?:Q\s*)?(\d+)[.)]\s*(.+?)\s+(\d+)\s*(?:marks?)?\s*\.?\s*$/i;

  function parse(rawText) {
    if (!rawText) return [];
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    const questions = [];

    lines.forEach((line, idx) => {
      const m = line.match(PATTERN);
      if (m) {
        const qno  = m[1] || m[4];
        const text = (m[2] || m[5] || '').trim().replace(/\s*[\[(]\d+[\])]\s*$/, '').trim();
        const mks  = parseInt(m[3] || m[6], 10);
        if (text && mks && mks > 0 && mks <= 250) {
          questions.push({
            id:       `custom_${idx}`,
            qno:      `Q${qno}`,
            question: text,
            marks:    mks,
            paper:    'Custom',
            year:     new Date().getFullYear(),
            subject:  'Custom',
            subtopic: ''
          });
        }
      }
    });

    return questions;
  }

  function countDetected(rawText) {
    return parse(rawText).length;
  }

  return { parse, countDetected };
})();

/* ============================================================
   SECTION 9: PDF GENERATOR
   ============================================================ */
const PDFGenerator = (() => {

  const PAGE_W           = 210;
  const PAGE_H           = 297;
  const MARGIN_LEFT_OUTER = 10;
  const MARGIN_LEFT_LINE  = 22;
  const MARGIN_LEFT_TEXT  = 24;
  const MARGIN_RIGHT_LINE = 186;
  const MARGIN_TOP        = 20;
  const MARGIN_BOTTOM     = 18;
  const RIGHT_NOTE_X      = 188;

  function pagesForMarks(marks) {
    if (marks <= 10) return 2;
    if (marks <= 15) return 3;
    if (marks <= 20) return 4;
    return Math.ceil(marks / 5) + 1;
  }

  function drawPageFrame(doc) {
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_LEFT_LINE,  MARGIN_TOP - 5, MARGIN_LEFT_LINE,  PAGE_H - MARGIN_BOTTOM);
    doc.line(MARGIN_RIGHT_LINE, MARGIN_TOP - 5, MARGIN_RIGHT_LINE, PAGE_H - MARGIN_BOTTOM);
  }

  function drawRightMarginNote(doc) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const noteLines = ['Candidates', 'must not', 'write on', 'this margin'];
    let y = MARGIN_TOP + 2;
    noteLines.forEach(line => { doc.text(line, RIGHT_NOTE_X + 1, y); y += 4; });
    doc.setTextColor(0, 0, 0);
  }

  function drawFooter(doc, footerCode, pageNum) {
    const footerY = PAGE_H - 8;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bolditalic');
    doc.setTextColor(0, 0, 0);
    doc.text(footerCode, MARGIN_LEFT_TEXT, footerY);
    doc.text(String(pageNum), PAGE_W / 2, footerY, { align: 'center' });
  }

  function drawQuestionPage(doc, questionText, qSeqNum, marksText, footerCode, pageNum) {
    drawPageFrame(doc);
    drawRightMarginNote(doc);

    const textAreaWidth = MARGIN_RIGHT_LINE - MARGIN_LEFT_TEXT - 5;

    // Q number outside margin
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`Q${qSeqNum}.`, MARGIN_LEFT_OUTER, MARGIN_TOP + 5);

    // Question text with marks appended inline at the end
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const fullText = `${questionText} (${marksText} marks)`;
    const lines = doc.splitTextToSize(fullText, textAreaWidth);
    let y = MARGIN_TOP + 5;
    lines.forEach(line => { doc.text(line, MARGIN_LEFT_TEXT, y); y += 7; });

    drawFooter(doc, footerCode, pageNum);
  }

  function drawAnswerPage(doc, footerCode, pageNum) {
    drawPageFrame(doc);
    drawRightMarginNote(doc);
    drawFooter(doc, footerCode, pageNum);
  }

  function generate(questions, footerCode, titleNote) {
    if (!questions || questions.length === 0) {
      Utils.showToast('No questions to generate.', 'error');
      return;
    }

    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const code = footerCode || 'XXX-X-GS/0000';

      let pdfPageNumber = 1;
      let firstPage     = true;

      questions.forEach((q, index) => {
        const totalPgs = pagesForMarks(q.marks);

        if (!firstPage) doc.addPage();
        firstPage = false;

        drawQuestionPage(doc, q.question, index + 1, String(q.marks), code, pdfPageNumber);
        pdfPageNumber++;

        for (let i = 1; i < totalPgs; i++) {
          doc.addPage();
          drawAnswerPage(doc, code, pdfPageNumber);
          pdfPageNumber++;
        }
      });

      const filename = titleNote
        ? `QCAB_${titleNote.replace(/[^a-z0-9]/gi, '_')}.pdf`
        : `QCAB_${Date.now()}.pdf`;

      doc.save(filename);
      Utils.showToast('PDF generated successfully!', 'success');
    } catch (err) {
      console.error('PDF generation error:', err);
      Utils.showToast('PDF generation failed. Check console for details.', 'error');
    }
  }

  return { generate };
})();

/* ============================================================
   SECTION 10: MODAL CONTROLLER
   ============================================================ */
const Modal = (() => {
  let _pendingQuestions = null;

  function open(questions) {
    _pendingQuestions = questions;

    const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
    const totalPages = questions.reduce((s, q) => {
      if (q.marks <= 10) return s + 2;
      if (q.marks <= 15) return s + 3;
      if (q.marks <= 20) return s + 4;
      return s + Math.ceil(q.marks / 5) + 1;
    }, 0);

    DOM.modalSummary().innerHTML =
      `<strong>${questions.length}</strong> question${questions.length !== 1 ? 's' : ''} &nbsp;&middot;&nbsp; ` +
      `<strong>${totalMarks}</strong> total marks &nbsp;&middot;&nbsp; ` +
      `<strong>${totalPages}</strong> pages in PDF`;

    DOM.pdfModal().classList.remove('hidden');
  }

  function close() {
    DOM.pdfModal().classList.add('hidden');
    // NOTE: do NOT clear _pendingQuestions here — confirm() needs it
  }

  function confirm() {
    // Capture questions before closing modal
    const questionsToGenerate = _pendingQuestions;
    if (!questionsToGenerate || questionsToGenerate.length === 0) {
      Utils.showToast('No questions to generate.', 'error');
      return;
    }
    const code  = DOM.pdfFooterCode().value.trim() || 'XXX-X-GS/0000';
    const title = DOM.pdfTitleInput().value.trim();

    // Close modal first, then generate
    close();
    _pendingQuestions = null;
    PDFGenerator.generate(questionsToGenerate, code, title);
  }

  return { open, close, confirm };
})();

/* ============================================================
   SECTION 11: CUSTOM PANEL CONTROLLER
   ============================================================ */
const CustomPanel = (() => {

  function showError(msg) {
    const el = DOM.customError();
    el.textContent = msg;
    el.classList.remove('hidden');
  }

  function hideError() {
    DOM.customError().classList.add('hidden');
  }

  function updateCounter() {
    const count = CustomParser.countDetected(DOM.customInput().value);
    DOM.textareaCounter().textContent =
      count === 0 ? '0 questions detected'
                  : `${count} question${count !== 1 ? 's' : ''} detected`;
  }

  function renderPreview(questions) {
    const list = DOM.previewList();
    list.innerHTML = '';
    questions.forEach((q, i) => {
      const li = document.createElement('li');
      li.className = 'preview-item';
      li.innerHTML =
        `<span class="q-num">Q${i + 1}</span>` +
        `<span>${Utils.escapeHtml(q.question)}</span>` +
        `<span class="q-marks">${q.marks}M</span>`;
      list.appendChild(li);
    });
    DOM.customPreview().style.display = 'block';
  }

  function handlePreview() {
    hideError();
    const raw = DOM.customInput().value.trim();
    if (!raw) { showError('Please enter some questions first.'); return; }
    const parsed = CustomParser.parse(raw);
    if (parsed.length === 0) {
      showError('No valid questions found. Check the format — e.g. "Q1. Your question text. [15]"');
      return;
    }
    State.customParsed = parsed;
    renderPreview(parsed);
  }

  function handleGenerate() {
    hideError();
    const raw = DOM.customInput().value.trim();
    if (!raw) { showError('Please enter some questions first.'); return; }
    const parsed = CustomParser.parse(raw);
    if (parsed.length === 0) {
      showError('No valid questions found. Check the format — e.g. "Q1. Your question text. [15]"');
      return;
    }
    State.customParsed = parsed;
    Modal.open(parsed);
  }

  return { updateCounter, handlePreview, handleGenerate };
})();

/* ============================================================
   SECTION 12: MODE SWITCHER
   ============================================================ */
const ModeSwitcher = (() => {
  function switchTo(mode) {
    State.currentMode = mode;
    DOM.tabPyq().classList.toggle('active',      mode === 'pyq');
    DOM.tabCustom().classList.toggle('active',   mode === 'custom');
    DOM.panelPyq().classList.toggle('hidden',    mode !== 'pyq');
    DOM.panelCustom().classList.toggle('hidden', mode !== 'custom');
  }
  return { switchTo };
})();

/* ============================================================
   SECTION 13: EVENT BINDING
   ============================================================ */
const EventBinder = (() => {

  function bindAll() {
    DOM.tabPyq().addEventListener('click',    () => ModeSwitcher.switchTo('pyq'));
    DOM.tabCustom().addEventListener('click', () => ModeSwitcher.switchTo('custom'));

    DOM.btnApply().addEventListener('click', Filters.applyFilters);
    DOM.btnReset().addEventListener('click', Filters.resetFilters);
    DOM.filterSearch().addEventListener('keydown', e => {
      if (e.key === 'Enter') Filters.applyFilters();
    });

    DOM.selectAll().addEventListener('change', e => Table.handleSelectAll(e.target.checked));
    DOM.btnClearSel().addEventListener('click', Table.clearSelection);
    DOM.btnGeneratePyq().addEventListener('click', handleGeneratePyq);

    DOM.customInput().addEventListener('input',        CustomPanel.updateCounter);
    DOM.btnParsePreview().addEventListener('click',    CustomPanel.handlePreview);
    DOM.btnGenerateCustom().addEventListener('click',  CustomPanel.handleGenerate);

    DOM.modalClose().addEventListener('click',   Modal.close);
    DOM.modalCancel().addEventListener('click',  Modal.close);
    DOM.modalConfirm().addEventListener('click', Modal.confirm);
    DOM.pdfModal().addEventListener('click', e => {
      if (e.target === DOM.pdfModal()) Modal.close();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') Modal.close();
    });
  }

  function handleGeneratePyq() {
    const selected = State.selectedQuestions;
    if (selected.length === 0) {
      Utils.showToast('Please select at least one question.', 'error');
      return;
    }
    Modal.open(selected);
  }

  return { bindAll };
})();

/* ============================================================
   SECTION 14: INIT
   ============================================================ */
function init() {
  DataLayer.loadQuestions();          // synchronous — uses embedded data
  Filters.initFilterDropdowns();
  Filters.updateFilterCount();
  Table.render();
  Table.updateSelectedBar();
  EventBinder.bindAll();
}

document.addEventListener('DOMContentLoaded', init);

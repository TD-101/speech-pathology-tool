// Speech Pathology Diagnostic Decision Tree - Complete Evidence-Based Guide
// All conditions and interventions from the Melbourne practice guide

// Application state
let currentStep = 'start';
let selectedPath = {};
let recommendations = null;

// Complete evidence-based interventions database from the guide
const interventionDatabase = {
    // Autism Spectrum Disorder
    'autism-nonverbal': {
        title: 'Autism Spectrum Disorder - AAC Intervention',
        assessment: 'DSM-5 criteria, behavioral observation, parent questionnaires, functional communication measures',
        interventions: [
            'Speech-generating devices (most commonly reported intervention)',
            'Picture Exchange Communication System (PECS) - moderate to large effect sizes',
            'Aided language stimulation for symbol comprehension',
            'Core vocabulary interventions using high-frequency words',
            'Social communication approaches with time delay and prompting strategies',
            'Structured routines implemented in natural contexts'
        ],
        evidence: 'Multimodal communication approaches with AAC show highly effective outcomes. Speech-generating devices most commonly reported intervention.',
        funding: 'NDIS Capacity Building Supports ($193.99/hour 2025-26), Helping Children with Autism Program Medicare Item 135 (under 13 years, up to 4 diagnostic + 20 treatment sessions)',
        considerations: 'Australian practice increasingly adopts neurodiversity-affirming approaches, prioritizing self-advocacy and community participation over traditional compliance-based interventions'
    },
    'autism-verbal': {
        title: 'Autism Spectrum Disorder - Verbal Communication',
        assessment: 'DSM-5 criteria with behavioral observation, parent questionnaires, functional communication measures focusing on pragmatic skills',
        interventions: [
            'Social communication approaches emphasizing natural contexts',
            'Time delay and prompting strategies in structured routines',
            'Pragmatic language intervention for social interaction',
            'Video modeling for social situations',
            'Peer-mediated social communication training',
            'Community participation-focused interventions'
        ],
        evidence: 'Social communication approaches prove most effective when implemented in natural contexts with neurodiversity-affirming principles',
        funding: 'NDIS funding for capacity building, Medicare Item 135 for children under 13 (consultant pediatrician/psychiatrist referral required)',
        considerations: 'Focus on functional communication in natural environments rather than compliance-based approaches. Emphasize self-advocacy skills development.'
    },
    'autism-emerging': {
        title: 'Autism Spectrum Disorder - Emerging Communication',
        assessment: 'Early communication assessment focusing on joint attention, requesting, and emerging symbolic communication',
        interventions: [
            'Core vocabulary interventions with aided language stimulation',
            'Joint attention and requesting skill development',
            'Early AAC introduction with symbol-based systems',
            'Parent-implemented naturalistic intervention',
            'Play-based communication enhancement',
            'Environmental arrangement for communication opportunities'
        ],
        evidence: 'Early intervention with core vocabulary and aided language stimulation supports symbol comprehension across age groups',
        funding: 'NDIS Early Childhood Approach (under 7 years with developmental delay), Medicare Item 135 for eligible children',
        considerations: 'Early introduction of AAC systems supports rather than impedes verbal communication development'
    },

    // ADHD
    'adhd-language': {
        title: 'ADHD with Language Processing Difficulties',
        assessment: 'Comprehensive language evaluation including pragmatic skills, executive function measures, and phonological processing evaluation',
        interventions: [
            'Executive function training integrated with speech-language therapy',
            'Phonics-based instruction combined with executive function training',
            'Word recall and organizational strategy training',
            'Pragmatic language intervention for turn-taking and topic maintenance',
            'Play-based therapy for children, workplace communication strategies for adults',
            'Behavioral modification approaches combined with language therapy'
        ],
        evidence: 'Forty percent of children with ADHD experience phonological processing difficulties impacting literacy. Combined approaches show significant improvements in both domains.',
        funding: 'Medicare CDM plans (Item 10970, up to 5 sessions per year, $60.35 rebate), NDIS for significant functional impact',
        considerations: 'Age-specific interventions: play-based therapy for children, workplace communication strategies for adults. Address rapid speech patterns and organizational difficulties.'
    },
    'adhd-phonological': {
        title: 'ADHD with Phonological Processing Issues',
        assessment: 'Comprehensive phonological processing evaluation, literacy assessment, executive function measures',
        interventions: [
            'Phonics-based instruction targeting sound awareness',
            'Phonological awareness programs with executive function support',
            'Reading intervention with attention regulation strategies',
            'Multi-sensory learning approaches',
            'Executive function training for academic tasks',
            'Computer-based phonological training programs'
        ],
        evidence: '40% of children with ADHD have phonological processing difficulties. Integrated phonics and executive function training shows significant literacy improvements.',
        funding: 'Medicare CDM plans, school-based services (Victorian Government funding Prep-Year 4), NDIS for complex needs',
        considerations: 'Address both attention regulation and phonological processing simultaneously for optimal outcomes'
    },

    // Developmental Language Disorder
    'dld-early': {
        title: 'Developmental Language Disorder - Early Intervention',
        assessment: 'Comprehensive language batteries including standardized assessments, dynamic assessment procedures, functional communication measures',
        interventions: [
            'Intensive intervention programs (6-week models show 5x gains vs traditional 2-year approaches)',
            'Electronic storybooks with static presentations (more effective than multimedia)',
            'Phonological awareness programs (traditional and tablet-based methods equivalent)',
            'Parent-implemented language intervention strategies',
            'Dynamic assessment approaches using test-teach-retest models',
            'NDIS-funded intensive intervention approaches'
        ],
        evidence: 'Early intervention for 3-4 year olds demonstrates positive effects on phonological skills. DLD affects 7% of Australia\'s population (1 in 14 people).',
        funding: 'NDIS Early Childhood Approach (under 7 years with developmental delay), Medicare CDM plans, DLD Project Australia resources',
        considerations: 'Persistent language difficulty beyond age 5 with functional impact on daily life. Lifelong condition requiring ongoing support.'
    },
    'dld-school': {
        title: 'Developmental Language Disorder - School Age',
        assessment: 'Comprehensive language evaluation with academic language focus, standardized assessments with Australian norms, literacy integration assessment',
        interventions: [
            'Academic language support integrated with curriculum',
            'Literacy-focused language intervention',
            'Vocabulary expansion with academic terminology',
            'Narrative and discourse skill development',
            'Collaborative consultation with educational teams',
            'Technology-enhanced intervention including tablet applications'
        ],
        evidence: 'School-age children benefit from intensive models and curriculum-integrated approaches. Technology-enhanced interventions show equivalent effectiveness.',
        funding: 'NDIS Capacity Building Supports, Victorian Government school-based services, Medicare CDM plans with GP referral',
        considerations: 'Integration with educational support services essential. Focus on functional academic communication skills.'
    },

    // Intellectual Disabilities
    'intellectual-disability': {
        title: 'Intellectual Disabilities - Communication Support',
        assessment: 'Communication levels from pre-symbolic to verbal communication, cultural safety considerations, functional assessment approaches',
        interventions: [
            'Person-centered planning with AAC systems matched to competence levels',
            'Objects of reference (most commonly used for profound ID)',
            'Communication passports supporting transition across environments',
            'Communication partner training for effective AAC implementation',
            'Environmental modifications supporting multimodal communication',
            'Verbal, visual, and tactile communication combinations'
        ],
        evidence: 'Strong relationships exist between communication competence and quality of life, with greatest impact on self-determination and social inclusion',
        funding: 'NDIS Capacity Building Supports, state disability services, Medicare CDM plans for complex needs',
        considerations: 'Communication partner training essential for success. Focus on functional communication across all environments.'
    },

    // Physical Conditions
    'cerebral-palsy': {
        title: 'Cerebral Palsy and Motor Speech Disorders',
        assessment: 'Frenchay Dysarthria Assessment (12+ years), Verbal Motor Production Assessment for Children (under 12 years), AAC assessment',
        interventions: [
            'Lee Silverman Voice Treatment (LSVT LOUD®) for intensive voice therapy',
            'PROMPT (Prompts for Restructuring Oral Muscular Phonetic Targets) tactile-kinesthetic approach',
            'Subsystems approach targeting each speech system individually',
            'Speech intelligibility treatment with "loud voice" and "big mouth" techniques',
            'Early AAC introduction at 2-3 years (high success rates)',
            'Combination verbal and AAC communication approaches'
        ],
        evidence: 'Fifty to ninety percent of people with cerebral palsy have dysarthria. Majority communicate verbally or use combination approaches with AAC.',
        funding: 'NDIS Capacity Building Supports, Medicare CDM plans, WorkSafe Victoria for injury-related cases',
        considerations: 'Early AAC introduction at 2-3 years demonstrates high success rates. Focus on functional communication across environments.'
    },
    'cleft-palate': {
        title: 'Cleft Lip and Palate Speech Intervention',
        assessment: 'Perceptual evaluation combined with instrumental assessment including nasopharyngoscopy and nasometry',
        interventions: [
            'Intensive articulation therapy programs (10-week protocols)',
            'Parent-Led Articulation Therapy (PLAT) - equivalent outcomes to clinician-delivered',
            'Multidisciplinary team approach following ACPA standards',
            'Hybrid telepractice and in-person treatment approaches',
            'Post-surgical speech therapy for persistent issues',
            'Resonance and articulation-focused interventions'
        ],
        evidence: 'Intensive 10-week protocols show significant improvement in consonant correctness and reduction of cleft speech characteristics. PLAT demonstrates equivalent outcomes.',
        funding: 'Medicare coverage through specialist referrals, private health insurance Extras Cover, multidisciplinary clinic funding',
        considerations: 'Thirty percent experience persistent velopharyngeal insufficiency post-surgery requiring ongoing intervention. Mandatory speech pathology in multidisciplinary teams.'
    },
    'hearing-impairment': {
        title: 'Hearing Impairment and Cochlear Implants',
        assessment: 'Audiological evaluation integrated with comprehensive speech-language assessment, family-centered assessment approaches',
        interventions: [
            'Auditory-Verbal Therapy (AVT) as intensive early intervention',
            'Listening and spoken language development with family-centered approaches',
            'Parents positioned as primary facilitators with LSLS specialist support',
            'Bilingual-bimodal approaches integrating sign language when appropriate',
            'Technology integration and cochlear implant optimization',
            'Cultural considerations for communication preferences'
        ],
        evidence: 'Universal Newborn Hearing Screening enables early intervention at 2-3 months. 80% of children with cochlear implants achieve age-appropriate language by first grade.',
        funding: 'Australian Hearing services, NDIS support for complex needs, Medicare coverage for specialists',
        considerations: 'Early intervention critical. Certified LSLS specialists provide specialized intervention. Respect individual and cultural communication preferences.'
    },
    'acquired-brain-injury': {
        title: 'Acquired Brain Injury - Cognitive Communication',
        assessment: 'Cognitive Linguistic Quick Test, comprehensive cognitive-communication evaluation, functional assessment for education/employment return',
        interventions: [
            'TBI Express and TBIconneCT programs (Australian-developed frameworks)',
            'Intensive Cognitive-Communication Rehabilitation (15-week programs)',
            'Constraint-induced language therapy for aphasia (strong evidence base)',
            'Virtual reality applications for social interaction training',
            'Patient Aligned Care Teams with interprofessional practice',
            'Long-term monitoring with family and caregiver training'
        ],
        evidence: 'Australian-developed programs target young adults returning to education and employment. Constraint-induced language therapy shows strong evidence for aphasia.',
        funding: 'Medicare coverage, WorkCover for injury-related, NDIS support for ongoing needs, hospital acute services',
        considerations: 'Long-term monitoring addresses ongoing cognitive-communication changes. Integration with neurology, psychology, OT essential.'
    },

    // Voice Disorders
    'voice-disorders': {
        title: 'Voice Disorders - Evidence-Based Treatment',
        assessment: 'Perceptual voice evaluation combined with acoustic analysis and laryngeal imaging through videostroboscopy',
        interventions: [
            'Physiologic voice therapy with vocal function exercises',
            'Resonant voice therapy for vocal efficiency',
            'Lee Silverman Voice Treatment (LSVT) for Parkinson\'s disease-related disorders',
            'Indirect approaches emphasizing vocal hygiene and lifestyle modifications',
            'Professional voice user specialized occupational therapy',
            'Telepractice delivery (demonstrated effectiveness during COVID-19)'
        ],
        evidence: 'Fifty-nine percent of children with voice disorders receive vocal nodules diagnoses. Telepractice shows equivalent effectiveness to face-to-face.',
        funding: 'Medicare CDM plans, private health insurance Extras Cover, specialist ENT referrals',
        considerations: 'Professional voice users require specialized approaches. Telepractice expands access to services, particularly for rural areas.'
    },

    // Fluency Disorders
    'childhood-stuttering': {
        title: 'Childhood Stuttering - Early Intervention',
        assessment: 'Fluency assessment, parent questionnaires, severity rating scales, developmental history',
        interventions: [
            'Lidcombe Program for children under 6 years (high success rates)',
            'Westmead Program for older children',
            'Syllable Timed Speech techniques',
            'Parent training and education as primary facilitators',
            'Telepractice delivery (non-inferior outcomes to face-to-face)',
            'Maintenance programs to prevent relapse'
        ],
        evidence: 'Early intervention with Lidcombe Program demonstrates high success rates. Telepractice enhanced therapeutic relationships and parental engagement.',
        funding: 'Medicare CDM plans, private health insurance, community health programs with priority access',
        considerations: 'Maintenance programs essential to prevent relapse. Support groups and peer networks provide ongoing community support.'
    },
    'adult-stuttering': {
        title: 'Adult Stuttering - Comprehensive Management',
        assessment: 'Fluency severity assessment, psychological impact evaluation, functional communication assessment',
        interventions: [
            'Camperdown Program for speech restructuring',
            'Holistic approaches addressing psychological aspects of stuttering',
            'Support groups and peer networks for ongoing assistance',
            'Workplace communication strategies and accommodations',
            'Acceptance and commitment therapy integration',
            'Telepractice delivery with equivalent outcomes'
        ],
        evidence: 'Combined speech restructuring and psychological support approaches most effective. Community support networks essential for maintenance.',
        funding: 'Medicare CDM plans, private health insurance, Employee Assistance Programs (EAP), community health services',
        considerations: 'Address both speech and psychological aspects. Community support networks provide essential ongoing assistance beyond formal therapy.'
    },

    // Swallowing Disorders
    'pediatric-dysphagia': {
        title: 'Pediatric Feeding and Swallowing Disorders',
        assessment: 'Clinical bedside evaluation, flexible endoscopic evaluation of swallowing (FEES), videofluoroscopy when indicated',
        interventions: [
            'Family-centered feeding therapy approaches',
            'Sensory-based feeding interventions for texture aversion',
            'Oral motor therapy techniques for skill development',
            'Texture progression protocols with systematic advancement',
            'Multidisciplinary team approach with dietitians and OT',
            'Quality of life and nutritional status monitoring'
        ],
        evidence: 'Family-centered approaches show improved outcomes and compliance. Age-specific interventions essential for developmental considerations.',
        funding: 'NDIS funding for complex feeding needs, Medicare specialist referrals, hospital-based multidisciplinary services',
        considerations: 'Quality of life and nutritional status monitoring guide long-term management. Caregiver training essential for home implementation.'
    },
    'adult-dysphagia': {
        title: 'Adult Dysphagia - Safety-Focused Management',
        assessment: 'Clinical swallow evaluation, instrumental assessment including FEES and videofluoroscopy (VFSS)',
        interventions: [
            'Swallowing exercises and rehabilitation protocols',
            'Diet texture modifications using IDDSI framework',
            'Postural strategies and compensatory techniques',
            'Neuromuscular electrical stimulation with biofeedback',
            'Caregiver training and education for safety',
            'Multidisciplinary team coordination with dietitians and medical specialists'
        ],
        evidence: 'Combination of exercises and compensatory strategies most effective. Safety-focused interventions with ongoing monitoring required.',
        funding: 'Medicare coverage for acute/chronic management, aged care funding, private health insurance, hospital services',
        considerations: 'Safety-focused interventions for older adults. Ongoing monitoring essential. Integration with medical team for underlying conditions.'
    },

    // Speech Sound Disorders
    'speech-sounds': {
        title: 'Speech Sound Disorders - Articulation and Phonological',
        assessment: 'Comprehensive speech sound assessment, phonological process analysis, stimulability testing, oral mechanism examination',
        interventions: [
            'Traditional articulation therapy for specific sound errors',
            'Phonological process approach for pattern-based errors',
            'Cycles approach for multiple phonological processes',
            'Motor-based interventions for childhood apraxia of speech',
            'Parent-implemented home practice programs',
            'Technology-enhanced practice applications'
        ],
        evidence: 'Intensive intervention models show superior outcomes. Technology-enhanced interventions demonstrate equivalent effectiveness to traditional approaches.',
        funding: 'Medicare CDM plans, school-based services (Victorian Government Prep-Year 4), private health insurance',
        considerations: 'Early intervention critical for optimal outcomes. Integration with literacy development for school-age children.'
    }
};

// Enhanced decision tree with ALL pathways
const decisionSteps = {
    start: {
        title: 'Patient Assessment - Primary Presentation',
        description: 'Select the primary area of concern for evidence-based intervention recommendations',
        options: [
            { 
                id: 'neurodivergent', 
                title: 'Neurodivergent Conditions', 
                icon: '🧠',
                description: 'Autism, ADHD, DLD, Intellectual Disabilities' 
            },
            { 
                id: 'physical', 
                title: 'Physical Conditions', 
                icon: '🏥',
                description: 'Cerebral Palsy, Cleft Palate, Hearing Impairment, ABI' 
            },
            { 
                id: 'communication', 
                title: 'Communication Disorders', 
                icon: '💬',
                description: 'Speech sounds, Language, Voice, Fluency' 
            },
            { 
                id: 'swallowing', 
                title: 'Swallowing/Feeding', 
                icon: '🍽️',
                description: 'Dysphagia, Feeding disorders' 
            }
        ]
    },
    neurodivergent: {
        title: 'Neurodivergent Conditions',
        description: 'Select the specific neurodivergent presentation',
        options: [
            { id: 'autism-assessment', title: 'Autism Spectrum Disorder', description: 'Social communication, repetitive behaviors, sensory differences' },
            { id: 'adhd-assessment', title: 'ADHD', description: 'Attention, hyperactivity, executive function challenges' },
            { id: 'dld-assessment', title: 'Developmental Language Disorder', description: 'Persistent language difficulties beyond age 5' },
            { id: 'intellectual-disability', title: 'Intellectual Disabilities', description: 'Communication support needs, AAC considerations' }
        ]
    },
    'autism-assessment': {
        title: 'Autism Spectrum Disorder - Communication Profile',
        description: 'Select the primary communication presentation',
        options: [
            { id: 'autism-nonverbal', title: 'Minimally Verbal/Non-speaking', description: 'Limited or no spoken language, AAC candidates' },
            { id: 'autism-verbal', title: 'Verbal with Social Communication Needs', description: 'Spoken language present, pragmatic difficulties' },
            { id: 'autism-emerging', title: 'Emerging Communication', description: 'Early words, requesting, joint attention goals' }
        ]
    },
    'adhd-assessment': {
        title: 'ADHD - Speech-Language Manifestations',
        description: 'Select primary areas of concern',
        options: [
            { id: 'adhd-language', title: 'Language Processing Difficulties', description: 'Word-finding, organization, pragmatic challenges' },
            { id: 'adhd-phonological', title: 'Phonological Processing Issues', description: 'Reading difficulties, sound awareness problems' }
        ]
    },
    'dld-assessment': {
        title: 'Developmental Language Disorder - Age and Severity',
        description: 'Select age group and intervention focus',
        options: [
            { id: 'dld-early', title: 'Early Childhood (3-5 years)', description: 'Early intervention, foundational language skills' },
            { id: 'dld-school', title: 'School Age (6+ years)', description: 'Academic language support, literacy integration' }
        ]
    },
    physical: {
        title: 'Physical Conditions Affecting Speech/Language',
        description: 'Select the primary physical condition',
        options: [
            { id: 'cerebral-palsy', title: 'Cerebral Palsy/Motor Speech', description: 'Dysarthria, motor planning difficulties' },
            { id: 'cleft-palate', title: 'Cleft Lip and Palate', description: 'Resonance, articulation, VPI concerns' },
            { id: 'hearing-impairment', title: 'Hearing Impairment', description: 'Hearing aids, cochlear implants, deaf/HoH' },
            { id: 'acquired-brain-injury', title: 'Acquired Brain Injury', description: 'Stroke, TBI, progressive neurological conditions' }
        ]
    },
    communication: {
        title: 'Communication Disorders',
        description: 'Select the primary communication disorder',
        options: [
            { id: 'speech-sounds', title: 'Speech Sound Disorders', description: 'Articulation, phonological processes, apraxia' },
            { id: 'voice-disorders', title: 'Voice Disorders', description: 'Vocal quality, pitch, loudness concerns' },
            { id: 'fluency-assessment', title: 'Fluency Disorders', description: 'Stuttering, cluttering' }
        ]
    },
    'fluency-assessment': {
        title: 'Fluency Disorders - Age Group',
        description: 'Select age group for evidence-based intervention',
        options: [
            { id: 'childhood-stuttering', title: 'Childhood Stuttering (2-12 years)', description: 'Early intervention, Lidcombe Program' },
            { id: 'adult-stuttering', title: 'Adult Stuttering (13+ years)', description: 'Speech restructuring, acceptance approaches' }
        ]
    },
    swallowing: {
        title: 'Swallowing and Feeding Disorders',
        description: 'Select age group and presentation type',
        options: [
            { id: 'pediatric-dysphagia', title: 'Pediatric Feeding/Swallowing', description: 'Childhood feeding difficulties, texture aversion' },
            { id: 'adult-dysphagia', title: 'Adult Dysphagia', description: 'Acquired swallowing difficulties, safety concerns' }
        ]
    }
};

// Enhanced helper functions with better icons
function createElement(tag, className = '', content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
}

function createSVGIcon(type) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.className = 'w-5 h-5';
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');
    
    const iconPaths = {
        chevronRight: 'M9 5l7 7-7 7',
        arrowLeft: 'M10 19l-7-7m0 0l7-7m-7 7h18',
        user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        stethoscope: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-5m-4 0V3a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2',
        lightbulb: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
        fileText: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        external: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
    };
    
    if (iconPaths[type]) {
        path.setAttribute('d', iconPaths[type]);
        svg.appendChild(path);
        return svg.outerHTML;
    }
    
    return '•';
}

// Enhanced icon function with proper SVG icons
function createIcon(type, className = '') {
    if (type === 'chevronRight') {
        return `<svg class="w-4 h-4 ${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
    }
    if (type === 'arrowLeft') {
        return `<svg class="w-4 h-4 ${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>`;
    }
    if (type === 'user') {
        return `<svg class="w-6 h-6 text-blue-600 ${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`;
    }
    if (type === 'stethoscope') {
        return `<svg class="w-5 h-5 text-green-600 ${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-5m-4 0V3a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>`;
    }
    if (type === 'lightbulb') {
        return `<svg class="w-5 h-5 text-orange-600 ${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`;
    }
    if (type === 'fileText') {
        return `<svg class="w-5 h-5 text-blue-600 ${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`;
    }
    if (type === 'external') {
        return `<svg class="w-5 h-5 text-purple-600 ${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>`;
    }
};






function createIcon(type) {
    const iconMap = {
        chevronRight: '→',
        arrowLeft: '←',
        user: '👤',
        stethoscope: '🩺',
        lightbulb: '💡',
        fileText: '📄',
        external: '🔗'
    };
    return iconMap[type] || '•';
}

// Main functions
function handleOptionSelect(stepId, optionId) {
    selectedPath[stepId] = optionId;

    // Check if we've reached an endpoint
    if (interventionDatabase[optionId]) {
        recommendations = interventionDatabase[optionId];
        showInterventions();
    } else {
        currentStep = optionId;
        render();
    }
}

function resetTree() {
    currentStep = 'start';
    selectedPath = {};
    recommendations = null;
    render();
}

function goBack() {
    const pathKeys = Object.keys(selectedPath);
    if (pathKeys.length > 0) {
        const lastKey = pathKeys[pathKeys.length - 1];
        delete selectedPath[lastKey];
        
        if (pathKeys.length === 1) {
            currentStep = 'start';
        } else {
            currentStep = pathKeys[pathKeys.length - 2];
        }
        render();
    }
}

function showInterventions() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    // Header
    const header = createElement('div', 'mb-6');
    
    const backBtn = createElement('button', 'flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4');
    backBtn.innerHTML = `${createIcon('arrowLeft')} Back to Assessment`;
    backBtn.onclick = () => { recommendations = null; render(); };
    header.appendChild(backBtn);

    const title = createElement('h1', 'text-2xl font-bold text-gray-900 mb-2', 'Evidence-Based Intervention Recommendations');
    header.appendChild(title);

    const titleBox = createElement('div', 'bg-blue-50 border-l-4 border-blue-500 p-4 mb-6');
    const titleHeading = createElement('h2', 'text-xl font-semibold text-blue-900', recommendations.title);
    titleBox.appendChild(titleHeading);
    header.appendChild(titleBox);

    app.appendChild(header);

    // Content grid
    const grid = createElement('div', 'grid md:grid-cols-2 gap-6');

    // Left column
    const leftCol = createElement('div', 'space-y-6');

    // Assessment box
    const assessBox = createElement('div', 'bg-gray-50 rounded-lg p-6');
    const assessHeader = createElement('div', 'flex items-center gap-2 mb-3');
    assessHeader.innerHTML = `${createIcon('stethoscope')} <h3 class="text-lg font-semibold">Assessment Protocol</h3>`;
    const assessText = createElement('p', 'text-gray-700', recommendations.assessment);
    assessBox.appendChild(assessHeader);
    assessBox.appendChild(assessText);
    leftCol.appendChild(assessBox);

    // Evidence box
    const evidenceBox = createElement('div', 'bg-gray-50 rounded-lg p-6');
    const evidenceHeader = createElement('div', 'flex items-center gap-2 mb-3');
    evidenceHeader.innerHTML = `${createIcon('lightbulb')} <h3 class="text-lg font-semibold">Evidence Base</h3>`;
    const evidenceText = createElement('p', 'text-gray-700', recommendations.evidence);
    evidenceBox.appendChild(evidenceHeader);
    evidenceBox.appendChild(evidenceText);
    leftCol.appendChild(evidenceBox);

    grid.appendChild(leftCol);

    // Right column
    const rightCol = createElement('div', 'space-y-6');

    // Interventions box
    const intBox = createElement('div', 'bg-gray-50 rounded-lg p-6');
    const intHeader = createElement('div', 'flex items-center gap-2 mb-3');
    intHeader.innerHTML = `${createIcon('fileText')} <h3 class="text-lg font-semibold">Evidence-Based Interventions</h3>`;
    intBox.appendChild(intHeader);

    const intList = createElement('ul', 'space-y-2');
    recommendations.interventions.forEach(intervention => {
        const listItem = createElement('li', 'flex items-start gap-2');
        listItem.innerHTML = `<span class="text-blue-500 mt-0.5">${createIcon('chevronRight')}</span><span class="text-gray-700">${intervention}</span>`;
        intList.appendChild(listItem);
    });
    intBox.appendChild(intList);
    rightCol.appendChild(intBox);

    // Funding box
    const fundBox = createElement('div', 'bg-gray-50 rounded-lg p-6');
    const fundHeader = createElement('div', 'flex items-center gap-2 mb-3');
    fundHeader.innerHTML = `${createIcon('external')} <h3 class="text-lg font-semibold">Funding Options (Melbourne)</h3>`;
    const fundText = createElement('p', 'text-gray-700', recommendations.funding);
    fundBox.appendChild(fundHeader);
    fundBox.appendChild(fundText);
    rightCol.appendChild(fundBox);

    grid.appendChild(rightCol);
    app.appendChild(grid);

    // Considerations
    const consBox = createElement('div', 'mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4');
    const consTitle = createElement('h3', 'font-semibold text-yellow-900 mb-2', 'Clinical Considerations');
    const consText = createElement('p', 'text-yellow-800', recommendations.considerations);
    consBox.appendChild(consTitle);
    consBox.appendChild(consText);
    app.appendChild(consBox);

    // Buttons
    const buttonRow = createElement('div', 'mt-8 flex gap-4');
    
    const newBtn = createElement('button', 'bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors', 'New Assessment');
    newBtn.onclick = resetTree;
    
    const printBtn = createElement('button', 'bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors', 'Print Recommendations');
    printBtn.onclick = () => window.print();
    
    buttonRow.appendChild(newBtn);
    buttonRow.appendChild(printBtn);
    app.appendChild(buttonRow);
}

function render() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    // Main header
    const mainHeader = createElement('div', 'mb-8');
    const mainTitle = createElement('h1', 'text-3xl font-bold text-gray-900 mb-4', 'Speech Pathology Evidence-Based Diagnostic Decision Tree');
    const mainDesc = createElement('p', 'text-gray-600 text-lg', 'Navigate through patient presentations to receive targeted, evidence-based intervention recommendations for Melbourne practice.');
    mainHeader.appendChild(mainTitle);
    mainHeader.appendChild(mainDesc);
    app.appendChild(mainHeader);

    // Breadcrumb
    if (Object.keys(selectedPath).length > 0) {
        const breadcrumb = createElement('div', 'mb-6 flex items-center gap-2 text-sm text-gray-600');
        breadcrumb.innerHTML = '<span>Assessment Path:</span>';
        
        Object.entries(selectedPath).forEach(([step, option]) => {
            const breadcrumbItem = createElement('span', 'flex items-center gap-1');
            breadcrumbItem.innerHTML = `${createIcon('chevronRight')} <span class="bg-blue-100 px-2 py-1 rounded">${option}</span>`;
            breadcrumb.appendChild(breadcrumbItem);
        });
        
        app.appendChild(breadcrumb);
    }

    // Back button
    if (currentStep !== 'start') {
        const backBtn = createElement('button', 'flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6');
        backBtn.innerHTML = `${createIcon('arrowLeft')} Back`;
        backBtn.onclick = goBack;
        app.appendChild(backBtn);
    }

    // Current step
    const currentStepData = decisionSteps[currentStep];
    if (currentStepData) {
        const stepContainer = createElement('div', 'bg-white border rounded-lg shadow-sm');
        
        // Step header
        const stepHeader = createElement('div', 'p-6 border-b');
        const stepTitleRow = createElement('div', 'flex items-center gap-3 mb-3');
        stepTitleRow.innerHTML = `${createIcon('user')} <h2 class="text-2xl font-semibold text-gray-900">${currentStepData.title}</h2>`;
        const stepDesc = createElement('p', 'text-gray-600', currentStepData.description);
        stepHeader.appendChild(stepTitleRow);
        stepHeader.appendChild(stepDesc);
        stepContainer.appendChild(stepHeader);

        // Step options
        const optionsContainer = createElement('div', 'p-6 grid gap-4');
        
        currentStepData.options.forEach(option => {
            const optionBtn = createElement('button', 'flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left group');
            
            const iconDiv = createElement('div', 'flex-shrink-0');
            if (option.icon) {
                iconDiv.innerHTML = `<div class="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors text-2xl">${option.icon}</div>`;
            } else {
                iconDiv.innerHTML = '<div class="w-3 h-3 bg-blue-600 rounded-full"></div>';
            }
            
            const contentDiv = createElement('div', 'flex-1 min-w-0');
            contentDiv.innerHTML = `
                <h3 class="font-semibold text-gray-900 mb-1">${option.title}</h3>
                <p class="text-sm text-gray-600">${option.description}</p>
            `;
            
            const chevronDiv = createElement('div', 'text-gray-400 group-hover:text-blue-600 transition-colors');
            chevronDiv.textContent = createIcon('chevronRight');
            
            optionBtn.appendChild(iconDiv);
            optionBtn.appendChild(contentDiv);
            optionBtn.appendChild(chevronDiv);
            
            optionBtn.onclick = () => handleOptionSelect(currentStep, option.id);
            optionsContainer.appendChild(optionBtn);
        });
        
        stepContainer.appendChild(optionsContainer);
        app.appendChild(stepContainer);
    }

    // Footer
    const footer = createElement('div', 'mt-8 text-center text-sm text-gray-500');
    footer.innerHTML = `
        <p>Based on Speech Pathology Australia Professional Standards 2020 and Melbourne healthcare context</p>
        <p class="mt-1">Evidence-based interventions sourced from current research and Australian clinical guidelines</p>
    `;
    app.appendChild(footer);
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', render);

// Application state
let currentStep = 'start';
let selectedPath = {};
let recommendations = null;

// Evidence-based interventions database
const interventionDatabase = {
    'autism-nonverbal': {
        title: 'Autism Spectrum Disorder - AAC Intervention',
        assessment: 'DSM-5 criteria, behavioral observation, functional communication measures',
        interventions: [
            'Speech-generating devices (most effective)',
            'Picture Exchange Communication System (PECS)',
            'Aided language stimulation',
            'Core vocabulary interventions',
            'Social communication approaches with time delay and prompting'
        ],
        evidence: 'AAC shows highly effective outcomes with moderate to large effect sizes',
        funding: 'NDIS Capacity Building Supports ($193.99/hour), Medicare Item 135 (under 13 years)',
        considerations: 'Neurodiversity-affirming approaches prioritizing self-advocacy over compliance'
    },
    'autism-verbal': {
        title: 'Autism Spectrum Disorder - Verbal Communication',
        assessment: 'Pragmatic language assessment, social communication observation',
        interventions: [
            'Social Stories and scripts',
            'Video modeling for social situations',
            'Peer-mediated interventions',
            'Structured teaching approaches',
            'Turn-taking and conversation skills training'
        ],
        evidence: 'Naturalistic interventions in community settings show best outcomes',
        funding: 'NDIS funding, Medicare Item 135 (diagnostic and treatment sessions)',
        considerations: 'Focus on functional communication in natural environments'
    },
    'adhd-language': {
        title: 'ADHD with Language Difficulties',
        assessment: 'Comprehensive language evaluation, pragmatic skills, executive function measures',
        interventions: [
            'Executive function training integrated with speech-language therapy',
            'Phonics-based instruction for phonological processing',
            'Organizational strategy training',
            'Word-finding therapy techniques',
            'Pragmatic language intervention for turn-taking'
        ],
        evidence: '40% of children with ADHD have phonological processing difficulties',
        funding: 'Medicare CDM plans (Item 10970), NDIS for significant functional impact',
        considerations: 'Age-specific approaches: play-based for children, workplace strategies for adults'
    },
    'dld-early': {
        title: 'Developmental Language Disorder - Early Intervention',
        assessment: 'Comprehensive language batteries, dynamic assessment, functional measures',
        interventions: [
            'Intensive intervention programs (6-week models show 5x gains)',
            'Electronic storybooks with static presentations',
            'Phonological awareness programs',
            'Parent-implemented language intervention',
            'Tablet-based therapy applications'
        ],
        evidence: 'Early intervention for 3-4 year olds shows positive effects on phonological skills',
        funding: 'NDIS Early Childhood Approach (under 7 years), Medicare CDM plans',
        considerations: 'DLD affects 7% of population (1 in 14 people) - lifelong condition'
    },
    'cerebral-palsy': {
        title: 'Cerebral Palsy with Motor Speech Disorders',
        assessment: 'Frenchay Dysarthria Assessment (12+ years), VMPAC (under 12 years)',
        interventions: [
            'LSVT LOUD® for intensive voice therapy',
            'PROMPT (tactile-kinesthetic approach)',
            'Subsystems approach targeting each speech system',
            'Early AAC introduction at 2-3 years',
            '"Loud voice" and "big mouth" techniques'
        ],
        evidence: '50-90% of people with cerebral palsy have dysarthria',
        funding: 'NDIS Capacity Building Supports, Medicare CDM plans',
        considerations: 'Early AAC introduction shows high success rates'
    },
    'cleft-palate': {
        title: 'Cleft Lip and Palate Speech Intervention',
        assessment: 'Perceptual evaluation, nasopharyngoscopy, nasometry',
        interventions: [
            'Intensive articulation therapy (10-week protocols)',
            'Parent-Led Articulation Therapy (PLAT)',
            'Multidisciplinary team approach',
            'Hybrid telepractice and in-person treatment',
            'Post-surgical speech therapy'
        ],
        evidence: 'PLAT shows equivalent outcomes to traditional clinician-delivered therapy',
        funding: 'Medicare coverage through specialist referrals, private health insurance',
        considerations: '30% experience persistent VPI post-surgery requiring ongoing intervention'
    },
    'hearing-impairment': {
        title: 'Hearing Impairment and Cochlear Implants',
        assessment: 'Audiological evaluation, comprehensive speech-language assessment',
        interventions: [
            'Auditory-Verbal Therapy (AVT) intensive early intervention',
            'Listening and spoken language development',
            'Family-centered approaches with parent facilitation',
            'Bilingual-bimodal approaches when appropriate',
            'Technology integration and device optimization'
        ],
        evidence: '80% of children with cochlear implants achieve age-appropriate language by grade 1',
        funding: 'Australian Hearing services, NDIS support, Medicare coverage',
        considerations: 'Early intervention at 2-3 months through Universal Newborn Hearing Screening'
    },
    'acquired-brain-injury': {
        title: 'Acquired Brain Injury - Cognitive Communication',
        assessment: 'Cognitive Linguistic Quick Test, comprehensive cognitive-communication evaluation',
        interventions: [
            'TBI Express and TBIconneCT programs (Australian-developed)',
            'Intensive Cognitive-Communication Rehabilitation (15 weeks)',
            'Constraint-induced language therapy for aphasia',
            'Virtual reality social interaction training',
            'Patient Aligned Care Teams (interprofessional)'
        ],
        evidence: 'Intensive programs target young adults returning to education/employment',
        funding: 'Medicare coverage, WorkCover, NDIS support for ongoing needs',
        considerations: 'Long-term monitoring for ongoing cognitive-communication changes'
    },
    'voice-disorders': {
        title: 'Voice Disorders - Evidence-Based Treatment',
        assessment: 'Perceptual voice evaluation, acoustic analysis, videostroboscopy',
        interventions: [
            'Vocal function exercises (physiologic approach)',
            'Resonant voice therapy',
            'LSVT for Parkinson\'s-related voice disorders',
            'Vocal hygiene and lifestyle modifications',
            'Professional voice user occupational therapy'
        ],
        evidence: '59% of children with voice disorders have vocal nodules - emphasis on vocal hygiene',
        funding: 'Medicare CDM plans, private health insurance, specialist referrals',
        considerations: 'Telepractice delivery shows effectiveness - expanded during COVID-19'
    },
    'childhood-stuttering': {
        title: 'Childhood Stuttering - Early Intervention',
        assessment: 'Fluency assessment, parent questionnaires, severity rating',
        interventions: [
            'Lidcombe Program (under 6 years) - high success rates',
            'Westmead Program (older children)',
            'Syllable Timed Speech techniques',
            'Parent training and education',
            'Telepractice delivery (non-inferior outcomes)'
        ],
        evidence: 'Early intervention with Lidcombe Program demonstrates high success rates',
        funding: 'Medicare CDM plans, private health insurance, community health programs',
        considerations: 'Maintenance programs prevent relapse across age groups'
    },
    'adult-stuttering': {
        title: 'Adult Stuttering - Comprehensive Management',
        assessment: 'Fluency severity assessment, psychological impact evaluation',
        interventions: [
            'Camperdown Program (speech restructuring)',
            'Holistic approaches addressing psychological aspects',
            'Support groups and peer networks',
            'Workplace communication strategies',
            'Acceptance and commitment therapy integration'
        ],
        evidence: 'Combined speech restructuring and psychological support most effective',
        funding: 'Medicare CDM plans, private health insurance, EAP programs',
        considerations: 'Community support networks provide ongoing assistance'
    },
    'pediatric-dysphagia': {
        title: 'Pediatric Feeding and Swallowing Disorders',
        assessment: 'Clinical bedside evaluation, FEES, videofluoroscopy when indicated',
        interventions: [
            'Family-centered feeding therapy',
            'Sensory-based feeding interventions',
            'Oral motor therapy techniques',
            'Texture progression protocols',
            'Multidisciplinary team approach with dietitians'
        ],
        evidence: 'Family-centered approaches show improved outcomes and compliance',
        funding: 'NDIS funding for complex needs, Medicare specialist referrals',
        considerations: 'Quality of life and nutritional status monitoring essential'
    },
    'adult-dysphagia': {
        title: 'Adult Dysphagia - Safety-Focused Management',
        assessment: 'Clinical swallow evaluation, instrumental assessment (FEES/VFSS)',
        interventions: [
            'Swallowing exercises and rehabilitation',
            'Diet texture modifications (IDDSI framework)',
            'Postural strategies and compensations',
            'Neuromuscular electrical stimulation with biofeedback',
            'Caregiver training and education'
        ],
        evidence: 'Combination of exercises and compensatory strategies most effective',
        funding: 'Medicare coverage, aged care funding, private health insurance',
        considerations: 'Safety-focused interventions with ongoing monitoring required'
    }
};

// Decision tree structure
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
            { id: 'voice-disorders', title: 'Voice Disorders', description: 'Vocal quality, pitch, loudness concerns' },
            { id: 'fluency-assessment', title: 'Fluency Disorders', description: 'Stuttering, cluttering' },
            { id: 'speech-sounds', title: 'Speech Sound Disorders', description: 'Articulation, phonological processes' }
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

// Helper functions
function createElement(tag, className = '', content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
}

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

// Initialize the app
document.addEventListener('DOMContentLoaded', render);

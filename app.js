
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, ArrowLeft, User, Calendar, Stethoscope, Lightbulb, ExternalLink, FileText, Brain, Heart, Volume2, MessageCircle, Utensils, Share2, Copy, Link, Mail } from 'lucide-react';

const SpeechPathologyDiagnosticTree = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [selectedPath, setSelectedPath] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [showInterventions, setShowInterventions] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate shareable URL with current state
  const generateShareableURL = () => {
    const currentURL = window.location.href.split('?')[0];
    const state = {
      step: currentStep,
      path: selectedPath,
      interventions: showInterventions
    };
    const encodedState = btoa(JSON.stringify(state));
    return `${currentURL}?state=${encodedState}`;
  };

  // Load state from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stateParam = urlParams.get('state');
    
    if (stateParam) {
      try {
        const decodedState = JSON.parse(atob(stateParam));
        setCurrentStep(decodedState.step || 'start');
        setSelectedPath(decodedState.path || {});
        setShowInterventions(decodedState.interventions || false);
        
        // If we have a complete path, show recommendations
        if (decodedState.interventions && decodedState.path) {
          const lastOption = Object.values(decodedState.path).pop();
          if (interventionDatabase[lastOption]) {
            setRecommendations(interventionDatabase[lastOption]);
          }
        }
      } catch (error) {
        console.error('Error loading shared state:', error);
      }
    }
  }, []);

  // Update URL when state changes
  useEffect(() => {
    if (currentStep !== 'start' || Object.keys(selectedPath).length > 0) {
      const newURL = generateShareableURL();
      window.history.replaceState({}, '', newURL);
    }
  }, [currentStep, selectedPath, showInterventions]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const shareViaEmail = () => {
    const url = generateShareableURL();
    const subject = 'Speech Pathology Diagnostic Decision Tree';
    const body = `I'm sharing this evidence-based speech pathology diagnostic tool with you:\n\n${url}\n\nThis interactive decision tree helps navigate patient presentations and provides evidence-based intervention recommendations for Melbourne practice.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const ShareModal = () => {
    if (!shareModalOpen) return null;

    const shareURL = generateShareableURL();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Share Diagnostic Tool</h3>
            <button 
              onClick={() => setShareModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">
            Share this evidence-based speech pathology diagnostic decision tree with colleagues:
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded border">
              <input 
                type="text" 
                value={shareURL} 
                readOnly 
                className="flex-1 bg-transparent text-sm text-gray-700"
              />
              <button
                onClick={() => copyToClipboard(shareURL)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                <Copy className="w-3 h-3" />
                {copySuccess ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={shareViaEmail}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                <Mail className="w-4 h-4" />
                Email Link
              </button>
              
              {navigator.share && (
                <button
                  onClick={() => {
                    navigator.share({
                      title: 'Speech Pathology Diagnostic Decision Tree',
                      text: 'Evidence-based speech pathology diagnostic tool for Melbourne practice',
                      url: shareURL
                    });
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
            <p className="text-blue-800">
              <strong>Note:</strong> The shared link will preserve the current assessment path and recommendations, making it easy to discuss specific cases with colleagues.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Evidence-based interventions database from the guide
  const interventionDatabase = {
    'autism-aac': {
      title: 'Autism Spectrum Disorder with AAC Needs',
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
      icon: <User className="w-6 h-6 text-blue-600" />,
      options: [
        { id: 'neurodivergent', title: 'Neurodivergent Conditions', icon: <Brain className="w-5 h-5" />, description: 'Autism, ADHD, DLD, Intellectual Disabilities' },
        { id: 'physical', title: 'Physical Conditions', icon: <Heart className="w-5 h-5" />, description: 'Cerebral Palsy, Cleft Palate, Hearing Impairment, ABI' },
        { id: 'communication', title: 'Communication Disorders', icon: <MessageCircle className="w-5 h-5" />, description: 'Speech sounds, Language, Voice, Fluency' },
        { id: 'swallowing', title: 'Swallowing/Feeding', icon: <Utensils className="w-5 h-5" />, description: 'Dysphagia, Feeding disorders' }
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

  const handleOptionSelect = (stepId, optionId) => {
    const newPath = { ...selectedPath, [stepId]: optionId };
    setSelectedPath(newPath);

    // Check if we've reached an endpoint
    if (interventionDatabase[optionId]) {
      setRecommendations(interventionDatabase[optionId]);
      setShowInterventions(true);
    } else {
      setCurrentStep(optionId);
      setShowInterventions(false);
    }
  };

  const resetTree = () => {
    setCurrentStep('start');
    setSelectedPath({});
    setRecommendations(null);
    setShowInterventions(false);
  };

  const goBack = () => {
    const pathKeys = Object.keys(selectedPath);
    if (pathKeys.length > 0) {
      const newPath = { ...selectedPath };
      const lastKey = pathKeys[pathKeys.length - 1];
      delete newPath[lastKey];
      setSelectedPath(newPath);
      
      if (pathKeys.length === 1) {
        setCurrentStep('start');
      } else {
        setCurrentStep(pathKeys[pathKeys.length - 2]);
      }
      setShowInterventions(false);
    }
  };

  const currentStepData = decisionSteps[currentStep];

  if (showInterventions && recommendations) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="mb-6">
          <button 
            onClick={goBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Assessment
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Evidence-Based Intervention Recommendations</h1>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h2 className="text-xl font-semibold text-blue-900">{recommendations.title}</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Stethoscope className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold">Assessment Protocol</h3>
              </div>
              <p className="text-gray-700">{recommendations.assessment}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold">Evidence Base</h3>
              </div>
              <p className="text-gray-700">{recommendations.evidence}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Evidence-Based Interventions</h3>
              </div>
              <ul className="space-y-2">
                {recommendations.interventions.map((intervention, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{intervention}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold">Funding Options (Melbourne)</h3>
              </div>
              <p className="text-gray-700">{recommendations.funding}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">Clinical Considerations</h3>
          <p className="text-yellow-800">{recommendations.considerations}</p>
        </div>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={resetTree}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Assessment
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Print Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Speech Pathology Evidence-Based Diagnostic Decision Tree
        </h1>
        <p className="text-gray-600 text-lg">
          Navigate through patient presentations to receive targeted, evidence-based intervention recommendations for Melbourne practice.
        </p>
      </div>

      {/* Breadcrumb */}
      {Object.keys(selectedPath).length > 0 && (
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <span>Assessment Path:</span>
          {Object.entries(selectedPath).map(([step, option], index) => (
            <span key={step} className="flex items-center gap-1">
              <ChevronRight className="w-3 h-3" />
              <span className="bg-blue-100 px-2 py-1 rounded">{option}</span>
            </span>
          ))}
        </div>
      )}

      {/* Back button */}
      {currentStep !== 'start' && (
        <button 
          onClick={goBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}

      {/* Current step */}
      {currentStepData && (
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-3">
              {currentStepData.icon}
              <h2 className="text-2xl font-semibold text-gray-900">{currentStepData.title}</h2>
            </div>
            <p className="text-gray-600">{currentStepData.description}</p>
          </div>

          <div className="p-6 grid gap-4">
            {currentStepData.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(currentStep, option.id)}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="flex-shrink-0">
                  {option.icon ? (
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      {option.icon}
                    </div>
                  ) : (
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Based on Speech Pathology Australia Professional Standards 2020 and Melbourne healthcare context</p>
        <p className="mt-1">Evidence-based interventions sourced from current research and Australian clinical guidelines</p>
      </div>
    </div>
  );
};

export default SpeechPathologyDiagnosticTree;

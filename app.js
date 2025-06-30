const { useState } = React;

// Simple icon components
const ChevronRight = ({ className = "w-5 h-5" }) => (
  React.createElement("svg", {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 5l7 7-7 7"
  }))
);

const ArrowLeft = ({ className = "w-4 h-4" }) => (
  React.createElement("svg", {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
  }))
);

const User = ({ className = "w-6 h-6 text-blue-600" }) => (
  React.createElement("svg", {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  }))
);

const Brain = ({ className = "w-5 h-5" }) => (
  React.createElement("svg", {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
  }))
);

const Heart = ({ className = "w-5 h-5" }) => (
  React.createElement("svg", {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  }))
);

const MessageCircle = ({ className = "w-5 h-5" }) => (
  React.createElement("svg", {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
  }))
);

const Utensils = ({ className = "w-5 h-5" }) => (
  React.createElement("svg", {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M3 5v14l7-7 7 7V5"
  }))
);

const Stethoscope = ({ className = "w-5 h-5 text-green-600" }) => (
  React.createElement("svg", {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-5m-4 0V3a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
  }))
);

const Lightbulb = ({ className = "w-5 h-5 text-orange-600" }) => (
  React.createElement("svg", {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
  }))
);

const FileText = ({ className = "w-5 h-5 text-blue-600" }) => (
  React.createElement("svg", {
    className: className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }))
);

const SpeechPathologyDiagnosticTree = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [selectedPath, setSelectedPath] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [showInterventions, setShowInterventions] = useState(false);

  // Evidence-based interventions database from the guide
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
      icon: React.createElement(User),
      options: [
        { 
          id: 'neurodivergent', 
          title: 'Neurodivergent Conditions', 
          icon: React.createElement(Brain), 
          description: 'Autism, ADHD, DLD, Intellectual Disabilities' 
        },
        { 
          id: 'physical', 
          title: 'Physical Conditions', 
          icon: React.createElement(Heart), 
          description: 'Cerebral Palsy, Cleft Palate, Hearing Impairment, ABI' 
        },
        { 
          id: 'communication', 
          title: 'Communication Disorders', 
          icon: React.createElement(MessageCircle), 
          description: 'Speech sounds, Language, Voice, Fluency' 
        },
        { 
          id: 'swallowing', 
          title: 'Swallowing/Feeding', 
          icon: React.createElement(Utensils), 
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
    return React.createElement('div', {
      className: "max-w-4xl mx-auto p-6 bg-white"
    }, [
      React.createElement('div', {
        key: "header",
        className: "mb-6"
      }, [
        React.createElement('button', {
          key: "back-btn",
          onClick: goBack,
          className: "flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        }, [
          React.createElement(ArrowLeft, { key: "arrow" }),
          "Back to Assessment"
        ]),
        React.createElement('h1', {
          key: "title",
          className: "text-2xl font-bold text-gray-900 mb-2"
        }, "Evidence-Based Intervention Recommendations"),
        React.createElement('div', {
          key: "title-box",
          className: "bg-blue-50 border-l-4 border-blue-500 p-4 mb-6"
        }, React.createElement('h2', {
          className: "text-xl font-semibold text-blue-900"
        }, recommendations.title))
      ]),
      
      React.createElement('div', {
        key: "content",
        className: "grid md:grid-cols-2 gap-6"
      }, [
        React.createElement('div', {
          key: "left-col",
          className: "space-y-6"
        }, [
          React.createElement('div', {
            key: "assessment",
            className: "bg-gray-50 rounded-lg p-6"
          }, [
            React.createElement('div', {
              key: "assess-header",
              className: "flex items-center gap-2 mb-3"
            }, [
              React.createElement(Stethoscope, { key: "stetho" }),
              React.createElement('h3', {
                key: "assess-title",
                className: "text-lg font-semibold"
              }, "Assessment Protocol")
            ]),
            React.createElement('p', {
              key: "assess-text",
              className: "text-gray-700"
            }, recommendations.assessment)
          ]),
          
          React.createElement('div', {
            key: "evidence",
            className: "bg-gray-50 rounded-lg p-6"
          }, [
            React.createElement('div', {
              key: "evidence-header",
              className: "flex items-center gap-2 mb-3"
            }, [
              React.createElement(Lightbulb, { key: "bulb" }),
              React.createElement('h3', {
                key: "evidence-title",
                className: "text-lg font-semibold"
              }, "Evidence Base")
            ]),
            React.createElement('p', {
              key: "evidence-text",
              className: "text-gray-700"
            }, recommendations.evidence)
          ])
        ]),
        
        React.createElement('div', {
          key: "right-col",
          className: "space-y-6"
        }, [
          React.createElement('div', {
            key: "interventions",
            className: "bg-gray-50 rounded-lg p-6"
          }, [
            React.createElement('div', {
              key: "int-header",
              className: "flex items-center gap-2 mb-3"
            }, [
              React.createElement(FileText, { key: "file" }),
              React.createElement('h3', {
                key: "int-title",
                className: "text-lg font-semibold"
              }, "Evidence-Based Interventions")
            ]),
            React.createElement('ul', {
              key: "int-list",
              className: "space-y-2"
            }, recommendations.interventions.map((intervention, index) =>
              React.createElement('li', {
                key: index,
                className: "flex items-start gap-2"
              }, [
                React.createElement(ChevronRight, {
                  key: "chevron",
                  className: "w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                }),
                React.createElement('span', {
                  key: "text",
                  className: "text-gray-700"
                }, intervention)
              ])
            ))
          ]),
          
          React.createElement('div', {
            key: "funding",
            className: "bg-gray-50 rounded-lg p-6"
          }, [
            React.createElement('div', {
              key: "fund-header",
              className: "flex items-center gap-2 mb-3"
            }, [
              React.createElement('svg', {
                key: "external",
                className: "w-5 h-5 text-purple-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, React.createElement('path', {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              })),
              React.createElement('h3', {
                key: "fund-title",
                className: "text-lg font-semibold"
              }, "Funding Options (Melbourne)")
            ]),
            React.createElement('p', {
              key: "fund-text",
              className: "text-gray-700"
            }, recommendations.funding)
          ])
        ])
      ]),
      
      React.createElement('div', {
        key: "considerations",
        className: "mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4"
      }, [
        React.createElement('h3', {
          key: "cons-title",
          className: "font-semibold text-yellow-900 mb-2"
        }, "Clinical Considerations"),
        React.createElement('p', {
          key: "cons-text",
          className: "text-yellow-800"
        }, recommendations.considerations)
      ]),
      
      React.createElement('div', {
        key: "buttons",
        className: "mt-8 flex gap-4"
      }, [
        React.createElement('button', {
          key: "new-assess",
          onClick: resetTree,
          className: "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        }, "New Assessment"),
        React.createElement('button', {
          key: "print",
          onClick: () => window.print(),
          className: "bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        }, "Print Recommendations")
      ])
    ]);
  }

  return React.createElement('div', {
    className: "max-w-4xl mx-auto p-6 bg-white"
  }, [
    React.createElement('div', {
      key: "main-header",
      className: "mb-8"
    }, [
      React.createElement('h1', {
        key: "main-title",
        className: "text-3xl font-bold text-gray-900 mb-4"
      }, "Speech Pathology Evidence-Based Diagnostic Decision Tree"),
      React.createElement('p', {
        key: "main-desc",
        className: "text-gray-600 text-lg"
      }, "Navigate through patient presentations to receive targeted, evidence-based intervention recommendations for Melbourne practice.")
    ]),

    // Breadcrumb
    Object.keys(selectedPath).length > 0 && React.createElement('div', {
      key: "breadcrumb",
      className: "mb-6 flex items-center gap-2 text-sm text-gray-600"
    }, [
      React.createElement('span', { key: "path-label" }, "Assessment Path:"),
      ...Object.entries(selectedPath).map(([step, option], index) =>
        React.createElement('span', {
          key: step,
          className: "flex items-center gap-1"
        }, [
          React.createElement(ChevronRight, {
            key: "breadcrumb-chevron",
            className: "w-3 h-3"
          }),
          React.createElement('span', {
            key: "breadcrumb-option",
            className: "bg-blue-100 px-2 py-1 rounded"
          }, option)
        ])
      )
    ]),

    // Back button
    currentStep !== 'start' && React.createElement('button', {
      key: "back-button",
      onClick: goBack,
      className: "flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
    }, [
      React.createElement(ArrowLeft, { key: "back-arrow" }),
      "Back"
    ]),

    // Current step
    currentStepData && React.createElement('div', {
      key: "current-step",
      className: "bg-white border rounded-lg shadow-sm"
    }, [
      React.createElement('div', {
        key: "step-header",
        className: "p-6 border-b"
      }, [
        React.createElement('div', {
          key: "step-title-row",
          className: "flex items-center gap-3 mb-3"
        }, [
          currentStepData.icon,
          React.createElement('h2', {
            key: "step-title",
            className: "text-2xl font-semibold text-gray-900"
          }, currentStepData.title)
        ]),
        React.createElement('p', {
          key: "step-desc",
          className: "text-gray-600"
        }, currentStepData.description)
      ]),

      React.createElement('div', {
        key: "step-options",
        className: "p-6 grid gap-4"
      }, currentStepData.options.map((option) =>
        React.createElement('button', {
          key: option.id,
          onClick: () => handleOptionSelect(currentStep, option.id),
          className: "flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
        }, [
          React.createElement('div', {
            key: "option-icon",
            className: "flex-shrink-0"
          }, option.icon ? 
            React.createElement('div', {
              key: "icon-wrapper",
              className: "p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
            }, option.icon) :
            React.createElement('div', {
              key: "dot",
              className: "w-3 h-3 bg-blue-600 rounded-full"
            })
          ),
          React.createElement('div', {
            key: "option-content",
            className: "flex-1 min-w-0"
          }, [
            React.createElement('h3', {
              key: "option-title",
              className: "font-semibold text-gray-900 mb-1"
            }, option.title),
            React.createElement('p', {
              key: "option-desc",
              className: "text-sm text-gray-600"
            }, option.description)
          ]),
          React.createElement(ChevronRight, {
            key: "option-chevron",
            className: "w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
          })
        ])
      ))
    ]),

    // Footer
    React.createElement('div', {
      key: "footer",
      className: "mt-8 text-center text-sm text-gray-500"
    }, [
      React.createElement('p', {
        key: "footer-1"
      }, "Based on Speech Pathology Australia Professional Standards 2020 and Melbourne healthcare context"),
      React.createElement('p', {
        key: "footer-2",
        className: "mt-1"
      }, "Evidence-based interventions sourced from current research and Australian clinical guidelines")
    ])
  ]);
};

// Render the app
ReactDOM.render(React.createElement(SpeechPathologyDiagnosticTree), document.getElementById('root'));

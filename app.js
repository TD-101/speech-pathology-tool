// Speech Pathology Diagnostic Tree - GitHub Pages Version
const { useState } = React;

// Simple icon components
const ChevronRight = () => React.createElement('svg', {
  className: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M9 5l7 7-7 7"
}));

const ArrowLeft = () => React.createElement('svg', {
  className: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M10 19l-7-7m0 0l7-7m-7 7h18"
}));

const User = () => React.createElement('svg', {
  className: "w-6 h-6 text-blue-600",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
}));

// Main component
const SpeechPathologyDiagnosticTree = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [selectedPath, setSelectedPath] = useState({});
  const [showInterventions, setShowInterventions] = useState(false);

  const handleOptionSelect = (stepId, optionId) => {
    console.log('Selected:', stepId, optionId);
    setCurrentStep(optionId);
  };

  const resetTree = () => {
    setCurrentStep('start');
    setSelectedPath({});
    setShowInterventions(false);
  };

  // Basic decision tree structure
  const decisionSteps = {
    start: {
      title: 'Patient Assessment - Primary Presentation',
      description: 'Select the primary area of concern for evidence-based intervention recommendations',
      options: [
        { id: 'neurodivergent', title: 'Neurodivergent Conditions', description: 'Autism, ADHD, DLD, Intellectual Disabilities' },
        { id: 'physical', title: 'Physical Conditions', description: 'Cerebral Palsy, Cleft Palate, Hearing Impairment, ABI' },
        { id: 'communication', title: 'Communication Disorders', description: 'Speech sounds, Language, Voice, Fluency' },
        { id: 'swallowing', title: 'Swallowing/Feeding', description: 'Dysphagia, Feeding disorders' }
      ]
    }
  };

  const currentStepData = decisionSteps[currentStep] || decisionSteps.start;

  return React.createElement('div', { className: "max-w-4xl mx-auto p-6 bg-white min-h-screen" },
    React.createElement('div', { className: "mb-8" },
      React.createElement('h1', { className: "text-3xl font-bold text-gray-900 mb-4" },
        "Speech Pathology Evidence-Based Diagnostic Decision Tree"
      ),
      React.createElement('p', { className: "text-gray-600 text-lg" },
        "Navigate through patient presentations to receive targeted, evidence-based intervention recommendations for Melbourne practice."
      )
    ),

    React.createElement('div', { className: "bg-white border rounded-lg shadow-sm" },
      React.createElement('div', { className: "p-6 border-b" },
        React.createElement('div', { className: "flex items-center gap-3 mb-3" },
          React.createElement(User),
          React.createElement('h2', { className: "text-2xl font-semibold text-gray-900" }, currentStepData.title)
        ),
        React.createElement('p', { className: "text-gray-600" }, currentStepData.description)
      ),

      React.createElement('div', { className: "p-6 grid gap-4" },
        ...currentStepData.options.map(option =>
          React.createElement('button', {
            key: option.id,
            onClick: () => handleOptionSelect(currentStep, option.id),
            className: "flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
          },
            React.createElement('div', { className: "flex-shrink-0" },
              React.createElement('div', { className: "w-3 h-3 bg-blue-600 rounded-full" })
            ),
            React.createElement('div', { className: "flex-1 min-w-0" },
              React.createElement('h3', { className: "font-semibold text-gray-900 mb-1" }, option.title),
              React.createElement('p', { className: "text-sm text-gray-600" }, option.description)
            ),
            React.createElement(ChevronRight)
          )
        )
      )
    ),

    React.createElement('div', { className: "mt-8 text-center" },
      React.createElement('button', {
        onClick: resetTree,
        className: "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      }, "Reset")
    )
  );
};

// Render the app
ReactDOM.render(React.createElement(SpeechPathologyDiagnosticTree), document.getElementById('root'));

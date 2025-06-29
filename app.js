const { useState } = React;

// Icon components using React.createElement
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

const Brain = () => React.createElement('svg', {
  className: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, React.createElement('path', {
  strokeLinecap: "round", 
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
}));

const Heart = () => React.createElement('svg', {
  className: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round", 
  strokeWidth: 2,
  d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
}));

const MessageCircle = () => React.createElement('svg', {
  className: "w-5 h-5", 
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
}));

const Utensils = () => React.createElement('svg', {
  className: "w-5 h-5",
  fill: "none", 
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
}));

const Stethoscope = () => React.createElement('svg', {
  className: "w-5 h-5 text-green-600",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
}));

const Lightbulb = () => React.createElement('svg', {
  className: "w-5 h-5 text-orange-600",
  fill: "none",
  stroke: "currentColor", 
  viewBox: "0 0 24 24"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
}));

const FileText = () => React.createElement('svg', {
  className: "w-5 h-5 text-blue-600",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, React.createElement('path', {
  strokeLinecap: "round", 
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
}));

// Main component
const SpeechPathologyDiagnosticTree = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [selectedPath, setSelectedPath] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [showInterventions, setShowInterventions] = useState(false);

  // The intervention database and decision steps would go here...
  // I'll provide the rest in the next message due to length

  return React.createElement('div', { className: "max-w-4xl mx-auto p-6 bg-white" },
    React.createElement('h1', { className: "text-3xl font-bold text-gray-900 mb-4" }, 
      "Speech Pathology Evidence-Based Diagnostic Decision Tree"
    ),
    React.createElement('p', { className: "text-gray-600 text-lg mb-8" },
      "Navigate through patient presentations to receive targeted, evidence-based intervention recommendations for Melbourne practice."
    )
  );
};

// Render the app
ReactDOM.render(React.createElement(SpeechPathologyDiagnosticTree), document.getElementById('root'));

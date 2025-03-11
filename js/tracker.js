/**
 * Tracker.js
 * Handles the visual tracker component for each permit
 */

// Status mappings
const STATUS_MAPPING = {
  'not-investigated': {
    displayName: 'Not INVESTIGATED',
    statusText: 'Permit awaiting investigation',
    progressPercent: 0,
    stage: 1
  },
  'investigating': {
    displayName: 'Currently INVESTIGATING',
    statusText: 'Permit is being investigated',
    progressPercent: 50,
    stage: 2
  },
  'investigated': {
    displayName: 'INVESTIGATED',
    statusText: 'Permit has been investigated',
    progressPercent: 100,
    stage: 3
  }
};

// Create a new tracker
function createTracker(permitId, status) {
  const statusInfo = STATUS_MAPPING[status] || STATUS_MAPPING['not-investigated'];
  const currentTime = new Date().toLocaleString();
  
  const trackerContainer = document.createElement('div');
  trackerContainer.className = 'tracker-container';
  
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'tracker-progress';
  progressBar.style.width = `${statusInfo.progressPercent}%`;
  trackerContainer.appendChild(progressBar);
  
  // Create steps
  const stepsContainer = document.createElement('div');
  stepsContainer.className = 'tracker-steps';
  
  // Add the three steps
  const steps = [
    { num: 1, name: 'Not INVESTIGATED' },
    { num: 2, name: 'INVESTIGATING' },
    { num: 3, name: 'INVESTIGATED' }
  ];
  
  steps.forEach(step => {
    const stepElement = document.createElement('div');
    stepElement.className = `tracker-step ${step.num === statusInfo.stage ? 'active' : ''}`;
    
    const stepNum = document.createElement('div');
    stepNum.className = 'tracker-step-num';
    stepNum.textContent = step.num;
    
    stepElement.appendChild(stepNum);
    stepElement.appendChild(document.createTextNode(step.name));
    stepsContainer.appendChild(stepElement);
  });
  
  trackerContainer.appendChild(stepsContainer);
  
  // Create status text
  const statusElement = document.createElement('div');
  statusElement.className = 'tracker-status';
  statusElement.textContent = `${statusInfo.statusText} - Updated at ${currentTime}`;
  
  // Combine all elements
  const trackerWrapper = document.createElement('div');
  trackerWrapper.appendChild(trackerContainer);
  trackerWrapper.appendChild(statusElement);
  
  return trackerWrapper;
}

// Update an existing tracker
function updateTracker(trackerElement, status) {
  const statusInfo = STATUS_MAPPING[status] || STATUS_MAPPING['not-investigated'];
  const currentTime = new Date().toLocaleString();
  
  // Update progress bar
  const progressBar = trackerElement.querySelector('.tracker-progress');
  progressBar.style.width = `${statusInfo.progressPercent}%`;
  
  // Update active step
  const steps = trackerElement.querySelectorAll('.tracker-step');
  steps.forEach((step, index) => {
    if (index + 1 === statusInfo.stage) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
  
  // Update status text
  const statusElement = trackerElement.querySelector('.tracker-status');
  statusElement.textContent = `${statusInfo.statusText} - Updated at ${currentTime}`;
}

// Get status display name
function getStatusDisplayName(status) {
  return STATUS_MAPPING[status]?.displayName || 'Unknown Status';
}

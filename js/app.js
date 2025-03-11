/**
 * Permit Tracker Application
 * Main application logic
 */

// DOM Elements
const addPermitForm = document.getElementById('add-permit-form');
const permitsContainer = document.getElementById('permits-container');
const editModal = document.getElementById('edit-modal');
const editPermitForm = document.getElementById('edit-permit-form');
const confirmModal = document.getElementById('confirm-modal');
const closeModalBtn = document.querySelector('.close');
const deletePermitBtn = document.getElementById('delete-permit');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');

// Current permit being edited
let currentPermitKey = null;

// Use localStorage by default instead of trying to use Firebase
// This ensures the app will work without requiring a real Firebase setup
const useLocalStorage = true;
console.log('Using localStorage for data storage');

// Initialize the application
function initApp() {
  // Add event listeners
  addPermitForm.addEventListener('submit', handleAddPermit);
  editPermitForm.addEventListener('submit', handleEditPermit);
  closeModalBtn.addEventListener('click', closeModal);
  deletePermitBtn.addEventListener('click', showConfirmModal);
  confirmDeleteBtn.addEventListener('click', handleDeletePermit);
  cancelDeleteBtn.addEventListener('click', closeConfirmModal);
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === editModal) {
      closeModal();
    }
    if (e.target === confirmModal) {
      closeConfirmModal();
    }
  });
  
  // Load permits
  loadPermits();
}

// Add a new permit
function handleAddPermit(event) {
  event.preventDefault();
  
  // Get form values
  const permitId = document.getElementById('permit-id').value;
  const poles = document.getElementById('poles').value;
  const notes = document.getElementById('notes').value;
  const investigated = document.getElementById('investigated').checked;
  const gobacks = document.getElementById('gobacks').checked;
  const assigned = document.getElementById('assigned').value;
  const status = document.getElementById('status').value;
  
  // Create permit object
  const permit = {
    permitId,
    poles,
    notes,
    investigated,
    gobacks,
    assigned,
    status,
    createdAt: new Date().toISOString()
  };
  
  // Save to database
  if (useLocalStorage) {
    saveToLocalStorage(permit);
  } else {
    saveToFirebase(permit);
  }
  
  // Reset form
  addPermitForm.reset();
}

// Save permit to Firebase
function saveToFirebase(permit) {
  permitsRef.push(permit)
    .then(() => {
      console.log('Permit saved successfully');
    })
    .catch(handleFirebaseError);
}

// Save permit to localStorage
function saveToLocalStorage(permit) {
  // Generate a unique key
  const key = `permit_${Date.now()}`;
  
  // Get existing permits
  const permits = getPermitsFromLocalStorage();
  
  // Add new permit
  permits[key] = permit;
  
  // Save back to localStorage
  localStorage.setItem('permits', JSON.stringify(permits));
  
  // Refresh display
  displayPermits(permits);
}

// Get permits from localStorage
function getPermitsFromLocalStorage() {
  const permits = localStorage.getItem('permits');
  return permits ? JSON.parse(permits) : {};
}

// Load permits from database
function loadPermits() {
  if (useLocalStorage) {
    const permits = getPermitsFromLocalStorage();
    displayPermits(permits);
  } else {
    // Firebase real-time listener
    permitsRef.on('value', (snapshot) => {
      const permits = snapshot.val() || {};
      displayPermits(permits);
    }, handleFirebaseError);
  }
}

// Display permits in the UI
function displayPermits(permits) {
  // Clear container first
  permitsContainer.innerHTML = '';
  
  // Check if we have permits
  if (Object.keys(permits).length === 0) {
    const noPermits = document.createElement('div');
    noPermits.className = 'no-permits';
    noPermits.textContent = 'No permits found. Add your first permit using the form above.';
    permitsContainer.appendChild(noPermits);
    return;
  }
  
  // Add filter and sort controls if they don't exist
  if (!document.getElementById('filters-container')) {
    addFilterControls();
  }
  
  // Get sort and filter preferences
  const sortBy = document.getElementById('sort-by')?.value || 'status';
  const filterInvestigated = document.getElementById('filter-investigated')?.checked || false;
  const filterGobacks = document.getElementById('filter-gobacks')?.checked || false;
  
  // Sort permits based on selected option
  let sortedPermits = Object.entries(permits);
  
  if (sortBy === 'permitId') {
    sortedPermits.sort((a, b) => a[1].permitId.localeCompare(b[1].permitId));
  } else if (sortBy === 'date') {
    sortedPermits.sort((a, b) => new Date(b[1].createdAt) - new Date(a[1].createdAt));
  } else if (sortBy === 'status') {
    // Order by status: not-investigated, investigating, investigated
    const statusOrder = { 'not-investigated': 1, 'investigating': 2, 'investigated': 3 };
    sortedPermits.sort((a, b) => statusOrder[a[1].status] - statusOrder[b[1].status]);
  }
  
  // Filter permits if filters are active
  if (filterInvestigated || filterGobacks) {
    sortedPermits = sortedPermits.filter(([_, permit]) => {
      // If both filters are active, return permits that match both conditions
      if (filterInvestigated && filterGobacks) {
        return permit.investigated && permit.gobacks;
      }
      // Otherwise, return permits that match either condition
      return (filterInvestigated && permit.investigated) || (filterGobacks && permit.gobacks);
    });
  }
  
  // Create permit cards
  if (sortedPermits.length === 0) {
    const noPermits = document.createElement('div');
    noPermits.className = 'no-permits';
    noPermits.textContent = 'No permits match your current filters.';
    permitsContainer.appendChild(noPermits);
  } else {
    sortedPermits.forEach(([key, permit]) => {
      const permitCard = createPermitCard(key, permit);
      permitsContainer.appendChild(permitCard);
    });
  }
}

// Add filter and sort controls
function addFilterControls() {
  const filtersContainer = document.createElement('div');
  filtersContainer.id = 'filters-container';
  filtersContainer.className = 'filters-container';
  
  // Create sort controls
  const sortContainer = document.createElement('div');
  sortContainer.className = 'filter-group';
  
  const sortLabel = document.createElement('label');
  sortLabel.textContent = 'Sort by: ';
  sortLabel.setAttribute('for', 'sort-by');
  
  const sortSelect = document.createElement('select');
  sortSelect.id = 'sort-by';
  sortSelect.innerHTML = `
    <option value="status">Status</option>
    <option value="permitId">Permit ID</option>
    <option value="date">Date Created</option>
  `;
  sortSelect.addEventListener('change', () => loadPermits());
  
  sortContainer.appendChild(sortLabel);
  sortContainer.appendChild(sortSelect);
  
  // Create filter controls
  const filterContainer = document.createElement('div');
  filterContainer.className = 'filter-group';
  
  const investigatedFilter = document.createElement('div');
  investigatedFilter.className = 'filter-option';
  investigatedFilter.innerHTML = `
    <input type="checkbox" id="filter-investigated">
    <label for="filter-investigated">Investigated Only</label>
  `;
  
  const gobacksFilter = document.createElement('div');
  gobacksFilter.className = 'filter-option';
  gobacksFilter.innerHTML = `
    <input type="checkbox" id="filter-gobacks">
    <label for="filter-gobacks">Go Backs Only</label>
  `;
  
  // Add filter change listeners
  investigatedFilter.querySelector('input').addEventListener('change', () => loadPermits());
  gobacksFilter.querySelector('input').addEventListener('change', () => loadPermits());
  
  filterContainer.appendChild(investigatedFilter);
  filterContainer.appendChild(gobacksFilter);
  
  // Add reset filters button
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Filters';
  resetButton.className = 'btn';
  resetButton.addEventListener('click', () => {
    document.getElementById('filter-investigated').checked = false;
    document.getElementById('filter-gobacks').checked = false;
    document.getElementById('sort-by').value = 'status';
    loadPermits();
  });
  
  // Add export CSV button
  const exportButton = document.createElement('button');
  exportButton.textContent = 'Export to CSV';
  exportButton.className = 'btn btn-primary export-btn';
  exportButton.addEventListener('click', exportToCSV);
  
  // Add to filters container
  filtersContainer.appendChild(sortContainer);
  filtersContainer.appendChild(filterContainer);
  filtersContainer.appendChild(resetButton);
  filtersContainer.appendChild(exportButton);
  
  // Insert before permits container
  document.querySelector('.permits-section h2').after(filtersContainer);
}

// Create a permit card element
function createPermitCard(key, permit) {
  const card = document.createElement('div');
  card.className = 'permit-card';
  card.dataset.key = key;
  
  // Card header
  const header = document.createElement('div');
  header.className = 'permit-header';
  
  const title = document.createElement('h3');
  title.textContent = `Permit: ${permit.permitId}`;
  
  // Controls container
  const controls = document.createElement('div');
  controls.className = 'permit-controls';
  
  // Edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.title = 'Edit Permit';
  editBtn.innerHTML = '&#9998;'; // Edit icon
  editBtn.addEventListener('click', () => openEditModal(key, permit));
  
  // Quick status toggle
  const statusBtn = document.createElement('button');
  statusBtn.className = 'status-btn';
  statusBtn.title = 'Quick Status Change';
  statusBtn.innerHTML = '&#8645;'; // Up-down arrow
  statusBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    // Toggle through statuses
    const statuses = ['not-investigated', 'investigating', 'investigated'];
    const currentIndex = statuses.indexOf(permit.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const newStatus = statuses[nextIndex];
    
    // Update permit
    const updatedPermit = { ...permit, status: newStatus };
    updateInLocalStorage(key, updatedPermit);
  });
  
  controls.appendChild(statusBtn);
  controls.appendChild(editBtn);
  
  header.appendChild(title);
  header.appendChild(controls);
  card.appendChild(header);
  
  // Tracker
  const tracker = createTracker(permit.permitId, permit.status);
  card.appendChild(tracker);
  
  // Permit details
  const details = document.createElement('div');
  details.className = 'permit-details';
  
  // Create permit info section
  const infoSection = document.createElement('div');
  infoSection.className = 'permit-info';
  
  // Quick info pills
  const quickInfo = document.createElement('div');
  quickInfo.className = 'quick-info';
  
  // Add poles pill if available
  if (permit.poles) {
    const polesPill = document.createElement('div');
    polesPill.className = 'detail-pill';
    polesPill.innerHTML = `<span class="label">POLES:</span> ${permit.poles}`;
    quickInfo.appendChild(polesPill);
  }
  
  // Add investigated tag - clickable
  const investigatedTag = document.createElement('div');
  investigatedTag.className = 'detail-pill editable-pill';
  investigatedTag.title = 'Click to toggle';
  investigatedTag.innerHTML = permit.investigated ? 
    '<span class="tag tag-yes">INVESTIGATED: Yes</span>' : 
    '<span class="tag tag-no">INVESTIGATED: No</span>';
  investigatedTag.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent card expansion
    const updatedPermit = { ...permit, investigated: !permit.investigated };
    updateInLocalStorage(key, updatedPermit);
  });
  quickInfo.appendChild(investigatedTag);
  
  // Add go backs tag - clickable
  const gobacksTag = document.createElement('div');
  gobacksTag.className = 'detail-pill editable-pill';
  gobacksTag.title = 'Click to toggle';
  gobacksTag.innerHTML = permit.gobacks ? 
    '<span class="tag tag-yes">GO BACKS: Yes</span>' : 
    '<span class="tag tag-no">GO BACKS: No</span>';
  gobacksTag.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent card expansion
    const updatedPermit = { ...permit, gobacks: !permit.gobacks };
    updateInLocalStorage(key, updatedPermit);
  });
  quickInfo.appendChild(gobacksTag);
  
  // Add assigned pill - clickable to edit
  const assignedPill = document.createElement('div');
  assignedPill.className = 'detail-pill editable-pill';
  assignedPill.title = 'Click to edit';
  
  // Create display and edit elements
  const assignedDisplay = document.createElement('div');
  assignedDisplay.className = 'assigned-display';
  assignedDisplay.innerHTML = `<span class="label">Assigned:</span> ${permit.assigned || 'Unassigned'}`;
  
  const assignedEdit = document.createElement('div');
  assignedEdit.className = 'assigned-edit';
  assignedEdit.style.display = 'none';
  
  const assignedInput = document.createElement('input');
  assignedInput.type = 'text';
  assignedInput.value = permit.assigned || '';
  assignedInput.placeholder = 'Enter name';
  
  const saveBtn = document.createElement('button');
  saveBtn.className = 'save-btn';
  saveBtn.textContent = '✓';
  saveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const updatedPermit = { ...permit, assigned: assignedInput.value };
    updateInLocalStorage(key, updatedPermit);
    toggleAssignedEdit();
  });
  
  assignedEdit.appendChild(assignedInput);
  assignedEdit.appendChild(saveBtn);
  
  assignedPill.appendChild(assignedDisplay);
  assignedPill.appendChild(assignedEdit);
  
  // Toggle between display and edit mode
  function toggleAssignedEdit() {
    const isEditing = assignedDisplay.style.display === 'none';
    assignedDisplay.style.display = isEditing ? 'block' : 'none';
    assignedEdit.style.display = isEditing ? 'none' : 'flex';
    
    if (!isEditing) {
      // Focus input when switching to edit mode
      setTimeout(() => assignedInput.focus(), 0);
    }
  }
  
  // Add event listener to toggle edit mode
  assignedDisplay.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAssignedEdit();
  });
  
  // Handle Enter key press
  assignedInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const updatedPermit = { ...permit, assigned: assignedInput.value };
      updateInLocalStorage(key, updatedPermit);
      toggleAssignedEdit();
    }
  });
  
  // Handle Escape key press to cancel
  assignedInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      assignedInput.value = permit.assigned || '';
      toggleAssignedEdit();
    }
  });
  
  quickInfo.appendChild(assignedPill);
  
  infoSection.appendChild(quickInfo);
  
  // Notes section
  if (permit.notes) {
    const notesDiv = document.createElement('div');
    notesDiv.className = 'notes';
    notesDiv.innerHTML = `<strong>NOTES:</strong> ${permit.notes}`;
    infoSection.appendChild(notesDiv);
  }
  
  // Quick edit section
  const quickEdit = document.createElement('div');
  quickEdit.className = 'quick-edit';
  
  const statusSelect = document.createElement('select');
  statusSelect.className = 'quick-status-select';
  
  const options = [
    { value: 'not-investigated', text: 'Not INVESTIGATED' },
    { value: 'investigating', text: 'Currently INVESTIGATING' },
    { value: 'investigated', text: 'INVESTIGATED' }
  ];
  
  options.forEach(option => {
    const optionEl = document.createElement('option');
    optionEl.value = option.value;
    optionEl.textContent = option.text;
    if (permit.status === option.value) {
      optionEl.selected = true;
    }
    statusSelect.appendChild(optionEl);
  });
  
  const updateBtn = document.createElement('button');
  updateBtn.className = 'btn btn-primary';
  updateBtn.textContent = 'Update';
  updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create updated permit
    const updatedPermit = { ...permit, status: statusSelect.value };
    
    // Save changes
    updateInLocalStorage(key, updatedPermit);
  });
  
  quickEdit.appendChild(statusSelect);
  quickEdit.appendChild(updateBtn);
  infoSection.appendChild(quickEdit);
  
  details.appendChild(infoSection);
  card.appendChild(details);
  
  // Make entire card clickable to toggle details view
  card.addEventListener('click', (e) => {
    // Don't toggle if clicking on a button or select
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT') {
      return;
    }
    
    const detailsSection = card.querySelector('.permit-details');
    if (detailsSection.style.display === 'none') {
      detailsSection.style.display = 'flex';
    } else {
      detailsSection.style.display = 'none';
    }
  });
  
  return card;
}

// Initialize the application
function initApp() {
  // Add event listeners
  addPermitForm.addEventListener('submit', handleAddPermit);
  editPermitForm.addEventListener('submit', handleEditPermit);
  closeModalBtn.addEventListener('click', closeModal);
  deletePermitBtn.addEventListener('click', showConfirmModal);
  confirmDeleteBtn.addEventListener('click', handleDeletePermit);
  cancelDeleteBtn.addEventListener('click', closeConfirmModal);
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === editModal) {
      closeModal();
    }
    if (e.target === confirmModal) {
      closeConfirmModal();
    }
  });
  
  // Add view toggle button
  addViewToggleButton();
  
  // Load permits
  loadPermits();
}

// Add view toggle button
function addViewToggleButton() {
  const viewToggleBtn = document.createElement('button');
  viewToggleBtn.className = 'view-toggle';
  viewToggleBtn.innerHTML = '&#8801;'; // hamburger icon
  viewToggleBtn.title = 'Toggle Compact View';
  viewToggleBtn.addEventListener('click', toggleCompactView);
  document.body.appendChild(viewToggleBtn);
}

// Toggle between normal and compact view
function toggleCompactView() {
  const container = document.getElementById('permits-container');
  if (container.classList.contains('compact-view')) {
    container.classList.remove('compact-view');
  } else {
    container.classList.add('compact-view');
  }
}

// Open the edit modal
function openEditModal(key, permit) {
  currentPermitKey = key;
  
  // Fill the form with the permit data
  document.getElementById('edit-permit-key').value = key;
  document.getElementById('edit-permit-id').value = permit.permitId;
  document.getElementById('edit-poles').value = permit.poles;
  document.getElementById('edit-notes').value = permit.notes || '';
  document.getElementById('edit-investigated').checked = permit.investigated;
  document.getElementById('edit-gobacks').checked = permit.gobacks;
  document.getElementById('edit-assigned').value = permit.assigned || '';
  document.getElementById('edit-status').value = permit.status;
  
  // Show the modal
  editModal.style.display = 'block';
}

// Close the edit modal
function closeModal() {
  editModal.style.display = 'none';
  currentPermitKey = null;
}

// Show the confirmation modal
function showConfirmModal() {
  confirmModal.style.display = 'block';
}

// Close the confirmation modal
function closeConfirmModal() {
  confirmModal.style.display = 'none';
}

// Handle edit permit submission
function handleEditPermit(event) {
  event.preventDefault();
  
  if (!currentPermitKey) {
    console.error('No permit key found');
    return;
  }
  
  // Get form values
  const permitId = document.getElementById('edit-permit-id').value;
  const poles = document.getElementById('edit-poles').value;
  const notes = document.getElementById('edit-notes').value;
  const investigated = document.getElementById('edit-investigated').checked;
  const gobacks = document.getElementById('edit-gobacks').checked;
  const assigned = document.getElementById('edit-assigned').value;
  const status = document.getElementById('edit-status').value;
  
  // Create updated permit object
  const updatedPermit = {
    permitId,
    poles,
    notes,
    investigated,
    gobacks,
    assigned,
    status,
    updatedAt: new Date().toISOString()
  };
  
  // Update in database
  if (useLocalStorage) {
    updateInLocalStorage(currentPermitKey, updatedPermit);
  } else {
    updateInFirebase(currentPermitKey, updatedPermit);
  }
  
  // Close modal
  closeModal();
}

// Update permit in Firebase
function updateInFirebase(key, updatedPermit) {
  permitsRef.child(key).update(updatedPermit)
    .then(() => {
      console.log('Permit updated successfully');
    })
    .catch(handleFirebaseError);
}

// Update permit in localStorage
function updateInLocalStorage(key, updatedPermit) {
  // Get existing permits
  const permits = getPermitsFromLocalStorage();
  
  // Preserve createdAt from the original permit
  updatedPermit.createdAt = permits[key].createdAt;
  
  // Update permit
  permits[key] = updatedPermit;
  
  // Save back to localStorage
  localStorage.setItem('permits', JSON.stringify(permits));
  
  // Refresh display
  displayPermits(permits);
}

// Handle delete permit
function handleDeletePermit() {
  if (!currentPermitKey) {
    console.error('No permit key found');
    return;
  }
  
  // Delete from database
  if (useLocalStorage) {
    deleteFromLocalStorage(currentPermitKey);
  } else {
    deleteFromFirebase(currentPermitKey);
  }
  
  // Close modals
  closeConfirmModal();
  closeModal();
}

// Delete permit from Firebase
function deleteFromFirebase(key) {
  permitsRef.child(key).remove()
    .then(() => {
      console.log('Permit deleted successfully');
    })
    .catch(handleFirebaseError);
}

// Delete permit from localStorage
function deleteFromLocalStorage(key) {
  // Get existing permits
  const permits = getPermitsFromLocalStorage();
  
  // Delete permit
  delete permits[key];
  
  // Save back to localStorage
  localStorage.setItem('permits', JSON.stringify(permits));
  
  // Refresh display
  displayPermits(permits);
}

// Export permits to CSV file
function exportToCSV() {
  // Get all permits
  const permits = getPermitsFromLocalStorage();
  
  if (Object.keys(permits).length === 0) {
    alert('No permits to export');
    return;
  }
  
  // Define the CSV headers
  const headers = [
    'Permit ID', 
    'Poles', 
    'Notes', 
    'Investigated', 
    'Go Backs', 
    'Assigned To', 
    'Status', 
    'Created At'
  ];
  
  // Convert permits object to array of values
  const permitData = Object.values(permits).map(permit => [
    permit.permitId,
    permit.poles,
    // Escape quotes in notes to avoid breaking CSV format
    permit.notes ? `"${permit.notes.replace(/"/g, '""')}"` : '',
    permit.investigated ? 'Yes' : 'No',
    permit.gobacks ? 'Yes' : 'No',
    permit.assigned || 'Unassigned',
    getStatusDisplayName(permit.status),
    new Date(permit.createdAt).toLocaleString()
  ]);
  
  // Create CSV content
  let csvContent = headers.join(',') + '\n';
  
  permitData.forEach(row => {
    csvContent += row.join(',') + '\n';
  });
  
  // Create a download link
  const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'permits_export_' + new Date().toISOString().slice(0,10) + '.csv');
  
  // Add to body and trigger download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

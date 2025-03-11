/**
 * Initial permit data for the application
 */

// Pre-populated permit data
const initialPermits = [
  // Permits with data from spreadsheet
  {
    permitId: "1005PA_PSA_007_A2",
    poles: "4",
    notes: "Go backs for anchors and mids can design poles and bring up to date current standards",
    investigated: true,
    gobacks: true,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1005PA_PSA_007_A3",
    poles: "0",
    notes: "Go back for anchor and mid, poles designed need to be updated to current standards",
    investigated: true,
    gobacks: true,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1006PA_PSA_008_02",
    poles: "0",
    notes: "needs to be brought up to date but all poles desinged",
    investigated: true,
    gobacks: false,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1006PA_PSA_008_03",
    poles: "5",
    notes: "Can be designed and brought up to current standards",
    investigated: true,
    gobacks: false,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1006PA_PSA_008_05",
    poles: "3",
    notes: "Can be designed and brought up to current standards",
    investigated: true,
    gobacks: false,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1006PA_PSA_008_06",
    poles: "3",
    notes: "can be updated Go backs for mids",
    investigated: true,
    gobacks: true,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1006PA_PSA_008_07",
    poles: "9",
    notes: "Can be designed and brought up to current standards",
    investigated: true,
    gobacks: false,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1006PA_PSA_008_08",
    poles: "1",
    notes: "Can be designed and brought up to current standards",
    investigated: true,
    gobacks: false,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1006PA_PSA_008_10",
    poles: "5",
    notes: "can be designed, go backs for missing mids over road",
    investigated: true,
    gobacks: true,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1006PA_PSA_008_13",
    poles: "5",
    notes: "Can be designed and brought up to current standards",
    investigated: true,
    gobacks: false,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1006PA_PSA_008_14",
    poles: "6",
    notes: "Can be designed and brought up to current standards",
    investigated: true,
    gobacks: false,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1007PA _PSA_009_03",
    poles: "1",
    notes: "Can be designed and brought up to current standards",
    investigated: true,
    gobacks: false,
    assigned: "Team Member",
    status: "investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1007PA _PSA_009_05",
    poles: "4",
    notes: "Can be designed and brought up to current standards, go back for anchor",
    investigated: true,
    gobacks: true,
    assigned: "Team Member",
    status: "investigating",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1007PA _PSA_009_06",
    poles: "6",
    notes: "Can be designed and brought up to current standards",
    investigated: true,
    gobacks: false,
    assigned: "Team Member",
    status: "investigating",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1007PA _PSA_009_08",
    poles: "6",
    notes: "Can be designed and brought up to current standards one go back for mid",
    investigated: true,
    gobacks: true,
    assigned: "Team Member",
    status: "investigating",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1009PA_PSA_011_A2",
    poles: "",
    notes: "Can be designed and brought up to current standards on go back for midspan",
    investigated: false,
    gobacks: true,
    assigned: "Team Member",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  
  // Additional permits with minimal data
  {
    permitId: "1011PA_PSA_013_A3",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1012PA _PSA_014_08",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1013PA_PSA_015_01",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1013PA_PSA_015_02",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1013PA_PSA_015_03",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1013PA_PSA_015_04",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1013PA_PSA_015_05",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1015PA_PSA_017_A1",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1015PA_PSA_017_A3",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1016PA_PSA_018_03",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1016PA_PSA_018_04",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1016PA_PSA_018_06",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1016PA_PSA_018_07",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1016PA_PSA_018_08",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1016PA_PSA_018_09",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1016PA_PSA_018_11",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1020PA _PSA_022_02",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1020PA _PSA_022_03",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1020PA _PSA_022_04",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1020PA _PSA_022_05",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1020PA _PSA_022_06",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1020PA _PSA_022_08",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1020PA _PSA_022_09",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1021PA_PSA_023_A2",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1022PA_PSA_024_A2",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1022PA_PSA_024_A5",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1022PA_PSA_024_A6",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1022PA_PSA_024_A12",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1024PA_PSA_026_03",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1033PA_PSA_035_A4",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1033PA_PSA_035_A5",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1033PA_PSA_035_A6",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1036PA_PSA_038_02",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1036PA_PSA_038_05",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1038PA_PSA_57_09",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1039PA_PSA_060_A3",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1039PA_PSA_060_A4",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1039PA_PSA_060_A5",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1039PA_PSA_060_A8",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1039PA_PSA_060_A9",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1040PA_PSA_061_A2",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1040PA_PSA_061_A3",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1040PA_PSA_061_A4",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1043PA_PSA_078_03",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1043PA_PSA_078_04",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1043PA_PSA_078_05",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1043PA_PSA_078_06",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1043PA_PSA_078_07",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1043PA_PSA_078_08",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1043PA_PSA_078_09",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1044PA_PSA_080_A1",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1044PA_PSA_080_A2",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1044PA_PSA_080_A3",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1045PA_PSA_081_A1",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1045PA_PSA_081_A2",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1050PA_PSA_086_A7",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  },
  {
    permitId: "1050PA_PSA_086_A8",
    poles: "",
    notes: "Pending investigation",
    investigated: false,
    gobacks: false,
    assigned: "Unassigned",
    status: "not-investigated",
    createdAt: new Date().toISOString()
  }
];

// Function to populate localStorage with initial data
function populateInitialData() {
  // Check if data already exists in localStorage
  if (!localStorage.getItem('permits') || localStorage.getItem('permits') === '{}') {
    console.log('Populating initial permit data...');
    
    // Create object with permit IDs as keys
    const permits = {};
    initialPermits.forEach((permit, index) => {
      // Use index in the key to ensure each permit gets a unique key
      // Adding a slight delay between keys using the index
      const timestamp = Date.now() - (index * 1000);
      const key = `permit_${timestamp}_${Math.random().toString(36).substr(2, 9)}`;
      permits[key] = permit;
    });
    
    // Save to localStorage
    localStorage.setItem('permits', JSON.stringify(permits));
    console.log('Initial data populated successfully');
  } else {
    console.log('Data already exists in localStorage, clearing and repopulating');
    
    // Clear existing data and repopulate
    localStorage.removeItem('permits');
    
    // Create object with permit IDs as keys
    const permits = {};
    initialPermits.forEach((permit, index) => {
      // Use index in the key to ensure each permit gets a unique key
      const timestamp = Date.now() - (index * 1000);
      const key = `permit_${timestamp}_${Math.random().toString(36).substr(2, 9)}`;
      permits[key] = permit;
    });
    
    // Save to localStorage
    localStorage.setItem('permits', JSON.stringify(permits));
    console.log('Initial data repopulated successfully');
  }
}

// Call the function when the script loads
document.addEventListener('DOMContentLoaded', populateInitialData);

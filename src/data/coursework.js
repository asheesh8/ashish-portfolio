// Every course from Canvas (Champlain College), Fall 2023 → Fall 2026.
// Area drives the filter tabs on the Coursework section.
// Repeated enrollments (CSI-180, CSI-240) are listed once, at the latest term.

export const TERMS = {
  '2023FA': 'Fall 2023',
  '2024SP': 'Spring 2024',
  '2024FA': 'Fall 2024',
  '2025SP': 'Spring 2025',
  '2025FA': 'Fall 2025',
  '2026SP': 'Spring 2026',
  '2026FA': 'Fall 2026',
};

export const CURRENT_TERM = '2026FA';

export const AREAS = [
  { id: 'all',  label: 'All' },
  { id: 'cs',   label: 'Software & Systems' },
  { id: 'sec',  label: 'Security & Networks' },
  { id: 'math', label: 'Math & Data' },
  { id: 'core', label: 'Core & Interdisciplinary' },
];

export const COURSES = [
  // Fall 2026 (current)
  { code: 'CCC-410', name: 'Capstone Design',                                  term: '2026FA', area: 'cs' },
  { code: 'CSI-351', name: 'Software Testing',                                 term: '2026FA', area: 'cs' },
  { code: 'DAT-330', name: 'Data Mining',                                      term: '2026FA', area: 'math' },
  { code: 'MTH-350', name: 'Numerical Methods',                                term: '2026FA', area: 'math' },
  { code: 'SEC-110', name: 'Cybersecurity & Digital Forensics Fundamentals',   term: '2026FA', area: 'sec' },
  { code: 'SEC-250', name: 'Computer & Network Security',                      term: '2026FA', area: 'sec' },

  // Spring 2026
  { code: 'CSI-300', name: 'Database Management Systems',                      term: '2026SP', area: 'cs' },
  { code: 'CSI-380', name: 'Innovation III: Emerging Languages',               term: '2026SP', area: 'cs' },
  { code: 'NET-150', name: 'Network Fundamentals',                             term: '2026SP', area: 'sec' },
  { code: 'MTH-240', name: 'Calculus II',                                      term: '2026SP', area: 'math' },
  { code: 'COR-303', name: 'Core Foundations: Connecting Past and Present',    term: '2026SP', area: 'core' },
  { code: 'COR-304', name: 'Digital Methods',                                  term: '2026SP', area: 'core' },

  // Fall 2025
  { code: 'CSI-340', name: 'Software Design Patterns',                         term: '2025FA', area: 'cs' },
  { code: 'CSI-370', name: 'Computer Architecture',                            term: '2025FA', area: 'cs' },
  { code: 'CSI-320', name: 'Global IT & Ethics',                               term: '2025FA', area: 'cs' },
  { code: 'MTH-310', name: 'Linear Algebra',                                   term: '2025FA', area: 'math' },
  { code: 'COR-301', name: 'Core Foundations: Connecting Place and Identity',  term: '2025FA', area: 'core' },
  { code: 'COR-302', name: 'Field Methods',                                    term: '2025FA', area: 'core' },

  // Spring 2025
  { code: 'CSI-281', name: 'Data Structures & Algorithms',                     term: '2025SP', area: 'cs' },
  { code: 'CSI-275', name: 'Network Programming',                              term: '2025SP', area: 'sec' },
  { code: 'CSI-180', name: 'Innovation I: Technology Sandbox',                 term: '2025SP', area: 'cs' },
  { code: 'COR-203', name: 'Core Foundations: Making Meaning Through Culture', term: '2025SP', area: 'core' },
  { code: 'COR-204', name: 'Theoretical Perspectives',                         term: '2025SP', area: 'core' },

  // Fall 2024
  { code: 'CSI-230', name: 'Linux/Unix Programming',                           term: '2024FA', area: 'cs' },
  { code: 'CSI-240', name: 'Advanced Programming',                             term: '2024FA', area: 'cs' },
  { code: 'MTH-270', name: 'Discrete Mathematics',                             term: '2024FA', area: 'math' },
  { code: 'COR-201', name: 'Core Foundations: Making Meaning Through Science', term: '2024FA', area: 'core' },
  { code: 'COR-202', name: 'Interdisciplinary Perspectives',                   term: '2024FA', area: 'core' },

  // Spring 2024
  { code: 'MTH-230', name: 'Calculus I',                                       term: '2024SP', area: 'math' },
  { code: 'COR-103', name: 'Navigating Your Information Landscape',            term: '2024SP', area: 'core' },
  { code: 'COR-104', name: 'First Year Inquiry: Making & Doing',             term: '2024SP', area: 'core' },

  // Fall 2023
  { code: 'CSI-140', name: 'Introduction to Programming',                      term: '2023FA', area: 'cs' },
  { code: 'CSI-120', name: 'Intro to Mobile & Web Dev',                        term: '2023FA', area: 'cs' },
  { code: 'COR-101', name: 'Navigating Higher Education',                      term: '2023FA', area: 'core' },
  { code: 'COR-102', name: 'First Year Inquiry: Reading & Writing',          term: '2023FA', area: 'core' },
  { code: 'CMP-101', name: 'Champ 101',                                        term: '2023FA', area: 'core' },
];

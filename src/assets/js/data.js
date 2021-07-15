const covidNavigatorData = {
  'Covid Navigator': {
    adjacencies: [
      {
        nodeTo: 'setting',
        nodeFrom: 'cnvg',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'process',
        nodeFrom: 'cnvg',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'subject',
        nodeFrom: 'cnvg',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'resource',
        nodeFrom: 'cnvg',
        data: { $color: '#557EAA', $type: 'line' },
      },
    ],
    data: {
      $color: '#01838f',
      $type: 'image',
      $url: 'navigator.svg',
      descr: '',
      group: 'navigator',
    },
    id: 'cnvg',
    name: 'COVID NAVIGATOR',
  },
}

const careSettingData = {
  'Covid Navigator': {
    adjacencies: [
      {
        nodeTo: 'setting',
        nodeFrom: 'cnvg',
        data: { $color: '#557EAA', $type: 'line' },
      },
    ],
    data: {
      $color: '#01838f',
      $type: 'image',
      $url: 'navigator.svg',
      descr: '',
      group: 'navigator',
    },
    id: 'cnvg',
    name: 'COVID NAVIGATOR',
  },

  'Care Setting': {
    adjacencies: [
      {
        nodeTo: 'longtermcare',
        nodeFrom: 'setting',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'postacutecare',
        nodeFrom: 'setting',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'home',
        nodeFrom: 'setting',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'telemedicine',
        nodeFrom: 'setting',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'ambulatory',
        nodeFrom: 'setting',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'acute',
        nodeFrom: 'setting',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'laboratoryenv',
        nodeFrom: 'setting',
        data: { $color: '#557EAA', $type: 'line' },
      },
    ],
    data: {
      $color: '#786cba',
      $type: 'image',
      $url: 'setting.svg',
      descr: '',
      group: 'setting',
    },
    id: 'setting',
    name: 'Care Setting',
  },

  Home: {
    adjacencies: [],
    data: {
      $color: '#786cba',
      $type: 'image',
      $url: 'setting.svg',
      descr:
        'Personal/self/home care with rest, over the counter remedies, caregiver support etc.',
      group: 'setting',
    },
    id: 'home',
    name: 'Home',
  },

  Telemedicine: {
    adjacencies: [],
    data: {
      $color: '#786cba',
      $type: 'image',
      $url: 'setting.svg',
      descr:
        'Virtual care over the internet with voice and image connection from patient to provider or triage by ancillary health providers (nurses, PT/OT, PAs, NPs, physicians etc.)',
      group: 'setting',
    },
    id: 'telemedicine',
    name: 'Telemedicine',
  },

  'Acute Care': {
    adjacencies: [],
    data: {
      $color: '#786cba',
      $type: 'image',
      $url: 'setting.svg',
      group: 'setting',
      descr: 'Urgent/Emergency care setting.',
    },
    id: 'acute',
    name: 'Acute Care',
  },

  'Long Term Care': {
    adjacencies: [],
    data: {
      $color: '#786cba',
      $type: 'image',
      $url: 'setting.svg',
      group: 'setting',
      descr: '',
    },
    id: 'longtermcare',
    name: 'Long Term Care',
  },

  'Post Acute Care': {
    adjacencies: [],
    data: {
      $color: '#786cba',
      $type: 'image',
      $url: 'setting.svg',
      group: 'setting',
      descr: '',
    },
    id: 'postacutecare',
    name: 'Post Acute Care',
  },

  Ambulatory: {
    adjacencies: [],
    data: {
      $color: '#786cba',
      $type: 'image',
      $url: 'setting.svg',
      descr:
        'Patient cared delivered in a clinic or location where the patient is seen physically by the provider.',
      group: 'setting',
    },
    id: 'ambulatory',
    name: 'Ambulatory',
  },

  'Laboratory Environments': {
    adjacencies: [],
    data: {
      $color: '#786cba',
      $type: 'image',
      $url: 'setting.svg',
      group: 'setting',
      descr:
        'Represents specific procedural-oriented diagnostic, and therapeutic environments, such as GI, Cardiology, etc.;   This category also represents labs such as clinical/surgical labs, specimen collection, etc.',
    },
    id: 'laboratoryenv',
    name: 'Laboratory Environments',
  },
}

const careProcessData = {
  'Covid Navigator': {
    adjacencies: [
      {
        nodeTo: 'process',
        nodeFrom: 'cnvg',
        data: { $color: '#557EAA', $type: 'line' },
      },
    ],
    data: {
      $color: '#01838f',
      $type: 'image',
      $url: 'navigator.svg',
      descr: '',
      group: 'navigator',
    },
    id: 'cnvg',
    name: 'COVID NAVIGATOR',
  },

  'Care Process': {
    adjacencies: [
      {
        nodeTo: 'prevention',
        nodeFrom: 'process',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'screening',
        nodeFrom: 'process',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'diagnosis',
        nodeFrom: 'process',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'treatment',
        nodeFrom: 'process',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'followup',
        nodeFrom: 'process',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'trial',
        nodeFrom: 'knowledge',
        data: { $color: '#557EAA', $type: 'line' },
      },
    ],
    data: {
      $color: '#ce5685',
      group: 'process',
      $type: 'image',
      $url: 'process.svg',
      descr: '',
    },
    id: 'process',
    name: 'Care Process',
  },

  Prevention: {
    adjacencies: [],
    data: {
      $color: '#ce5685',
      group: 'process',
      $type: 'image',
      $url: 'process.svg',
      descr: 'Avoid disease onset.',
    },
    id: 'prevention',
    name: 'Prevention',
  },

  Screening: {
    adjacencies: [],
    data: {
      $color: '#ce5685',
      group: 'process',
      $type: 'image',
      $url: 'process.svg',
      descr:
        'Questionnaire or screening test to determine if disease is suspected or likely or exposure to disease.',
    },
    id: 'screening',
    name: 'Screening',
  },

  Diagnosis: {
    adjacencies: [],
    data: {
      $color: '#ce5685',
      group: 'process',
      $type: 'image',
      $url: 'process.svg',
      descr:
        'Based on gold standard: positive test, observation, study (lab/rad/path).',
    },
    id: 'diagnosis',
    name: 'Diagnosis',
  },

  Treatment: {
    adjacencies: [],
    data: {
      $color: '#ce5685',
      group: 'process',
      $type: 'image',
      $url: 'process.svg',
      descr:
        'Response to reduce or eliminate impact of disease or condition-i.e. diabetic care, antibiotic treatment, surgical cure.',
    },
    id: 'treatment',
    name: 'Treatment',
  },

  'Follow up': {
    adjacencies: [],
    data: {
      $color: '#ce5685',
      group: 'process',
      $type: 'image',
      $url: 'process.svg',
      descr:
        'Observation after treatment to see if disease is cured or reduced and ongoing monitoring of clinical course until resolved. Indefinite for chronic disease.',
    },
    id: 'followup',
    name: 'Follow up',
  },

  'Clinical Trial': {
    adjacencies: [],
    data: {
      $color: '#ce5685',
      group: 'process',
      $type: 'image',
      $url: 'process.svg',
      descr:
        'Study of various interventions of exposure vs. non-exposure, therapeutic regimens, procedures etc.',
    },
    id: 'trial',
    name: 'Clinical Trial',
  },
}

const subjectData = {
  'Covid Navigator': {
    adjacencies: [
      {
        nodeTo: 'subject',
        nodeFrom: 'cnvg',
        data: { $color: '#557EAA', $type: 'line' },
      },
    ],
    data: {
      $color: '#01838f',
      $type: 'image',
      $url: 'navigator.svg',
      descr: '',
      group: 'navigator',
    },
    id: 'cnvg',
    name: 'COVID NAVIGATOR',
  },

  Subject: {
    adjacencies: [
      {
        nodeTo: 'caremgmt',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'diagnoses',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'diagnostics',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'features',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'resmgmt',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'ppe',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'logistics',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'comorb',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'specpop',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'therapeuticsandprevention',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'control',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'epid',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'cliepid',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'pubhealthcaserep',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'subjectreserch',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'ethics',
        nodeFrom: 'subject',
        data: { $color: '#557EAA', $type: 'line' },
      },
    ],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr: '',
    },
    id: 'subject',
    name: 'Subject',
  },

  'Care Management': {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr:
        'Workflow, organizational processes, such as care plans, pathways, etc.',
    },
    id: 'caremgmt',
    name: 'Care Management',
  },

  Diagnoses: {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr: '',
    },
    id: 'diagnoses',
    name: 'Diagnoses',
  },

  Diagnostics: {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr: '',
    },
    id: 'diagnostics',
    name: 'Diagnostics',
  },

  'Clinical Features and Diagnosis': {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr: 'Signs, symptoms and positive indicators of disease presence.',
    },
    id: 'features',
    name: 'Clinical Features and Diagnosis',
  },

  'Resource Management': {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr: 'Includes both equipment and personnel.',
    },
    id: 'resmgmt',
    name: 'Resource Management',
  },

  'Personal Protection': {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr:
        'Measures to take for exposure avoidance or disease transmission by patient and or provider (patient to provider to more patients).',
    },
    id: 'ppe',
    name: 'Personal Protection',
  },

  Logistics: {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr:
        'The detailed coordination of a complex operation involving many people, facilities, or supplies.',
    },
    id: 'logistics',
    name: 'Logistics',
  },

  'Co-morbidities': {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr:
        'Assets focused on cohorts such as diabetes, asthma, multiple chronic conditions etc.  Use keywords to elaborate.',
    },
    id: 'comorb',
    name: 'Co-morbidities',
  },

  'Special Populations': {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr:
        'Assets focused on special populations, such as children, pregnancy, homeless, mental health etc.',
    },
    id: 'specpop',
    name: 'Special Populations',
  },

  'Therapeutics and Prevention': {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr: '',
    },
    id: 'therapeuticsandprevention',
    name: 'Therapeutics and Prevention',
  },

  'Infection Control': {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr:
        ' Reduce transmission of disease through risk mitigation strategies based on infection process (airborne, contact etc.).',
    },
    id: 'control',
    name: 'Infection Control',
  },

  Epidemiology: {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr:
        'Nature of disease emergence and spread through a community/population.',
    },
    id: 'epid',
    name: 'Epidemiology',
  },

  'Clinical Epidemiology': {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr: '',
    },
    id: 'cliepid',
    name: 'Clinical Epidemiology',
  },

  'Public Health and Case Reporting': {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr:
        'Jurisdictional (state/county/locality) organizations that administer public health.',
    },
    id: 'pubhealthcaserep',
    name: 'Public Health and Case Reporting',
  },

  SubResearch: {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr: '',
    },
    id: 'subjectreserch',
    name: 'Research',
  },

  Ethics: {
    adjacencies: [],
    data: {
      $color: '#ff8c40',
      group: 'subject',
      $type: 'image',
      $url: 'subject.svg',
      descr:
        'Application of medical/legal ethics to process: security/privacy, “Do no harm”, confidentiality etc.',
    },
    id: 'ethics',
    name: 'Ethics',
  },
}

const resourceData = {
  'Covid Navigator': {
    adjacencies: [
      {
        nodeTo: 'resource',
        nodeFrom: 'cnvg',
        data: { $color: '#557EAA', $type: 'line' },
      },
    ],
    data: {
      $color: '#01838f',
      $type: 'image',
      $url: 'navigator.svg',
      descr: '',
      group: 'navigator',
    },
    id: 'cnvg',
    name: 'COVID NAVIGATOR',
  },

  Resource: {
    adjacencies: [
      {
        nodeTo: 'datavis',
        nodeFrom: 'resource',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'datacol',
        nodeFrom: 'resource',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'knowledge',
        nodeFrom: 'resource',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'list',
        nodeFrom: 'resource',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'activity',
        nodeFrom: 'resource',
        data: { $color: '#557EAA', $type: 'line' },
      },
    ],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr: '',
    },
    id: 'resource',
    name: 'Resource',
  },

  'Data Visualization': {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Methods to display data for enhanced insight into understanding and interpreting data results (data cubes, graphs, tables, etc.).',
    },
    id: 'datavis',
    name: 'Data Visualization',
  },

  'Data Collection': {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Methods used to ingest data-questionnaires, entries for clinical records, aggregation from multiple sites etc.',
    },
    id: 'datacol',
    name: 'Data Collection',
  },

  'Knowledge Resource': {
    adjacencies: [
      {
        nodeTo: 'guideline',
        nodeFrom: 'knowledge',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'rules',
        nodeFrom: 'knowledge',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'model',
        nodeFrom: 'knowledge',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'policy',
        nodeFrom: 'knowledge',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'workflow',
        nodeFrom: 'knowledge',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'recommend',
        nodeFrom: 'knowledge',
        data: { $color: '#557EAA', $type: 'line' },
      },
    ],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr: '',
    },
    id: 'knowledge',
    name: 'Knowledge Resource',
  },

  'Directories and Lists': {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr: '',
    },
    id: 'list',
    name: 'Directories and Lists',
  },

  Activity: {
    adjacencies: [
      {
        nodeTo: 'research',
        nodeFrom: 'activity',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'authoring',
        nodeFrom: 'activity',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'implementation',
        nodeFrom: 'activity',
        data: { $color: '#557EAA', $type: 'line' },
      },
      {
        nodeTo: 'collaboration',
        nodeFrom: 'activity',
        data: { $color: '#557EAA', $type: 'line' },
      },
    ],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Used to represent projects, collaborations, or other engagement efforts (non-assets).',
    },
    id: 'activity',
    name: 'Activity',
  },

  Guideline: {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Systematically developed statements to assist practitioners and patient decisions about appropriate healthcare for specific circumstances.  Often produced by professional societies.',
    },
    id: 'guideline',
    name: 'Guideline',
  },

  'CDS Rule(s)': {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Assistive knowledge, such as might be used in alerts, reminders, etc.',
    },
    id: 'rules',
    name: 'CDS Rule(s)',
  },

  Model: {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Formal representation for the interaction of variables or factors.  These can vary widely from a simple truth table to a complex predictive model.  Examples include risk calculators, dosing calculators, order sets, checklists (pre-op, post-op).',
    },
    id: 'model',
    name: 'Model',
  },

  'Policy or Procedures': {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Policies & Procedures: Policy is a rule that is an obligation; procedures are accepted practices.  Often organizationally defined or instituted.',
    },
    id: 'policy',
    name: 'Policy or Procedures',
  },

  Workflow: {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Procedural algorithms, flowcharts, or process steps.  For instance, clinical pathways expressed via BPM+.',
    },
    id: 'workflow',
    name: 'Workflow',
  },

  'Knowledge Assertion': {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Suggested best-practice, such as may be found in a consensus recommendation.',
    },
    id: 'recommend',
    name: 'Knowledge Assertion',
  },

  Research: {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Published or interim reports of research (case reports, randomized clinical trials, translational research QI/QA reports, evidence summaries, systematic reviews, and unpublished data analyses).',
    },
    id: 'research',
    name: 'Research',
  },

  Authoring: {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Knowledge artifacts, such as evidence summaries, systematic reviews, guidance/ guidelines/ recommendations. (narrative and computable versions of the knowledge artifacts as well as their derivatives (e.g., CDS, eCQMs)).',
    },
    id: 'authoring',
    name: 'Authoring',
  },

  Implementation: {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Implementation of guidelines, CDS, CPGs, recommended measures to manage clinical presentations of COVID from screening to ICU treatment.',
    },
    id: 'implementation',
    name: 'Implementation',
  },

  Collaboration: {
    adjacencies: [],
    data: {
      $color: '#0084ad',
      group: 'resources',
      $type: 'image',
      $url: 'asset.svg',
      descr:
        'Activities spanning organizations or entities (industry, academia, government, etc).',
    },
    id: 'collaboration',
    name: 'Collaboration',
  },
}

const graphData = Object.assign(
  {},
  careSettingData,
  careProcessData,
  subjectData,
  resourceData,
  covidNavigatorData
)

export default graphData
export { careSettingData, careProcessData, subjectData, resourceData }

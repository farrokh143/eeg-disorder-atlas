// Single source for the PubMed searches used in bulk pulls (see data/search-protocol.md).
// v2 (2026-11-21): added "electroencephalogram", band names and "oscillations" after the benchmark check
// showed v1 missed papers that say "theta activity" or "alpha oscillations" instead of "power".
const CORE = '(electroencephalography[mh] OR EEG[tiab] OR qEEG[tiab] OR electroencephalogram[tiab]) AND (resting[tiab] OR "eyes closed"[tiab] OR "eyes open"[tiab]) AND (power[tiab] OR spectral[tiab] OR spectrum[tiab] OR asymmetry[tiab] OR theta[tiab] OR alpha[tiab] OR delta[tiab] OR beta[tiab] OR gamma[tiab] OR oscillations[tiab]) AND humans[mh]';
const DISORDERS = {
  "ADHD": '"Attention Deficit Disorder with Hyperactivity"[mh]',
  "Alzheimer's": '("Alzheimer Disease"[mh] OR "Cognitive Dysfunction"[mh])',
  "Schizophrenia": 'schizophrenia[mh]',
  "Depression": '"Depressive Disorder"[mh]',
  "Parkinson's": '"Parkinson Disease"[mh]',
  "Brain injury (TBI)": '("Brain Injuries, Traumatic"[mh] OR "Post-Concussion Syndrome"[mh])',
  "Insomnia": '"Sleep Initiation and Maintenance Disorders"[mh]',
  "Autism": '"Autism Spectrum Disorder"[mh]',
  "Alcohol & substance use": '"Substance-Related Disorders"[mh]',
  "Epilepsy": 'epilepsy[mh]',
  "PTSD": '"Stress Disorders, Post-Traumatic"[mh]',
  "Anxiety": '"Anxiety Disorders"[mh]',
  "Migraine": '"Migraine Disorders"[mh]',
  // v3 (2026-11-25): candidates added by the ICD-11 scoping check (data/scoping-2026-11-25.tsv)
  "Bipolar": '"Bipolar Disorder"[mh]',
  "OCD": '"Obsessive-Compulsive Disorder"[mh]',
  "Lewy body dementia": '"Lewy Body Disease"[mh]',
  "Frontotemporal dementia": '"Frontotemporal Dementia"[mh]',
  "Intellectual disability": '"Intellectual Disability"[mh]',
  "Learning disorders": '"Learning Disabilities"[mh]',
  "Multiple sclerosis": '"Multiple Sclerosis"[mh]',
  "Stroke": 'Stroke[mh]'
};
const SYMPTOM_LINK = '(electroencephalography[mh] OR EEG[tiab]) AND resting[tiab] AND (power[tiab] OR spectral[tiab]) AND (correlat*[tiab] OR severity[tiab]) AND humans[mh]';
const url = q => "https://pubmed.ncbi.nlm.nih.gov/?term=" + encodeURIComponent(q) + "&size=200";
module.exports = { CORE, DISORDERS, SYMPTOM_LINK, url, query: d => `${CORE} AND ${DISORDERS[d]}` };
if (require.main === module) {
  for (const d of Object.keys(DISORDERS)) console.log(`| ${d} | [Open search](${url(module.exports.query(d))}) |`);
}

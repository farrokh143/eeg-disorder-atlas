/*
 * Neurofeedback research map — dataset.
 *
 * Edit this file to add or correct research. Schema is documented in README.md.
 * Every entry was compiled from the published literature; verify each citation
 * against the original paper (use the PubMed link in the app) before relying on it.
 *
 * evidence: "strong" | "moderate" | "preliminary" | "contested"
 * type:     "biomarker" (an EEG difference observed in the condition)
 *           "protocol"  (a neurofeedback training protocol tested as treatment)
 * direction:"up" | "down" | "ratio" | "asymmetry"
 * sites:    10-20 labels (old names T3/T4/T5/T6). [] = individualised / QEEG-guided.
 */
window.NF_DATA = {
  bands: [
    { id: "scp",   name: "SCP",       range: "< 1 Hz",   note: "Slow cortical potentials: shifts in cortical excitability" },
    { id: "delta", name: "Delta",     range: "1–4 Hz",   note: "Deep sleep; excess when awake can mark injury or under-arousal" },
    { id: "theta", name: "Theta",     range: "4–8 Hz",   note: "Drowsiness, memory, internal attention" },
    { id: "alpha", name: "Alpha",     range: "8–12 Hz",  note: "Relaxed wakefulness, idling, inhibition" },
    { id: "smr",   name: "SMR",       range: "12–15 Hz", note: "Sensorimotor rhythm over central strip: still, alert body" },
    { id: "beta",  name: "Beta",      range: "15–20 Hz", note: "Active, focused thinking" },
    { id: "hibeta",name: "High beta", range: "20–30 Hz", note: "Arousal, rumination, anxiety" },
    { id: "gamma", name: "Gamma",     range: "30+ Hz",   note: "Binding, high-level processing" }
  ],

  conditions: [
    { id: "adhd",       name: "ADHD",               summary: "The most studied neurofeedback application. Theta/beta and SMR protocols at the vertex show benefits on parent ratings, but blinded and sham-controlled trials are much less convincing." },
    { id: "depression", name: "Depression",         summary: "Work centres on frontal alpha asymmetry (F3/F4). The asymmetry idea is influential, but meta-analysis does not support it as a diagnostic marker and training trials are small." },
    { id: "anxiety",    name: "Anxiety",            summary: "Protocols usually reward posterior alpha or alpha-theta states and inhibit high beta. Mostly clinical reports and small studies." },
    { id: "ptsd",       name: "PTSD",               summary: "Alpha-theta training has a long clinical history; a randomised trial of right temporal alpha down-training reported symptom reductions." },
    { id: "insomnia",   name: "Insomnia",           summary: "SMR training aims to strengthen sleep-spindle generators. Early positive results were not confirmed in a double-blind, sham-controlled trial." },
    { id: "epilepsy",   name: "Epilepsy",           summary: "One of the oldest applications (Sterman's SMR work). SMR and SCP training reduced seizure frequency in drug-resistant patients across controlled studies." },
    { id: "autism",     name: "Autism",             summary: "Mu-rhythm and QEEG-guided connectivity protocols; small samples and few controlled trials." },
    { id: "sud",        name: "Substance use",      summary: "Peniston alpha-theta protocol, later combined with beta/SMR training (Scott-Peniston). Promising retention outcomes, limited replication." },
    { id: "migraine",   name: "Migraine",           summary: "Mostly QEEG-guided protocols that down-train excess fast activity; uncontrolled case series." },
    { id: "cognition",  name: "Peak performance",   summary: "Upper-alpha and SMR training in healthy people to improve memory, mental rotation and performance." }
  ],

  findings: [
    /* ---------------- ADHD ---------------- */
    {
      id: "adhd-tbr-biomarker", condition: "adhd", type: "biomarker",
      sites: ["Cz"], bands: ["theta", "beta"], direction: "ratio", evidence: "contested",
      claim: "Elevated theta/beta ratio at Cz",
      detail: "Early studies reported large theta/beta ratio (TBR) elevations in ADHD, but effect sizes shrank in later samples. The ratio is not reliable as a stand-alone diagnostic test, though a subgroup does show it.",
      design: "Meta-analysis",
      cite: { authors: "Arns M, Conners CK, Kraemer HC", year: 2013, title: "A decade of EEG theta/beta ratio research in ADHD: a meta-analysis", journal: "Journal of Attention Disorders" }
    },
    {
      id: "adhd-arns-2009", condition: "adhd", type: "protocol",
      sites: ["Cz", "C3", "C4"], bands: ["theta", "smr", "beta"], direction: "ratio", evidence: "strong",
      claim: "Theta down / SMR–beta up reduces inattention and impulsivity",
      detail: "Pooled studies found large effects on inattention and impulsivity and a medium effect on hyperactivity. Most outcome ratings came from parents who knew the child was being treated.",
      design: "Meta-analysis",
      cite: { authors: "Arns M, de Ridder S, Strehl U, Breteler M, Coenen A", year: 2009, title: "Efficacy of neurofeedback treatment in ADHD: the effects on inattention, impulsivity and hyperactivity: a meta-analysis", journal: "Clinical EEG and Neuroscience" }
    },
    {
      id: "adhd-cortese-2016", condition: "adhd", type: "protocol",
      sites: ["Cz", "C3", "C4"], bands: ["theta", "smr", "beta"], direction: "ratio", evidence: "contested",
      claim: "Benefits shrink when raters are blinded",
      detail: "Across randomised trials, neurofeedback improved ADHD symptoms on probably-unblinded ratings, but effects were not significant on probably-blinded ratings. Standard, well-described protocols did better than ad-hoc ones.",
      design: "Meta-analysis of RCTs",
      cite: { authors: "Cortese S, Ferrin M, Brandeis D, et al.", year: 2016, title: "Neurofeedback for attention-deficit/hyperactivity disorder: meta-analysis of clinical and neuropsychological outcomes from randomized controlled trials", journal: "Journal of the American Academy of Child & Adolescent Psychiatry" }
    },
    {
      id: "adhd-ncg-2021", condition: "adhd", type: "protocol",
      sites: ["Cz"], bands: ["theta", "beta"], direction: "ratio", evidence: "contested",
      claim: "Double-blind TBR training matched sham",
      detail: "Children with ADHD and elevated TBR received theta/beta training or sham feedback. Both groups improved substantially, with no significant difference between them at end of treatment or at 13-month follow-up.",
      design: "Double-blind RCT",
      cite: { authors: "Neurofeedback Collaborative Group", year: 2021, title: "Double-blind placebo-controlled randomized clinical trial of neurofeedback for attention-deficit/hyperactivity disorder with 13-month follow-up", journal: "Journal of the American Academy of Child & Adolescent Psychiatry" }
    },
    {
      id: "adhd-scp-2006", condition: "adhd", type: "protocol",
      sites: ["Cz"], bands: ["scp"], direction: "up", evidence: "moderate",
      claim: "Slow cortical potential self-regulation",
      detail: "Children learned to produce negative and positive SCP shifts at the vertex. Behaviour, attention and IQ measures improved and gains were maintained at 6-month follow-up.",
      design: "Controlled trial",
      cite: { authors: "Strehl U, Leins U, Goth G, Klinger C, Hinterberger T, Birbaumer N", year: 2006, title: "Self-regulation of slow cortical potentials: a new treatment for children with attention-deficit/hyperactivity disorder", journal: "Pediatrics" }
    },
    {
      id: "adhd-vandoren-2019", condition: "adhd", type: "protocol",
      sites: ["Cz", "C3", "C4"], bands: ["theta", "smr", "scp"], direction: "ratio", evidence: "moderate",
      claim: "Effects persist at follow-up",
      detail: "Across studies with 2–12 month follow-up, neurofeedback effects were maintained or increased, whereas non-active control conditions did not show sustained gains.",
      design: "Meta-analysis",
      cite: { authors: "Van Doren J, Arns M, Heinrich H, Vollebregt MA, Strehl U, Loo SK", year: 2019, title: "Sustained effects of neurofeedback in ADHD: a systematic review and meta-analysis", journal: "European Child & Adolescent Psychiatry" }
    },

    /* ---------------- Depression ---------------- */
    {
      id: "dep-henriques-1991", condition: "depression", type: "biomarker",
      sites: ["F3", "F4"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      claim: "Relatively more left-frontal alpha (left hypoactivation)",
      detail: "Depressed participants showed greater alpha power, read as less cortical activity, over left versus right frontal sites. This finding is the basis of most asymmetry protocols.",
      design: "Case-control",
      cite: { authors: "Henriques JB, Davidson RJ", year: 1991, title: "Left frontal hypoactivation in depression", journal: "Journal of Abnormal Psychology" }
    },
    {
      id: "dep-vandervinne-2017", condition: "depression", type: "biomarker",
      sites: ["F3", "F4"], bands: ["alpha"], direction: "asymmetry", evidence: "contested",
      claim: "Frontal alpha asymmetry is not a reliable diagnostic marker",
      detail: "Pooling large datasets, frontal alpha asymmetry did not distinguish people with depression from controls. Some sex- and age-specific effects remained.",
      design: "Meta-analysis",
      cite: { authors: "van der Vinne N, Vollebregt MA, van Putten MJAM, Arns M", year: 2017, title: "Frontal alpha asymmetry as a diagnostic marker in depression: fact or fiction? A meta-analysis", journal: "NeuroImage: Clinical" }
    },
    {
      id: "dep-baehr-2001", condition: "depression", type: "protocol",
      sites: ["F3", "F4"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      claim: "Alpha asymmetry training (shift toward right-frontal alpha)",
      detail: "Patients trained to increase right relative to left frontal alpha. Mood improvements were reported to last 1–5 years after therapy in a small follow-up sample.",
      design: "Case series with follow-up",
      cite: { authors: "Baehr E, Rosenfeld JP, Baehr R", year: 2001, title: "Clinical use of an alpha asymmetry neurofeedback protocol in the treatment of mood disorders: follow-up study one to five years post therapy", journal: "Journal of Neurotherapy" }
    },
    {
      id: "dep-choi-2011", condition: "depression", type: "protocol",
      sites: ["F3", "F4"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      claim: "Asymmetry training beat placebo in a pilot RCT",
      detail: "A small randomised pilot found larger reductions in depressive symptoms and a shift in frontal asymmetry with real versus placebo feedback.",
      design: "Pilot RCT",
      cite: { authors: "Choi SW, Chi SE, Chung SY, Kim JW, Ahn CY, Kim HT", year: 2011, title: "Is alpha wave neurofeedback effective with randomized clinical trials in depression? A pilot study", journal: "Neuropsychobiology" }
    },
    {
      id: "dep-pizzagalli-2011", condition: "depression", type: "biomarker",
      sites: ["Fz"], bands: ["theta"], direction: "up", evidence: "preliminary",
      claim: "Higher frontal-midline (rostral ACC) theta predicts treatment response",
      detail: "Across studies, higher pre-treatment theta localised to the rostral anterior cingulate predicted better antidepressant response, across several treatment types.",
      design: "Review",
      cite: { authors: "Pizzagalli DA", year: 2011, title: "Frontocingulate dysfunction in depression: toward biomarkers of treatment response", journal: "Neuropsychopharmacology" }
    },

    /* ---------------- Anxiety ---------------- */
    {
      id: "anx-hammond-2005", condition: "anxiety", type: "protocol",
      sites: ["Pz", "O1", "O2"], bands: ["alpha", "theta", "hibeta"], direction: "up", evidence: "preliminary",
      claim: "Posterior alpha / alpha-theta uptraining, high beta inhibit",
      detail: "Review of clinical studies of alpha and alpha-theta training for generalised anxiety, phobias and OCD. Results were generally positive but came from small, mostly uncontrolled studies.",
      design: "Review",
      cite: { authors: "Hammond DC", year: 2005, title: "Neurofeedback with anxiety and affective disorders", journal: "Child and Adolescent Psychiatric Clinics of North America" }
    },

    /* ---------------- PTSD ---------------- */
    {
      id: "ptsd-peniston-1991", condition: "ptsd", type: "protocol",
      sites: ["O1"], bands: ["alpha", "theta"], direction: "up", evidence: "preliminary",
      claim: "Alpha-theta training for combat-related PTSD",
      detail: "Vietnam veterans receiving alpha-theta training alongside standard care showed fewer relapses and reduced medication use at follow-up compared with standard care alone.",
      design: "Controlled trial (small)",
      cite: { authors: "Peniston EG, Kulkosky PJ", year: 1991, title: "Alpha-theta brainwave neurofeedback for Vietnam veterans with combat-related post-traumatic stress disorder", journal: "Medical Psychotherapy" }
    },
    {
      id: "ptsd-vanderkolk-2016", condition: "ptsd", type: "protocol",
      sites: ["T4"], bands: ["alpha"], direction: "down", evidence: "moderate",
      claim: "Right temporal alpha down-training reduced chronic PTSD symptoms",
      detail: "Adults with chronic, treatment-resistant PTSD were randomised to 24 sessions or waitlist. The neurofeedback group had significantly larger drops in PTSD symptoms, and fewer met diagnostic criteria afterwards.",
      design: "RCT (waitlist control)",
      cite: { authors: "van der Kolk BA, Hodgdon H, Gapen M, et al.", year: 2016, title: "A randomized controlled study of neurofeedback for chronic PTSD", journal: "PLoS ONE" }
    },
    {
      id: "ptsd-kluetsch-2014", condition: "ptsd", type: "protocol",
      sites: ["Pz"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      claim: "A single alpha-desynchronising session shifts resting networks",
      detail: "One session of alpha down-regulation produced alpha rebound, changes in salience and default-mode connectivity on fMRI, and higher calmness ratings.",
      design: "Experimental (single session)",
      cite: { authors: "Kluetsch RC, Ros T, Théberge J, et al.", year: 2014, title: "Plastic modulation of PTSD resting-state networks and subjective wellbeing by EEG neurofeedback", journal: "Acta Psychiatrica Scandinavica" }
    },

    /* ---------------- Insomnia ---------------- */
    {
      id: "ins-hoedlmoser-2008", condition: "insomnia", type: "protocol",
      sites: ["C3", "Cz", "C4"], bands: ["smr"], direction: "up", evidence: "preliminary",
      claim: "SMR uptraining increases sleep spindles and shortens sleep onset",
      detail: "In healthy adults, SMR conditioning increased sleep spindle activity, shortened sleep latency and improved declarative learning compared with random-frequency training.",
      design: "Controlled study (healthy adults)",
      cite: { authors: "Hoedlmoser K, Pecherstorfer T, Gruber G, et al.", year: 2008, title: "Instrumental conditioning of human sensorimotor rhythm (12–15 Hz) and its impact on sleep as well as declarative learning", journal: "Sleep" }
    },
    {
      id: "ins-schabus-2017", condition: "insomnia", type: "protocol",
      sites: ["C3", "Cz", "C4"], bands: ["smr"], direction: "up", evidence: "contested",
      claim: "SMR training was no better than sham for primary insomnia",
      detail: "In a double-blind, placebo-controlled crossover design, patients reported better sleep after both real and sham neurofeedback, with no specific effect of real training on objective sleep.",
      design: "Double-blind sham-controlled",
      cite: { authors: "Schabus M, Griessenberger H, Gnjezda MT, Heib DPJ, Wislowska M, Hoedlmoser K", year: 2017, title: "Better than sham? A double-blind placebo-controlled neurofeedback study in primary insomnia", journal: "Brain" }
    },

    /* ---------------- Epilepsy ---------------- */
    {
      id: "epi-sterman-2000", condition: "epilepsy", type: "protocol",
      sites: ["C3", "Cz", "C4"], bands: ["smr", "theta"], direction: "up", evidence: "moderate",
      claim: "SMR uptraining with theta inhibit reduces seizures",
      detail: "Summary of controlled studies from the 1970s onward: most patients with poorly controlled epilepsy showed meaningful seizure reductions, with some lasting effects.",
      design: "Review of controlled studies",
      cite: { authors: "Sterman MB", year: 2000, title: "Basic concepts and clinical findings in the treatment of seizure disorders with EEG operant conditioning", journal: "Clinical Electroencephalography" }
    },
    {
      id: "epi-kotchoubey-2001", condition: "epilepsy", type: "protocol",
      sites: ["Cz"], bands: ["scp"], direction: "up", evidence: "moderate",
      claim: "SCP positivity training in drug-resistant epilepsy",
      detail: "Patients learned to produce positive shifts (reduced excitability). Seizure frequency fell, comparable to a medication-change control group.",
      design: "Controlled trial",
      cite: { authors: "Kotchoubey B, Strehl U, Uhlmann C, et al.", year: 2001, title: "Modification of slow cortical potentials in patients with refractory epilepsy: a controlled outcome study", journal: "Epilepsia" }
    },
    {
      id: "epi-tan-2009", condition: "epilepsy", type: "protocol",
      sites: ["C3", "Cz", "C4"], bands: ["smr", "scp"], direction: "up", evidence: "moderate",
      claim: "Most trained patients report fewer seizures",
      detail: "Across SMR and SCP studies in drug-resistant epilepsy, the large majority of patients reported reduced seizure frequency after training.",
      design: "Meta-analysis",
      cite: { authors: "Tan G, Thornby J, Hammond DC, et al.", year: 2009, title: "Meta-analysis of EEG biofeedback in treating epilepsy", journal: "Clinical EEG and Neuroscience" }
    },

    /* ---------------- Autism ---------------- */
    {
      id: "asd-pineda-2008", condition: "autism", type: "protocol",
      sites: ["C3", "C4"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      claim: "Mu rhythm (8–13 Hz, sensorimotor) training",
      detail: "Children with high-functioning autism trained mu over sensorimotor cortex. Small studies reported improved mu suppression during action observation and parent-rated behaviour.",
      design: "Small controlled studies",
      cite: { authors: "Pineda JA, Brang D, Hecht E, et al.", year: 2008, title: "Positive behavioral outcomes after mu rhythm neurofeedback training in children with autism spectrum disorder", journal: "Research in Autism Spectrum Disorders" }
    },
    {
      id: "asd-coben-2007", condition: "autism", type: "protocol",
      sites: [], bands: ["theta", "hibeta"], direction: "down", evidence: "preliminary",
      claim: "QEEG-guided connectivity training",
      detail: "Protocols individualised to each child's QEEG hyper- and hypo-connectivity pattern. Reported improvements in parent ratings versus a waitlist group.",
      design: "Controlled (non-randomised)",
      cite: { authors: "Coben R, Padolsky I", year: 2007, title: "Assessment-guided neurofeedback for autistic spectrum disorder", journal: "Journal of Neurotherapy" }
    },

    /* ---------------- Substance use ---------------- */
    {
      id: "sud-peniston-1989", condition: "sud", type: "protocol",
      sites: ["O1"], bands: ["alpha", "theta"], direction: "up", evidence: "preliminary",
      claim: "Alpha-theta training for alcohol use disorder",
      detail: "Inpatients with alcoholism receiving alpha-theta training showed lower depression scores and better abstinence at follow-up than standard treatment alone.",
      design: "Controlled trial (small)",
      cite: { authors: "Peniston EG, Kulkosky PJ", year: 1989, title: "Alpha-theta brainwave training and beta-endorphin levels in alcoholics", journal: "Alcoholism: Clinical and Experimental Research" }
    },
    {
      id: "sud-scott-2005", condition: "sud", type: "protocol",
      sites: ["Cz", "Pz"], bands: ["smr", "beta", "alpha", "theta"], direction: "up", evidence: "moderate",
      claim: "Beta/SMR then alpha-theta (Scott-Peniston) improves retention",
      detail: "In a mixed substance-use inpatient program, adding attention-focused beta/SMR training followed by alpha-theta training improved treatment retention, attention and abstinence at 12 months.",
      design: "RCT",
      cite: { authors: "Scott WC, Kaiser D, Othmer S, Sideroff SI", year: 2005, title: "Effects of an EEG biofeedback protocol on a mixed substance abusing population", journal: "American Journal of Drug and Alcohol Abuse" }
    },

    /* ---------------- Migraine ---------------- */
    {
      id: "mig-walker-2011", condition: "migraine", type: "protocol",
      sites: [], bands: ["hibeta"], direction: "down", evidence: "preliminary",
      claim: "QEEG-guided down-training of excess fast activity",
      detail: "Patients whose QEEG showed excess high-frequency activity received individualised down-training. Most reported large reductions in headache frequency compared with those who stayed on medication.",
      design: "Non-randomised comparison",
      cite: { authors: "Walker JE", year: 2011, title: "QEEG-guided neurofeedback for recurrent migraine headaches", journal: "Clinical EEG and Neuroscience" }
    },

    /* ---------------- Peak performance ---------------- */
    {
      id: "cog-hanslmayr-2005", condition: "cognition", type: "protocol",
      sites: ["Pz"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      claim: "Upper-alpha uptraining improves mental rotation",
      detail: "Participants who succeeded in raising individual upper-alpha power improved on a mental rotation task; those who did not learn the control did not improve.",
      design: "Controlled study (healthy adults)",
      cite: { authors: "Hanslmayr S, Sauseng P, Doppelmayr M, Schabus M, Klimesch W", year: 2005, title: "Increasing individual upper alpha power by neurofeedback improves cognitive performance in human subjects", journal: "Applied Psychophysiology and Biofeedback" }
    },
    {
      id: "cog-zoefel-2011", condition: "cognition", type: "protocol",
      sites: ["P3", "Pz", "P4", "O1", "O2"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      claim: "Five sessions of upper-alpha training boosts mental rotation",
      detail: "Most trained participants increased upper-alpha amplitude and showed larger gains in mental rotation than a non-trained control group.",
      design: "Controlled study (healthy adults)",
      cite: { authors: "Zoefel B, Huster RJ, Herrmann CS", year: 2011, title: "Neurofeedback training of the upper alpha frequency band in EEG improves cognitive performance", journal: "NeuroImage" }
    },
    {
      id: "cog-gruzelier-2014", condition: "cognition", type: "protocol",
      sites: ["Cz", "C4", "Pz"], bands: ["smr", "alpha", "theta"], direction: "up", evidence: "moderate",
      claim: "SMR and alpha-theta for attention, memory and artistic performance",
      detail: "Review of performance studies: SMR training linked to better attention and memory; alpha-theta training linked to improved music and dance performance in conservatoire students.",
      design: "Review",
      cite: { authors: "Gruzelier JH", year: 2014, title: "EEG-neurofeedback for optimising performance. I: A review of cognitive and affective outcome in healthy participants", journal: "Neuroscience & Biobehavioral Reviews" }
    }
  ],

  methodology: [
    { authors: "Ros T, Enriquez-Geppert S, Zotev V, et al.", year: 2020, title: "Consensus on the reporting and experimental design of clinical and cognitive-behavioural neurofeedback studies (CRED-nf checklist)", journal: "Brain", note: "Checklist for judging study quality." },
    { authors: "Thibault RT, Raz A", year: 2017, title: "The psychology of neurofeedback: clinical intervention even if applied placebo", journal: "American Psychologist", note: "Argues much of the benefit may be non-specific." },
    { authors: "Sitaram R, Ros T, Stoeckel L, et al.", year: 2017, title: "Closed-loop brain training: the science of neurofeedback", journal: "Nature Reviews Neuroscience", note: "Mechanisms overview." }
  ]
};

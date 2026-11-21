/*
 * EEG Disorder Atlas — dataset.
 *
 * Edit this file to add or correct research. Schema is documented in README.md.
 * Every entry was compiled from the published literature; verify each citation
 * against the original paper (use the PubMed link in the app) before relying on it.
 *
 * evidence: "strong" | "moderate" | "preliminary" | "contested"
 * SCOPE: EEG markers are resting-state only (eyes open or eyes closed, awake). Task, evoked-response
 *        and sleep EEG studies are not included; log them in `excluded` with the reason.
 *
 * type:     "biomarker" (a resting-state EEG difference observed in the condition)
 *           "protocol"  (a neurofeedback training protocol tested as treatment)
 * direction:"up" | "down" | "ratio" | "asymmetry"  (summary arrow for the card)
 * changes:  { band: "up" | "down" | "asymmetry" | "regulate" | "mixed" }
 *           biomarker = how the band differs in the condition; protocol = which way training pushes it.
 * symptoms: ids from `symptoms`. biomarker = core symptoms of the studied group; protocol = outcomes measured.
 * metrics:  { design: 1-5 (5 meta-analysis, 4 RCT, 3 controlled study or cohort, 2 case-control or narrative review,
 *           1 uncontrolled / pilot / single session), control: "sham" | "active" | "usual" (waitlist or usual care) | "none" | null,
 *           blinded: true | false | null, n: participants or null, k: studies pooled or null }. null = not recorded yet.
 * sites:    10-20 labels (old names T3/T4/T5/T6). [] = individualised / QEEG-guided.
 */
window.NF_DATA = {
  bands: [
    { id: "scp", name: "SCP", range: "< 1 Hz", note: "Slow cortical potentials: shifts in cortical excitability" },
    { id: "delta", name: "Delta", range: "1–4 Hz", note: "Deep sleep; excess when awake can mark injury or under-arousal" },
    { id: "theta", name: "Theta", range: "4–8 Hz", note: "Drowsiness, memory, internal attention" },
    { id: "alpha", name: "Alpha", range: "8–12 Hz", note: "Relaxed wakefulness, idling, inhibition" },
    { id: "smr", name: "SMR", range: "12–15 Hz", note: "Sensorimotor rhythm over central strip: still, alert body" },
    { id: "beta", name: "Beta", range: "15–20 Hz", note: "Active, focused thinking" },
    { id: "hibeta", name: "High beta", range: "20–30 Hz", note: "Arousal, rumination, anxiety" },
    { id: "gamma", name: "Gamma", range: "30+ Hz", note: "Binding, high-level processing" }
  ],

  conditions: [
    { id: "alzheimers", name: "Alzheimer's", summary: "One of the most consistent EEG pictures in medicine: slowing. Delta and theta rise, posterior alpha and beta fall, and the alpha peak frequency drops as the disease progresses." },
    { id: "adhd", name: "ADHD", summary: "An elevated theta/beta ratio at the vertex was long proposed as a marker, but it holds only for a subgroup. Neurofeedback on the same bands helps on unblinded ratings; blinded trials are much less convincing." },
    { id: "schizophrenia", name: "Schizophrenia", summary: "Resting EEG often shows excess slow activity (delta and theta) and reduced alpha, but these changes are not specific enough to diagnose schizophrenia. The best-known gamma findings come from evoked (task) recordings and are not included here." },
    { id: "depression", name: "Depression", summary: "Frontal alpha asymmetry (F3/F4) is the classic proposed marker, but pooled data do not support it diagnostically. Frontal-midline theta may predict who responds to treatment." },
    { id: "parkinsons", name: "Parkinson's", summary: "Resting EEG slows in Parkinson's disease, and a lower dominant posterior frequency predicts later dementia." },
    { id: "tbi", name: "Brain injury (TBI)", summary: "Focal or diffuse slowing and reduced alpha after head injury. Group differences are real, but qEEG is not reliable for diagnosing mild TBI in an individual." },
    { id: "insomnia", name: "Insomnia", summary: "The hyperarousal model: in resting wakefulness, people with insomnia show more beta, theta and gamma power. SMR neurofeedback was not better than sham in a blinded trial." },
    { id: "autism", name: "Autism", summary: "Earlier reviews described a U-shaped profile (excess slow and fast power). A 2023 meta-analysis of 41 studies found something narrower: lower relative alpha and higher gamma at rest, with no overall change in delta, theta or beta." },
    { id: "sud", name: "Alcohol & substance use", summary: "Resting beta is elevated in people with alcohol dependence and their relatives, suggesting a trait of cortical hyperexcitability. Alpha-theta neurofeedback has a long clinical history." },
    { id: "epilepsy", name: "Epilepsy", summary: "Diagnosis rests on epileptiform discharges rather than band power. SMR and slow-cortical-potential training reduced seizures in drug-resistant patients." },
    { id: "ptsd", name: "PTSD", summary: "Altered alpha has been reported but findings are inconsistent. Treatment studies centre on alpha and alpha-theta neurofeedback." },
    { id: "anxiety", name: "Anxiety", summary: "Clinical reports favour posterior alpha and high-beta inhibit protocols; marker research is thin." },
    { id: "migraine", name: "Migraine", summary: "Between attacks, resting theta power is higher in people with migraine (2024 meta-analysis), but EEG features did not track severity. Neurofeedback evidence comes from uncontrolled case series." },
    { id: "cognition", name: "Healthy cognition", summary: "Upper-alpha and SMR activity relate to memory and mental rotation in healthy people, and training them can improve performance." }
  ],

  symptoms: [
    { id: "inattention", name: "Inattention / poor focus" },
    { id: "impulsivity", name: "Impulsivity" },
    { id: "hyperactivity", name: "Hyperactivity / restlessness" },
    { id: "executive", name: "Executive / planning problems" },
    { id: "memory", name: "Memory problems" },
    { id: "cogdecline", name: "Cognitive decline / slowed thinking" },
    { id: "lowmood", name: "Low mood" },
    { id: "anxiety", name: "Anxiety / worry" },
    { id: "hyperarousal", name: "Hyperarousal / tension" },
    { id: "intrusions", name: "Intrusive memories / flashbacks" },
    { id: "sleep", name: "Trouble falling or staying asleep" },
    { id: "psychosis", name: "Hallucinations / psychosis" },
    { id: "social", name: "Social communication difficulties" },
    { id: "craving", name: "Craving / relapse" },
    { id: "seizures", name: "Seizures" },
    { id: "headache", name: "Headache / migraine" },
    { id: "postconcussion", name: "Post-concussion symptoms" },
    { id: "motor", name: "Motor symptoms (tremor, stiffness)" }
  ],

  findings: [
    /* ---------------- Alzheimer's ---------------- */
    {
      id: "ad-jeong-2004", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["P3","Pz","P4","O1","O2","T5","T6"], bands: ["delta","theta","alpha","beta"], direction: "up", evidence: "strong",
      changes: { delta: "up", theta: "up", alpha: "down", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "EEG slowing: more delta/theta, less posterior alpha and beta",
      detail: "Review of decades of studies: Alzheimer's disease shifts the power spectrum toward slow frequencies and reduces coherence between regions. Slowing grows with disease severity.",
      design: "Review",
      cite: { authors: "Jeong J", year: 2004, title: "EEG dynamics in patients with Alzheimer's disease", journal: "Clinical Neurophysiology" }
    },
    {
      id: "ad-babiloni-2020", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["P3","Pz","P4","O1","O2"], bands: ["alpha","delta"], direction: "down", evidence: "strong",
      changes: { alpha: "down", delta: "up" }, symptoms: ["memory","cogdecline"],
      claim: "Posterior resting alpha falls and delta rises from MCI to dementia",
      detail: "Expert review: reduced posterior alpha sources and increased delta track progression from mild cognitive impairment to Alzheimer's dementia and relate to cognitive decline.",
      design: "Expert review",
      cite: { authors: "Babiloni C, Blinowska K, Bonanni L, et al.", year: 2020, title: "What electrophysiology tells us about Alzheimer's disease: a window into the synchronization and connectivity of brain neurons", journal: "Neurobiology of Aging" }
    },
    {
      id: "ad-jelic-2000", condition: "alzheimers", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: 27, k: null },
      sites: ["T3","T5","O1","T4","T6","O2"], bands: ["theta","alpha","beta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", beta: "down", alpha: "down" }, symptoms: ["memory","cogdecline"],
      claim: "Temporal theta rise and beta fall as MCI progresses to Alzheimer's",
      detail: "27 people with MCI were followed for about 21 months. Those who progressed to Alzheimer's developed more relative theta and less beta at temporal and temporo-occipital sites. Baseline alpha, theta and mean frequency at T5-O1 classified 85% correctly, in a small sample.",
      design: "Prospective cohort (small)",
      cite: { authors: "Jelic V, Johansson SE, Almkvist O, et al.", year: 2000, title: "Quantitative electroencephalography in mild cognitive impairment: longitudinal changes and possible prediction of Alzheimer's disease", journal: "Neurobiology of Aging" }
    },
    /* ---------------- Schizophrenia ---------------- */
    {
      id: "scz-boutros-2008", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Fz","F3","F4","Cz"], bands: ["delta","theta","alpha"], direction: "up", evidence: "moderate",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["psychosis"],
      claim: "Resting slow-wave excess, reduced alpha",
      detail: "Review of resting spectral studies: increased delta and theta, and often reduced alpha, are common in schizophrenia, but they are not specific enough to work as a diagnostic test.",
      design: "Review",
      cite: { authors: "Boutros NN, Arfken C, Galderisi S, et al.", year: 2008, title: "The status of spectral EEG abnormality as a diagnostic test for schizophrenia", journal: "Schizophrenia Research" }
    },
    /* ---------------- Parkinson's ---------------- */
    {
      id: "pd-klassen-2011", condition: "parkinsons", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: null, k: null },
      sites: ["O1","O2","P3","P4"], bands: ["alpha","theta"], direction: "down", evidence: "moderate",
      changes: { alpha: "down", theta: "up" }, symptoms: ["cogdecline","motor"],
      claim: "Lower dominant posterior frequency predicts dementia",
      detail: "In a prospective cohort of people with Parkinson's disease, slower background rhythm and more theta at baseline strongly predicted who later developed dementia.",
      design: "Prospective cohort",
      cite: { authors: "Klassen BT, Hentz JG, Shill HA, et al.", year: 2011, title: "Quantitative EEG as a predictive biomarker for Parkinson disease dementia", journal: "Neurology" }
    },
    /* ---------------- Brain injury (TBI) ---------------- */
    {
      id: "tbi-thatcher-1989", condition: "tbi", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["F3","F4","Fz","T3","T4"], bands: ["theta","alpha","beta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", alpha: "down", beta: "mixed" }, symptoms: ["postconcussion"],
      claim: "Discriminant qEEG features separate mild TBI from controls",
      detail: "Frontal and temporal coherence and power features, including increased theta and reduced alpha, classified mild head-injury patients versus controls in this sample.",
      design: "Case-control",
      cite: { authors: "Thatcher RW, Walker RA, Gerson I, Geisler FH", year: 1989, title: "EEG discriminant analyses of mild head trauma", journal: "Electroencephalography and Clinical Neurophysiology" }
    },
    {
      id: "tbi-nuwer-2005", condition: "tbi", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["delta","theta","alpha"], direction: "up", evidence: "contested",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["postconcussion","inattention","memory"],
      claim: "Slowing after TBI is real but nonspecific",
      detail: "Review: acute slowing and reduced alpha are common after head injury and usually resolve within months. qEEG findings are not specific enough to diagnose mild TBI in an individual.",
      design: "Review",
      cite: { authors: "Nuwer MR, Hovda DA, Schrader LM, Vespa PM", year: 2005, title: "Routine and quantitative EEG in mild traumatic brain injury", journal: "Clinical Neurophysiology" }
    },
    /* ---------------- Insomnia ---------------- */
    /* ---------------- Autism ---------------- */
    {
      id: "asd-wang-2013", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["F3","F4","C3","C4","P3","P4","O1","O2"], bands: ["delta","theta","alpha","beta","gamma"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down", beta: "up", gamma: "up" }, symptoms: ["social"],
      claim: "U-shaped profile: excess slow and fast power, reduced alpha",
      detail: "Review of resting-state studies: excess delta/theta and beta/gamma with reduced alpha, plus altered connectivity. Findings vary widely across ages and methods.",
      design: "Review",
      cite: { authors: "Wang J, Barstein J, Ethridge LE, Mosconi MW, Takarae Y, Sweeney JA", year: 2013, title: "Resting state EEG abnormalities in autism spectrum disorders", journal: "Journal of Neurodevelopmental Disorders" }
    },
    /* ---------------- Alcohol & substance use ---------------- */
    {
      id: "sud-rangaswamy-2002", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Cz","C3","C4","Fz"], bands: ["beta","hibeta"], direction: "up", evidence: "moderate",
      changes: { beta: "up", hibeta: "up" }, symptoms: ["craving"],
      claim: "Elevated resting beta in alcohol dependence",
      detail: "Alcohol-dependent participants had increased resting beta power across the scalp, most marked centrally. Similar increases in their relatives suggest a heritable trait of hyperexcitability.",
      design: "Case-control (COGA)",
      cite: { authors: "Rangaswamy M, Porjesz B, Chorlian DB, et al.", year: 2002, title: "Beta power in the EEG of alcoholics", journal: "Biological Psychiatry" }
    },
    /* ---------------- ADHD ---------------- */
    {
      id: "adhd-tbr-biomarker", condition: "adhd", type: "biomarker",
      metrics: { design: 5, control: null, blinded: null, n: null, k: null },
      sites: ["Cz"], bands: ["theta","beta"], direction: "ratio", evidence: "contested",
      changes: { theta: "up", beta: "down" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Elevated theta/beta ratio at Cz",
      detail: "Early studies reported large theta/beta ratio (TBR) elevations in ADHD, but effect sizes shrank in later samples. The ratio is not reliable as a stand-alone diagnostic test, though a subgroup does show it.",
      design: "Meta-analysis",
      cite: { authors: "Arns M, Conners CK, Kraemer HC", year: 2013, title: "A decade of EEG theta/beta ratio research in ADHD: a meta-analysis", journal: "Journal of Attention Disorders" }
    },
    {
      id: "adhd-arns-2009", condition: "adhd", type: "protocol",
      metrics: { design: 5, control: null, blinded: null, n: null, k: null },
      sites: ["Cz","C3","C4"], bands: ["theta","smr","beta"], direction: "ratio", evidence: "strong",
      changes: { theta: "down", smr: "up", beta: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Theta down / SMR–beta up reduces inattention and impulsivity",
      detail: "Pooled studies found large effects on inattention and impulsivity and a medium effect on hyperactivity. Most outcome ratings came from parents who knew the child was being treated.",
      design: "Meta-analysis",
      cite: { authors: "Arns M, de Ridder S, Strehl U, Breteler M, Coenen A", year: 2009, title: "Efficacy of neurofeedback treatment in ADHD: the effects on inattention, impulsivity and hyperactivity: a meta-analysis", journal: "Clinical EEG and Neuroscience" }
    },
    {
      id: "adhd-cortese-2016", condition: "adhd", type: "protocol",
      metrics: { design: 5, control: null, blinded: true, n: null, k: null },
      sites: ["Cz","C3","C4"], bands: ["theta","smr","beta"], direction: "ratio", evidence: "contested",
      changes: { theta: "down", smr: "up", beta: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Benefits shrink when raters are blinded",
      detail: "Across randomised trials, neurofeedback improved ADHD symptoms on probably-unblinded ratings, but effects were not significant on probably-blinded ratings. Standard, well-described protocols did better than ad-hoc ones.",
      design: "Meta-analysis of RCTs",
      cite: { authors: "Cortese S, Ferrin M, Brandeis D, et al.", year: 2016, title: "Neurofeedback for attention-deficit/hyperactivity disorder: meta-analysis of clinical and neuropsychological outcomes from randomized controlled trials", journal: "Journal of the American Academy of Child & Adolescent Psychiatry" }
    },
    {
      id: "adhd-ncg-2021", condition: "adhd", type: "protocol",
      metrics: { design: 4, control: "sham", blinded: true, n: null, k: null },
      sites: ["Cz"], bands: ["theta","beta"], direction: "ratio", evidence: "contested",
      changes: { theta: "down", beta: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Double-blind TBR training matched sham",
      detail: "Children with ADHD and elevated TBR received theta/beta training or sham feedback. Both groups improved substantially, with no significant difference between them at end of treatment or at 13-month follow-up.",
      design: "Double-blind RCT",
      cite: { authors: "Neurofeedback Collaborative Group", year: 2021, title: "Double-blind placebo-controlled randomized clinical trial of neurofeedback for attention-deficit/hyperactivity disorder with 13-month follow-up", journal: "Journal of the American Academy of Child & Adolescent Psychiatry" }
    },
    {
      id: "adhd-scp-2006", condition: "adhd", type: "protocol",
      metrics: { design: 3, control: null, blinded: null, n: null, k: null },
      sites: ["Cz"], bands: ["scp"], direction: "up", evidence: "moderate",
      changes: { scp: "regulate" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Slow cortical potential self-regulation",
      detail: "Children learned to produce negative and positive SCP shifts at the vertex. Behaviour, attention and IQ measures improved and gains were maintained at 6-month follow-up.",
      design: "Controlled trial",
      cite: { authors: "Strehl U, Leins U, Goth G, Klinger C, Hinterberger T, Birbaumer N", year: 2006, title: "Self-regulation of slow cortical potentials: a new treatment for children with attention-deficit/hyperactivity disorder", journal: "Pediatrics" }
    },
    {
      id: "adhd-vandoren-2019", condition: "adhd", type: "protocol",
      metrics: { design: 5, control: null, blinded: null, n: null, k: null },
      sites: ["Cz","C3","C4"], bands: ["theta","smr","scp"], direction: "ratio", evidence: "moderate",
      changes: { theta: "down", smr: "up", scp: "regulate" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Effects persist at follow-up",
      detail: "Across studies with 2–12 month follow-up, neurofeedback effects were maintained or increased, whereas non-active control conditions did not show sustained gains.",
      design: "Meta-analysis",
      cite: { authors: "Van Doren J, Arns M, Heinrich H, Vollebregt MA, Strehl U, Loo SK", year: 2019, title: "Sustained effects of neurofeedback in ADHD: a systematic review and meta-analysis", journal: "European Child & Adolescent Psychiatry" }
    },
    {
      id: "adhd-barry-2003", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["F3","Fz","F4","C3","Cz","C4"], bands: ["theta","alpha","beta"], direction: "up", evidence: "moderate",
      changes: { theta: "up", alpha: "down", beta: "down" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Elevated relative theta, reduced alpha and beta at rest",
      detail: "Review of qualitative and quantitative EEG studies: raised relative theta, lower relative alpha and beta, and raised theta/alpha and theta/beta ratios were the most reliable resting findings in ADHD. It also described distinct EEG profiles that cut across diagnostic subtypes. Site emphasis differs between studies; frontal and central sites are the usual focus.",
      design: "Review",
      cite: { authors: "Barry RJ, Clarke AR, Johnstone SJ", year: 2003, title: "A review of electrophysiology in attention-deficit/hyperactivity disorder: I. Qualitative and quantitative electroencephalography", journal: "Clinical Neurophysiology" }
    },
    {
      id: "adhd-snyder-2006", condition: "adhd", type: "biomarker",
      metrics: { design: 5, control: null, blinded: null, n: null, k: null },
      sites: ["Cz"], bands: ["theta","beta"], direction: "ratio", evidence: "moderate",
      changes: { theta: "up", beta: "down" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Meta-analysis: raised theta/beta ratio is a common ADHD trait",
      detail: "Pooled DSM-IV studies supported an increased theta/beta ratio in ADHD versus controls, with very large effect sizes. A later meta-analysis (Arns et al., 2013) found much smaller effects in newer samples, so treat this as a group trend, not a test.",
      design: "Meta-analysis",
      cite: { authors: "Snyder SM, Hall JR", year: 2006, title: "A meta-analysis of quantitative EEG power associated with attention-deficit hyperactivity disorder", journal: "Journal of Clinical Neurophysiology" }
    },
    {
      id: "adhd-arns-2012", condition: "adhd", type: "protocol",
      metrics: { design: 1, control: "none", blinded: false, n: 21, k: null },
      sites: ["Fz","Cz"], bands: ["theta","beta","smr"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "down", beta: "up", smr: "up" }, symptoms: ["inattention","impulsivity","hyperactivity","lowmood"],
      claim: "QEEG-informed protocols: excess fronto-central theta gets theta/beta training",
      detail: "21 patients were assigned a protocol from their own QEEG: those with excess fronto-central theta received theta/beta training, others SMR training. Inattention, hyperactivity/impulsivity and comorbid depressive symptoms improved. Open-label, no control group; exact electrode placements per protocol are in the paper.",
      design: "Open-label pilot",
      cite: { authors: "Arns M, Drinkenburg W, Kenemans JL", year: 2012, title: "The effects of QEEG-informed neurofeedback in ADHD: an open-label pilot study", journal: "Applied Psychophysiology and Biofeedback" }
    },
    {
      id: "adhd-krepel-2020", condition: "adhd", type: "protocol",
      metrics: { design: 2, control: "none", blinded: false, n: null, k: null },
      sites: ["Fz","Cz"], bands: ["theta","beta","smr"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "down", beta: "up", smr: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Multicentre replication of QEEG-informed neurofeedback",
      detail: "A larger multicentre effectiveness study assigning standard protocols from each patient's QEEG reported remission in about 55% of patients. There was no control group, so non-specific effects cannot be ruled out.",
      design: "Open-label multicentre effectiveness trial",
      cite: { authors: "Krepel N, Egtberts T, Sack AT, Heinrich H, Ryan M, Arns M", year: 2020, title: "A multicenter effectiveness trial of QEEG-informed neurofeedback in ADHD: Replication and treatment prediction", journal: "NeuroImage: Clinical" }
    },
    /* ---------------- Depression ---------------- */
    {
      id: "dep-henriques-1991", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["F3","F4"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Relatively more left-frontal alpha (left hypoactivation)",
      detail: "Depressed participants showed greater alpha power, read as less cortical activity, over left versus right frontal sites. This finding is the basis of most asymmetry protocols.",
      design: "Case-control",
      cite: { authors: "Henriques JB, Davidson RJ", year: 1991, title: "Left frontal hypoactivation in depression", journal: "Journal of Abnormal Psychology" }
    },
    {
      id: "dep-vandervinne-2017", condition: "depression", type: "biomarker",
      metrics: { design: 5, control: null, blinded: null, n: null, k: null },
      sites: ["F3","F4"], bands: ["alpha"], direction: "asymmetry", evidence: "contested",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Frontal alpha asymmetry is not a reliable diagnostic marker",
      detail: "Pooling large datasets, frontal alpha asymmetry did not distinguish people with depression from controls. Some sex- and age-specific effects remained.",
      design: "Meta-analysis",
      cite: { authors: "van der Vinne N, Vollebregt MA, van Putten MJAM, Arns M", year: 2017, title: "Frontal alpha asymmetry as a diagnostic marker in depression: fact or fiction? A meta-analysis", journal: "NeuroImage: Clinical" }
    },
    {
      id: "dep-baehr-2001", condition: "depression", type: "protocol",
      metrics: { design: 1, control: "none", blinded: false, n: null, k: null },
      sites: ["F3","F4"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Alpha asymmetry training (shift toward right-frontal alpha)",
      detail: "Patients trained to increase right relative to left frontal alpha. Mood improvements were reported to last 1–5 years after therapy in a small follow-up sample.",
      design: "Case series with follow-up",
      cite: { authors: "Baehr E, Rosenfeld JP, Baehr R", year: 2001, title: "Clinical use of an alpha asymmetry neurofeedback protocol in the treatment of mood disorders: follow-up study one to five years post therapy", journal: "Journal of Neurotherapy" }
    },
    {
      id: "dep-choi-2011", condition: "depression", type: "protocol",
      metrics: { design: 4, control: "sham", blinded: null, n: null, k: null },
      sites: ["F3","F4"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Asymmetry training beat placebo in a pilot RCT",
      detail: "A small randomised pilot found larger reductions in depressive symptoms and a shift in frontal asymmetry with real versus placebo feedback.",
      design: "Pilot RCT",
      cite: { authors: "Choi SW, Chi SE, Chung SY, Kim JW, Ahn CY, Kim HT", year: 2011, title: "Is alpha wave neurofeedback effective with randomized clinical trials in depression? A pilot study", journal: "Neuropsychobiology" }
    },
    {
      id: "dep-pizzagalli-2011", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Fz"], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["lowmood"],
      claim: "Higher frontal-midline (rostral ACC) theta predicts treatment response",
      detail: "Across studies, higher pre-treatment theta localised to the rostral anterior cingulate predicted better antidepressant response, across several treatment types.",
      design: "Review",
      cite: { authors: "Pizzagalli DA", year: 2011, title: "Frontocingulate dysfunction in depression: toward biomarkers of treatment response", journal: "Neuropsychopharmacology" }
    },
    {
      id: "dep-arns-2015", condition: "depression", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: 1344, k: null },
      sites: ["F3","Fz","F4"], bands: ["theta"], direction: "up", evidence: "contested",
      changes: { theta: "up" }, symptoms: ["lowmood"],
      claim: "Frontal theta and antidepressant response: conflicting results",
      detail: "Earlier work linked raised rACC theta to antidepressant response and raised frontal theta to non-response. In iSPOT-D (1008 patients randomised to escitalopram, sertraline or venlafaxine), the expected rACC link did not hold: less pretreatment rACC theta went with improvement. Frontal theta is not a reliable predictor on its own.",
      design: "Randomised multicentre trial (biomarker analysis)",
      cite: { authors: "Arns M, Etkin A, Hegerl U, et al.", year: 2015, title: "Frontal and rostral anterior cingulate (rACC) theta EEG in depression: implications for treatment outcome?", journal: "European Neuropsychopharmacology" }
    },
    /* ---------------- Anxiety ---------------- */
    {
      id: "anx-hammond-2005", condition: "anxiety", type: "protocol",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Pz","O1","O2"], bands: ["alpha","theta","hibeta"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up", theta: "up", hibeta: "down" }, symptoms: ["anxiety","hyperarousal"],
      claim: "Posterior alpha / alpha-theta uptraining, high beta inhibit",
      detail: "Review of clinical studies of alpha and alpha-theta training for generalised anxiety, phobias and OCD. Results were generally positive but came from small, mostly uncontrolled studies.",
      design: "Review",
      cite: { authors: "Hammond DC", year: 2005, title: "Neurofeedback with anxiety and affective disorders", journal: "Child and Adolescent Psychiatric Clinics of North America" }
    },
    /* ---------------- PTSD ---------------- */
    {
      id: "ptsd-peniston-1991", condition: "ptsd", type: "protocol",
      metrics: { design: 3, control: "usual", blinded: null, n: null, k: null },
      sites: ["O1"], bands: ["alpha","theta"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up", theta: "up" }, symptoms: ["intrusions","anxiety","hyperarousal"],
      claim: "Alpha-theta training for combat-related PTSD",
      detail: "Vietnam veterans receiving alpha-theta training alongside standard care showed fewer relapses and reduced medication use at follow-up compared with standard care alone.",
      design: "Controlled trial (small)",
      cite: { authors: "Peniston EG, Kulkosky PJ", year: 1991, title: "Alpha-theta brainwave neurofeedback for Vietnam veterans with combat-related post-traumatic stress disorder", journal: "Medical Psychotherapy" }
    },
    {
      id: "ptsd-vanderkolk-2016", condition: "ptsd", type: "protocol",
      metrics: { design: 4, control: "usual", blinded: null, n: null, k: null },
      sites: ["T4"], bands: ["alpha"], direction: "down", evidence: "moderate",
      changes: { alpha: "down" }, symptoms: ["intrusions","hyperarousal"],
      claim: "Right temporal alpha down-training reduced chronic PTSD symptoms",
      detail: "Adults with chronic, treatment-resistant PTSD were randomised to 24 sessions or waitlist. The neurofeedback group had significantly larger drops in PTSD symptoms, and fewer met diagnostic criteria afterwards.",
      design: "RCT (waitlist control)",
      cite: { authors: "van der Kolk BA, Hodgdon H, Gapen M, et al.", year: 2016, title: "A randomized controlled study of neurofeedback for chronic PTSD", journal: "PLoS ONE" }
    },
    {
      id: "ptsd-kluetsch-2014", condition: "ptsd", type: "protocol",
      metrics: { design: 1, control: null, blinded: null, n: null, k: null },
      sites: ["Pz"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["hyperarousal"],
      claim: "A single alpha-desynchronising session shifts resting networks",
      detail: "One session of alpha down-regulation produced alpha rebound, changes in salience and default-mode connectivity on fMRI, and higher calmness ratings.",
      design: "Experimental (single session)",
      cite: { authors: "Kluetsch RC, Ros T, Théberge J, et al.", year: 2014, title: "Plastic modulation of PTSD resting-state networks and subjective wellbeing by EEG neurofeedback", journal: "Acta Psychiatrica Scandinavica" }
    },
    /* ---------------- Insomnia ---------------- */
    {
      id: "ins-hoedlmoser-2008", condition: "insomnia", type: "protocol",
      metrics: { design: 3, control: "active", blinded: null, n: null, k: null },
      sites: ["C3","Cz","C4"], bands: ["smr"], direction: "up", evidence: "preliminary",
      changes: { smr: "up" }, symptoms: ["sleep","memory"],
      claim: "SMR uptraining increases sleep spindles and shortens sleep onset",
      detail: "In healthy adults, SMR conditioning increased sleep spindle activity, shortened sleep latency and improved declarative learning compared with random-frequency training.",
      design: "Controlled study (healthy adults)",
      cite: { authors: "Hoedlmoser K, Pecherstorfer T, Gruber G, et al.", year: 2008, title: "Instrumental conditioning of human sensorimotor rhythm (12–15 Hz) and its impact on sleep as well as declarative learning", journal: "Sleep" }
    },
    {
      id: "ins-schabus-2017", condition: "insomnia", type: "protocol",
      metrics: { design: 4, control: "sham", blinded: true, n: null, k: null },
      sites: ["C3","Cz","C4"], bands: ["smr"], direction: "up", evidence: "contested",
      changes: { smr: "up" }, symptoms: ["sleep"],
      claim: "SMR training was no better than sham for primary insomnia",
      detail: "In a double-blind, placebo-controlled crossover design, patients reported better sleep after both real and sham neurofeedback, with no specific effect of real training on objective sleep.",
      design: "Double-blind sham-controlled",
      cite: { authors: "Schabus M, Griessenberger H, Gnjezda MT, Heib DPJ, Wislowska M, Hoedlmoser K", year: 2017, title: "Better than sham? A double-blind placebo-controlled neurofeedback study in primary insomnia", journal: "Brain" }
    },
    {
      id: "ins-zhao-2021", condition: "insomnia", type: "biomarker",
      metrics: { design: 5, control: null, blinded: null, n: 977, k: 24 },
      sites: [], bands: ["beta", "theta", "gamma"], direction: "up", evidence: "strong",
      changes: { beta: "up", theta: "up", gamma: "up" }, symptoms: ["sleep","hyperarousal"],
      claim: "More beta, theta and gamma in resting wakefulness",
      detail: "Meta-analysis of 24 studies (977 participants): during wakefulness, people with insomnia disorder showed increased beta, theta and gamma power, in line with cortical hyperarousal. The paper also pooled sleep-stage EEG; those results are not included here. Pooled across recording sites.",
      design: "Meta-analysis",
      cite: { authors: "Zhao W, Van Someren EJW, Li C, et al.", year: 2021, title: "EEG spectral analysis in insomnia disorder: A systematic review and meta-analysis", journal: "Sleep Medicine Reviews" }
    },
    /* ---------------- Epilepsy ---------------- */
    {
      id: "epi-sterman-2000", condition: "epilepsy", type: "protocol",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["C3","Cz","C4"], bands: ["smr","theta"], direction: "up", evidence: "moderate",
      changes: { smr: "up", theta: "down" }, symptoms: ["seizures"],
      claim: "SMR uptraining with theta inhibit reduces seizures",
      detail: "Summary of controlled studies from the 1970s onward: most patients with poorly controlled epilepsy showed meaningful seizure reductions, with some lasting effects.",
      design: "Review of controlled studies",
      cite: { authors: "Sterman MB", year: 2000, title: "Basic concepts and clinical findings in the treatment of seizure disorders with EEG operant conditioning", journal: "Clinical Electroencephalography" }
    },
    {
      id: "epi-kotchoubey-2001", condition: "epilepsy", type: "protocol",
      metrics: { design: 3, control: "active", blinded: null, n: null, k: null },
      sites: ["Cz"], bands: ["scp"], direction: "up", evidence: "moderate",
      changes: { scp: "regulate" }, symptoms: ["seizures"],
      claim: "SCP positivity training in drug-resistant epilepsy",
      detail: "Patients learned to produce positive shifts (reduced excitability). Seizure frequency fell, comparable to a medication-change control group.",
      design: "Controlled trial",
      cite: { authors: "Kotchoubey B, Strehl U, Uhlmann C, et al.", year: 2001, title: "Modification of slow cortical potentials in patients with refractory epilepsy: a controlled outcome study", journal: "Epilepsia" }
    },
    {
      id: "epi-tan-2009", condition: "epilepsy", type: "protocol",
      metrics: { design: 5, control: null, blinded: null, n: null, k: null },
      sites: ["C3","Cz","C4"], bands: ["smr","scp"], direction: "up", evidence: "moderate",
      changes: { smr: "up", scp: "regulate" }, symptoms: ["seizures"],
      claim: "Most trained patients report fewer seizures",
      detail: "Across SMR and SCP studies in drug-resistant epilepsy, the large majority of patients reported reduced seizure frequency after training.",
      design: "Meta-analysis",
      cite: { authors: "Tan G, Thornby J, Hammond DC, et al.", year: 2009, title: "Meta-analysis of EEG biofeedback in treating epilepsy", journal: "Clinical EEG and Neuroscience" }
    },
    /* ---------------- Autism ---------------- */
    {
      id: "asd-pineda-2008", condition: "autism", type: "protocol",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["C3","C4"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["social"],
      claim: "Mu rhythm (8–13 Hz, sensorimotor) training",
      detail: "Children with high-functioning autism trained mu over sensorimotor cortex. Small studies reported improved mu suppression during action observation and parent-rated behaviour.",
      design: "Small controlled studies",
      cite: { authors: "Pineda JA, Brang D, Hecht E, et al.", year: 2008, title: "Positive behavioral outcomes after mu rhythm neurofeedback training in children with autism spectrum disorder", journal: "Research in Autism Spectrum Disorders" }
    },
    {
      id: "asd-coben-2007", condition: "autism", type: "protocol",
      metrics: { design: 3, control: "usual", blinded: null, n: null, k: null },
      sites: [], bands: ["theta","hibeta"], direction: "down", evidence: "preliminary",
      changes: { theta: "down", hibeta: "down" }, symptoms: ["social"],
      claim: "QEEG-guided connectivity training",
      detail: "Protocols individualised to each child's QEEG hyper- and hypo-connectivity pattern. Reported improvements in parent ratings versus a waitlist group.",
      design: "Controlled (non-randomised)",
      cite: { authors: "Coben R, Padolsky I", year: 2007, title: "Assessment-guided neurofeedback for autistic spectrum disorder", journal: "Journal of Neurotherapy" }
    },
    {
      id: "asd-neo-2023", condition: "autism", type: "biomarker",
      sites: [], bands: ["alpha", "gamma"], direction: "down", evidence: "strong",
      metrics: { design: 5, control: null, blinded: null, n: 2701, k: 41 },
      changes: { alpha: "down", gamma: "up" }, symptoms: ["social"],
      claim: "Meta-analysis: lower relative alpha and higher gamma at rest",
      detail: "Pooled 41 resting-state studies (1,246 autistic and 1,455 neurotypical participants): relative alpha power was lower and gamma power higher in autism, while delta, theta and beta did not differ overall. This does not support the earlier U-shaped picture of excess slow power. Heterogeneity was high, and eyes-open versus eyes-closed recording changed some effects.",
      design: "Meta-analysis",
      cite: { authors: "Neo WS, Foti D, Keehn B, Kelleher B", year: 2023, title: "Resting-state EEG power differences in autism spectrum disorder: a systematic review and meta-analysis", journal: "Translational Psychiatry" }
    },
    /* ---------------- Alcohol & substance use ---------------- */
    {
      id: "sud-peniston-1989", condition: "sud", type: "protocol",
      metrics: { design: 3, control: "usual", blinded: null, n: null, k: null },
      sites: ["O1"], bands: ["alpha","theta"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up", theta: "up" }, symptoms: ["craving","lowmood"],
      claim: "Alpha-theta training for alcohol use disorder",
      detail: "Inpatients with alcoholism receiving alpha-theta training showed lower depression scores and better abstinence at follow-up than standard treatment alone.",
      design: "Controlled trial (small)",
      cite: { authors: "Peniston EG, Kulkosky PJ", year: 1989, title: "Alpha-theta brainwave training and beta-endorphin levels in alcoholics", journal: "Alcoholism: Clinical and Experimental Research" }
    },
    {
      id: "sud-scott-2005", condition: "sud", type: "protocol",
      metrics: { design: 4, control: "usual", blinded: null, n: null, k: null },
      sites: ["Cz","Pz"], bands: ["smr","beta","alpha","theta"], direction: "up", evidence: "moderate",
      changes: { smr: "up", beta: "up", alpha: "up", theta: "up" }, symptoms: ["craving","inattention"],
      claim: "Beta/SMR then alpha-theta (Scott-Peniston) improves retention",
      detail: "In a mixed substance-use inpatient program, adding attention-focused beta/SMR training followed by alpha-theta training improved treatment retention, attention and abstinence at 12 months.",
      design: "RCT",
      cite: { authors: "Scott WC, Kaiser D, Othmer S, Sideroff SI", year: 2005, title: "Effects of an EEG biofeedback protocol on a mixed substance abusing population", journal: "American Journal of Drug and Alcohol Abuse" }
    },
    /* ---------------- Migraine ---------------- */
    {
      id: "mig-walker-2011", condition: "migraine", type: "protocol",
      metrics: { design: 2, control: "usual", blinded: null, n: null, k: null },
      sites: [], bands: ["hibeta"], direction: "down", evidence: "preliminary",
      changes: { hibeta: "down" }, symptoms: ["headache"],
      claim: "QEEG-guided down-training of excess fast activity",
      detail: "Patients whose QEEG showed excess high-frequency activity received individualised down-training. Most reported large reductions in headache frequency compared with those who stayed on medication.",
      design: "Non-randomised comparison",
      cite: { authors: "Walker JE", year: 2011, title: "QEEG-guided neurofeedback for recurrent migraine headaches", journal: "Clinical EEG and Neuroscience" }
    },
    {
      id: "mig-zebhauser-2024", condition: "migraine", type: "biomarker",
      sites: [], bands: ["theta"], direction: "up", evidence: "moderate",
      metrics: { design: 5, control: null, blinded: null, n: null, k: 27 },
      changes: { theta: "up" }, symptoms: ["headache"],
      claim: "Meta-analysis: more theta between attacks",
      detail: "Systematic review of 27 resting-state EEG and MEG studies: between attacks (interictal), people with migraine showed higher theta power than healthy participants. No links between EEG features and migraine severity were found. Pools EEG with MEG studies, so treat site-level detail with care.",
      design: "Meta-analysis (EEG and MEG)",
      cite: { authors: "Zebhauser PT, Heitmann H, May ES, Ploner M", year: 2024, title: "Resting-state electroencephalography and magnetoencephalography in migraine–a systematic review and meta-analysis", journal: "The Journal of Headache and Pain" }
    },
    /* ---------------- Healthy cognition ---------------- */
    {
      id: "cog-hanslmayr-2005", condition: "cognition", type: "protocol",
      metrics: { design: 3, control: null, blinded: null, n: null, k: null },
      sites: ["Pz"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["executive"],
      claim: "Upper-alpha uptraining improves mental rotation",
      detail: "Participants who succeeded in raising individual upper-alpha power improved on a mental rotation task; those who did not learn the control did not improve.",
      design: "Controlled study (healthy adults)",
      cite: { authors: "Hanslmayr S, Sauseng P, Doppelmayr M, Schabus M, Klimesch W", year: 2005, title: "Increasing individual upper alpha power by neurofeedback improves cognitive performance in human subjects", journal: "Applied Psychophysiology and Biofeedback" }
    },
    {
      id: "cog-zoefel-2011", condition: "cognition", type: "protocol",
      metrics: { design: 3, control: "usual", blinded: null, n: null, k: null },
      sites: ["P3","Pz","P4","O1","O2"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["executive"],
      claim: "Five sessions of upper-alpha training boosts mental rotation",
      detail: "Most trained participants increased upper-alpha amplitude and showed larger gains in mental rotation than a non-trained control group.",
      design: "Controlled study (healthy adults)",
      cite: { authors: "Zoefel B, Huster RJ, Herrmann CS", year: 2011, title: "Neurofeedback training of the upper alpha frequency band in EEG improves cognitive performance", journal: "NeuroImage" }
    },
    {
      id: "cog-gruzelier-2014", condition: "cognition", type: "protocol",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Cz","C4","Pz"], bands: ["smr","alpha","theta"], direction: "up", evidence: "moderate",
      changes: { smr: "up", alpha: "up", theta: "up" }, symptoms: ["inattention","memory"],
      claim: "SMR and alpha-theta for attention, memory and artistic performance",
      detail: "Review of performance studies: SMR training linked to better attention and memory; alpha-theta training linked to improved music and dance performance in conservatoire students.",
      design: "Review",
      cite: { authors: "Gruzelier JH", year: 2014, title: "EEG-neurofeedback for optimising performance. I: A review of cognitive and affective outcome in healthy participants", journal: "Neuroscience & Biobehavioral Reviews" }
    },
    {
      id: "cog-enriquez-2014", condition: "cognition", type: "protocol",
      metrics: { design: 3, control: "active", blinded: null, n: null, k: null },
      sites: ["Fz"], bands: ["theta"], direction: "up", evidence: "moderate",
      changes: { theta: "up" }, symptoms: ["executive","memory"],
      claim: "Frontal-midline theta UP-training improved working memory and task switching",
      detail: "Healthy adults trained to raise frontal-midline theta, compared with an active pseudo-neurofeedback group. The trained group improved on 3-back accuracy and task-switching costs. Note: task-related frontal-midline theta is a different signal from excess resting frontal theta.",
      design: "Controlled study (active control, healthy adults)",
      cite: { authors: "Enriquez-Geppert S, Huster RJ, Figge C, Herrmann CS", year: 2014, title: "Self-regulation of frontal-midline theta facilitates memory updating and mental set shifting", journal: "Frontiers in Behavioral Neuroscience" }
    },
    {
      id: "pm-28577262", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["F7","F3","Fz","F4","F8","C3","Cz","C4","P3","Pz","P4"], bands: ["delta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD and preterm adolescents: higher resting delta power than controls",
      detail: "Eyes-open resting EEG in 69 adolescents with ADHD, 186 preterm-born and 135 term-born controls; the cued task data are not used here. Delta power was higher in the ADHD and preterm groups than in controls, and parent-rated ADHD symptoms correlated with resting delta in the preterm group. The ADHD-control difference lost significance when IQ was added as a covariate, and electrodes were averaged by frontal, central and parietal region.",
      design: "Case-control",
      cite: { authors: "Rommel AS, et al.", year: 2017, title: "Altered EEG spectral power during rest and cognitive performance: a comparison of preterm-born adolescents to adolescents with ADHD", journal: "Eur Child Adolesc Psychiatry" }
    },
    {
      id: "pm-18607528", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["C3","P3","Pz","P4","T6","O1","O2"], bands: ["gamma"], direction: "up", evidence: "preliminary",
      changes: { gamma: "up" }, symptoms: ["memory","cogdecline"],
      claim: "Drug-naive AD: higher resting gamma power than controls over parieto-occipital sites",
      detail: "Eyes-open resting EEG (90 s) in 15 drug-naive AD patients, 20 MCI patients and 20 controls; gamma (30-100 Hz) power was higher in AD than controls at C3, P3, Pz, P4, T6, O1 and O2, and MCI did not differ from controls. Gamma power correlated modestly with ADAS-cog. Muscle (EMG) contamination is a limit: the authors report the resting differences were lost at O1 and O2 after removing suspect epochs.",
      design: "Case-control",
      cite: { authors: "van Deursen JA, et al.", year: 2008, title: "Increased EEG gamma band activity in Alzheimer's disease and mild cognitive impairment", journal: "J Neural Transm (Vienna)" }
    },
    {
      id: "pm-23969043", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 95, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "AD severity: higher global slow-to-fast power ratio (delta and theta over alpha and beta)",
      detail: "Resting scalp EEG in 95 patients with newly diagnosed AD at different stages from four centres; the global delta and theta to alpha and beta power ratio correlated best with AD stage, and interhemispheric alpha coherence was lower in advanced disease. Taken from the abstract; not checked in the full text. Cross-sectional stage comparison with no controls, so it shows severity correlation, not a diagnostic marker.",
      design: "Cross-sectional (stage comparison)",
      cite: { authors: "Chen CC, et al.", year: 2015, title: "Frequency power and coherence of electroencephalography are correlated with the severity of Alzheimer's disease: A multicenter analysis in Taiwan", journal: "J Formos Med Assoc" }
    },
    {
      id: "pm-24015222", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 76, k: null },
      sites: ["O1","O2","Pz","P4","T5","T6","F8"], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "Mild AD vs controls: more delta and theta, less alpha and beta at posterior sites",
      detail: "Awake resting EEG with eyes closed in 27 controls, 27 mild AD and 22 moderate AD. The main method is an amplitude-modulation analysis; the conventional band-power comparison (benchmark) found more delta and theta at occipital and parietal sites, and less alpha at Pz and less beta at several sites, in mild AD than in controls. Single small study with no blinding; it is an exploratory comparison.",
      design: "Case-control",
      cite: { authors: "Fraga FJ, et al.", year: 2013, title: "Characterizing Alzheimer's disease severity via resting-awake EEG amplitude modulation analysis", journal: "PLoS One" }
    },
    {
      id: "pm-29991135", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["memory","cogdecline"],
      claim: "Dementia due to AD: globally higher relative theta power than healthy controls, eyes closed",
      detail: "Standard eyes-closed EEGs from 117 AD patients, 117 MCI patients and 138 healthy controls across six Nordic memory clinics, recorded before diagnosis. At group level, relative theta power was higher across the scalp in AD (less so in MCI), theta correlated with several memory tests, and temporal high-frequency power was lower. Taken from the abstract; not checked in the full text. Retrospective single-time-point case-control design.",
      design: "Case-control",
      cite: { authors: "Musaeus CS, et al.", year: 2018, title: "EEG Theta Power Is an Early Marker of Cognitive Decline in Dementia due to Alzheimer's Disease", journal: "J Alzheimers Dis" }
    },
    {
      id: "pm-31211359", condition: "alzheimers", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: 314, k: null },
      sites: ["F3","Fz","F4","C3","Cz","C4"], bands: ["delta","beta","gamma"], direction: "ratio", evidence: "moderate",
      changes: { delta: "down", beta: "up", gamma: "up" }, symptoms: ["memory","cogdecline"],
      claim: "Preclinical AD: more frontocentral beta and gamma, less delta than controls",
      detail: "Eyes-closed 1-minute resting EEG (256 channels) in 314 cognitively normal people aged 70-85 with subjective memory complaints, grouped by amyloid and FDG-PET neurodegeneration status. Neurodegeneration-positive people had higher beta and gamma and lower delta power, mainly at frontocentral sites; the amyloid-related pattern was non-linear. Taken from the abstract; not checked in the full text. Cross-sectional controlled cohort without blinding.",
      design: "Controlled cohort (biomarker groups)",
      cite: { authors: "Gaubert S, et al.", year: 2019, title: "EEG evidence of compensatory mechanisms in preclinical Alzheimer's disease", journal: "Brain" }
    },
    {
      id: "pm-32641111", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "contested",
      changes: { delta: "mixed", theta: "mixed", alpha: "mixed", beta: "mixed" }, symptoms: ["memory","cogdecline"],
      claim: "MCI-AD: resting EEG band power and dominant frequency did not differ from controls",
      detail: "Eyes-closed high-density resting EEG in 36 MCI-AD patients and 31 healthy controls. Band power (delta, theta, alpha including high alpha, beta) and occipital dominant frequency did not differ between MCI-AD and controls, while the main contrast (MCI with Lewy bodies vs MCI-AD, not an atlas condition) was reported separately. Null result in a single small study.",
      design: "Case-control (null result)",
      cite: { authors: "Schumacher J, et al.", year: 2020, title: "Quantitative EEG as a biomarker in mild cognitive impairment with Lewy bodies", journal: "Alzheimers Res Ther" }
    },
    {
      id: "pm-33080295", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "Alzheimer's dementia: higher global delta and theta, lower alpha and beta than seniors",
      detail: "Resting-state EEG from 100 patients with Alzheimer's dementia and 100 matched healthy seniors in an international archive. Global power was higher at delta-theta and lower at alpha-beta in the dementia group; the paper reads this as reduced cortical arousal. Taken from the abstract; not checked in the full text. Archive case-control design with no blinding.",
      design: "Case-control",
      cite: { authors: "Babiloni C, et al.", year: 2020, title: "Resting-state electroencephalographic delta rhythms may reflect global cortical arousal in healthy old seniors and patients with Alzheimer's disease dementia", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-33185607", condition: "alzheimers", type: "biomarker",
      metrics: { design: 5, control: null, blinded: null, n: null, k: 6 },
      sites: [], bands: ["alpha"], direction: "down", evidence: "moderate",
      changes: { alpha: "down" }, symptoms: ["memory","cogdecline"],
      claim: "AD vs MCI (meta-analysis): resting alpha power lower, small pooled effect",
      detail: "Systematic review and random-effects meta-analysis of resting alpha power across cognitive decline stages. Global alpha power was lower in AD than in MCI (pooled effect -0.30, 6 studies), and lower in MCI than in older adults (effect -1.49, 5 studies, high heterogeneity, to be read with caution). Taken from the abstract; not checked in the full text. Studies differed in MCI diagnosis and EEG measures, so the grade is moderate.",
      design: "Meta-analysis",
      cite: { authors: "Lejko N, et al.", year: 2020, title: "Alpha Power and Functional Connectivity in Cognitive Decline: A Systematic Review and Meta-Analysis", journal: "J Alzheimers Dis" }
    },
    {
      id: "pm-33544703", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["memory","cogdecline"],
      claim: "AD (vs age-matched 60-90 controls): widespread more delta and theta, less alpha power",
      detail: "Resting EEG in 26 AD patients, 53 MCI patients and healthy controls stratified by age (18-40, 40-60, 60-90). Against the oldest control group, AD showed widespread higher delta and theta and lower alpha power; MCI showed a smaller theta rise limited to temporal sites (T3-T6) with no alpha change. Single-centre case-control design; the theta-to-alpha ratio gave the strongest separation.",
      design: "Case-control",
      cite: { authors: "Meghdadi AH, et al.", year: 2021, title: "Resting state EEG biomarkers of cognitive decline associated with Alzheimer's disease and mild cognitive impairment", journal: "PLoS One" }
    },
    {
      id: "pm-35618112", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 99, k: null },
      sites: ["F3","F4"], bands: ["alpha","beta"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "mixed", beta: "asymmetry" }, symptoms: ["memory","cogdecline"],
      claim: "MCI: frontal beta (F3/F4) more asymmetric than controls; no frontal alpha difference",
      detail: "99 community-dwelling African Americans (41 MCI, 58 neurologically intact controls), eyes-closed resting EEG recorded before a motion task. Frontal beta asymmetry was greater in MCI, and frontal alpha asymmetry did not differ at baseline. Exploratory analysis with highly correlated asymmetry measures (r = 0.85) and no replication yet.",
      design: "Case-control (exploratory)",
      cite: { authors: "Martin T, et al.", year: 2022, title: "EEG asymmetry and cognitive testing in MCI identification", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-36330876", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 156, k: null },
      sites: ["C3","P3","C4","P4","O1","O2"], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "mixed" }, symptoms: ["memory","cogdecline"],
      claim: "AD dementia: delta and theta up, high alpha down at parieto-occipital channels",
      detail: "88 people with Alzheimer's dementia vs 68 normal elderly controls, eyes-closed resting EEG from six posterior bipolar channels (C3-P3, C4-P4, P3-O1, P4-O2). Low alpha and high alpha moved in opposite directions. Classification reached 90% AUC using alpha2/theta at C3-P3. Taken from the abstract; not checked in the full text. Single-centre case-control study.",
      design: "Case-control",
      cite: { authors: "Del Percio C, et al.", year: 2022, title: "What a single electroencephalographic (EEG) channel can tell us about patients with dementia due to Alzheimer's disease", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-36413420", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 145, k: null },
      sites: ["C3","P3","C4","P4","O1","O2"], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["memory","cogdecline"],
      claim: "MCI due to AD: delta up, alpha down at parieto-occipital channels; theta up only at C3-P3",
      detail: "75 people with MCI due to AD vs 70 normal elderly controls, eyes-closed resting EEG from six monopolar scalp electrodes forming four posterior bipolar channels. Delta and alpha changed at all four bipolar channels, but theta differed only at C3-P3. Taken from the abstract; not checked in the full text. Single-centre case-control study.",
      design: "Case-control",
      cite: { authors: "Del Percio C, et al.", year: 2023, title: "What a Single Electroencephalographic (EEG) Channel Can Tell us About Alzheimer's Disease Patients With Mild Cognitive Impairment", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-37248895", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 99, k: null },
      sites: ["Fz","Cz","Pz","O1","O2","F3","F4"], bands: ["theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "MCI: theta/beta ratio higher than controls, with right-leaning frontal ratio asymmetry",
      detail: "99 community-dwelling older African Americans (41 MCI, 58 controls), eyes-closed resting EEG before and after a motion task; the MCI difference held at both times. Midline theta/beta ratio was higher in MCI, and frontal ratio asymmetry leaned right only in MCI. Oz is listed as O1 and O2. Exploratory secondary analysis of the same sample as the frontal asymmetry study, not yet replicated.",
      design: "Case-control (exploratory)",
      cite: { authors: "Martin T, et al.", year: 2023, title: "Mild Cognitive Impairment in African Americans Is Associated with Differences in EEG Theta/Beta Ratio", journal: "J Alzheimers Dis" }
    },
    {
      id: "pm-37858173", condition: "alzheimers", type: "biomarker",
      metrics: { design: 1, control: null, blinded: null, n: 148, k: null },
      sites: ["T3","T4","T5","T6","P3","Pz","P4","O1","O2"], bands: ["theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "Amyloid-positive MCI or AD: theta up and beta down over time at temporal and parieto-occipital sites",
      detail: "148 amyloid-positive people with MCI (88) or AD dementia (60), with two or more eyes-closed resting 21-channel EEG recordings. Relative theta rose and relative beta fell over follow-up, most at temporal and parieto-occipital sites; the MCI group changed fastest. There is no control group, so the change over time is not compared with healthy ageing. Retrospective longitudinal study.",
      design: "Longitudinal (uncontrolled)",
      cite: { authors: "Scheijbeler EP, et al.", year: 2023, title: "Longitudinal resting-state EEG in amyloid-positive patients along the Alzheimer's disease continuum: considerations for clinical trials", journal: "Alzheimers Res Ther" }
    },
    {
      id: "pm-38217593", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 53, k: null },
      sites: [], bands: ["beta","theta","delta"], direction: "ratio", evidence: "preliminary",
      changes: { beta: "down", theta: "up", delta: "up" }, symptoms: ["memory","cogdecline"],
      claim: "Amnestic MCI: global beta down, global theta and delta up in resting qEEG",
      detail: "30 people with amnestic MCI and 23 matched controls, resting-state qEEG. Global relative beta was lower, and global relative theta and delta higher, in the MCI group. The coherence result in a right centroparietal area is a connectivity finding and is not used here. Taken from the abstract; not checked in the full text. Small single-centre case-control study.",
      design: "Case-control",
      cite: { authors: "Zawiślak-Fornagiel K, et al.", year: 2024, title: "Quantitative EEG Spectral and Connectivity Analysis for Cognitive Decline in Amnestic Mild Cognitive Impairment", journal: "J Alzheimers Dis" }
    },
    {
      id: "pm-38969018", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 68, k: null },
      sites: ["P3","Pz","P4","T5","T6","O1","O2"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["memory"],
      claim: "Subjective memory complaints: alpha3 power lower than controls over posterior sites, mainly in women",
      detail: "68 older people with and without subjective memory complaints, eyes-closed resting EEG. Alpha3 power was lower in the complaint group, and the reduction was significant in women only. Individual alpha peak and transition frequency did not differ. Taken from the abstract; not checked in the full text. Sites are the posterior electrodes the abstract describes, not individually named there.",
      design: "Case-control (cross-sectional)",
      cite: { authors: "Perez V, et al.", year: 2024, title: "Individual posterior alpha rhythms and cognitive reserve as possible early prognostic markers in people with subjective memory complaints", journal: "Behav Brain Res" }
    },
    {
      id: "pm-39449097", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["theta","delta","gamma","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", delta: "up", gamma: "up", alpha: "mixed" }, symptoms: ["memory","cogdecline"],
      claim: "AD: theta power up across the scalp; prodromal AD: gamma and delta power up",
      detail: "Three independent eyes-closed resting EEG cohorts of AD and prodromal AD (MCI due to AD) compared with age-matched controls. Theta was higher in AD and replicated in two cohorts, with theta connectivity lower. In prodromal AD, gamma power and gamma/alpha ratio were higher, mainly over left fronto-central and parietal areas, with delta also higher. Alpha did not differ consistently. Sites are listed as widespread. Case-control design with two pipelines; not a diagnostic test.",
      design: "Case-control",
      cite: { authors: "Chetty CA, et al.", year: 2024, title: "EEG biomarkers in Alzheimer's and prodromal Alzheimer's: a comprehensive analysis of spectral and connectivity features", journal: "Alzheimers Res Ther" }
    },
    {
      id: "pm-40359673", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 182, k: null },
      sites: [], bands: ["theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", alpha: "mixed" }, symptoms: ["memory","cogdecline"],
      claim: "AD vs healthy: resting theta power higher across all regions; alpha not different",
      detail: "22 healthy controls and 160 people with AD, resting-state EEG. Theta power (4-8 Hz) was higher in AD in all regions, and alpha did not differ between eyes-closed and eyes-open recordings. Interhemispheric correlation and the random-forest classifier are not used here. Taken from the abstract; not checked in the full text. Case-control study with no external validation of the classifier.",
      design: "Case-control",
      cite: { authors: "Lee AL, et al.", year: 2025, title: "Exploring the diagnostic potential of EEG theta power and interhemispheric correlation of temporal lobe activities in Alzheimer's Disease through random forest analysis", journal: "Comput Biol Med" }
    },
    {
      id: "pm-40413989", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 28, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["beta","delta","alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { beta: "up", delta: "down", alpha: "asymmetry" }, symptoms: ["memory","cogdecline"],
      claim: "Suspected MCI on a health-check screen: frontal beta up, delta down, frontal alpha asymmetry",
      detail: "14 people over 65 with suspected MCI and 14 propensity-matched people without cognitive impairment, short resting-state EEG. Frontal beta power was higher and delta lower in the suspected-MCI group, which also had a higher theta/beta ratio and frontal alpha asymmetry. Across participants, beta power correlated negatively with screen performance, while delta and theta/beta correlated positively. Taken from the abstract; not checked in the full text. Pilot cross-sectional study.",
      design: "Case-control (cross-sectional pilot)",
      cite: { authors: "Nikaido Y, et al.", year: 2025, title: "Short-term resting-state electroencephalography fast activity is associated with cognitive decline in older adults: A population-based cross-sectional pilot study", journal: "Psychiatry Res Neuroimaging" }
    },
    {
      id: "pm-40755242", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 65, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["gamma"], direction: "ratio", evidence: "contested",
      changes: { gamma: "mixed" }, symptoms: ["memory","cogdecline"],
      claim: "AD vs healthy: resting frontal gamma band power shows no difference",
      detail: "36 people with AD and 29 healthy older adults, resting-state EEG. Gamma power did not differ at any of the seven frontal electrodes tested (p from 0.42 to 0.91). The paper uses this null result to support gamma-tACS work in AD. Taken from the abstract; not checked in the full text. Small case-control study.",
      design: "Case-control (null result)",
      cite: { authors: "S V, et al.", year: 2026, title: "Assessment of Gamma Band Power of Electroencephalogram in Alzheimer's disease", journal: "Appl Neuropsychol Adult" }
    },
    {
      id: "pm-41246936", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 65, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","P3","Pz","P4","T5","T6","O1","O2"], bands: ["alpha","theta"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "down", theta: "up" }, symptoms: ["memory","cogdecline"],
      claim: "AD vs healthy: posterior alpha power down and frontal theta power up",
      detail: "36 people with AD, 29 healthy controls and 23 with FTD, from a public dataset; resting EEG recorded with eyes closed and eyes open. Posterior alpha was lower and frontal theta higher in AD; the FTD group differed mainly by frontal and central alpha reduction, which is not recorded here. Taken from the abstract; not checked in the full text. Single open-access dataset, case-control design.",
      design: "Case-control",
      cite: { authors: "Pan Y, et al.", year: 2026, title: "EEG spectral power differences in Alzheimer's disease and frontotemporal dementia", journal: "Int J Neurosci" }
    },
    {
      id: "pm-41407022", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 87, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["memory","cogdecline"],
      claim: "MCI and motoric cognitive risk: frontal theta power up in eyes-closed resting EEG",
      detail: "87 community-dwelling older adults in three groups (healthy, MCI and motoric cognitive risk), 5-minute eyes-closed resting EEG on 19 channels. Frontal theta power was higher in MCI and motoric cognitive risk, most in the latter. The default-mode connectivity result is not used here. Taken from the abstract; not checked in the full text. Cross-sectional study with small groups.",
      design: "Case-control (cross-sectional)",
      cite: { authors: "Noh ES, et al.", year: 2026, title: "Distinct patterns of cortical activity associated with cognitive and motor decline in community-dwelling older adults", journal: "Exp Gerontol" }
    },
    {
      id: "pm-41786925", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 65, k: null },
      sites: ["T3","T4","T5","T6","P3","Pz","P4","O1","O2"], bands: ["alpha","beta"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "AD vs cognitively normal: temporal, parietal and occipital alpha lower; occipital beta lower",
      detail: "36 people with AD and 29 cognitively normal controls, eyes-closed resting EEG from a public dataset. Alpha was lower over temporal and parietal sites and both alpha and beta were lower over occipital sites in AD. The same public dataset is used in pm-41246936 (batch 18), so the two papers are not independent samples. Taken from the abstract; not checked in the full text. Connectivity results are not used here.",
      design: "Case-control",
      cite: { authors: "Iqbal S, et al.", year: 2026, title: "Quantitative EEG signatures of power and functional connectivity alterations in Alzheimer's disease and frontotemporal dementia", journal: "Sci Rep" }
    },
    {
      id: "pm-42115191", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 48, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "Amyloid-confirmed aMCI: EEG slowing, with theta/alpha ratio best at occipital sites",
      detail: "24 people with amyloid-positive amnestic MCI (confirmed by PiB-PET) and 24 age-matched controls, resting EEG. Lower-frequency power was higher and higher-frequency power lower in MCI, with the occipital theta/alpha ratio giving the best discrimination (AUC 0.86). The band results are described as widespread, so sites are left as whole-head. Taken from the abstract; not checked in the full text. Small single-centre case-control study with no external validation.",
      design: "Case-control",
      cite: { authors: "Liang Y, et al.", year: 2026, title: "Application of resting-state EEG theta /alpha power ratio analysis for diagnosing amnestic mild cognitive impairment", journal: "Sci Rep" }
    },
    {
      id: "pm-42740150", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 88, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", alpha: "down" }, symptoms: ["memory","cogdecline"],
      claim: "AD vs healthy: higher frontal theta/alpha ratio in resting eyes-closed EEG",
      detail: "Eyes-closed resting EEG from 36 AD, 23 FTD and 29 healthy controls. The theta/alpha ratio was the strongest marker, highest over frontal sites in AD. AD vs FTD classification was not above chance (p = 0.270); the photobiomodulation single-case part is excluded.",
      design: "Case-control (machine-learning classification)",
      cite: { authors: "Šverko Z, et al.", year: 2026, title: "Spectral and Directed Connectivity EEG Markers for Classifying Alzheimer's Disease, Frontotemporal Dementia, and Healthy Controls with Exploratory Photobiomodulation Case-Study Projection", journal: "Sensors (Basel)" }
    },
    {
      id: "pm-42769165", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 360, k: null },
      sites: [], bands: ["theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", alpha: "down", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "AD dementia: more theta and less alpha2 and beta1 power than controls and MCI",
      detail: "Eyes-closed resting EEG from 154 AD dementia, 116 MCI and 90 normal participants, recorded at 16 electrodes. The pattern was seen in several regions, so no single site is listed. The cross-sectional design and machine-learning AUCs of 0.70-0.87 are not yet validated in prospective cohorts; the plasma P-tau217 correlations are not used.",
      design: "Case-control (cross-sectional, three groups)",
      cite: { authors: "Yang L, et al.", year: 2026, title: "Resting-state EEG biomarkers of general and domain-specific cognitive impairment and plasma P-tau217 in patients with Alzheimer's disease and mild cognitive impairment", journal: "Front Neurol" }
    },
    {
      id: "pm-42803709", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 90, k: null },
      sites: ["T3","T4","T5","T6"], bands: ["gamma","delta","theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { gamma: "up", delta: "up", theta: "up", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "aMCI: higher temporal gamma; right temporal delta and theta/beta ratio raised",
      detail: "Resting 128-channel high-density EEG from 55 amnestic MCI and 35 controls, with temporal sub-regions analysed separately. Right temporal delta activity was negatively linked to memory scores, and the theta/beta ratio was raised mainly on the right. Taken from the abstract; not checked in the full text.",
      design: "Case-control (cross-sectional)",
      cite: { authors: "Wen S, et al.", year: 2026, title: "Subregion-specific temporal lobe EEG signatures in amnestic mild cognitive impairment: Evidence from high-density EEG", journal: "J Alzheimers Dis" }
    },
    {
      id: "pm-6187529", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 80, k: null },
      sites: ["O1","O2"], bands: ["theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "Mild senile dementia (Alzheimer type): more theta and less beta than matched controls",
      detail: "Resting awake EEG from 40 people with mild Alzheimer-type dementia and 40 matched elderly controls, derived from occipital-to-vertex pairs. Alpha and delta did not differ. Taken from the abstract; not checked in the full text.",
      design: "Case-control (matched)",
      cite: { authors: "Coben LA, et al.", year: 1983, title: "Frequency analysis of the resting awake EEG in mild senile dementia of Alzheimer type", journal: "Electroencephalogr Clin Neurophysiol" }
    },
    {
      id: "pm-7613077", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 189, k: null },
      sites: ["T5","T6","P3","Pz","P4"], bands: ["theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", beta: "down" }, symptoms: ["memory","cogdecline"],
      claim: "AD: more theta and less beta over posterior temporal and parietal sites",
      detail: "Resting awake qEEG from 60 people with probable AD and 129 controls, with a split-half replication. A discriminant function from one half classified 86% of the other half correctly. The evoked-potential part of the study is not used. Taken from the abstract; not checked in the full text.",
      design: "Case-control (split-half replication)",
      cite: { authors: "Duffy FH, et al.", year: 1995, title: "Temporoparietal electrophysiological differences characterize patients with Alzheimer's disease: a split-half replication study", journal: "Cereb Cortex" }
    },
    {
      id: "pm-8676989", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 129, k: null },
      sites: [], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["memory","cogdecline"],
      claim: "AD vs non-demented controls: more delta and theta, less alpha at all 17 sites",
      detail: "Eyes-closed resting EEG at 17 locations in 84 people with AD and 45 age-matched controls. Absolute delta and theta were higher and alpha lower in AD, and the power differences tracked cognitive scores. Taken from the abstract; not checked in the full text.",
      design: "Case-control (cross-sectional)",
      cite: { authors: "Förstl H, et al.", year: 1996, title: "[Volumetric brain changes and quantitative EEG in normal aging and Alzheimer's dementia]", journal: "Nervenarzt" }
    },
    {
      id: "pm-8681465", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 30, k: null },
      sites: ["O1","O2"], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["memory","cogdecline"],
      claim: "Mild AD vs controls: more relative theta power at occipital sites O1 and O2",
      detail: "Resting EEG with eyes closed and open in 15 people with mild AD and 15 controls, recorded at O1 and O2. Relative theta power was the most sensitive single measure (46.7% at 100% specificity). Only the resting theta result is used; the nonlinear and reactivity measures are excluded. Taken from the abstract; not checked in the full text.",
      design: "Case-control (small pilot)",
      cite: { authors: "Stam CJ, et al.", year: 1996, title: "Diagnostic usefulness of linear and nonlinear quantitative EEG analysis in Alzheimer's disease", journal: "Clin Electroencephalogr" }
    },
    {
      id: "pm-9086836", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 18, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["delta","theta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up" }, symptoms: ["memory","cogdecline"],
      claim: "Presenile AD vs controls: more delta and theta at rest, mainly over frontal sites",
      detail: "Resting EEG in 9 patients with presenile AD and 9 age- and sex-matched controls. Delta and theta were raised mainly over frontal regions. The abstract also reports lower alpha and beta, but not where, so they are not listed. Photic-driving results are excluded. Taken from the abstract; not checked in the full text.",
      design: "Case-control (small pilot)",
      cite: { authors: "Nanbu Y, et al.", year: 1997, title: "[Topographic analysis of resting EEG and photic driving responses in patients with presenile Alzheimer's disease]", journal: "Rinsho Byori" }
    },
    {
      id: "pm-30392042", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 40, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood","executive"],
      claim: "MDD vs controls: frontal alpha asymmetry, more right than left, in 10-min resting EEG",
      detail: "20 people with major depression and 20 healthy controls had a 10-minute resting EEG. Frontal alpha asymmetry and lower EEG arousal separated the groups, with about 78-81% accuracy in a discriminant analysis, which is not a diagnostic test. Electrode pairs are not stated in the abstract, so the frontal region is used. Taken from the abstract; not checked in the full text. Main subject is depression; the Alzheimer's tag was from the search.",
      design: "Case-control (combined biomarkers)",
      cite: { authors: "Koo PC, et al.", year: 2019, title: "Combined cognitive, psychomotor and electrophysiological biomarkers in major depressive disorder", journal: "Eur Arch Psychiatry Clin Neurosci" }
    },
    {
      id: "pm-30404079", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 122, k: null },
      sites: ["Fp1","F7","F3","O1","Fp2","F4","F8"], bands: ["theta","alpha"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", alpha: "up" }, symptoms: ["memory","cogdecline"],
      claim: "CAD patients with MCI: more left frontal-occipital theta and higher theta/alpha ratio",
      detail: "122 coronary artery disease patients, 60 with MCI and 62 without, had eyes-open and eyes-closed resting EEG. Higher theta/alpha ratios and left frontal-occipital theta were linked to MCI risk, and right frontal eyes-open alpha 2 power was linked too. This is vascular cognitive impairment rather than Alzheimer's; it is included because the atlas condition covers MCI. Taken from the abstract; not checked in the full text. Logistic regression associations, not a diagnostic test.",
      design: "Case-control (cross-sectional, MCI vs non-MCI)",
      cite: { authors: "Tarasova IV, et al.", year: 2018, title: "EEG and Clinical Factors Associated with Mild Cognitive Impairment in Coronary Artery Disease Patients", journal: "Dement Geriatr Cogn Disord" }
    },
    {
      id: "pm-32234263", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 286, k: null },
      sites: ["P3","Pz","P4","T5","T6","O1","O2"], bands: ["delta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", alpha: "down" }, symptoms: ["memory","cogdecline"],
      claim: "AD vs healthy older adults: lower posterior alpha and higher widespread delta sources",
      detail: "Source-localised (eLORETA); mapped to the overlying scalp region. Resting eyes-closed EEG in 85 AD, 136 PD and 65 healthy older adults; the AD result is taken against the healthy group. Delta was higher across widespread cortex, and posterior alpha was lower; the posterior region is used for the finding. Taken from the abstract; not checked in the full text. Main subject is Parkinson's disease.",
      design: "Case-control (source-level)",
      cite: { authors: "Babiloni C, et al.", year: 2020, title: "Abnormal cortical neural synchronization mechanisms in quiet wakefulness are related to motor deficits, cognitive symptoms, and visual hallucinations in Parkinson's disease patients: an electroencephalographic study", journal: "Neurobiol Aging" }
    },
    {
      id: "pm-33571883", condition: "parkinsons", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 72, k: null },
      sites: ["P3","Pz","P4","T5","T6","O1","O2"], bands: ["alpha","theta"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "down", theta: "up" }, symptoms: ["cogdecline"],
      claim: "PD vs healthy: lower alpha/theta ratio, most posteriorly; right occipital ratio tracks visuospatial scores",
      detail: "36 non-demented people with Parkinson's and 36 matched healthy controls had resting qEEG. The alpha/theta ratio was lower in every region in Parkinson's, with the largest difference posteriorly, and the right occipital ratio was linked to line-orientation test scores. Taken from the abstract; not checked in the full text. No Alzheimer's group; filed under Parkinson's because that is the main subject.",
      design: "Case-control (cross-sectional correlation)",
      cite: { authors: "Jaramillo-Jimenez A, et al.", year: 2021, title: "Resting-state EEG alpha/theta ratio related to neuropsychological test performance in Parkinson's Disease", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-35694930", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 100, k: null },
      sites: ["T3","T4","T5","T6","O1","O2"], bands: ["delta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up" }, symptoms: ["memory","cogdecline"],
      claim: "Amnestic MCI with epileptiform EEG activity: higher temporal and occipital delta sources",
      detail: "Source-localised (eLORETA); mapped to the overlying scalp region. Eyes-closed resting EEG in 62 amnestic MCI patients (8 with epileptiform activity) and 38 normal older adults; delta source power was higher in temporal and occipital regions in the epileptiform subgroup than in the other groups. No participant had an epilepsy diagnosis. Taken from the abstract; not checked in the full text. Small subgroup, moderate classification accuracy.",
      design: "Case-control (source-level, subgroup)",
      cite: { authors: "Babiloni C, et al.", year: 2022, title: "Alzheimer's Disease with Epileptiform EEG Activity: Abnormal Cortical Sources of Resting State Delta Rhythms in Patients with Amnesic Mild Cognitive Impairment", journal: "J Alzheimers Dis" }
    },
    {
      id: "pm-35973509", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 100, k: null },
      sites: ["T3","T5","O1","O2"], bands: ["gamma"], direction: "down", evidence: "preliminary",
      changes: { gamma: "down" }, symptoms: ["lowmood","sleep"],
      claim: "Drug-naive first-episode MDD: lower gamma power at left temporal and both occipital sites",
      detail: "Resting EEG in 43 drug-naive first-episode depression patients and 57 healthy controls. Gamma power was lower at left temporal and bilateral occipital sites, and the occipital gamma deficit tracked sleep disturbance. The sample is small and may include some bipolar depression. Taken from the abstract; not checked in the full text. Main subject is depression; the Alzheimer's tag was from the search.",
      design: "Case-control (cross-sectional correlation)",
      cite: { authors: "Liu X, et al.", year: 2022, title: "Altered gamma oscillations and beta-gamma coupling in drug-naive first-episode major depressive disorder: Association with sleep and cognitive disturbance", journal: "J Affect Disord" }
    },
    {
      id: "pm-36057818", condition: "alzheimers", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: 318, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["theta"], direction: "up", evidence: "moderate",
      changes: { theta: "up" }, symptoms: ["memory","cogdecline"],
      claim: "Amyloid-positive memory complainers: more bilateral frontal theta at baseline, not at 2 years",
      detail: "Source-localised (beamformer); mapped to the overlying scalp region. Resting EEG in 318 cognitively healthy memory complainers from the INSIGHT-preAD cohort, 88 amyloid-positive and 230 amyloid-negative, at baseline. Mid-frontal theta was higher in amyloid-positive people at baseline, but this did not replicate at 2 years; the 2-year posterior cingulate and precuneus theta differences are deep structures and are not used. Cognition was not linked to theta.",
      design: "Cohort (amyloid-positive vs negative, source-level)",
      cite: { authors: "Spinelli G, et al.", year: 2022, title: "Theta Band-Power Shapes Amyloid-Driven Longitudinal EEG Changes in Elderly Subjective Memory Complainers At-Risk for Alzheimer's Disease", journal: "J Alzheimers Dis" }
    },
    {
      id: "pm-37657750", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 162, k: null },
      sites: ["Fp1","Fp2"], bands: ["gamma"], direction: "up", evidence: "preliminary",
      changes: { gamma: "up" }, symptoms: ["psychosis"],
      claim: "First-episode schizophrenia: higher resting gamma at frontal pole sites Fp1 and Fp2",
      detail: "Resting EEG gamma at Fp1 and Fp2 in 87 first-episode schizophrenia patients and 75 healthy controls. Gamma was higher in patients and was associated with PANSS symptom scores and processing speed; serum BDNF was also measured. Taken from the abstract; not checked in the full text. Cross-sectional correlations, not a diagnostic test.",
      design: "Case-control (cross-sectional)",
      cite: { authors: "Li G, et al.", year: 2023, title: "Correlation study of brain-derived neurotrophic factor, EEG γ activity and cognitive function in first-episode schizophrenia", journal: "Brain Res" }
    },
    {
      id: "pm-37918574", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 105, k: null },
      sites: ["P3","Pz","P4","T5","T6","O1","O2"], bands: ["gamma"], direction: "up", evidence: "preliminary",
      changes: { gamma: "up" }, symptoms: ["lowmood","executive"],
      claim: "Late-life depression: higher posterior upper-gamma power at eyes-closed rest in both severity groups",
      detail: "Eyes-closed resting EEG in 65 late-life depression patients and 40 older adults without depression. Upper gamma power was higher at posterior sites in both depression groups; the connectivity findings are not used here. Taken from the abstract; not checked in the full text. Small cross-sectional study; medication use was a limit.",
      design: "Case-control (cross-sectional)",
      cite: { authors: "Zeng Y, et al.", year: 2024, title: "Altered resting-state brain oscillation and the associated cognitive impairments in late-life depression with different depressive severity: An EEG power spectrum and functional connectivity study", journal: "J Affect Disord" }
    },
    {
      id: "pm-39796211", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 160, k: null },
      sites: ["P3","Pz","P4","T5","T6","O1","O2"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["memory","cogdecline"],
      claim: "ADMCI: lower posterior resting alpha than healthy and non-AD MCI people",
      detail: "Source-localised (eLORETA); mapped to the overlying scalp region. Eyes-closed resting EEG in 70 ADMCI, 45 non-AD MCI and 45 healthy older adults. Posterior alpha source activity was lower in ADMCI than in both comparison groups, and was linked to CSF tau. Taken from the abstract; not checked in the full text. Case-control design; the CSF association is not diagnostic.",
      design: "Case-control (source-level)",
      cite: { authors: "Del Percio C, et al.", year: 2025, title: "Resting-State EEG Alpha Rhythms Are Related to CSF Tau Biomarkers in Prodromal Alzheimer's Disease", journal: "Int J Mol Sci" }
    },
    {
      id: "pm-40976159", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 134, k: null },
      sites: ["O1","O2"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["lowmood"],
      claim: "First-episode drug-naive MDD, with or without suicidal ideation: lower occipital relative alpha",
      detail: "Eyes-closed resting EEG, 10 minutes, in 90 first-episode drug-naive depression patients and 44 healthy controls. Relative occipital alpha was lower in both depression groups than in controls; the suicidal-ideation groups did not differ from each other. Taken from the abstract; not checked in the full text. Only the alpha result is in this entry; the delta, gamma and frontal asymmetry findings are not used here.",
      design: "Case-control (cross-sectional)",
      cite: { authors: "Yi Y, et al.", year: 2025, title: "Absence of differences in resting-state EEG spectral power and cognitive impairments between first-episode, drug-naïve MDD patients with and without suicidal ideation", journal: "J Psychiatr Res" }
    },
    {
      id: "pm-41619714", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 218, k: null },
      sites: [], bands: ["delta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", alpha: "down" }, symptoms: ["memory","cogdecline"],
      claim: "AD vs healthy controls: widespread higher delta and lower alpha source activity",
      detail: "Source-localised (eLORETA); mapped to the overlying scalp region. Eyes-closed resting EEG in 81 AD patients and 102 healthy controls, from 30 electrodes, with 35 Huntington's patients in the same study; only the AD-vs-control result is used here. Widespread delta increase and alpha decrease were found in AD. Taken from the abstract; not checked in the full text. Exploratory study; clinical sites harmonised.",
      design: "Case-control (source-level)",
      cite: { authors: "Jakhar D, et al.", year: 2026, title: "Abnormal Resting-State EEG delta and alpha rhythms in Huntington's and Alzheimer's Diseases: An exploratory study", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-42215811", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 65, k: null },
      sites: [], bands: ["gamma","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { gamma: "up", alpha: "down" }, symptoms: ["cogdecline"],
      claim: "Epilepsy: higher global gamma and lower alpha with poorer MoCA cognition, mainly in comorbid cognitive dysfunction",
      detail: "Eyes-closed resting EEG in 65 people with epilepsy, 35 with preserved cognition and 30 with cognitive dysfunction by MoCA. Global gamma correlated negatively with MoCA scores, and the cognitively impaired group had lower global alpha, with temporal and parietal topography. Taken from the abstract; not checked in the full text. Cross-sectional correlations, small sample, no healthy controls.",
      design: "Cross-sectional correlation",
      cite: { authors: "Masoumian FN, et al.", year: 2026, title: "Resting-state EEG markers of cognitive dysfunction in epilepsy: evidence from gamma power, alpha activity, and functional connectivity", journal: "Neurol Sci" }
    },
    {
      id: "pm-8272452", condition: "alzheimers", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["theta","delta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", delta: "up" }, symptoms: ["memory","cogdecline"],
      claim: "Mild-moderate AD at rest: more theta over large bilateral areas and more bitemporal delta",
      detail: "Sixteen-channel resting EEG in 41 patients with mild to moderate Alzheimer's dementia, compared with age-matched and younger controls. Theta increased over large bilateral areas, so a whole-head entry is used; the bitemporal delta increase is also reported. The beta increase, which was seen only against younger controls, is not used, and the motor and music-perception task results are excluded. Taken from the abstract; not checked in the full text. Total control numbers are not stated, so n is left blank.",
      design: "Case-control (two control groups)",
      cite: { authors: "Günther W, et al.", year: 1993, title: "Findings of electroencephalographic brain mapping in mild to moderate dementia of the Alzheimer type during resting, motor, and music-perception conditions", journal: "Psychiatry Res" }
    },
    {
      id: "pm-12426037", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 88, k: null },
      sites: ["T3","T4","T5","T6"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["lowmood"],
      claim: "Unmedicated depression: lower alpha1 (right) and alpha2 (left) temporal source activity at rest",
      detail: "Source-localised (LORETA); mapped to the overlying scalp region. Resting EEG in 30 unmedicated depressive patients, with 20 normal subjects, 19 schizophrenic and 19 schizotypal participants in the same study (88 in total). Alpha1 was lower over the right temporal lobe and alpha2 over the left temporal lobe. The abstract does not name the comparison group for the depressive result; it is read as the normal subjects. Taken from the abstract; not checked in the full text. Anterior cingulate results are deep structures and are not used.",
      design: "Case-control (source-level)",
      cite: { authors: "Mientus S, et al.", year: 2002, title: "Cortical hypoactivation during resting EEG in schizophrenics but not in depressives and schizotypal subjects as revealed by low resolution electromagnetic tomography (LORETA)", journal: "Psychiatry Res" }
    },
    {
      id: "pm-39248267", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 735, k: null },
      sites: ["C3","Cz","C4"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["lowmood"],
      claim: "MDD vs healthy: lower central alpha power, the most consistent feature in machine-learning models",
      detail: "Resting 19-channel EEG in 240 inpatients with MDD, 250 with schizophrenia and 245 healthy controls (735 in total). Central alpha (8-11 Hz) power decrease was the most consistently predictive feature for MDD and schizophrenia. Classifier accuracy (67% for MDD vs controls) is not used as the finding. Taken from the abstract; not checked in the full text. Cross-sectional; not a diagnostic test.",
      design: "Case-control (machine learning, cross-sectional)",
      cite: { authors: "Sarisik E, et al.", year: 2025, title: "EEG-based Signatures of Schizophrenia, Depression, and Aberrant Aging: A Supervised Machine Learning Investigation", journal: "Schizophr Bull" }
    },
    {
      id: "pm-11196007", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 35, k: null },
      sites: ["P3","Pz","P4","T5","T6","O1","O2"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Adolescent MDD without anxiety: less right than left posterior alpha (asymmetry) vs controls",
      detail: "Resting EEG (eyes condition not stated in the abstract) in 19 adolescent outpatients with major depression (11 with comorbid anxiety, 8 without), 6 with anxiety only, and 10 non-ill controls. Depression without anxiety showed alpha asymmetry indicating less activation over the right than the left posterior sites; comorbid anxiety reduced this asymmetry. Taken from the abstract; not checked in the full text. Small preliminary study of female adolescents.",
      design: "Case-control",
      cite: { authors: "Kentgen LM, et al.", year: 2000, title: "Electroencephalographic asymmetries in adolescents with major depression: influence of comorbidity with anxiety disorders", journal: "J Abnorm Psychol" }
    },
    {
      id: "pm-11306251", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 93, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["beta","alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { beta: "up", alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Unmedicated male MDD vs controls: higher relative beta and frontal alpha asymmetry",
      detail: "Eyes-closed resting EEG from 21 scalp sites in 70 unmedicated male outpatients with unipolar depression and 23 male controls. Overall relative beta was higher in patients, absolute beta was higher at bilateral anterior sites, and frontal alpha asymmetry differed. A discriminant analysis classified 91.3% correctly, which is not a diagnostic test. Taken from the abstract; not checked in the full text. Frontal region used for the entry; theta asymmetry and coherence results are not used here.",
      design: "Case-control (cross-sectional)",
      cite: { authors: "Knott V, et al.", year: 2001, title: "EEG power, frequency, asymmetry and coherence in male depression", journal: "Psychiatry Res" }
    },
    {
      id: "pm-12204318", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 61, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "asymmetry", evidence: "preliminary",
      changes: { delta: "down", theta: "down", alpha: "down", beta: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Seasonal affective disorder: lower delta, theta and alpha across most regions; right-sided frontal beta",
      detail: "Resting EEG in 31 depressed patients with seasonal affective disorder and 30 controls. Delta, theta and alpha power were lower across central, parietal, occipital, temporal and frontal areas, so a whole-head entry is used. Beta was higher over the right lateral frontal region. Taken from the abstract; not checked in the full text. The paper proposes discrimination between depressive states but reports no accuracy.",
      design: "Case-control",
      cite: { authors: "Volf NV, et al.", year: 2002, title: "EEG mapping in seasonal affective disorder", journal: "J Affect Disord" }
    },
    {
      id: "pm-12436054", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 151, k: null },
      sites: ["Fp2","F4","F8"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["lowmood"],
      claim: "Adolescent females with lifetime major depression: higher right frontal alpha power at eyes-open rest",
      detail: "Eyes-open resting EEG from 31 sites in 151 adolescent females, 58 with a lifetime major depressive episode. Current source density topography placed the depression effect in the right frontal brain, so the right frontal region is used. The family-history-of-alcoholism results (beta and theta) are not used here. Taken from the abstract; not checked in the full text.",
      design: "Cross-sectional group comparison",
      cite: { authors: "Bauer LO, et al.", year: 2002, title: "Lateral asymmetries in the frontal brain: effects of depression and a family history of alcoholism in female adolescents", journal: "Alcohol Clin Exp Res" }
    },
    {
      id: "pm-15705347", condition: "depression", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: 87, k: null },
      sites: ["F7","F3"], bands: ["alpha"], direction: "asymmetry", evidence: "moderate",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Offspring with lifetime MDD: less left lateral frontal activity (alpha asymmetry) at rest",
      detail: "Resting EEG from 12 homologous site pairs in 87 offspring of depressed or non-depressed parents (18 with both parents depressed, 40 with one, 29 with none). Lifetime MDD in the offspring was linked to less left frontal activity at lateral sites, compared with offspring without MDD. The parental-risk alpha asymmetry at medial and parietal sites is not used for this entry. Taken from the abstract; not checked in the full text. The offspring are at risk; they are not all patients.",
      design: "Cohort (high-risk, cross-sectional comparison)",
      cite: { authors: "Bruder GE, et al.", year: 2005, title: "Electroencephalographic measures of regional hemispheric activity in offspring at risk for depressive disorders", journal: "Biol Psychiatry" }
    },
    {
      id: "pm-17117963", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 301, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["craving"],
      claim: "Alcohol dependence vs controls: anterior alpha asymmetry, less left than right activation",
      detail: "Resting EEG alpha-band asymmetry in 193 alcohol-dependent subjects and 108 controls. Alcohol-dependent subjects showed lower left, relative to right, activation in anterior regions. The MDD comorbidity effect on asymmetry was inconclusive in the abstract and is not used here. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Hayden EP, et al.", year: 2006, title: "Patterns of regional brain activity in alcohol-dependent subjects", journal: "Alcohol Clin Exp Res" }
    },
    {
      id: "pm-17481594", condition: "depression", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: 49, k: null },
      sites: ["P3","Pz","P4"], bands: ["alpha"], direction: "asymmetry", evidence: "moderate",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Grandchildren with two depressed generations: greater parietal alpha asymmetry (less right activity), eyes closed",
      detail: "Eyes-closed resting EEG in 49 right-handed grandchildren: 19 with depression in a parent and a grandparent, 14 with one, and 16 with neither. The parietal alpha asymmetry was greater in the both-generations group than in the group with neither. The high-risk grandchildren are not patients; the result is an endophenotype marker. Taken from the abstract; not checked in the full text.",
      design: "Cohort (multigenerational high-risk, cross-sectional comparison)",
      cite: { authors: "Bruder GE, et al.", year: 2007, title: "Grandchildren at high and low risk for depression differ in EEG measures of regional brain asymmetry", journal: "Biol Psychiatry" }
    },
    {
      id: "pm-18079035", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 13, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["lowmood"],
      claim: "Depressed outpatients: lower bilateral prefrontal alpha predicts more rumination (ecological momentary assessment)",
      detail: "Resting prefrontal alpha in 6 depressed outpatients and 7 healthy controls, with symptoms rated five times a day for 7 days. In the depressed group only, lower bilateral prefrontal alpha predicted more rumination; the self-esteem link is not used here. Taken from the abstract; not checked in the full text. Very small sample; the correlations are not diagnostic.",
      design: "Cross-sectional correlation (ecological momentary assessment)",
      cite: { authors: "Putnam KM, et al.", year: 2008, title: "Depressive symptoms and baseline prefrontal EEG alpha activity: a study utilizing Ecological Momentary Assessment", journal: "Biol Psychol" }
    },
    {
      id: "pm-18958615", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["delta","theta","alpha","beta","hibeta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "up", beta: "up", hibeta: "up" }, symptoms: ["lowmood"],
      claim: "MDD vs controls: higher LORETA current density in delta to beta2 at prefrontal cortex",
      detail: "Source-localised (LORETA); mapped to the overlying scalp region. Resting 36-channel EEG in 74 unmedicated MDD subjects and matched healthy controls (control number not stated in the abstract, so n is left blank). Current density was higher in delta, theta, alpha, beta1 and beta2 in prefrontal cortex; the anterior cingulate result is deep and is not used. Removing some prefrontal electrodes weakened the differences. Taken from the abstract; not checked in the full text.",
      design: "Case-control (source-level)",
      cite: { authors: "Korb AS, et al.", year: 2008, title: "Brain electrical source differences between depressed subjects and healthy controls", journal: "Brain Topogr" }
    },
    {
      id: "pm-19952564", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["P3","Pz","P4","O1","O2"], bands: ["theta","alpha","beta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", alpha: "up", beta: "up" }, symptoms: ["lowmood"],
      claim: "Early-stage depression vs healthy: higher parietal-occipital theta, alpha and beta power at rest",
      detail: "Resting EEG with eyes closed and eyes open in early-stage depressed patients and age-matched healthy controls. Theta, alpha and beta power were higher at parietal and occipital sites in both eye conditions. The authors read the slow-wave increase as reduced cortical activation. Control numbers are not stated in the abstract, so n is left blank. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Grin-Yatsenko VA, et al.", year: 2009, title: "EEG power spectra at early stages of depressive disorders", journal: "J Clin Neurophysiol" }
    },
    {
      id: "pm-20006545", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 637, k: null },
      sites: ["P3","Pz","P4","O1","O2"], bands: ["theta","alpha","beta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", alpha: "up", beta: "up" }, symptoms: ["lowmood"],
      claim: "Early-stage depression vs controls: higher theta and alpha at parietal-occipital sites; diffuse beta",
      detail: "Source-localised (ICA with sLORETA); mapped to the overlying scalp region. Resting EEG in 111 adults in early depression and 526 non-depressed subjects, with eyes closed and open. Theta and alpha were higher at parietal and occipital sites, and beta was diffusely higher. Taken from the abstract; not checked in the full text. Large sample, but the contrast is with non-depressed subjects, not a clinical diagnosis.",
      design: "Case-control (source-level, ICA)",
      cite: { authors: "Grin-Yatsenko VA, et al.", year: 2010, title: "Independent component approach to the analysis of EEG recordings at early stages of depressive disorders", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-20525011", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 306, k: null },
      sites: ["P3","Pz","P4"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Past-MDD women: relatively less right parietal activity than current MDD and non-MDD women",
      detail: "Resting parietal EEG asymmetry in 306 young adults (31% male), 143 with and 163 without lifetime MDD and no comorbid anxiety disorder. The asymmetry result is for women with past MDD against current MDD and non-MDD women; male results and the caffeine moderation are not used here. Taken from the abstract; not checked in the full text. Same sample as the frontal-asymmetry paper in this review.",
      design: "Cross-sectional group comparison",
      cite: { authors: "Stewart JL, et al.", year: 2011, title: "The oft-neglected role of parietal EEG asymmetry and risk for major depressive disorder", journal: "Psychophysiology" }
    },
    {
      id: "pm-20677839", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 306, k: null },
      sites: ["Fp1","F7","F3"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Lifetime MDD (both sexes): relatively less left frontal activity at rest, with current source density reference",
      detail: "Resting frontal EEG asymmetry at four sessions in 306 young adults, 143 with and 163 without lifetime MDD. With the current source density reference, lifetime MDD was linked to relatively less left frontal activity in both sexes, not explained by current status. Average and linked-mastoid references gave less consistent results, so only the CSD result is used. Taken from the abstract; not checked in the full text. Same sample as the parietal-asymmetry paper in this review.",
      design: "Cross-sectional group comparison",
      cite: { authors: "Stewart JL, et al.", year: 2010, title: "Resting frontal EEG asymmetry as an endophenotype for depression risk: sex-specific patterns of frontal brain asymmetry", journal: "J Abnorm Psychol" }
    },
    {
      id: "pm-20708650", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 44, k: null },
      sites: [], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["lowmood"],
      claim: "MDD vs controls at rest: globally higher alpha power, with less left-frontal activity",
      detail: "Resting eyes-closed EEG in 15 MDD patients, 14 PTSD patients and 15 healthy controls. Alpha power was globally higher in MDD, so a whole-head entry is used; left-frontal activity was reduced in MDD, as the abstract reports. The PTSD comparison and the PTSD right-parietotemporal result are not used here. Taken from the abstract; not checked in the full text.",
      design: "Case-control (three groups)",
      cite: { authors: "Kemp AH, et al.", year: 2010, title: "Disorder specificity despite comorbidity: resting EEG alpha asymmetry in major depressive disorder and post-traumatic stress disorder", journal: "Biol Psychol" }
    },
    {
      id: "pm-21309442", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 34, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "ratio", evidence: "contested",
      changes: { alpha: "mixed" }, symptoms: ["lowmood"],
      claim: "MDD vs controls: no difference in anterior alpha asymmetry, at individual or fixed alpha bands",
      detail: "Resting EEG in 16 MDD and 18 healthy women, tested at broad individualised, sub-band and fixed 8-13 Hz alpha bands with two reference schemes. No significant difference in lateralised alpha was found in any band. Within the MDD group, antidepressant use was linked to right-greater lower-alpha1 power; that result is not used here. Taken from the abstract; not checked in the full text. Small sample.",
      design: "Controlled study (null result)",
      cite: { authors: "Segrave RA, et al.", year: 2011, title: "Individualized alpha activity and frontal asymmetry in major depression", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-21381804", condition: "depression", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: null, k: null },
      sites: ["Fp1","F7","F3"], bands: ["alpha"], direction: "asymmetry", evidence: "moderate",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Non-depressed people: less left frontal activity at rest predicts a first depressive episode",
      detail: "Baseline resting frontal EEG in people with no current or prior depression, followed prospectively for about 3 years with diagnostic interviews. Decreased relative left frontal activity at baseline, and cognitive vulnerability, each predicted a first depressive episode; they shared predictive variance. The abstract does not give the sample size, so n is left blank. Taken from the abstract; not checked in the full text. Prospective risk marker, not a diagnostic test.",
      design: "Prospective cohort",
      cite: { authors: "Nusslock R, et al.", year: 2011, title: "Cognitive vulnerability and frontal brain asymmetry: common predictors of first prospective depressive episode", journal: "J Abnorm Psychol" }
    },
    {
      id: "pm-21500316", condition: "depression", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: 75, k: null },
      sites: ["P3","Pz","P4"], bands: ["alpha"], direction: "asymmetry", evidence: "moderate",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "High-risk for depression vs low-risk: greater parietal alpha asymmetry, less right parietal activity, eyes closed",
      detail: "Eyes-closed resting EEG in 75 people from a multigenerational study: 37 high-risk (descendants of probands with major depression) and 38 low-risk; MRI about 5 years later. The high-risk group had greater alpha asymmetry with relatively less right parietal activity. The alpha-to-cortical-thickness correlation is not used here. Taken from the abstract; not checked in the full text. Risk groups, not patients.",
      design: "Cohort (high-risk vs low-risk)",
      cite: { authors: "Bruder GE, et al.", year: 2012, title: "Relationship of resting EEG with anatomical MRI measures in individuals at high and low risk for depression", journal: "Hum Brain Mapp" }
    },
    {
      id: "pm-22408133", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 60, k: null },
      sites: ["Fp1","F7","F3"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Euthymic recurrent MDD women: a tendency toward lower left frontal activity (alpha asymmetry)",
      detail: "Resting EEG in 20 euthymic women with recurrent MDD, all on escitalopram, and 40 matched healthy women. Left frontal activity was a little lower in MDD (p = .04), and discriminant analysis showed more right frontal activation. The effect is small and the patients are medicated, which limits the result. Taken from the abstract; not checked in the full text. The heart-rate results are not used.",
      design: "Case-control",
      cite: { authors: "Chang JS, et al.", year: 2012, title: "An integrative assessment of the psychophysiologic alterations in young women with recurrent major depressive disorder", journal: "Psychosom Med" }
    },
    {
      id: "pm-22939462", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 96, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","P3","Pz","P4"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["lowmood"],
      claim: "Unmedicated MDD vs controls: higher frontal and parietal alpha power, most in males",
      detail: "Resting EEG in 53 unmedicated MDD patients (29 women) and 43 controls (23 women). Frontal and parietal alpha power was higher in MDD, with left midfrontal hypoactivity, and the effect was strongest in depressed men; women had higher right parietal activity. The subgenual cingulate theta result is deep and is not used. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Jaworska N, et al.", year: 2012, title: "α Power, α asymmetry and anterior cingulate cortex activity in depressed males and females", journal: "J Psychiatr Res" }
    },
    {
      id: "pm-2307762", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 14, k: null },
      sites: ["Fp1","F7","F3","P4","T6","O2"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Previously depressed (no current symptoms): less left anterior and less right posterior alpha activation",
      detail: "Resting EEG in 6 normothymic previously depressed people with no drug treatment and 8 never-depressed controls, across three reference montages. Alpha was the only band with the group interaction; previously depressed people had less left-sided anterior and less right-sided posterior activation. The result is a remitted-history marker, not current depression. Taken from the abstract; not checked in the full text. Very small study; old 1990 design.",
      design: "Case-control",
      cite: { authors: "Henriques JB, et al.", year: 1990, title: "Regional brain electrical asymmetries discriminate between previously depressed and healthy control subjects", journal: "J Abnorm Psychol" }
    },
    {
      id: "pm-23733090", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 107, k: null },
      sites: ["P3","Pz","P4","O1","O2"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["lowmood"],
      claim: "MDD: lower parietal-occipital alpha (eyes open) with more severe depression",
      detail: "Resting EEG in 107 patients with major depressive disorder. Parietal-occipital alpha power (eyes open) was negatively associated with depression severity. The BDNF Val66Met genotype effect on global eyes-closed alpha is a genotype result and is not used here. Taken from the abstract; not checked in the full text. Cross-sectional association, not a diagnostic test.",
      design: "Cross-sectional correlation",
      cite: { authors: "Zoon HF, et al.", year: 2013, title: "EEG alpha power as an intermediate measure between brain-derived neurotrophic factor Val66Met and depression severity in patients with major depressive disorder", journal: "J Clin Neurophysiol" }
    },
    {
      id: "pm-24467874", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 237, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Non-melancholic MDD vs controls: relative left frontal activation (alpha asymmetry); melancholic MDD did not differ",
      detail: "Eyes-closed resting EEG, 2 minutes, in 60 non-melancholic and 57 melancholic MDD patients and 120 healthy controls (237 in total). The non-melancholic group showed relative left frontal activation compared with controls and with the melancholic group; the melancholic group did not differ from controls. Effect size d = 0.30-0.34. Taken from the abstract; not checked in the full text. The melancholic null result is part of the same finding.",
      design: "Case-control",
      cite: { authors: "Quinn CR, et al.", year: 2014, title: "The impact of melancholia versus non-melancholia on resting-state, EEG alpha asymmetry: electrophysiological evidence for depression heterogeneity", journal: "Psychiatry Res" }
    },
    {
      id: "pm-24630467", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 168, k: null },
      sites: ["Fz"], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["lowmood"],
      claim: "Current MDD vs never-depressed: higher theta cordance at the most anterior midline site",
      detail: "Resting awake qEEG in 121 people with a current major depressive episode and 47 never-depressed adults. Theta cordance (a power-derived measure) was higher at the most anterior midline electrode (Fpz), which is not a listed electrode, so the nearest listed site Fz is used. Other sites and power measures were not significant. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Cook IA, et al.", year: 2014, title: "Do prefrontal midline electrodes provide unique neurophysiologic information in Major Depressive Disorder?", journal: "J Psychiatr Res" }
    },
    {
      id: "pm-25568149", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 40, k: null },
      sites: ["C3","Cz","C4"], bands: ["theta","alpha","beta"], direction: "asymmetry", evidence: "preliminary",
      changes: { theta: "asymmetry", alpha: "asymmetry", beta: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Depressed people with HIV: right-dominant central theta, alpha and beta asymmetry",
      detail: "Resting EEG in 40 people living with HIV on antiretroviral treatment, compared with a normative healthy database. Depressed participants showed right-dominant asymmetries at central sites that remained significant after correction for theta, alpha and beta. The result is in HIV-positive people, so it is a mixed group; the rostral cingulate LORETA and frontal alpha results are not used. Taken from the abstract; not checked in the full text.",
      design: "Cross-sectional comparison (normative database)",
      cite: { authors: "Kremer H, et al.", year: 2016, title: "Interhemispheric Asymmetries and Theta Activity in the Rostral Anterior Cingulate Cortex as EEG Signature of HIV-Related Depression: Gender Matters", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-25600291", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 35, k: null },
      sites: ["F3","F4"], bands: ["delta"], direction: "down", evidence: "preliminary",
      changes: { delta: "down" }, symptoms: ["lowmood"],
      claim: "History of depression: lower frontal delta at rest is linked to more psychological pain",
      detail: "Eyes-closed resting frontal EEG (F3/F4) in 35 adults with a history of depression. Lower frontal delta power predicted more psychological pain while controlling for depressive symptoms. Frontal alpha asymmetry did not add to the models, and the fractal dimension asymmetry result is not used here. Taken from the abstract; not checked in the full text. Symptom correlation in a small sample.",
      design: "Cross-sectional correlation",
      cite: { authors: "Meerwijk EL, et al.", year: 2015, title: "Resting-state EEG delta power is associated with psychological pain in adults with a history of depression", journal: "Biol Psychol" }
    },
    {
      id: "pm-26363266", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 39, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood","motor"],
      claim: "MDD vs healthy: left-lateralised resting frontal alpha asymmetry, with lower activity levels",
      detail: "Resting eyes-closed EEG in 20 MDD patients and 19 healthy controls. Patients had left-lateralised frontal alpha asymmetry and lower actigraphy activity; asymmetry correlated with activity scores. Patients were on antidepressants, which the abstract lists as a limitation. Taken from the abstract; not checked in the full text. Small sample.",
      design: "Case-control",
      cite: { authors: "Cantisani A, et al.", year: 2015, title: "Psychomotor retardation is linked to frontal alpha asymmetry in major depression", journal: "J Affect Disord" }
    },
    {
      id: "pm-26392114", condition: "depression", type: "protocol",
      metrics: { design: 1, control: "none", blinded: null, n: 20, k: null },
      sites: ["F3","Pz"], bands: ["beta","alpha","theta"], direction: "ratio", evidence: "preliminary",
      changes: { beta: "up", alpha: "regulate", theta: "regulate" }, symptoms: ["lowmood","anxiety"],
      claim: "Neurofeedback (beta at F3, alpha/theta at Pz), 8 weeks, open label: lower depression scores, no asymmetry change",
      detail: "Open-label, uncontrolled 8-week neurofeedback in 20 people with MDD: beta training at F3 and alpha/theta training at Pz, 60 minutes per session. Depression, anxiety and severity scores improved; the interhemispheric alpha asymmetry score did not change. No control group, so the improvement cannot be attributed to training. Taken from the abstract; not checked in the full text.",
      design: "Open-label pilot (no control)",
      cite: { authors: "Cheon EJ, et al.", year: 2016, title: "The Efficacy of Neurofeedback in Patients with Major Depressive Disorder: An Open Labeled Prospective Study", journal: "Appl Psychophysiol Biofeedback" }
    },
    {
      id: "pm-27000108", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 64, k: null },
      sites: [], bands: ["alpha"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "mixed" }, symptoms: ["headache"],
      claim: "MDD: alpha cordance tracks headache pain, positive at frontal and negative at posterior sites",
      detail: "Resting qEEG in 64 unmedicated MDD patients, with headache pain rated for the past week. Alpha cordance was associated with headache intensity after controlling for depression severity: positive anteriorly and negative posteriorly. Frontal left-dominant alpha asymmetry correlated with headache but not with depression. Directions differ by site, so the change is marked mixed and a whole-head entry is used. Taken from the abstract; not checked in the full text. Cordance is a power-derived index.",
      design: "Cross-sectional correlation",
      cite: { authors: "Scanlon GC, et al.", year: 2017, title: "Neurophysiologic Correlates of Headache Pain in Subjects With Major Depressive Disorder", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-27344621", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 73, k: null },
      sites: ["F3","Fz","F4","C3","Cz","C4"], bands: ["beta","gamma"], direction: "down", evidence: "preliminary",
      changes: { beta: "down", gamma: "down" }, symptoms: ["inattention"],
      claim: "MDD: lower fronto-central beta and low-gamma power with more inattention",
      detail: "Eyes-closed and eyes-open resting qEEG in 73 MDD patients. Beta (12-30 Hz) and low-gamma (30-50 Hz) power at fronto-central sites were negatively correlated with inattention scores, so lower power went with more inattention. Depression and anxiety scores also predicted inattention, and the mediation model is not used here. Taken from the abstract; not checked in the full text. Medication and comorbidity were not fully controlled.",
      design: "Cross-sectional correlation",
      cite: { authors: "Roh SC, et al.", year: 2016, title: "EEG beta and low gamma power correlates with inattention in patients with major depressive disorder", journal: "J Affect Disord" }
    },
    {
      id: "pm-28755454", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 124, k: null },
      sites: ["F7","F3"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Women with childhood-onset depression and no anxiety: less left lateral frontal activity than controls",
      detail: "Resting EEG in 37 women with a history of childhood-onset depression and no anxiety disorder, 18 with the same history plus an anxiety disorder, and 69 psychiatrically healthy controls (124 in total). Reduced left lateral frontal activity was found in the depression-only group, while the anxious group did not differ from controls. Taken from the abstract; not checked in the full text. Remitted history rather than current depression.",
      design: "Case-control",
      cite: { authors: "Nusslock R, et al.", year: 2018, title: "Comorbid anxiety moderates the relationship between depression history and prefrontal EEG asymmetry", journal: "Psychophysiology" }
    },
    {
      id: "pm-29023805", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Lifetime depression: less left than right activity in midfrontal and precentral sources (alpha asymmetry)",
      detail: "Source-localised (eLORETA); mapped to the overlying scalp region. Resting-state alpha asymmetry in a large resting data set; participants with any lifetime depressive episode showed less left than right activity in the precentral and midfrontal gyri. Anhedonia accounted for part of the link to lifetime MDD. The abstract does not state the sample size, so n is left blank. Taken from the abstract; not checked in the full text.",
      design: "Cross-sectional group comparison (source-level)",
      cite: { authors: "Smith EE, et al.", year: 2018, title: "Intracranial source activity (eLORETA) related to scalp-level asymmetry scores and depression status", journal: "Psychophysiology" }
    },
    {
      id: "pm-29305876", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 51, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Adolescent MDD vs controls: less left-sided frontal alpha power, so no asymmetry in controls",
      detail: "Resting frontal EEG in 20 adolescents with unipolar depression (12 first episode, 8 recurrent) and 31 healthy age-matched controls (51 in total). Patients had significantly less left-sided frontal alpha power over the regions of interest, while controls showed no asymmetry. In controls, more left-sided frontal alpha tracked higher depression scores; that link was absent in patients. Taken from the abstract; not checked in the full text. Small sample.",
      design: "Case-control",
      cite: { authors: "Grünewald BD, et al.", year: 2018, title: "Resting frontal EEG asymmetry patterns in adolescents with and without major depression", journal: "Biol Psychol" }
    },
    {
      id: "pm-30182751", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 123, k: null },
      sites: [], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["lowmood"],
      claim: "Depressed vs controls, 2-min eyes-closed EEG: more time in dominant-alpha (A) stages and more stable arousal",
      detail: "Eyes-closed resting EEG (2 min) in 87 depressed patients and 36 healthy controls from four EMBARC sites, analysed with the automatic VIGALL vigilance-stage classifier rather than band power. Depressed patients showed more A-stage (dominant alpha) time and higher arousal stability, and less B1 (low-voltage non-alpha) time, with no difference in B2/3. The alpha direction is inferred from the A-stage measure and is not a band-power result. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Ulke C, et al.", year: 2019, title: "Resting EEG Measures of Brain Arousal in a Multisite Study of Major Depression", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-30415151", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 95, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood","anxiety"],
      claim: "Adolescents with acute depression and comorbid anxiety vs controls: more left than right frontal alpha power",
      detail: "Resting frontal EEG (8 min) in 34 healthy controls, 16 adolescents in remission without anxiety, 22 with acute depression without anxiety, and 23 with acute depression plus anxiety (95 in total). Only the acute depression plus anxiety group differed from controls, with more left-sided alpha power, meaning greater right-frontal activity; the other groups did not differ. The result is attributed by the authors to the anxiety comorbidity. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Feldmann L, et al.", year: 2018, title: "Resting frontal EEG asymmetry in adolescents with major depression: Impact of disease state and comorbid anxiety disorder", journal: "Clin Neurophysiol" }
    }
  ],

  methodology: [
    { authors: "Guyatt GH, Oxman AD, Vist GE, et al.", year: 2008, title: "GRADE: an emerging consensus on rating quality of evidence and strength of recommendations", journal: "BMJ", note: "The confidence ratings here follow a simplified GRADE-style logic: start from the best study design, then rate down for conflicting or thin evidence." },
    { authors: "Srinivasan R, Nunez PL, Silberstein RB", year: 1998, title: "Spatial filtering and neocortical dynamics: estimates of EEG coherence", journal: "IEEE Transactions on Biomedical Engineering", note: "Volume conduction through the skull blurs scalp EEG: electrodes up to 10–12 cm apart can look correlated even when the underlying sources are not, which is why neighbouring sites are shown." },
    { authors: "van den Broek SP, Reinders F, Donderwinkel M, Peters MJ", year: 1998, title: "Volume conduction effects in EEG and MEG", journal: "Electroencephalography and Clinical Neurophysiology", note: "Skull conductivity smears the EEG across the scalp; skull defects and lesions also change what an electrode records." },
    { authors: "Ros T, Enriquez-Geppert S, Zotev V, et al.", year: 2020, title: "Consensus on the reporting and experimental design of clinical and cognitive-behavioural neurofeedback studies (CRED-nf checklist)", journal: "Brain", note: "Checklist for judging study quality." },
    { authors: "Thibault RT, Raz A", year: 2017, title: "The psychology of neurofeedback: clinical intervention even if applied placebo", journal: "American Psychologist", note: "Argues much of the benefit may be non-specific." },
    { authors: "Sitaram R, Ros T, Stoeckel L, et al.", year: 2017, title: "Closed-loop brain training: the science of neurofeedback", journal: "Nature Reviews Neuroscience", note: "Mechanisms overview." },
    { authors: "Newson JJ, Thiagarajan TC", year: 2019, title: "EEG Frequency Bands in Psychiatric Disorders: A Review of Resting State Studies", journal: "Frontiers in Human Neuroscience", note: "Across 184 resting studies, band changes overlapped heavily between disorders, so one pattern rarely points to one diagnosis." }
  ],

  // Studies reviewed and left out, with the reason (kept for the research log; not shown in the app).
  excluded: [
    { id: "scz-kwon-1999", reason: "Task/evoked: 40 Hz auditory steady-state response, not resting-state EEG.", cite: { authors: "Kwon JS, O'Donnell BF, Wallenstein GV, et al.", year: 1999, title: "Gamma frequency-range abnormalities to auditory stimulation in schizophrenia", journal: "Archives of General Psychiatry" } },
    { id: "scz-thune-2016", reason: "Task/evoked: meta-analysis of the 40 Hz auditory steady-state response, not resting-state EEG.", cite: { authors: "Thuné H, Recasens M, Uhlhaas PJ", year: 2016, title: "The 40-Hz auditory steady-state response in patients with schizophrenia: a meta-analysis", journal: "JAMA Psychiatry" } },
    { id: "ins-perlis-2001", reason: "Sleep EEG (NREM), not resting wakefulness.", cite: { authors: "Perlis ML, Smith MT, Andrews PJ, Orff H, Giles DE", year: 2001, title: "Beta/Gamma EEG activity in patients with primary and secondary insomnia and good sleeper controls", journal: "Sleep" } }
  ]
};

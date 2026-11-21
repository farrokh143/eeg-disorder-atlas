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
    },
    {
      id: "pm-31302517", condition: "depression", type: "protocol",
      metrics: { design: 3, control: "none", blinded: null, n: 87, k: null },
      sites: ["F3","F4","P3","P4"], bands: ["alpha","hibeta"], direction: "asymmetry", evidence: "contested",
      changes: { alpha: "asymmetry", hibeta: "down" }, symptoms: ["lowmood","anxiety"],
      claim: "Alpha-asymmetry and high-beta neurofeedback in MDD with anxiety: symptoms fell, asymmetry did not",
      detail: "87 patients with comorbid MDD and anxiety symptoms were allocated to alpha-asymmetry neurofeedback, high-beta down-training, or a control group, with ten sessions in each neurofeedback arm. Both neurofeedback groups reduced BDI-II and BAI scores, with no difference between them. The asymmetry score did not change differently across the three groups; high-beta power at P3 fell only in the high-beta group. Taken from the abstract; not checked in the full text.",
      design: "Controlled study",
      cite: { authors: "Wang SY, et al.", year: 2019, title: "The effects of alpha asymmetry and high-beta down-training neurofeedback for patients with the major depressive disorder and anxiety symptoms", journal: "J Affect Disord" }
    },
    {
      id: "pm-32424130", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 62, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha","beta"], direction: "ratio", evidence: "contested",
      changes: { alpha: "mixed", beta: "mixed" }, symptoms: ["lowmood"],
      claim: "Resting frontal alpha and beta asymmetry: no difference between MDD and matched controls",
      detail: "Resting EEG in 30 patients with major depression and 32 matched controls. Neither group showed hemispheric alpha asymmetry at rest, and resting beta showed no asymmetry in either group, so the resting results are null. The group difference appeared only during linguistic tasks, which are excluded here. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Spironelli C, et al.", year: 2020, title: "Evidence of language-related left hypofrontality in Major Depression: An EEG Beta band study", journal: "Sci Rep" }
    },
    {
      id: "pm-33601739", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 270, k: null },
      sites: [], bands: ["delta","theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "down", theta: "down", beta: "up" }, symptoms: ["lowmood","anxiety"],
      claim: "MDD with anxiety: lower delta and theta, higher beta over the whole head at rest",
      detail: "Resting EEG (19 channels) in 135 patients with MDD and anxiety symptoms vs 135 healthy controls. Total delta, theta and beta were compared; frontal and parietal alpha asymmetry showed no difference. Task recordings from the same study were left out. Taken from the abstract; not checked in the full text. Most patients were taking medication, which may affect EEG.",
      design: "Case-control",
      cite: { authors: "Lin IM, et al.", year: 2021, title: "Electroencephalogram patterns in patients comorbid with major depressive disorder and anxiety symptoms: Proposing a hypothesis based on hypercortical arousal and not frontal or parietal alpha asymmetry", journal: "J Affect Disord" }
    },
    {
      id: "pm-34256274", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 66, k: null },
      sites: ["P3","P4","T5","T6","O1","O2"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Depressed adolescents: more right than left posterior alpha; overall posterior alpha lower than controls",
      detail: "Eyes-closed 128-channel resting EEG in 31 female adolescents with MDD and 35 healthy female adolescents. Only the depressed group showed more right than left posterior alpha, and its overall posterior alpha was lower (p=0.046). Some participants were medicated and the sample was small and single-sex.",
      design: "Case-control",
      cite: { authors: "Umemoto A, et al.", year: 2021, title: "Resting posterior alpha power and adolescent major depressive disorder", journal: "J Psychiatr Res" }
    },
    {
      id: "pm-35412986", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 56, k: null },
      sites: [], bands: ["beta","gamma"], direction: "up", evidence: "preliminary",
      changes: { beta: "up", gamma: "up" }, symptoms: ["lowmood"],
      claim: "First-episode MDD: more widespread beta and gamma power than controls at rest",
      detail: "Resting EEG with eyes open and eyes closed in 30 first-episode MDD patients and 26 healthy controls. Beta and gamma power were higher across the head in both conditions. Taken from the abstract; not checked in the full text. Single case-control study with a small sample.",
      design: "Case-control",
      cite: { authors: "Liu S, et al.", year: 2022, title: "Alterations in Patients With First-Episode Depression in the Eyes-Open and Eyes-Closed Conditions: A Resting-State EEG Study", journal: "IEEE Trans Neural Syst Rehabil Eng" }
    },
    {
      id: "pm-35931231", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 85, k: null },
      sites: ["P3","Pz","P4","C3","Cz","C4","O1","O2"], bands: ["alpha","beta"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up", beta: "up" }, symptoms: ["lowmood"],
      claim: "Late-life depression: higher beta over parietal, central, occipital; higher alpha parietal-central",
      detail: "Eyes-closed resting EEG in 41 patients with late-life depression and 44 people without depression. Alpha asymmetry and cortical connectivity did not differ between groups. Taken from the abstract; not checked in the full text. Few electrodes were used and the sample was limited.",
      design: "Case-control",
      cite: { authors: "Wu Z, et al.", year: 2022, title: "Resting-state electroencephalography of neural oscillation and functional connectivity patterns in late-life depression", journal: "J Affect Disord" }
    },
    {
      id: "cand-mdd-ozcoban-2025", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 126, k: null },
      sites: [], bands: ["theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", alpha: "mixed", beta: "up" }, symptoms: ["lowmood"],
      claim: "MDD: higher absolute theta and beta power across most channels at rest; alpha results conflict",
      detail: "Eyes-closed resting EEG on 19 channels in 48 medication-free MDD patients vs 78 controls. Theta and beta power were higher in most channels. The abstract says alpha was lower, but the results section reports higher relative alpha, so alpha is marked mixed. Single case-control study.",
      design: "Case-control",
      cite: { authors: "Özçoban MA, Tan O", year: 2025, title: "Electroencephalographic markers in Major Depressive Disorder: insights from absolute, relative power, and asymmetry analyses", journal: "Frontiers in Psychiatry" }
    },
    {
      id: "cand-mdd-alpha-sex-2012", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 96, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","P3","Pz","P4"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["lowmood"],
      claim: "Unmedicated MDD: more frontal and parietal alpha-2 power than controls at rest, mainly in males",
      detail: "Resting EEG in 53 unmedicated MDD patients and 43 controls, referenced to Cz and mastoids. Alpha-2 power was higher over frontal and parietal sites, with the clearest effect in males. Source-localised theta in the subgenual cingulate was left out because it is a deep structure. Single case-control study.",
      design: "Case-control",
      cite: { authors: "(verify authors)", year: 2012, title: "Alpha Power, Alpha Asymmetry and Anterior Cingulate Cortex Activity in Depressed Males and Females", journal: "Journal of Psychiatric Research" }
    },
    {
      id: "pm-37480706", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 100, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","P3","Pz","P4","O1","O2"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Melancholia subscale tracks alpha asymmetry in opposite directions: frontal vs parietal-occipital",
      detail: "Eyes-closed resting EEG and Zung depression scores in 100 community adults; the correlation held in the 33 with clinically significant depression. Frontal alpha asymmetry was inversely related and parietal-occipital asymmetry directly related to one melancholia subcomponent. Taken from the abstract; not checked in the full text. Electrode labels are not in the abstract, so sites are the frontal and parietal-occipital regions; the study is correlational.",
      design: "Cross-sectional correlation",
      cite: { authors: "Sharpley CF, et al.", year: 2023, title: "Alpha wave asymmetry is associated with only one component of melancholia, and in different directions across brain regions", journal: "Psychiatry Res Neuroimaging" }
    },
    {
      id: "pm-37957613", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 80, k: null },
      sites: ["O1","O2"], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["lowmood"],
      claim: "First-episode MDD: higher low delta and theta, lower alpha over occipital sites at rest",
      detail: "Eyes-closed resting EEG for 10 minutes in 40 first-episode, medication-naive MDD patients and 40 healthy controls. Relative low delta and theta were higher in the right occipital region, and alpha was lower across the posterior occipital region. Taken from the abstract; not checked in the full text. Machine-learning classification is also reported but was not used for the band result.",
      design: "Case-control",
      cite: { authors: "Huang Y, et al.", year: 2023, title: "Analysis of EEG features and study of automatic classification in first-episode and drug-naïve patients with major depressive disorder", journal: "BMC Psychiatry" }
    },
    {
      id: "pm-40153921", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 140, k: null },
      sites: [], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["lowmood","anxiety"],
      claim: "MDD: lower relative alpha across channels with eyes open; lower alpha tracks severity",
      detail: "Resting EEG (20 channels) with eyes open and eyes closed in 70 MDD patients and 70 matched healthy controls; only the eyes-open result held. Average relative alpha was lower in MDD and correlated with depression and anxiety scores. Supplementary trends for fronto-central theta and occipital beta were not reported as significant and are left out. Task EEG in the same study (faces and vigilance ERPs) was excluded.",
      design: "Case-control",
      cite: { authors: "Kovacevic N, et al.", year: 2025, title: "Differences in resting state and task-based EEG measures between patients with major depressive disorder and healthy controls", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-40561721", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 51, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood","anxiety"],
      claim: "Young adults with MDD and anxiety: more relative left frontal alpha asymmetry than controls at rest",
      detail: "Resting frontal EEG asymmetry in 25 young adults with lifetime MDD and anxiety and 26 healthy controls, with a five-year follow-up in a subsample. The comorbid group showed more relative left frontal alpha; asymmetry was stable over five years in that group. Taken from the abstract; not checked in the full text. Single small case-control study.",
      design: "Case-control",
      cite: { authors: "Zsigo C, et al.", year: 2025, title: "Frontal alpha asymmetry in major depression and comorbid anxiety disorder: a five-year follow-up study", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-40945766", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 152, k: null },
      sites: [], bands: ["gamma"], direction: "down", evidence: "preliminary",
      changes: { gamma: "down" }, symptoms: ["lowmood"],
      claim: "MDD, recurrent or not: lower absolute gamma power across the head at rest, stable over time",
      detail: "Resting qEEG at three visits in 85 outpatients with MDD (59 recurrent, 26 non-recurrent) and 67 healthy controls. Absolute gamma was lower in both MDD groups than in controls across widespread regions; other bands showed no consistent difference. Taken from the abstract; not checked in the full text. Single-centre study with an unmatched treatment course.",
      design: "Case-control",
      cite: { authors: "Arıkan MK, et al.", year: 2026, title: "Gamma-band qEEG biomarkers as trait indicators in depression", journal: "J Affect Disord" }
    },
    {
      id: "pm-41214062", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 40, k: null },
      sites: ["Fp1","Fp2"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["lowmood","anxiety"],
      claim: "MDD: higher prefrontal high-alpha (11.9 Hz) power than controls at rest, eyes closed",
      detail: "Eyes-closed resting EEG from a 3-channel prefrontal device, checked against a 128-channel system, in 18 MDD patients and 22 controls drawn from the MODMA dataset. High-alpha relative power was higher in MDD (r=0.32, p=0.042). The paper averaged Fp1, Fpz and Fp2; Fpz is not a listed label, so Fp1 and Fp2 are recorded. The effect was modest (AUC 0.65) and the sample small.",
      design: "Case-control",
      cite: { authors: "Tang S, et al.", year: 2025, title: "High alpha oscillations in portable prefrontal EEG indicate gender-sensitive biomarkers for emotional disorders", journal: "Sci Rep" }
    },
    {
      id: "pm-41308891", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 98, k: null },
      sites: ["F3","F4"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Females with MDD: higher frontal alpha asymmetry at F3/F4 than controls, eyes closed",
      detail: "Resting EEG (eyes open and closed) in 68 MDD patients, 51 patients with bipolar disorder and 30 controls. Among females, F3/F4 asymmetry was higher in MDD than controls with eyes closed (p=0.041); in males the difference was in the bipolar group. Taken from the abstract; not checked in the full text. Small subgroup result from a single study.",
      design: "Case-control",
      cite: { authors: "Sun G, et al.", year: 2026, title: "Frontal alpha asymmetry across genders as a distinction between major depressive disorder and bipolar disorder", journal: "J Affect Disord" }
    },
    {
      id: "pm-41422967", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 227, k: null },
      sites: ["T5","T6"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["lowmood"],
      claim: "Unmedicated MDD: reduced parietal alpha asymmetry at P7-P8 (T5-T6) vs controls at rest",
      detail: "Resting EEG in 84 unmedicated MDD patients and 143 healthy controls; P7-P8 (T5-T6) asymmetry distinguished the groups (AUC 0.85). Taken from the abstract; not checked in the full text. The agomelatine treatment results and the P3-P4 treatment prediction are left out (treatment-response prediction). Frontal asymmetry showed no predictive value.",
      design: "Case-control",
      cite: { authors: "Lin CE, et al.", year: 2026, title: "Parietal alpha asymmetry as a diagnostic marker for depression and a predictive biomarker for anhedonia improvement after melatonergic antidepressant treatment", journal: "J Affect Disord" }
    },
    {
      id: "pm-8810860", condition: "depression", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 65, k: null },
      sites: ["F3","F4"], bands: ["hibeta"], direction: "up", evidence: "preliminary",
      changes: { hibeta: "up" }, symptoms: ["lowmood"],
      claim: "Depressed and remitted MDD: higher frontal beta-2 power than controls at rest, eyes closed",
      detail: "Eyes-closed resting EEG in 27 medicated patients with melancholic depression, 21 remitted patients on maintenance antidepressants, and 17 controls. Beta-2 (20-40 Hz) power was higher in both patient groups than in controls over the bilateral frontal sites. Taken from the abstract; not checked in the full text. Medication may affect the results; the paper is in Japanese with an English abstract.",
      design: "Case-control",
      cite: { authors: "Suzuki H, et al.", year: 1996, title: "[Quantitative EEG characteristics of the state of depressive phase and the state of remission in major depression]", journal: "Seishin Shinkeigaku Zasshi" }
    },
    {
      id: "cand-adhd-theta-cog-2005", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Fp1","F7","F3"], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["inattention"],
      claim: "ADHD: more resting theta over left frontal sites than controls, linked to attention test accuracy",
      detail: "Resting theta in children and adolescents with ADHD vs sex- and age-matched controls; frontal (primarily left) theta was higher and related to oddball accuracy. Taken from the abstract; not checked in the full text. Total group sizes are not stated in the abstract, so n is null.",
      design: "Case-control",
      cite: { authors: "Hermens DF, et al.", year: 2005, title: "Resting EEG theta activity predicts cognitive performance in attention-deficit hyperactivity disorder", journal: "Pediatr Neurol" }
    },
    {
      id: "pm-12374635", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 60, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","P3","Pz","P4","T5","T6","O1","O2"], bands: ["theta","alpha","delta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", alpha: "down", delta: "up", beta: "down" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD combined type: more theta; less posterior alpha and frontal beta than controls",
      detail: "Eyes-closed resting EEG in 20 boys with ADHD, 20 boys with ADHD plus ODD and 20 controls. Theta was higher in both ADHD groups, posterior alpha and frontal beta were lower, and posterior delta was higher. Taken from the abstract; not checked in the full text. Sites are the frontal and posterior regions named in the abstract, and the ODD comparison is not separated here.",
      design: "Case-control",
      cite: { authors: "Clarke AR, et al.", year: 2002, title: "Children with attention-deficit/hyperactivity disorder and comorbid oppositional defiant disorder: an EEG analysis", journal: "Psychiatry Res" }
    },
    {
      id: "cand-adhd-wang-2024", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 100, k: null },
      sites: ["F7","F3","Fz","F4","F8","Cz"], bands: ["theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", beta: "down" }, symptoms: ["inattention"],
      claim: "ADHD with abnormal CPT-3 scores: higher theta/beta ratio at frontal and midline sites than controls",
      detail: "Retrospective eyes-closed resting EEG (10 s) in 55 children and adolescents with ADHD vs 45 controls referred for headache, migraine or syncope. Only the ADHD subgroup with abnormal CPT-3 scores had a higher theta/beta ratio at Fz, Cz and frontal electrodes; the normal-CPT-3 subgroup matched controls. Correlations with CPT-3 and SNAP-IV were not significant and sensitivity was low.",
      design: "Case-control (retrospective)",
      cite: { authors: "Wang TS, Wang SS, Wang CL, Wong SB", year: 2024, title: "Theta/beta ratio in EEG correlated with attentional capacity assessed by Conners Continuous Performance Test in children with ADHD", journal: "Frontiers in Psychiatry" }
    },
    {
      id: "cand-adhd-takacs-2023", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 132, k: null },
      sites: ["Fz"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["inattention"],
      claim: "ADHD adolescents: lower resting frontal-midline alpha power than adolescents without ADHD",
      detail: "Resting-state power in 132 age- and sex-matched adolescents with and without ADHD; frontal-midline alpha was lower in the ADHD group. Task-based event-related synchronisation and ERP results are not used here. Taken from the abstract; not checked in the full text. Frontal-midline is mapped to Fz; exact electrodes not checked.",
      design: "Case-control",
      cite: { authors: "Takács M, et al. (verify)", year: 2023, title: "Theta and alpha activity are differentially associated with physiological and rating scale measures of affective processing in adolescents with but not without ADHD", journal: "Development and Psychopathology" }
    },
    {
      id: "pm-15978508", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD adolescents: more resting theta, widespread in males and frontal in females",
      detail: "Eyes-closed resting EEG with simultaneous skin conductance in 70 ADHD adolescents (48 males, 22 females) and age- and sex-matched controls. Males showed widespread theta increase; females showed a localised frontal theta enhancement, so the whole-head code is used. Taken from the abstract; not checked in the full text. Control group size is not stated, so n is null.",
      design: "Case-control",
      cite: { authors: "Hermens DF, et al.", year: 2005, title: "Sex differences in adolescent ADHD: findings from concurrent EEG and EDA", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-17166762", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 30, k: null },
      sites: [], bands: ["theta","delta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", delta: "up", alpha: "mixed", beta: "mixed" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD adolescent males: more delta and theta across the scalp; higher theta/beta ratio than controls",
      detail: "Eyes-closed resting EEG in 15 adolescent males with ADHD and 15 controls aged 14-17. Absolute delta and theta were higher across the scalp and the theta/beta ratio was higher. Alpha did not differ; relative beta was lower over posterior sites only. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Hobbs MJ, et al.", year: 2007, title: "EEG abnormalities in adolescent males with AD/HD", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-18662727", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["delta","theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "down", theta: "up", beta: "mixed" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD adults: less absolute delta and more relative theta across the scalp than controls",
      detail: "Eyes-closed resting EEG in 20 adult males with ADHD and age- and gender-matched controls (control size not stated, so n is null). Absolute delta was lower and relative theta higher across the entire scalp; absolute beta was lower at the midline and higher over right posterior sites, so beta is mixed. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Clarke AR, et al.", year: 2008, title: "EEG in adults with attention-deficit/hyperactivity disorder", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-18813700", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 60, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down", beta: "mixed" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD children: more diffuse delta and theta; less relative alpha1 at some sites than controls",
      detail: "Eyes-closed resting EEG from 15 sites in 30 children with ADHD and 30 sex- and age-matched controls. Absolute delta and theta were higher in a diffuse pattern; relative alpha1 was lower and absolute beta higher at some electrodes, which are not named in the abstract. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Fonseca LC, et al.", year: 2008, title: "Epileptiform abnormalities and quantitative EEG in children with attention-deficit/hyperactivity disorder", journal: "Arq Neuropsiquiatr" }
    },
    {
      id: "pm-19712709", condition: "adhd", type: "protocol",
      metrics: { design: 4, control: "active", blinded: null, n: 72, k: null },
      sites: ["Pz","Cz"], bands: ["theta","alpha"], direction: "ratio", evidence: "moderate",
      changes: { theta: "down", alpha: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD children, neurofeedback RCT: theta down and central alpha up vs active control training",
      detail: "Randomised trial in 72 children with ADHD (46 neurofeedback, 26 active computerised attention control) analysed for resting EEG; 102 were initially enrolled. Combined training reduced theta; the theta/beta block lowered posterior-midline theta and the SCP block raised central-midline alpha, with changes linked to German ADHD rating scale scores. Taken from the abstract; not checked in the full text.",
      design: "RCT (active-controlled)",
      cite: { authors: "Gevensleben H, et al.", year: 2009, title: "Distinct EEG effects related to neurofeedback training in children with ADHD: a randomized controlled trial", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-21309436", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 90, k: null },
      sites: [], bands: ["delta","theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "mixed", theta: "up", beta: "down" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD girls: more absolute and relative theta and less relative beta across the scalp than controls",
      detail: "Eyes-closed resting EEG from 21 electrodes in 30 girls with combined-type ADHD, 30 with inattentive-type ADHD and 30 controls. Across the scalp, both ADHD groups had higher absolute delta and theta, lower relative delta and beta, and higher relative theta, so delta is mixed. Taken from the abstract; not checked in the full text. Subtype differences are not included here.",
      design: "Case-control",
      cite: { authors: "Dupuy FE, et al.", year: 2011, title: "Girls with attention-deficit/hyperactivity disorder: EEG differences between DSM-IV types", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-23053601", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 105, k: null },
      sites: [], bands: ["theta","beta"], direction: "ratio", evidence: "contested",
      changes: { theta: "mixed", beta: "mixed" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD children and adults: no consistent resting theta or theta/beta increase vs matched controls",
      detail: "Topographic 48-channel resting EEG in 32 children and 22 adults with ADHD vs matched controls (30 and 21). No consistent theta or theta/beta increase was found, and spectral markers classified ADHD poorly; age effects were not used. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Liechti MD, et al.", year: 2013, title: "Diagnostic value of resting electroencephalogram in attention-deficit/hyperactivity disorder across the lifespan", journal: "Brain Topogr" }
    },
    {
      id: "pm-23249444", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 35, k: null },
      sites: [], bands: ["theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", alpha: "down", beta: "down" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD college students: lower alpha and beta and higher relative theta across the scalp than controls",
      detail: "Pilot study: eyes-closed resting 66-channel EEG in 18 college students with ADHD vs 17 peers. Relative slow-band power was higher across the scalp and alpha and beta were lower, most clearly for alpha; theta/beta ratio was higher at anterior and lateral sites. Eyes-open effects were weaker, and 10 of the 18 students were on medication.",
      design: "Case-control",
      cite: { authors: "Woltering S, et al.", year: 2012, title: "Resting state EEG oscillatory power differences in ADHD college students and their peers", journal: "Behav Brain Funct" }
    },
    {
      id: "pm-23355416", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 28, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD with dysfunctional anger, adults: frontal alpha asymmetry (relatively less left activity) vs controls",
      detail: "Resting EEG in 14 unmedicated adults with ADHD and dysfunctional anger vs 14 controls. Frontal absolute alpha asymmetry showed relatively decreased left (or increased right) activity. A beta1 increase and a more diffuse theta/beta distribution were reported but have no named region here, so they are not included. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Jaworska N, et al.", year: 2013, title: "The resting electrophysiological profile in adults with ADHD and comorbid dysfunctional anger: a pilot study", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-23467799", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 76, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD children: higher frontal alpha reactivity index (less alpha drop on eye opening) than controls",
      detail: "Eyes-closed vs eyes-open absolute alpha in 38 children with ADHD and 38 sex- and age-matched controls. Alpha fell on opening the eyes in both groups, but the reactivity index was greater in frontal regions of the ADHD group. Taken from the abstract; not checked in the full text. Individual electrodes are not named, so frontal sites are used.",
      design: "Case-control",
      cite: { authors: "Fonseca LC, et al.", year: 2013, title: "Electroencephalographic alpha reactivity on opening the eyes in children with attention-deficit hyperactivity disorder", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-23619205", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 171, k: null },
      sites: [], bands: ["theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", alpha: "down", beta: "down" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD boys with excess theta: more frontal theta and theta/beta ratio, less alpha and beta across the scalp than controls",
      detail: "Resting eyes-closed EEG in 104 boys with ADHD (combined or inattentive type) and 67 age-matched controls. The typical excess-theta subgroup had higher frontal theta and theta/beta ratio and lower alpha and beta across the scalp. The separate excess-beta subgroup (different pattern) is not included in this entry. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Clarke AR, et al.", year: 2013, title: "Excess beta activity in the EEG of children with attention-deficit/hyperactivity disorder: a disorder of arousal?", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-24125854", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 80, k: null },
      sites: [], bands: ["delta","beta","gamma"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", beta: "down", gamma: "down" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD girls: globally higher relative delta and lower absolute beta and gamma than controls",
      detail: "Eyes-closed resting EEG from 19 electrodes in 40 girls with ADHD and 40 girl controls. Relative delta was globally higher, and absolute beta and absolute and relative gamma were globally lower. Taken from the abstract; not checked in the full text. Symptom correlations within the groups are not used here.",
      design: "Case-control",
      cite: { authors: "Dupuy FE, et al.", year: 2014, title: "EEG and electrodermal activity in girls with Attention-Deficit/Hyperactivity Disorder", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-25097090", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 52, k: null },
      sites: ["Fp2","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Within adult ADHD: more ADHD symptoms linked to stronger right-frontal alpha (approach-related asymmetry)",
      detail: "Two resting eyes-closed EEG sessions in 52 adults with ADHD; asymmetry was averaged across sessions. ADHD symptom scores were associated with stronger relative right-frontal alpha power, a within-group correlation with no healthy control needed. Taken from the abstract; not checked in the full text. The asymmetry was more pronounced in females, and its link with depression was mediated by ADHD symptoms.",
      design: "Cross-sectional correlation",
      cite: { authors: "Keune PM, et al.", year: 2015, title: "Frontal brain asymmetry in adult attention-deficit/hyperactivity disorder (ADHD): extending the motivational dysfunction hypothesis", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-25200165", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 161, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "mixed", beta: "mixed" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD young people: higher delta and theta at session start only; beta higher at session end only",
      detail: "Two 3-minute eyes-open resting recordings at the start and end of a 1.5 h session in 76 people with ADHD and 85 controls. The ADHD group had higher delta and theta at the start, but not the end, and higher beta at the end only; alpha and theta/beta showed no clear group difference. Effects were found across regions and midline electrodes, so the whole-head code is used. Results shift with IQ adjustment.",
      design: "Case-control",
      cite: { authors: "Kitsune GL, et al.", year: 2015, title: "A Matter of Time: The Influence of Recording Context on EEG Spectral Power in Adolescents and Young Adults with ADHD", journal: "Brain Topogr" }
    },
    {
      id: "pm-27464584", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 60, k: null },
      sites: ["F7","F3","Fz","F4","F8","C3","Cz","C4","P3","Pz","P4"], bands: ["theta"], direction: "up", evidence: "contested",
      changes: { theta: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD women: higher eyes-open resting theta than controls in a post-hoc test; group main effect not significant",
      detail: "Eyes-open resting EEG in 20 women with ADHD, 20 with bipolar disorder and 20 controls. Absolute theta was higher in ADHD than controls at rest in a post-hoc test (d = 0.77), but the group main effect across frontal, central and parietal electrode averages was not significant. The bipolar comparison and the task condition are not used here.",
      design: "Case-control",
      cite: { authors: "Rommel AS, et al.", year: 2016, title: "Commonalities in EEG Spectral Power Abnormalities Between Women With ADHD and Women With Bipolar Disorder During Rest and Cognitive Performance", journal: "Brain Topogr" }
    },
    {
      id: "pm-28257875", condition: "adhd", type: "protocol",
      metrics: { design: 4, control: "usual", blinded: null, n: 85, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["delta","alpha"], direction: "ratio", evidence: "moderate",
      changes: { delta: "down", alpha: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD children: game-based cognitive and neurofeedback training lowered frontal delta and raised alpha vs waitlist",
      detail: "Randomised waitlist-controlled trial in 85 children with ADHD or subclinical ADHD using 25 home sessions of working memory, inhibition and neurofeedback training. Parents reported reduced symptoms; frontal delta fell and frontal alpha rose. The abstract does not say whether the frontal EEG changes were recorded at rest or during a task. Taken from the abstract; not checked in the full text.",
      design: "RCT (waitlist-controlled)",
      cite: { authors: "Johnstone SJ, et al.", year: 2017, title: "Game-based combined cognitive and neurofeedback training using Focus Pocus reduces symptom severity in children with diagnosed AD/HD and subclinical AD/HD", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-28900800", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 92, k: null },
      sites: ["F7","F3","Fz","F4","F8","C3","Cz","C4","T5","P3","Pz","P4","T6"], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "down", theta: "mixed", alpha: "mixed", beta: "mixed" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD boys (with or without ASD): lower frontal, central and parietal delta than boys without ADHD",
      detail: "Eyes-open resting EEG in 19 boys with ASD, 18 with ADHD, 29 with ASD plus ADHD and 26 controls (92 recruited; 74 analysed after artefact exclusion). In the ADHD factorial comparison, delta was lower at frontal, central and parietal clusters; theta, alpha and beta showed no ADHD effect. Within-sample symptom correlations with ADHD scores were not significant. Six ADHD and six ASD plus ADHD boys were on stimulants, withheld for 48 h.",
      design: "Case-control (factorial)",
      cite: { authors: "Shephard E, et al.", year: 2018, title: "Resting-State Neurophysiological Activity Patterns in Young People with ASD, ADHD, and ASD + ADHD", journal: "J Autism Dev Disord" }
    },
    {
      id: "pm-29110563", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 80, k: null },
      sites: [], bands: ["theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", alpha: "down", beta: "up" }, symptoms: ["executive"],
      claim: "Adult ADHD with high IQ: more theta and less alpha across the scalp, and more beta than controls",
      detail: "Eyes-closed resting EEG in 40 adults with ADHD (IQ 120 or above) and 40 controls, with executive function measured. Theta was globally higher and alpha globally lower; the beta increase was in central activity only, so sites are whole-head and the beta direction is partly regional. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Li H, et al.", year: 2019, title: "Increased Beta Activity Links to Impaired Emotional Control in ADHD Adults With High IQ", journal: "J Atten Disord" }
    },
    {
      id: "pm-29457912", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 101, k: null },
      sites: ["C4","P4"], bands: ["gamma"], direction: "down", evidence: "preliminary",
      changes: { gamma: "down" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Adult ADHD: lower eyes-open gamma power than controls, most marked over right centroparietal sites",
      detail: "Spontaneous eyes-open EEG in 42 adults with ADHD (25 medication-naive, 17 on methylphenidate) and 59 controls. Gamma 1 and gamma 2 were lower in ADHD, most in the right centroparietal region; gamma was inversely linked to symptom severity within the ADHD group. Taken from the abstract; not checked in the full text. Right centroparietal is mapped to C4 and P4.",
      design: "Case-control",
      cite: { authors: "Tombor L, et al.", year: 2019, title: "Decreased resting gamma activity in adult attention deficit/hyperactivity disorder", journal: "World J Biol Psychiatry" }
    },
    {
      id: "pm-31163371", condition: "adhd", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["delta","theta"], direction: "ratio", evidence: "moderate",
      changes: { delta: "down", theta: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD adults (followed from childhood): less frontal relative delta and more global relative theta than controls",
      detail: "Eyes-closed resting EEG in 25 men diagnosed with ADHD combined type as children, recorded in childhood and again as adults, compared with controls in adulthood. Adults had lower relative frontal delta and higher relative theta across the scalp. Control group size is not stated in the abstract, so n is null. Taken from the abstract; not checked in the full text. Childhood maturation results are not used.",
      design: "Longitudinal cohort with controls",
      cite: { authors: "Clarke AR, et al.", year: 2019, title: "EEG development in Attention Deficit Hyperactivity Disorder: From child to adult", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-31233897", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 169, k: null },
      sites: ["F7","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "contested",
      changes: { alpha: "asymmetry" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD adolescents, low negative affect: more right-frontal (F8/F7) alpha asymmetry; no overall effect",
      detail: "Resting EEG in 169 adolescents (79 with ADHD). Frontal alpha asymmetry did not differ by diagnosis overall; the rightward asymmetry at F8/F7 was found only in ADHD participants with low negative affect. Inconsistent discipline moderated the link with inattention. Posterior asymmetry showed no group effect.",
      design: "Cross-sectional case-control",
      cite: { authors: "Alperin BR, et al.", year: 2019, title: "The relationship between alpha asymmetry and ADHD depends on negative affect level and parenting practices", journal: "J Psychiatr Res" }
    },
    {
      id: "pm-31834950", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 134, k: null },
      sites: ["F3","Fz","F4","C3","Cz","C4","P3","Pz","P4"], bands: ["delta","theta","alpha","beta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "up", beta: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Adult ADHD: higher eyes-open delta, theta, alpha and beta power at centro-parietal sites than controls",
      detail: "Eyes-open resting EEG in 38 adults with ADHD, 45 unaffected relatives and 51 controls (134 total). Elevated centro-parietal delta, theta, low-alpha and frontal low-beta and parietal mid-beta best separated ADHD from controls in an elastic-net classifier. Relatives are not used here. TBR did not classify ADHD. Taken from the abstract; not checked in the full text.",
      design: "Case-control (classifier)",
      cite: { authors: "Kiiski H, et al.", year: 2020, title: "EEG spectral power, but not theta/beta ratio, is a neuromarker for adult ADHD", journal: "Eur J Neurosci" }
    },
    {
      id: "pm-31903823", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 28, k: null },
      sites: ["P3","Pz","P4"], bands: ["delta","theta","alpha"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD children: higher source-localised delta, theta and alpha in the parietal lobe than controls",
      detail: "Eyes-open resting EEG in 13 children with ADHD and 15 age-matched controls, analysed as current source density. Higher delta, theta and alpha in the parietal lobe for the ADHD group. Source-localised (sLORETA); mapped to the overlying scalp region. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Jouzizadeh M, et al.", year: 2020, title: "A spatial profile difference in electrical distribution of resting-state EEG in ADHD children using sLORETA", journal: "Int J Neurosci" }
    },
    {
      id: "pm-31911342", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 47, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "Adult ADHD: lower relative resting eyes-open alpha in frontal regions than controls at baseline",
      detail: "Baseline 3-minute eyes-open resting EEG (before neurofeedback) in 25 adults with ADHD and 22 healthy controls. Relative alpha was significantly lower in ADHD over the frontal region. Only the baseline resting result is used; neurofeedback, post-training and task results are not included. Individual frontal electrodes are not listed in the text, so the frontal region is used.",
      design: "Case-control",
      cite: { authors: "Deiber MP, et al.", year: 2020, title: "Linking alpha oscillations, attention and inhibitory control in adult ADHD with EEG neurofeedback", journal: "Neuroimage Clin" }
    },
    {
      id: "pm-32682239", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 81, k: null },
      sites: ["F3","Fz","F4","Cz","T3","T4"], bands: ["theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", beta: "down" }, symptoms: ["inattention","hyperactivity"],
      claim: "ADHD children: higher theta/beta ratio and more fronto-central and temporal theta source power than controls",
      detail: "Eyes-open resting EEG in 40 children with combined or inattentive ADHD and 41 age-matched controls, analysed at sensor level and as eLORETA cortical sources. Combined subtype showed a higher diffuse theta/beta ratio and a widespread beta source decrease; both subtypes showed higher theta/beta ratio, and ADHD showed fronto-central and temporal theta source power rising with age. Source regions are given at lobe level in the abstract and are mapped to the overlying scalp sites here. Taken from the abstract; not checked in the full text.",
      design: "Case-control (source analysis)",
      cite: { authors: "Ahmadi M, et al.", year: 2020, title: "Cortical source analysis of resting state EEG data in children with attention deficit hyperactivity disorder", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-34529233", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", beta: "down" }, symptoms: ["inattention","hyperactivity"],
      claim: "Adult ADHD males (DSM-5): globally lower absolute beta and higher relative theta; no global effect in females",
      detail: "Eyes-closed resting EEG from 19 sites in 16 males and 16 females with DSM-5 ADHD, with sex-matched controls. Males with ADHD had globally reduced absolute beta, globally elevated relative theta and a larger theta/beta ratio than male controls; females showed no global group effect. Control group size is not stated in the abstract, so n is null. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Dupuy FE, et al.", year: 2021, title: "DSM-5 Adult Attention-Deficit/Hyperactivity Disorder: Sex Differences in EEG Activity", journal: "Appl Psychophysiol Biofeedback" }
    },
    {
      id: "pm-35151696", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 225, k: null },
      sites: [], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD subtypes (combined and inattentive) vs controls: globally higher eyes-open relative theta",
      detail: "225 children aged 5-16 with ADHD combined or inattentive type vs controls, eyes-open resting EEG, with age groups. The AD/HD groups had globally increased relative theta; regional alpha and beta differences had no direction given in the abstract. Taken from the abstract; not checked in the full text. Case-control design.",
      design: "Case-control",
      cite: { authors: "Mason LM, et al.", year: 2022, title: "Age-related changes in the EEG in an eyes-open condition: II. Subtypes of AD/HD", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-35182242", condition: "adhd", type: "protocol",
      metrics: { design: 4, control: "active", blinded: null, n: 121, k: null },
      sites: ["O1","O2"], bands: ["alpha"], direction: "up", evidence: "moderate",
      changes: { alpha: "up" }, symptoms: ["inattention","hyperactivity","impulsivity","executive","memory"],
      claim: "Remote neurofeedback, computerized cognitive or combined training in children with ADHD: eyes-open alpha rose",
      detail: "121 children with ADHD randomised to remote neurofeedback, computerized cognitive training (active comparator) or both; 80 completed 3 months of training. Eyes-open relative alpha increased after training in all three groups, with a significant overall effect; no differences between groups. The EEG outcome is at O1 and O2 and the training sites are not described in the passages read. Eyes-closed alpha change was not significant.",
      design: "RCT (active comparator)",
      cite: { authors: "Luo X, et al.", year: 2023, title: "A randomized controlled study of remote computerized cognitive, neurofeedback, and combined training in the treatment of children with attention-deficit/hyperactivity disorder", journal: "Eur Child Adolesc Psychiatry" }
    },
    {
      id: "pm-36681294", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 102, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["delta","theta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up" }, symptoms: ["inattention","impulsivity","hyperactivity"],
      claim: "ADHD combined subtype: more frontal delta and theta than inattentive subtype and controls",
      detail: "34 children each with ADHD combined type, ADHD inattentive type and typically developing children, frontal single-channel dry-sensor EEG at eyes-closed rest, eyes-open rest and focus tasks. Frontal delta and theta power were higher in the combined subtype in all conditions; alpha and beta effects were moderated by daytime sleepiness and are not used here. Taken from the abstract; not checked in the full text. Cross-sectional comparison of three groups.",
      design: "Case-control",
      cite: { authors: "McCabe LE, et al.", year: 2023, title: "Links between excessive daytime sleepiness and EEG power and activation in two subtypes of ADHD", journal: "Biol Psychol" }
    },
    {
      id: "pm-38858839", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 66, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","C3","Cz","C4"], bands: ["theta","beta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", beta: "up" }, symptoms: ["inattention","hyperactivity","impulsivity"],
      claim: "Children with ADHD vs controls: more resting fronto-central theta and beta power",
      detail: "33 children aged 6-12 with ADHD and 33 without, resting-state EEG. Increased fronto-central theta and beta power were found in the ADHD group, with no difference in the theta/beta ratio; the theta power correlated with clinical symptoms in the ADHD group. Taken from the abstract; not checked in the full text. Case-control design; the aperiodic exponent is not used here.",
      design: "Case-control",
      cite: { authors: "Dakwar-Kawar O, et al.", year: 2024, title: "Aperiodic and periodic components of oscillatory brain activity in relation to cognition and symptoms in pediatric ADHD", journal: "Cereb Cortex" }
    },
    {
      id: "pm-39674997", condition: "adhd", type: "protocol",
      metrics: { design: 4, control: "sham", blinded: true, n: 142, k: null },
      sites: ["Fz","Cz"], bands: ["theta"], direction: "ratio", evidence: "contested",
      changes: { theta: "mixed" }, symptoms: ["inattention","hyperactivity","impulsivity"],
      claim: "Theta/beta ratio neurofeedback in children with ADHD: no change in resting theta vs sham",
      detail: "ICAN multi-centre double-blind RCT, 142 children with ADHD and high theta/beta ratio randomised to real or sham neurofeedback; training at Cz or Fz. Resting theta and frontal-midline theta during an oddball task showed no significant effect after training. Analysis was on fewer children (68) with complete resting data.",
      design: "RCT (sham-controlled)",
      cite: { authors: "Enriquez-Geppert S, et al.", year: 2025, title: "Theta/Beta Ratio Neurofeedback Effects on Resting and Task-Related Theta Activity in Children with ADHD", journal: "Appl Psychophysiol Biofeedback" }
    },
    {
      id: "pm-42347931", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 2284, k: null },
      sites: [], bands: ["delta","theta","beta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up", beta: "up" }, symptoms: ["inattention","hyperactivity","impulsivity"],
      claim: "Within ADHD symptoms: higher general-factor severity linked to widespread higher delta, theta and beta power",
      detail: "2,284 children and adolescents from the Healthy Brain Network with valid resting EEG; the general ADHD symptom factor was linked to widespread increases in delta, theta and beta power. Connectivity results are not used here. Taken from the abstract; not checked in the full text. Cross-sectional correlation, not a diagnostic group comparison.",
      design: "Cross-sectional correlation",
      cite: { authors: "Wang Z, et al.", year: 2026, title: "Dissociable EEG connectivity patterns reflect the latent general and specific dimensions of ADHD in children and adolescents", journal: "Eur Child Adolesc Psychiatry" }
    },
    {
      id: "pm-42350829", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 70, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "down", evidence: "preliminary",
      changes: { delta: "down", theta: "down", alpha: "down", beta: "down" }, symptoms: ["inattention","hyperactivity","impulsivity"],
      claim: "ADHD vs healthy controls: lower resting power across EEG spectra, eyes open and closed",
      detail: "54 ADHD patients and 16 healthy controls, eyes-open and eyes-closed resting EEG; the ADHD group had significantly reduced power across the spectra. The LORETA and MBCT treatment results are not used here (the MBCT treatment result is excluded). Taken from the abstract; not checked in the full text. Case-control comparison at baseline.",
      design: "Case-control",
      cite: { authors: "Schoenberg PLA, et al.", year: 2026, title: "Electrocortical Indices of Default Mode Network-Related Activity in ADHD and Modulation Through Mindfulness-Based Cognitive Therapy", journal: "Brain Topogr" }
    },
    {
      id: "pm-9472424", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 52, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["inattention","hyperactivity","impulsivity"],
      claim: "Adolescent ADHD vs controls: more anterior absolute theta at eyes-open rest",
      detail: "26 unmedicated adolescent boys with ADHD and 26 matched controls, eyes-open resting EEG. Anterior absolute theta was higher in the ADHD group; anterior is mapped to the frontal region. The reduced posterior relative beta is not recorded here. Taken from the abstract; not checked in the full text. Case-control study from 1998.",
      design: "Case-control",
      cite: { authors: "Lazzaro I, et al.", year: 1998, title: "Quantified EEG activity in adolescent attention deficit hyperactivity disorder", journal: "Clin Electroencephalogr" }
    },
    {
      id: "pm-31429702", condition: "adhd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 31, k: null },
      sites: ["F3","Fz","F4","C3","Cz","C4","P3","Pz","P4","O1","O2"], bands: ["delta","theta"], direction: "down", evidence: "preliminary",
      changes: { delta: "down", theta: "down" }, symptoms: ["lowmood"],
      claim: "Within adult ADHD: stable-arousal group (more depressive symptoms) has lower delta and theta power",
      detail: "31 unmedicated adult ADHD outpatients, 15-minute eyes-closed resting EEG split by arousal stability. The stable group, which reported more depressive symptoms, had lower absolute delta and theta power at frontal, central, parietal and occipital sites; alpha and beta did not differ. No healthy control group; small sample.",
      design: "Within-group comparison (cross-sectional)",
      cite: { authors: "Huang J, et al.", year: 2019, title: "Brain arousal regulation and depressive symptomatology in adults with attention-deficit/hyperactivity disorder (ADHD)", journal: "BMC Neurosci" }
    },
    {
      id: "pm-10466736", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 45, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","P4","T6","O2"], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "down", alpha: "down", beta: "up" }, symptoms: ["psychosis"],
      claim: "First-episode unmedicated schizophrenia: anterior delta up, frontal theta and alpha down, right posterior beta up",
      detail: "9 acute, neuroleptic-naive first-episode patients vs 36 controls, 19-channel resting EEG. Source-localised (LORETA); mapped to the overlying scalp region. Anterior excess of delta; anterior-inferior deficit of theta and left-sided alpha; right posterior-superior excess of beta mapped to P4, T6 and O2. Taken from the abstract; not checked in the full text. Small case-control study.",
      design: "Case-control",
      cite: { authors: "Pascual-Marqui RD, et al.", year: 1999, title: "Low resolution brain electromagnetic tomography (LORETA) functional imaging in acute, neuroleptic-naive, first-episode, productive schizophrenia", journal: "Psychiatry Res" }
    },
    {
      id: "pm-11295374", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["delta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up" }, symptoms: ["psychosis"],
      claim: "Unmedicated schizophrenia vs controls: more frontally pronounced resting delta",
      detail: "39 unmedicated schizophrenic patients vs a normal control group (size not stated in the abstract), resting EEG. Frontally pronounced delta activity was increased in the patients. The 21 people with schizotypal personality did not show this increase. Taken from the abstract; not checked in the full text. Case-control design.",
      design: "Case-control",
      cite: { authors: "Wuebben Y, et al.", year: 2001, title: "Hypofrontality -- a risk-marker related to schizophrenia?", journal: "Schizophr Res" }
    },
    {
      id: "pm-14595470", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 65, k: null },
      sites: ["Fp2","F4","F8"], bands: ["delta","theta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up" }, symptoms: ["psychosis"],
      claim: "Chronic medicated schizophrenia: more right frontal delta and theta source activity than controls",
      detail: "25 chronic medicated patients vs 40 controls, resting 19-channel EEG. Source-localised (LORETA); mapped to the overlying scalp region. Excess delta plus theta over right middle and inferior frontal gyri; the anterior cingulate and insula findings are deep structures and are not mapped. Taken from the abstract; not checked in the full text. Small case-control study.",
      design: "Case-control",
      cite: { authors: "Veiga H, et al.", year: 2003, title: "Neurocortical electrical activity tomography in chronic schizophrenics", journal: "Arq Neuropsiquiatr" }
    },
    {
      id: "pm-18381357", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["beta"], direction: "up", evidence: "preliminary",
      changes: { beta: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: resting frontal beta higher than controls; delta and theta not mapped to regions",
      detail: "Patients with schizophrenia compared with controls on resting EEG, with first-degree relatives also reported; only the patient beta result is used here. Excess high-frequency (beta) activity is reported over frontal regions; the delta and theta increases are not tied to named regions in the abstract, so they are not included. Taken from the abstract; not checked in the full text. Sample sizes are not stated in the abstract.",
      design: "Case-control",
      cite: { authors: "Venables NC, et al.", year: 2009, title: "Genetic and disorder-specific aspects of resting state EEG abnormalities in schizophrenia", journal: "Schizophr Bull" }
    },
    {
      id: "pm-18636993", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 28, k: null },
      sites: [], bands: ["alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "mixed", beta: "down" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: whole-head alpha and beta power lower; prefrontal alpha relatively higher than controls",
      detail: "14 patients vs 14 matched controls, whole-head resting EEG. Absolute alpha and beta power were globally lower (mapped to whole-head); relative alpha was higher over prefrontal sites and lower over posterior sites, so alpha is marked mixed. Alpha effects were linked to PANSS symptoms and chronicity within patients. Taken from the abstract; not checked in the full text. Very small case-control study.",
      design: "Case-control",
      cite: { authors: "Knyazeva MG, et al.", year: 2008, title: "Alpha rhythm and hypofrontality in schizophrenia", journal: "Acta Psychiatr Scand" }
    },
    {
      id: "pm-19199131", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 20, k: null },
      sites: ["Fp1","F7","F3"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["psychosis"],
      claim: "Within schizophrenia: more positive symptoms linked to greater relative left frontal EEG activity",
      detail: "20 community outpatients with schizophrenia, resting eyes-based regional alpha activity; the within-patient correlation of positive symptoms with left frontal relative activity is used, with no healthy control group. Shyness and sociability results are not part of the atlas. Taken from the abstract; not checked in the full text. Small pilot cross-sectional study.",
      design: "Cross-sectional correlation (pilot)",
      cite: { authors: "Jetha MK, et al.", year: 2009, title: "Resting frontal EEG asymmetry and shyness and sociability in schizophrenia: a pilot study of community-based outpatients", journal: "Int J Neurosci" }
    },
    {
      id: "pm-21862398", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 318, k: null },
      sites: [], bands: ["delta","theta","alpha","gamma"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "up", gamma: "up" }, symptoms: ["psychosis"],
      claim: "Medicated schizophrenia: resting theta-alpha, delta and gamma power higher than controls",
      detail: "128 medicated patients vs 110 controls (80 unmedicated relatives also recorded, reported separately and not used here), eyes-closed resting EEG on 10 channels. The theta-alpha increase (5-11 Hz) was significant in all 10 channels, so it is recorded as whole-head; gamma (40-85 Hz) and delta were higher in patients. The sensory gating (paired-click) results are evoked and excluded.",
      design: "Case-control",
      cite: { authors: "Hong LE, et al.", year: 2012, title: "A shared low-frequency oscillatory rhythm abnormality in resting and sensory gating in schizophrenia", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-22125634", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 42, k: null },
      sites: ["P3","Pz","P4"], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["psychosis"],
      claim: "Within epilepsy: psychotic patients show more parietal theta source activity than non-psychotic patients",
      detail: "21 patients with schizophrenia-like psychosis of epilepsy vs 21 non-psychotic epilepsy patients, resting eyes-closed EEG. Source-localised (eLORETA); mapped to the overlying scalp region: theta higher in medial and lateral parietal cortex bilaterally. Beta2 connectivity results are excluded (CN). Small case-control study.",
      design: "Case-control",
      cite: { authors: "Canuet L, et al.", year: 2011, title: "Resting-state EEG source localization and functional connectivity in schizophrenia-like psychosis of epilepsy", journal: "PLoS One" }
    },
    {
      id: "pm-23051885", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 60, k: null },
      sites: ["Fp1","Fp2","F7","F3","F4","F8","T3","T4","T5","T6","P3","P4"], bands: ["gamma"], direction: "up", evidence: "preliminary",
      changes: { gamma: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia with more minor physical anomalies: higher resting gamma power over frontal, temporal and parietal sites",
      detail: "Result is for the higher-minor-physical-anomaly subgroup of 40 drug-free patients vs 20 controls, 192-channel resting EEG. Low gamma (30-50 Hz) was higher over right frontal, parietal and temporal sites; high gamma (71-100 Hz) over left sites; both are listed as gamma. Coherence results are excluded (CN). Taken from the abstract; not checked in the full text. Small case-control study.",
      design: "Case-control",
      cite: { authors: "Tikka SK, et al.", year: 2013, title: "Increased spontaneous gamma power and synchrony in schizophrenia patients having higher minor physical anomalies", journal: "Psychiatry Res" }
    },
    {
      id: "pm-24090715", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 268, k: null },
      sites: [], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "contested",
      changes: { delta: "mixed", theta: "mixed", alpha: "mixed" }, symptoms: ["psychosis"],
      claim: "Schizophrenia vs controls: no difference in resting delta, theta or alpha power (coherence excluded)",
      detail: "132 schizophrenia patients vs 136 non-psychiatric controls, resting EEG power across frontal, central, parietal and temporal regions. Repeated-measures ANOVA found no significant diagnosis effect for delta, theta, alpha1 or alpha2 power at any region, so this is a null result. Bipolar comparisons and coherence results are not used here (coherence is CN). Medication and age were covariates.",
      design: "Case-control",
      cite: { authors: "Kam JW, et al.", year: 2013, title: "Resting state EEG power and coherence abnormalities in bipolar disorder and schizophrenia", journal: "J Psychiatr Res" }
    },
    {
      id: "pm-24439302", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 425, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "up", beta: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia probands: higher resting delta, theta, alpha and slow beta than healthy controls",
      detail: "225 schizophrenia probands vs 200 healthy controls, 64-channel resting EEG reduced by group ICA to spectral components. Theta and slow alpha were higher at most scalp sites, so the result is recorded as whole-head; delta was strongest over frontal sites and slow beta over frontal and central sites. Bipolar probands and relatives are reported separately and are not used here. Case-control design.",
      design: "Case-control",
      cite: { authors: "Narayanan B, et al.", year: 2014, title: "Resting state electroencephalogram oscillatory abnormalities in schizophrenia and psychotic bipolar patients and their relatives from the bipolar and schizophrenia network on intermediate phenotypes study", journal: "Biol Psychiatry" }
    },
    {
      id: "pm-25310340", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 50, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: lacks the left-lateralised resting frontal alpha asymmetry seen in controls",
      detail: "25 outpatients with schizophrenia vs 25 healthy controls, resting alpha (8-12 Hz) frontal asymmetry. Patients did not show the left-lateralised activity present in controls, which the authors read as reduced approach motivation. Asymmetry did not correlate with symptom ratings within patients. Taken from the abstract; not checked in the full text. Small case-control study.",
      design: "Case-control",
      cite: { authors: "Horan WP, et al.", year: 2014, title: "Approach and withdrawal motivation in schizophrenia: an examination of frontal brain asymmetric activity", journal: "PLoS One" }
    },
    {
      id: "pm-25595562", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 180, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","C3","Cz","C4"], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["psychosis"],
      claim: "Un-medicated schizophrenia: more frontocentral delta and theta, less alpha2 than controls",
      detail: "90 un-medicated patients vs 90 normal controls, resting eyes-closed EEG across five bands. Increases in delta and theta and a decrease in alpha2 were most marked frontocentral (frontal and central sites together). Alpha1 and beta showed no difference. The reported classifier accuracy (62.2%) is not used. Taken from the abstract; not checked in the full text. Case-control study.",
      design: "Case-control",
      cite: { authors: "Kim JW, et al.", year: 2015, title: "Diagnostic utility of quantitative EEG in un-medicated schizophrenia", journal: "Neurosci Lett" }
    },
    {
      id: "pm-26159669", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 36, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","O1","O2"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: less eyes-closed alpha power over frontal and occipital areas than controls",
      detail: "13 people with schizophrenia, 13 healthy controls and 10 non-schizophrenia patients on antipsychotics, 256-channel resting EEG. Alpha power was lower over frontal and occipital sites in schizophrenia, and the frontal deficit persisted under visual stimulation. Small case-control study. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Goldstein MR, et al.", year: 2015, title: "Topographic deficits in alpha-range resting EEG activity and steady state visual evoked responses in schizophrenia", journal: "Schizophr Res" }
    },
    {
      id: "pm-26952695", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 60, k: null },
      sites: ["Fp2","F4","F8","C4","T4","P4","T6","O2"], bands: ["gamma"], direction: "up", evidence: "preliminary",
      changes: { gamma: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia with first-rank symptoms: more right-sided resting gamma power than controls",
      detail: "20 patients with first-rank symptoms, 20 without, and 20 healthy controls, 256-electrode resting EEG. Gamma power was higher over right hemispheric regions, especially the right inferior parietal lobule, in patients with first-rank symptoms. Sites are all right-side electrodes because the abstract names right hemisphere only. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Tikka SK, et al.", year: 2016, title: "Schneiderian first rank symptoms in schizophrenia: A developmental neuroscience evaluation", journal: "Int J Dev Neurosci" }
    },
    {
      id: "pm-27001559", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 60, k: null },
      sites: ["T4","T6","P4","Fz","Cz","Pz"], bands: ["gamma"], direction: "down", evidence: "preliminary",
      changes: { gamma: "down" }, symptoms: ["psychosis"],
      claim: "Schizophrenia and unaffected siblings: less high gamma (above 70 Hz) over right temporo-parietal and midline sites",
      detail: "20 remitted schizophrenia patients, 20 unaffected siblings and 20 healthy controls, awake resting 192-channel EEG. High-gamma power was lower over right temporo-parietal and midline regions in patients and siblings than controls. Sibling group included, but the sample is not only relatives. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Umesh S, et al.", year: 2018, title: "Social anhedonia and gamma band abnormalities as a composite/multivariate endophenotype for schizophrenia: a dense array EEG study", journal: "Early Interv Psychiatry" }
    },
    {
      id: "pm-28483096", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 30, k: null },
      sites: ["Fp1","F7","F3","T3","T5"], bands: ["alpha","theta"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "down", theta: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: lower left frontal and temporal alpha/theta ratio than controls, linked to negative symptoms",
      detail: "15 drug-free or drug-naive patients with schizophrenia and 15 matched controls, 192-channel resting EEG. The alpha/theta ratio was lower over left frontal and left temporal sites in patients and tracked negative symptom scores. Small case-control study. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Mitra S, et al.", year: 2017, title: "Electroencephalogram alpha-to-theta ratio over left fronto-temporal region correlates with negative symptoms in schizophrenia", journal: "Asian J Psychiatr" }
    },
    {
      id: "pm-2898871", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 36, k: null },
      sites: ["O1","O2"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["psychosis","anxiety"],
      claim: "Within schizophrenia: left/right asymmetry of posterior alpha tracks anxiety/depression and psychotic symptoms",
      detail: "36 schizophrenic outpatients on neuroleptics, resting EEG with absolute alpha power at F3, F4, O1 and O2. A more left-lateralised posterior alpha ratio went with higher anxiety/depression scores, and psychotic symptoms followed an inverted-U pattern. Cross-sectional correlations in patients only, with no healthy control group. Taken from the abstract; not checked in the full text.",
      design: "Cross-sectional correlation",
      cite: { authors: "Gaebel W, et al.", year: 1988, title: "Topographical distribution of absolute alpha-power in the EEG and psychopathology in schizophrenic outpatients", journal: "Acta Psychiatr Scand" }
    },
    {
      id: "pm-29569047", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 136, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","C3","Cz","C4","P3","Pz","P4","T5","T6","O1","O2"], bands: ["gamma"], direction: "up", evidence: "preliminary",
      changes: { gamma: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: higher eyes-closed gamma (30-48 Hz) over fronto-central and posterior sites than controls",
      detail: "60 patients with schizophrenia and 76 healthy controls, 256-channel eyes-closed resting EEG. Absolute gamma power was higher in patients, clustered in fronto-central and posterior regions, and rose with PANSS severity. Sites are the union of the named frontal, central and posterior regions. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Baradits M, et al.", year: 2019, title: "Alterations in resting-state gamma activity in patients with schizophrenia: a high-density EEG study", journal: "Eur Arch Psychiatry Clin Neurosci" }
    },
    {
      id: "pm-29643331", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 109, k: null },
      sites: [], bands: ["delta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", alpha: "down" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: higher delta/alpha ratio than controls, mostly across the whole head (eyes closed and open)",
      detail: "28 patients with schizophrenia, 28 with bipolar I psychosis, 24 with methamphetamine-induced psychosis and 29 controls, resting EEG eyes open and closed. The delta/alpha ratio was higher in schizophrenia than controls, mostly globally. The bipolar and methamphetamine groups are reported separately and not used here. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Howells FM, et al.", year: 2018, title: "Electroencephalographic delta/alpha frequency activity differentiates psychotic disorders: a study of schizophrenia, bipolar disorder and methamphetamine-induced psychotic disorder", journal: "Transl Psychiatry" }
    },
    {
      id: "pm-31634240", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 103, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","C3","Cz","C4"], bands: ["delta","theta","alpha"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: more delta, theta and alpha over anterior and central sites than controls (eyes open)",
      detail: "33 healthy controls, 35 unaffected first-degree relatives and 35 patients with schizophrenia, resting eyes-open EEG. Patients showed increased delta, theta and alpha power over anterior and central regions. The relatives' gamma correlation with schizotypy is not used here. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Chen C, et al.", year: 2019, title: "The relationship between resting electroencephalogram oscillatory abnormalities and schizotypal personality traits in the first-degree relatives of schizophrenia patients", journal: "Neuroreport" }
    },
    {
      id: "pm-33434730", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 43, k: null },
      sites: [], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["psychosis"],
      claim: "First-episode psychosis: less low alpha over the whole head in the morning, eyes closed, than controls",
      detail: "26 first-episode psychosis patients and 17 matched controls, resting EEG. Low alpha power was reduced widely in patients in the morning with eyes closed, and lower low alpha went with worse positive symptoms. Eyes-open and evening results are not used here. Small case-control study. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Zhang Y, et al.", year: 2021, title: "Distinct alterations in resting-state electroencephalogram during eyes closed and eyes open and between morning and evening are present in first-episode psychosis patients", journal: "Schizophr Res" }
    },
    {
      id: "pm-33503585", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 59, k: null },
      sites: [], bands: ["gamma"], direction: "up", evidence: "preliminary",
      changes: { gamma: "up" }, symptoms: ["psychosis"],
      claim: "First-episode psychosis: higher resting gamma (31-70 Hz) across most regions than controls",
      detail: "29 neuroleptic-naive or neuroleptic-free patients with first-episode non-affective psychosis and 30 matched controls, 192-channel resting EEG. Gamma power at 31-50 Hz and 51-70 Hz was higher in patients in most regions, so sites are left as whole-head. Small observational study. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Yadav S, et al.", year: 2021, title: "Resting state quantitative electroencephalogram gamma power spectra in patients with first episode psychosis: An observational study", journal: "Asian J Psychiatr" }
    },
    {
      id: "pm-33538105", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 28, k: null },
      sites: ["C3","Cz","C4"], bands: ["delta"], direction: "down", evidence: "preliminary",
      changes: { delta: "down" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: lower central delta band power than controls, mostly from a scale-free shift",
      detail: "14 patients with schizophrenia and 14 controls, resting EEG. Delta band-limited power was lower over central regions in mixed spectra, but the authors attribute this mainly to a shift in the scale-free (fractal) component rather than oscillations. Small study. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Racz FS, et al.", year: 2021, title: "Separating scale-free and oscillatory components of neural activity in schizophrenia", journal: "Brain Behav" }
    },
    {
      id: "pm-3495249", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 28, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "mixed", alpha: "mixed", beta: "mixed" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: diffuse mild delta increase over the scalp, not frontal, versus controls",
      detail: "15 medication-free patients with schizophrenia and 13 controls, 28-channel resting EEG with eye-movement epochs removed. Delta power was mildly higher across the scalp without frontal localisation, and the other bands showed no difference. Small study from 1987. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Karson CN, et al.", year: 1987, title: "Computed electroencephalographic activity mapping in schizophrenia. The resting state reconsidered", journal: "Arch Gen Psychiatry" }
    },
    {
      id: "pm-3751669", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["psychosis"],
      claim: "Chronic psychosis: more 5-8 Hz slow activity over frontal sites than matched controls at rest",
      detail: "10 chronic psychotic patients compared with matched healthy controls, resting EEG. Slow activity at about 5.2-7.6 Hz was higher, particularly over frontal areas, and the difference was smaller with eyes open. Total sample size is not stated in the abstract, so n is left blank. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Müller HF, et al.", year: 1986, title: "Topography and possible physiological significance of EEG amplitude variability in psychosis", journal: "Acta Psychiatr Scand" }
    },
    {
      id: "pm-38217348", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 75, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["theta","alpha"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", alpha: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: higher 6-9 Hz theta/alpha component at rest, mainly prefrontal (source-localised)",
      detail: "39 chronic patients and 36 matched controls, dense-array resting EEG. A 6-9 Hz theta/alpha component was unique to patients, and their peak alpha frequency was lower. Source-localised (standardised LORETA); the prefrontal source is mapped to the overlying frontal scalp region, and the parahippocampal source is not mapped. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Nakhnikian A, et al.", year: 2024, title: "Spectral decomposition of resting state electroencephalogram reveals unique theta/alpha activity in schizophrenia", journal: "Eur J Neurosci" }
    },
    {
      id: "pm-39799666", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 101, k: null },
      sites: ["F3","F4"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["social"],
      claim: "Schizophrenia: frontal alpha asymmetry differs from controls, but is not linked to social functioning",
      detail: "33 patients with schizophrenia, 38 healthy controls and 30 autism participants analysed (101 of 103 recruited), 64-channel eyes-open resting EEG. Alpha asymmetry from homologous F3 and F4 differed between patients and controls, but was not related to social functioning in patients. The autism group is reported separately and not used here. Small cross-sectional study.",
      design: "Case-control",
      cite: { authors: "Farina EA, et al.", year: 2025, title: "Social functioning and frontal alpha asymmetry in schizophrenia", journal: "J Psychiatr Res" }
    },
    {
      id: "pm-40550812", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 116, k: null },
      sites: ["T3","T4","T5","T6","O1","O2"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: higher eyes-open low alpha (about 8 Hz) over temporal and occipital sites than controls",
      detail: "55 patients with schizophrenia and 61 healthy controls, resting EEG with eyes open and closed. Low alpha (about 8 Hz) power was higher in patients with eyes open, most clearly over temporal-occipital sites; the eyes-closed difference was weaker. High-alpha correlations with symptoms are not used here. Small case-control study.",
      design: "Case-control",
      cite: { authors: "Han C, et al.", year: 2025, title: "Distinct oscillatory mechanisms in low and high alpha-band activities for screening and potential treatment of Schizophrenia", journal: "Transl Psychiatry" }
    },
    {
      id: "pm-40792462", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 134, k: null },
      sites: [], bands: ["theta","alpha"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", alpha: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: more resting 4-10 Hz power over widespread regions than controls",
      detail: "66 neurotypical controls and 68 patients with schizophrenia, resting EEG. Resting power in the 4-10 Hz range was higher over widespread regions in patients. The auditory steady-state and rest-task shift results are not used here. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Mitoma R, et al.", year: 2025, title: "Abnormal spontaneous activity and rest-task shift in schizophrenia", journal: "Psychiatry Clin Neurosci" }
    },
    {
      id: "pm-41045101", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 249, k: null },
      sites: [], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["psychosis","memory"],
      claim: "Schizophrenia spectrum: higher scalp theta power at rest than controls, linked to worse working memory",
      detail: "152 healthy controls and 97 patients with schizophrenia spectrum disorders, resting EEG. Global scalp theta power was higher in patients, and higher frontoinsular theta was linked to worse cognition within patients. Deep frontoinsular sources are not mapped to scalp sites. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Hasanaj G, et al.", year: 2025, title: "Periodic and Aperiodic Alterations of Resting-State EEG in Schizophrenia Spectrum Disorders: Cognitive and Clinical Insights", journal: "Eur J Neurosci" }
    },
    {
      id: "pm-42759803", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 18, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","C3","Cz","C4","T3","T4","T5","T6"], bands: ["delta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up" }, symptoms: ["psychosis"],
      claim: "Within schizophrenia: more frontal, central and temporal eyes-open delta tracks positive symptoms",
      detail: "18 patients with recent-onset schizophrenia spectrum disorder, 19-channel eyes-open resting EEG, cross-sectional correlations with PANSS. Higher delta power over frontal, central and temporal regions correlated with greater positive symptom severity, mainly hallucinations and delusions. Very small preliminary study with no healthy control group. Taken from the abstract; not checked in the full text.",
      design: "Cross-sectional correlation",
      cite: { authors: "Vahid-Vahdat P, et al.", year: 2026, title: "Frequency-specific QEEG spectral power correlates of positive and negative symptom severity in recent-onset schizophrenia", journal: "Neuroscience" }
    },
    {
      id: "pm-474178", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["P3","O1"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["psychosis"],
      claim: "Hebephrenic schizophrenia: higher eyes-closed alpha over left parieto-occipital sites than controls",
      detail: "Six hebephrenic patients and 12 controls contributed eyes-closed EEG recordings; the total participant count is not stated, so n is left blank. Alpha intensity was higher over the left parieto-occipital area in the hebephrenic group, with an amplitude hypovariability over central regions. The second schizophrenic group is not reported separately here. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Etevenon P, et al.", year: 1979, title: "Intra- and interhemispheric EEG differences quantified by spectral analysis. Comparative study of two groups of schizophrenics and a control group", journal: "Acta Psychiatr Scand" }
    },
    {
      id: "pm-7388249", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["T3","T4","T5","T6"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["psychosis"],
      claim: "Acute schizophrenia: less alpha power than controls, largely over temporal sites",
      detail: "Several groups of controls and schizophrenia patients were recorded on four channels (T4-T6, P4-O2, T3-T5, P3-O1) with eyes closed and eyes open; the total participant count is not stated, so n is left blank. The acute schizophrenic group had less alpha power, largely over temporal areas. The chronic outpatient and long-stay groups are not used here. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Fenton GW, et al.", year: 1980, title: "EEG spectral analysis in schizophrenia", journal: "Br J Psychiatry" }
    },
    {
      id: "pm-7893770", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 34, k: null },
      sites: [], bands: ["alpha","delta","theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "down", delta: "mixed", theta: "mixed", beta: "mixed" }, symptoms: ["psychosis"],
      claim: "First-episode paranoid schizophrenia: lower resting alpha-2 power over all regions than controls",
      detail: "14 drug-naive patients with first-episode paranoid schizophrenia and 20 matched controls, resting EEG. Alpha-2 amplitude was lower over all recording regions, and no other band differed. Photic stimulation results are not used here. Small case-control study. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Wada Y, et al.", year: 1994, title: "Quantitative EEG analysis at rest and during photic stimulation in drug-naive patients with first-episode paranoid schizophrenia", journal: "Eur Arch Psychiatry Clin Neurosci" }
    },
    {
      id: "pm-7972603", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 326, k: null },
      sites: [], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["psychosis"],
      claim: "First-episode schizophrenia: generalised more delta and theta and less alpha than controls at rest",
      detail: "50 first-episode schizophrenia patients compared with 113 nonpsychiatric subjects; the sample also includes bipolar patients and relatives (n = 326 in total), which are not used here. Resting EEG showed a generalised pattern of more delta and theta and less alpha in schizophrenia. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Clementz BA, et al.", year: 1994, title: "Resting EEG in first-episode schizophrenia patients, bipolar psychosis patients, and their first-degree relatives", journal: "Psychophysiology" }
    },
    {
      id: "pm-8146253", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 204, k: null },
      sites: [], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: more delta and theta, less alpha than controls, in both first-episode and chronic patients",
      detail: "102 schizophrenic patients (44 first-episode, 58 chronic) and 102 normal comparison subjects, resting EEG. Patients showed more delta and theta and less alpha, with no difference between first-episode and chronic patients. No regions are named, so sites are left as whole-head. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Sponheim SR, et al.", year: 1994, title: "Resting EEG in first-episode and chronic schizophrenia", journal: "Psychophysiology" }
    },
    {
      id: "pm-8471683", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 22, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: relatively more frontal alpha activity than controls, eyes closed",
      detail: "13 patients with schizophrenia and 9 age-matched controls, awake eyes-closed resting EEG. Relative alpha frequency activity was higher over frontal regions in patients. Very small study. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Kahn EM, Weiner RD, et al.", year: 1993, title: "Spectral and topographic analysis of EEG in schizophrenic patients", journal: "Biol Psychiatry" }
    },
    {
      id: "pm-25587799", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 48, k: null },
      sites: ["T3","T4","T5","T6"], bands: ["gamma"], direction: "ratio", evidence: "contested",
      changes: { gamma: "mixed" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: resting gamma (30-100 Hz) in auditory cortex does not differ from controls",
      detail: "24 patients with chronic schizophrenia and 24 matched controls; resting-state recording in 18 per group. Source-localised (dipole source localisation); mapped to the overlying scalp region (auditory cortex, temporal). No difference in resting gamma power; the positive gamma increase was during auditory steady-state stimulation and is excluded as task EEG. Null resting result.",
      design: "Case-control",
      cite: { authors: "Hirano Y, et al.", year: 2015, title: "Spontaneous Gamma Activity in Schizophrenia", journal: "JAMA Psychiatry" }
    },
    {
      id: "pm-26101851", condition: "schizophrenia", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 306, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","P3","Pz","P4","T5","T6","O1","O2"], bands: ["delta","theta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up" }, symptoms: ["psychosis"],
      claim: "Schizophrenia: higher eyes-open anterior delta and posterior theta component loadings than controls",
      detail: "105 patients with schizophrenia, 145 psychotic bipolar probands and 56 healthy controls, 64-channel eyes-open resting EEG analysed with group ICA. Patients had higher loadings on an anterior delta component and a posterior theta component than controls, mapped to frontal and posterior sites. The bipolar group is reported separately and not used here; genetic gene-network results are not used. Case-control design with a genetic analysis.",
      design: "Case-control",
      cite: { authors: "Narayanan B, et al.", year: 2015, title: "Multivariate genetic determinants of EEG oscillations in schizophrenia and psychotic bipolar disorder from the BSNIP study", journal: "Transl Psychiatry" }
    },
    {
      id: "cand-gad-wang-2025", condition: "anxiety", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 190, k: null },
      sites: ["C3","Cz","C4","T3","T4","T5","T6"], bands: ["beta","alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { beta: "up", alpha: "asymmetry" }, symptoms: ["anxiety"],
      claim: "GAD: more central beta power and rightward temporal alpha asymmetry than controls",
      detail: "98 people with GAD vs 92 healthy controls, 10 min eyes-closed resting EEG on 16 channels. Beta power (13-27 Hz) was higher across the central axis and shifted posteriorly at higher frequencies; alpha asymmetry was more rightward in temporal sites. Connectivity results were not included (CN). Single case-control study with a small montage.",
      design: "Case-control",
      cite: { authors: "Wang H, Mou S, Pei X, Zhang X, Shen S, Zhang J, Shen X, Shen Z", year: 2025, title: "The power spectrum and functional connectivity characteristics of resting-state EEG in patients with generalized anxiety disorder", journal: "Scientific Reports" }
    },
    {
      id: "pm-38280864", condition: "anxiety", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 93, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","P3","Pz","P4"], bands: ["delta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", beta: "down" }, symptoms: ["anxiety"],
      claim: "PD with anxiety: more fronto-parietal delta and less frontal beta than controls",
      detail: "68 people with Parkinson's (18 with clinically relevant anxiety) and 25 healthy controls, 12 min eyes-closed resting high-density EEG at baseline. Relative delta power was higher over frontal and parietal sites; relative beta was lower over frontal sites. Connectivity results and the 3- and 5-year follow-up were not used for this entry (CN and longitudinal). Case-control design, small anxious subgroup.",
      design: "Case-control",
      cite: { authors: "Yassine S, et al.", year: 2024, title: "Electrophysiological signatures of anxiety in Parkinson's disease", journal: "Transl Psychiatry" }
    },
    {
      id: "pm-28582479", condition: "ptsd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 69, k: null },
      sites: ["O1","O2"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["hyperarousal","intrusions"],
      claim: "PTSD: less occipital alpha at eyes-open rest than healthy controls",
      detail: "Taken from the abstract; not checked in the full text. Eyes-open resting EEG, 25 people with PTSD vs 24 with generalized anxiety disorder and 20 healthy controls. Posterior alpha power was suppressed and source-localised to the cuneus (occipital), mapped to O1 and O2 (method not stated in the abstract). The frontal gamma result was left out because the abstract does not say which state it was recorded in; the Granger connectivity results were not used (CN).",
      design: "Case-control",
      cite: { authors: "Clancy K, et al.", year: 2017, title: "Restless 'rest': intrinsic sensory hyperactivity and disinhibition in post-traumatic stress disorder", journal: "Brain" }
    },
    {
      id: "cand-anx-yuan-2024", condition: "anxiety", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 112, k: null },
      sites: ["T3","T4","T5","T6","Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["beta","theta"], direction: "ratio", evidence: "preliminary",
      changes: { beta: "down", theta: "up" }, symptoms: ["anxiety","inattention"],
      claim: "Anxiety: less temporal beta and higher frontal theta/beta ratio than controls",
      detail: "67 people with anxiety disorders vs 45 healthy controls, 5 min eyes-closed resting EEG on 64 channels. Absolute beta power was lower over temporal sites (mainly on the right); the frontal theta/beta ratio was higher, as a group-by-region interaction rather than a main effect. Both measures correlated with self-reported attentional control. Cross-sectional study, so the ratio result is the weaker of the two.",
      design: "Case-control",
      cite: { authors: "Yuan D, Yang X, Wang P, Yang L, Yang T, He F, Xu Y, Li Z", year: 2024, title: "Quantitative EEG and its relationship with attentional control in patients with anxiety disorders", journal: "Frontiers in Psychiatry" }
    },
    {
      id: "pm-20950657", condition: "anxiety", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 156, k: null },
      sites: [], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["anxiety"],
      claim: "Panic disorder: lower alpha-1 power across the head, mostly with eyes closed",
      detail: "Taken from the abstract; not checked in the full text. 52 people with panic disorder vs 104 matched controls, eyes-open and eyes-closed resting EEG on 16 sites. Overall spectral power was reduced, most clearly in alpha-1 with eyes closed, so the entry is whole-head. A frontal alpha-1 asymmetry (right less than left, eyes closed) is not included in this entry. Case-control design.",
      design: "Case-control",
      cite: { authors: "Wise V, et al.", year: 2011, title: "An integrative assessment of brain and body function 'at rest' in panic disorder: a combined quantitative EEG/autonomic function study", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-26970143", condition: "anxiety", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","P3","Pz","P4"], bands: ["alpha"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "mixed" }, symptoms: ["anxiety"],
      claim: "Worry and GAD: more left frontal alpha activity; high trait anxiety: more right frontal and parietal",
      detail: "Taken from the abstract; not checked in the full text. Mostly subclinical undergraduates selected by questionnaire, with a subset meeting GAD or OCD criteria (OCD results left out). Resting alpha asymmetry was more left frontal with high worry and GAD, and more right frontal and parietal with high trait anxiety, so the direction differs by group. Sample size is not stated in the abstract. Cross-sectional design.",
      design: "Cross-sectional",
      cite: { authors: "Smith EE, et al.", year: 2016, title: "Patterns of alpha asymmetry in those with elevated worry, trait anxiety, and obsessive-compulsive symptoms: A test of the worry and avoidance models of alpha asymmetry", journal: "Neuropsychologia" }
    },
    {
      id: "pm-34224782", condition: "anxiety", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 97, k: null },
      sites: ["F7","F3","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["anxiety"],
      claim: "Panic disorder: more right than left fronto-lateral alpha power at rest, not seen in controls",
      detail: "Taken from the abstract; not checked in the full text. 55 people with panic disorder vs 42 healthy controls, resting-state EEG. Right-greater-than-left alpha power was found at fronto-lateral sites in patients only; the abstract does not name electrodes, so the lateral frontal sites F7, F3, F4 and F8 were used. Cross-sectional case-control design.",
      design: "Case-control",
      cite: { authors: "Thoma L, et al.", year: 2021, title: "Fronto-lateral alpha power asymmetry in panic disorder", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-35192865", condition: "anxiety", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 103, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha","delta"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "down", delta: "up" }, symptoms: ["anxiety"],
      claim: "Youths with stable high social anxiety: lower frontal alpha/delta ratio at rest",
      detail: "Taken from the abstract; not checked in the full text. 103 typically developing 12- to 14-year-olds, 4 min resting EEG (2 min eyes open, 2 min eyes closed) at baseline; the stable-high social anxiety class was compared with the stable-low class. The abstract does not give the electrode set, so the frontal region was used; the alpha and delta changes are inferred from the ratio. Not a clinical sample.",
      design: "Cross-sectional",
      cite: { authors: "Schmidt LA, et al.", year: 2022, title: "Frontal EEG alpha-delta ratio and social anxiety across early adolescence", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-35891100", condition: "anxiety", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 81, k: null },
      sites: ["Fp1","Fp2","F7","F3","F4","F8","T3","T4","T5","T6","C3","C4"], bands: ["alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "down", beta: "up" }, symptoms: ["anxiety"],
      claim: "GAD: more relative beta and less alpha1 power than controls, eyes closed",
      detail: "45 people with GAD vs 36 healthy controls, 10 min eyes-closed resting EEG on 16 channels. Relative alpha1 power was lower in frontal, temporal and central sites; relative beta was higher, mostly frontal and temporal. Fuzzy entropy and connectivity results, and the classifier accuracy, were not used for this entry. Case-control design with a small sample.",
      design: "Case-control",
      cite: { authors: "Shen Z, et al.", year: 2022, title: "Aberrated Multidimensional EEG Characteristics in Patients with Generalized Anxiety Disorder: A Machine-Learning Based Analysis Framework", journal: "Sensors (Basel)" }
    },
    {
      id: "pm-40102367", condition: "anxiety", type: "protocol",
      metrics: { design: 4, control: "sham", blinded: true, n: 60, k: null },
      sites: [], bands: ["delta"], direction: "down", evidence: "contested",
      changes: { delta: "down" }, symptoms: ["anxiety","lowmood"],
      claim: "Infraslow neurofeedback in women with anxiety or depression: no benefit beyond sham",
      detail: "60 adult women with internalising disorders in a double-blind, sham-controlled pilot RCT, 6 sessions of infraslow neurofeedback. Slow and delta source activity fell at the targeted posterior cingulate in one active arm relative to sham (source-localised, LORETA-KEY), but HADS scores improved similarly in all arms, so there was no specific effect. The target is a deep structure, so sites are []; the anterior cingulate and connectivity results were not used.",
      design: "RCT (sham-controlled)",
      cite: { authors: "Perez TM, et al.", year: 2025, title: "Infraslow Closed-Loop Brain Training for Anxiety and Depression (ISAD): A pilot randomised, sham-controlled trial in adult females with internalizing disorders", journal: "Cogn Affect Behav Neurosci" }
    },
    {
      id: "pm-9892259", condition: "anxiety", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 48, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["anxiety"],
      claim: "Panic disorder: right frontal alpha lower than left at rest; controls show no asymmetry",
      detail: "Taken from the abstract; not checked in the full text. 23 people with panic disorder without depression vs 25 healthy controls, spontaneous EEG during rest phases (eyes state not stated in the abstract). Right frontal alpha power was significantly lower than left in patients during rest and anxiety-relevant stimuli; only the rest phases are used here, and the stimulus conditions are not included. The abstract does not give the electrode set, so the frontal region was used. Case-control design, 1999.",
      design: "Case-control",
      cite: { authors: "Wiedemann G, et al.", year: 1999, title: "Frontal brain asymmetry as a biological substrate of emotions in patients with panic disorders", journal: "Arch Gen Psychiatry" }
    },
    {
      id: "pm-18331812", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 40, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","Cz","Pz","P4","T6","O2"], bands: ["theta","delta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", delta: "down", beta: "up" }, symptoms: ["social"],
      claim: "Autism: more right posterior theta, less frontal delta and more midline beta than controls",
      detail: "Taken from the abstract; not checked in the full text. 20 children with autistic disorder vs 20 matched controls, eyes-closed resting EEG. Theta was higher mainly over right posterior sites, delta was lower over frontal sites, and beta was higher at midline sites. The coherence results were not used (CN). Case-control design with a small sample.",
      design: "Case-control",
      cite: { authors: "Coben R, et al.", year: 2008, title: "EEG power and coherence in autistic spectrum disorder", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-21107671", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry" }, symptoms: ["social"],
      claim: "Autism: left frontal alpha asymmetry linked to milder social symptoms within the autism group",
      detail: "Within-group comparison of higher functioning children with autism (and a comparison group), resting EEG with alpha power (8-13 Hz) at frontal sites. Children with left frontal asymmetry had milder social impairment, but this held mainly for autistic children with lower verbal IQ. The total sample size is not stated in the passages checked, so n is null. Cross-sectional design; the paper calls it a partial replication of Sutton et al. 2005.",
      design: "Cross-sectional",
      cite: { authors: "Burnette CP, et al.", year: 2011, title: "Anterior EEG asymmetry and the Modifier Model of Autism", journal: "J Autism Dev Disord" }
    },
    {
      id: "pm-26187351", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["social"],
      claim: "Asperger's: more delta and theta, less relative alpha than controls, across the head",
      detail: "Taken from the abstract; not checked in the full text. Boys with Asperger's syndrome vs an age- and sex-matched control group (control size not stated), eyes-closed resting EEG on 19 electrodes. Absolute delta and theta were higher globally and relative alpha was lower globally; relative delta was higher anteriorly, which is covered by the whole-head entry. Coherence results were not used (CN). Small case-control study.",
      design: "Case-control",
      cite: { authors: "Clarke AR, et al.", year: 2016, title: "EEG activity in children with Asperger's Syndrome", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-31669326", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 64, k: null },
      sites: ["Fz","Cz","Pz"], bands: ["theta"], direction: "down", evidence: "preliminary",
      changes: { theta: "down" }, symptoms: ["social"],
      claim: "Autism: lower midline theta power at eyes-open rest than typically developing children",
      detail: "Taken from the abstract; not checked in the full text. 32 children with ASD vs 32 age-, IQ- and sex-matched typically developing children, eyes-open resting EEG. Theta power (4-7.5 Hz) was lower at midline leads; the abstract does not list them, so Fz, Cz and Pz were used. Blink-rate and dopamine results are not part of this entry. Case-control design.",
      design: "Case-control",
      cite: { authors: "Hornung T, et al.", year: 2019, title: "Dopaminergic hypo-activity and reduced theta-band power in autism spectrum disorder: A resting-state EEG study", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-33407072", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 62, k: null },
      sites: ["Pz"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["social"],
      claim: "Autism: lower posterior midline alpha power at rest than typically developing children",
      detail: "31 children and adolescents with ASD vs 31 age- and IQ-matched typically developing children, resting EEG with alpha (8-12 Hz) power at midline frontal, central and posterior regions. The group difference was significant only at the posterior (Pz) region. The sensory-processing and MRS results are not part of this entry. Case-control design with a small sample.",
      design: "Case-control",
      cite: { authors: "Pierce S, et al.", year: 2021, title: "Associations between sensory processing and electrophysiological and neurochemical measures in children with ASD: an EEG-MRS study", journal: "J Neurodev Disord" }
    },
    {
      id: "pm-34517813", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 280, k: null },
      sites: [], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["social"],
      claim: "Youth with ASD: lower alpha power across all nine scalp regions at eyes-open rest",
      detail: "142 youth with ASD vs 138 typically developing youth across four sites, eyes-open resting EEG with 124 channels grouped into nine regions. Alpha power was 20-46% lower in the ASD group at all nine regions, so the entry is whole-head. Sex-by-diagnosis gamma effects and correlations with socialisation are not part of this entry. Case-control design.",
      design: "Case-control",
      cite: { authors: "Neuhaus E, et al.", year: 2021, title: "Resting state EEG in youth with ASD: age, sex, and relation to phenotype", journal: "J Neurodev Disord" }
    },
    {
      id: "pm-35585637", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 411, k: null },
      sites: [], bands: ["alpha"], direction: "ratio", evidence: "contested",
      changes: { alpha: "mixed" }, symptoms: ["social"],
      claim: "Autism: no replicated difference in resting power or alpha peak metrics vs neurotypical people",
      detail: "212 people with ASD vs 199 neurotypical people (IQ above 75), eyes-open and eyes-closed resting EEG analysed in source space. Power-spectrum and connectivity differences found in the training set (weak; alpha reactivity to eye opening) did not replicate in the 30% validation set, so no difference is reported. Covered by the whole-head entry because the group effects were not regional. Cross-sectional design.",
      design: "Case-control",
      cite: { authors: "Garcés P, et al.", year: 2022, title: "Resting state EEG power spectrum and functional connectivity in autism: a cross-sectional analysis", journal: "Mol Autism" }
    },
    {
      id: "pm-37172019", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["delta","theta","alpha","beta","gamma"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "mixed", theta: "up", alpha: "up", beta: "up", gamma: "up" }, symptoms: ["social"],
      claim: "Preschool boys with ASD: higher relative power in delta to gamma bands than controls at rest",
      detail: "Taken from the abstract; not checked in the full text. Preschool-aged boys with ASD vs matched typically developing boys, resting spectral EEG (pilot). Absolute delta was lower at central and posterior sites, while relative power was higher in delta, theta, alpha, beta and gamma; frontal absolute beta and gamma were higher. The number of children is not stated in the abstract, so n is null. The theta/beta ratio results were not used for the bands. Case-control pilot.",
      design: "Case-control",
      cite: { authors: "Zhao Q, et al.", year: 2024, title: "Resting-state EEG patterns of preschool-aged boys with autism spectrum disorder: A pilot study", journal: "Appl Neuropsychol Child" }
    },
    {
      id: "pm-37330940", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 32, k: null },
      sites: [], bands: ["hibeta","gamma","theta"], direction: "ratio", evidence: "preliminary",
      changes: { hibeta: "up", gamma: "up", theta: "down" }, symptoms: ["social"],
      claim: "Children with ASD: higher high-beta and gamma power, lower theta power, eyes open at rest",
      detail: "14 children with ASD vs 18 typically developing children (5-11 years), 3 min eyes-open resting EEG on 19 electrodes. Log power in high-beta and gamma was higher across the sample in ASD, and theta was lower in the medial, central and posterior areas, so the entry is whole-head. The coefficient-of-variation and multiscale-entropy results were not used. Small case-control study; high-beta is the 20.5-30 Hz band.",
      design: "Case-control",
      cite: { authors: "Angulo-Ruiz BY, et al.", year: 2023, title: "Linear and Non-linear Analyses of EEG in a Group of ASD Children During Resting State Condition", journal: "Brain Topogr" }
    },
    {
      id: "pm-38607475", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 106, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["gamma"], direction: "ratio", evidence: "contested",
      changes: { gamma: "mixed" }, symptoms: ["social"],
      claim: "Young autistic children: no difference in resting frontal gamma power from controls",
      detail: "Taken from the abstract; not checked in the full text. 48 autistic children vs 58 age- and sex-matched neurotypical children aged 22-60 months, resting frontal gamma power. No group difference was found. Within autistic children, lower frontal gamma tracked better expressive language and non-verbal ability, but those language and cognitive links are not atlas symptoms and are not in this entry. Cross-sectional design.",
      design: "Case-control",
      cite: { authors: "Mukerji CE, et al.", year: 2025, title: "Resting Frontal Gamma Power is Associated with Both Expressive Language and Non-verbal Cognitive Abilities in Young Autistic Children", journal: "J Autism Dev Disord" }
    },
    {
      id: "pm-38901364", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 47, k: null },
      sites: ["F7","F8","F3","F4","T5","T6","P3","P4"], bands: ["gamma"], direction: "down", evidence: "preliminary",
      changes: { gamma: "down" }, symptoms: ["social"],
      claim: "Adults with ASD: lower resting gamma power, most over inferior frontal and temporo-parietal sites",
      detail: "Taken from the abstract; not checked in the full text. 23 adults with ASD vs 24 typically developing adults, resting high-density EEG, gamma (30-100 Hz) absolute power. Gamma was reduced across the range, most clearly over inferior frontal and temporo-parietal junction areas, and over left dorsolateral prefrontal sites. The abstract names regions rather than electrodes, so F7/F8 (inferior frontal), F3/F4 (dorsolateral prefrontal) and T5/T6/P3/P4 (temporo-parietal) were used. Case-control design.",
      design: "Case-control",
      cite: { authors: "Kakuszi B, et al.", year: 2024, title: "Alterations in resting-state gamma-activity is adults with autism spectrum disorder: A High-Density EEG study", journal: "Psychiatry Res" }
    },
    {
      id: "pm-39251926", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 101, k: null },
      sites: [], bands: ["beta","gamma"], direction: "up", evidence: "preliminary",
      changes: { beta: "up", gamma: "up" }, symptoms: ["social"],
      claim: "Autism: higher resting beta and gamma power than neurotypical peers, with no alpha change",
      detail: "Mixed study of fragile X syndrome and autism. Only the autism vs neurotypical comparison is recorded here (49 autistic participants, 52 neurotypical, aged 5 to 20). Eyes-open resting EEG with a movie on screen. Autistic participants showed higher beta power and higher low and high gamma power than neurotypical controls; alpha and signal complexity did not differ from controls. Results are given per broad region of interest, so no single site is named (whole-head). Cross-sectional case-control design.",
      design: "Case-control",
      cite: { authors: "Proteau-Lemieux M, et al.", year: 2024, title: "Specific EEG resting state biomarkers in FXS and ASD", journal: "J Neurodev Disord" }
    },
    {
      id: "pm-39555754", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 52, k: null },
      sites: ["O1","O2"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["social"],
      claim: "Autistic adults: higher resting alpha amplitude with eyes open than non-autistic adults",
      detail: "29 autistic and 23 non-autistic adults. The eyes-open baseline rest period is used here; stimulus-locked alpha results from the same paradigm are not recorded. Autistic adults had higher alpha amplitude at all time points, with the clearest group difference at two posterior channels (EGI channels 66 and 84). The channels are placed here as O1 and O2 approximately; the exact scalp positions were not checked. Sensory-behaviour and cortical volume links are not used. Cross-sectional case-control design.",
      design: "Case-control",
      cite: { authors: "Murray SO, et al.", year: 2025, title: "Increased alpha power in autistic adults: Relation to sensory behaviors and cortical volume", journal: "Autism Res" }
    },
    {
      id: "pm-41101705", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 310, k: null },
      sites: ["F3","F4"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["social"],
      claim: "Youths with autism: lower resting alpha peak power over frontal regions",
      detail: "164 youths with autism and 146 typically developing youths, aged 8 to 17, with resting eyes-open EEG. Alpha peak power was lower in the autism group, tested over left and right frontal regions of interest. The frontal channels are listed here as F3 and F4 approximately; the exact electrode set was not verified. Peak number and copy-number variant links are not used here. Cross-sectional case-control design.",
      design: "Case-control",
      cite: { authors: "Arutiunian V, et al.", year: 2026, title: "Number of Alpha Peaks in the Electroencephalogram Is Associated With Clinical Phenotype and Copy Number Variants in Youths With Autism", journal: "Biol Psychiatry Cogn Neurosci Neuroimaging" }
    },
    {
      id: "pm-41520112", condition: "autism", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 128, k: null },
      sites: [], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["social"],
      claim: "Autistic preschoolers with language impairment: lower resting alpha peak amplitude than peers",
      detail: "64 autistic and 64 age-matched neurotypical children aged 2 to 6, with eyes-open resting 128-channel EEG referenced to Cz. Alpha peak amplitude did not differ between autistic and neurotypical children overall. Autistic children with language impairment had lower alpha peak amplitude than both autistic children without impairment and neurotypical peers. The regional analysis was not verified in the text checked, so the entry is whole-head. The higher aperiodic offset in autistic children is not a band result and is not recorded. Cross-sectional case-control design.",
      design: "Case-control",
      cite: { authors: "Chen Y, et al.", year: 2026, title: "Resting state aperiodic and periodic EEG activity in preschool-aged autistic children: differences from neurotypical peers and links to language skills", journal: "Mol Autism" }
    },
    {
      id: "pm-42185252", condition: "autism", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: 188, k: null },
      sites: [], bands: ["delta","theta","beta","gamma"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up", beta: "up", gamma: "up" }, symptoms: ["social"],
      claim: "Autistic young children: higher resting delta, theta, beta and gamma power than peers; no alpha difference",
      detail: "Longitudinal cohort of 122 autistic and 66 typically developing children aged 1.6 to 6 years, 358 recordings, with mixed-model analysis of whole-brain power. Autistic children had higher power in delta, theta, beta and gamma and no alpha difference. Recordings were made while children watched a cartoon with sound, not a silent resting protocol, so the result is a deviation from standard resting-state. Results are whole-brain (all electrodes), so the entry is whole-head. The language-profile and word-combination gamma results are not recorded here.",
      design: "Controlled cohort",
      cite: { authors: "Latrèche K, et al.", year: 2026, title: "Early Trajectories of Resting-State EEG power in autistic children: a longitudinal study across language profiles", journal: "Transl Psychiatry" }
    },
    {
      id: "pm-12712882", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 208, k: null },
      sites: ["O1","O2"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["seizures"],
      claim: "Newly diagnosed untreated epilepsy: lower occipital alpha power than healthy controls",
      detail: "Taken from the abstract; not checked in the full text. Hungarian paper with an English abstract. 171 patients with untreated new epilepsy (aged 5 to 50) and 37 healthy controls, eyes-closed waking resting EEG, two-minute epochs. Absolute and relative alpha power at right and left occipital derivations were lower in the epilepsy groups than in controls; alpha peak frequency differed little. Diagnostic categories were pooled for the main comparison. Cross-sectional case-control design.",
      design: "Case-control",
      cite: { authors: "Clemens B, et al.", year: 2003, title: "[Occipital spectral EEG parameters in newly diagnosed, untreated patients with epilepsy]", journal: "Ideggyogy Sz" }
    },
    {
      id: "pm-15134712", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["seizures"],
      claim: "Idiopathic generalised epilepsy: more relative delta and theta power and less relative alpha power at rest",
      detail: "Taken from the abstract; not checked in the full text. 41 patients with idiopathic generalised epilepsy compared with healthy controls (control count not stated in the abstract), two minutes of eyes-closed waking interictal EEG at 19 electrodes. Relative delta and theta power were greater and relative alpha power was lower in the patients; the main band-specific finding was higher theta coherence. Results are scalp averages, so the entry is whole-head. Cross-sectional case-control design.",
      design: "Case-control",
      cite: { authors: "Clemens B", year: 2004, title: "Pathological theta oscillations in idiopathic generalised epilepsy", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-20820898", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 34, k: null },
      sites: ["Pz","O1","O2"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["seizures"],
      claim: "Generalised cryptogenic epilepsy in children: higher parieto-occipital alpha power than healthy children at rest",
      detail: "Taken from the abstract; not checked in the full text. 10 children with generalised cryptogenic epilepsy compared with 24 healthy children at rest. Global power in the low and mid bands was higher in the epilepsy group, and the epilepsy-related elevation was mainly in alpha at parieto-occipital electrodes. The comparison of healthy children with adults (normal immaturity) is not recorded here. Eyes state is not stated in the abstract. Cross-sectional case-control design.",
      design: "Case-control",
      cite: { authors: "Michels L, et al.", year: 2011, title: "Does greater low frequency EEG activity in normal immaturity and in children with epilepsy arise in the same neuronal network?", journal: "Brain Topogr" }
    },
    {
      id: "pm-23922658", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 24, k: null },
      sites: ["T3","T4","P3","P4"], bands: ["delta","theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down" }, symptoms: ["seizures"],
      claim: "Left temporal lobe epilepsy: higher temporal and temporo-parietal delta and theta power, lower high-alpha power at rest",
      detail: "9 people with left temporal lobe epilepsy on anti-seizure medication and 15 healthy controls, eyes-closed and eyes-open resting EEG. Delta power was higher over the left temporal region and theta power higher in focal bilateral temporo-parietal regions. High-alpha (10 to 13 Hz) power was lower, mainly over parietal channels, in patients with eyes closed. Sites are the temporal and parietal regions named in the topography. Synchronisation and graph-theory results are not recorded here. Small single-centre case-control design.",
      design: "Case-control",
      cite: { authors: "Quraan MA, et al.", year: 2013, title: "Altered resting state brain dynamics in temporal lobe epilepsy can be observed in spectral power, functional connectivity and graph theory metrics", journal: "PLoS One" }
    },
    {
      id: "pm-26509114", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 17, k: null },
      sites: ["C4","T4"], bands: ["theta","alpha","beta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", alpha: "up", beta: "up" }, symptoms: ["seizures"],
      claim: "Benign epilepsy with centrotemporal spikes: higher right centrotemporal theta, alpha and beta power at rest",
      detail: "Taken from the abstract; PMC full text exists but was not checked in this pass. 8 patients with benign epilepsy with centrotemporal spikes and 9 age-matched controls, eyes-closed resting high-density EEG with source analysis. Relative theta, alpha and beta power was higher over the right centrotemporal area. The same paper reports lower relative power in all bands over bilateral frontal and parieto-occipital areas; that decrease is not recorded here. The centrotemporal sites are given as C4 and T4 approximately; the exact electrodes were not verified. Cross-sectional case-control design.",
      design: "Case-control",
      cite: { authors: "Adebimpe A, et al.", year: 2015, title: "EEG resting state analysis of cortical sources in patients with benign epilepsy with centrotemporal spikes", journal: "Neuroimage Clin" }
    },
    {
      id: "pm-30847365", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 102, k: null },
      sites: ["Fz","O1","O2"], bands: ["alpha"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "mixed" }, symptoms: ["seizures"],
      claim: "Epilepsy: alpha power shifted from high to low frequencies at rest, mainly in poorly controlled patients",
      detail: "Taken from the abstract; PMC full text exists but was not checked in this pass. 63 patients with focal or idiopathic generalised epilepsy and 39 healthy controls, eyes-closed resting EEG free of interictal abnormality. Power shifted from high-alpha to low-alpha in patients (g = 0.78), most strongly in patients with poor seizure control, over midline frontal and bilateral occipital regions. Sites are the midline frontal and occipital regions as named in the abstract (Fz, O1, O2 approximately). Cross-sectional case-control design.",
      design: "Case-control",
      cite: { authors: "Abela E, et al.", year: 2019, title: "Slower alpha rhythm associates with poorer seizure control in epilepsy", journal: "Ann Clin Transl Neurol" }
    },
    {
      id: "pm-31129368", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 16, k: null },
      sites: ["C3","C4","T3","T4"], bands: ["theta","alpha"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", alpha: "up" }, symptoms: ["seizures"],
      claim: "Benign childhood epilepsy with centrotemporal spikes in remission: higher centrotemporal theta and alpha power",
      detail: "Taken from the abstract; not checked in the full text. 16 patients in clinical seizure remission compared with non-epileptic age-matched controls (control count not stated). Absolute theta and alpha power were higher, mainly over centrotemporal electrodes; the authors read this as delayed cortical maturation. Eyes state is not stated in the abstract. Sites are the centrotemporal electrodes, given here as C3, C4, T3 and T4 approximately. Cross-sectional case-control design.",
      design: "Case-control",
      cite: { authors: "Siripornpanich V, et al.", year: 2019, title: "Delayed cortical maturation at the centrotemporal brain regions in patients with benign childhood epilepsy with centrotemporal spikes (BCECTS)", journal: "Epilepsy Res" }
    },
    {
      id: "pm-34687043", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 62, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","T3","T4","T5","T6","P3","Pz","P4","O1","O2"], bands: ["alpha","delta","theta"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "down", delta: "up", theta: "up" }, symptoms: ["seizures"],
      claim: "Temporal lobe epilepsy: lower alpha-delta and alpha-theta ratios than controls, on the focus side",
      detail: "39 adults with temporal lobe epilepsy vs 23 controls, resting wakefulness EEG (FFT power ratios). Lower alpha-delta ratio in the posterior quadrant ipsilateral to the focus and lower alpha-theta ratio in ipsilateral anterior and posterior quadrants and temporal region; sites recorded as frontal, temporal and posterior because the side depends on the focus. Taken from the abstract; not checked in the full text. Cross-sectional, single-centre.",
      design: "Case-control",
      cite: { authors: "Fonseca E, et al.", year: 2022, title: "Interictal brain activity changes in temporal lobe epilepsy: A quantitative electroencephalogram analysis", journal: "Acta Neurol Scand" }
    },
    {
      id: "pm-36442376", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 454, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8","T3","T4"], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["seizures"],
      claim: "Idiopathic generalised and focal epilepsy: more resting theta than controls, frontal and anterior temporal",
      detail: "Unmedicated IGE (n=92) and focal epilepsy (n=149) vs healthy controls (n=114), with non-seizure patients (n=99) also recorded. Theta was higher in both epilepsy groups, peaking in medial-basal prefrontal and anterior temporal cortex. Source-localised (LORETA); mapped to the overlying scalp region (frontal and anterior temporal). Taken from the abstract; not checked in the full text. Cross-sectional, sources only.",
      design: "Case-control",
      cite: { authors: "Clemens B, et al.", year: 2023, title: "Epileptic diathesis: An EEG-LORETA study", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-40040314", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 87, k: null },
      sites: [], bands: ["delta","theta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up" }, symptoms: ["seizures"],
      claim: "After a first seizure, later epilepsy: more delta and theta power than controls, widespread",
      detail: "21 patients who developed epilepsy after a first unprovoked seizure, 20 who did not, and 46 controls, 240 s resting EEG. Patients who developed epilepsy had higher delta and theta power across the scalp, with decreases in delta connectivity (not counted here). Source-localised (source reconstruction; method per paper); widespread vertex-level increases, mapped as whole-head. Retrospective, single-centre.",
      design: "Case-control",
      cite: { authors: "Segovia-Oropeza M, et al.", year: 2025, title: "Quantitative EEG signatures in patients with and without epilepsy development after a first seizure", journal: "Epilepsia Open" }
    },
    {
      id: "pm-42217475", condition: "epilepsy", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 180, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "down", beta: "down" }, symptoms: ["seizures"],
      claim: "Epilepsy: more delta and theta, less alpha and beta power than healthy controls, widespread",
      detail: "120 people with epilepsy (60 drug-resistant, 60 not) and 60 healthy controls, resting eyes-closed 19-channel EEG. Relative power was higher in delta and theta and lower in alpha and beta in all people with epilepsy; in drug-resistant epilepsy delta was higher and alpha lower than non-drug-resistant, with widespread channel differences. Power is channel-averaged, so sites are whole-head. Retrospective, single-centre, no external validation; graph-theory results not counted here.",
      design: "Case-control",
      cite: { authors: "Sancetta BM, et al.", year: 2026, title: "A spectral- topological network signature of drug-resistant epilepsy: a phase 1-2 study on resting-state EEG-based diagnostic biomarkers of drug resistance", journal: "Neuroimage Clin" }
    },
    {
      id: "pm-18457962", condition: "parkinsons", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 58, k: null },
      sites: [], bands: ["theta","beta","gamma"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", beta: "up", gamma: "up" }, symptoms: ["motor"],
      claim: "Parkinson's: more resting theta, beta and gamma power than controls, frontal for beta and gamma",
      detail: "24 people with Parkinson's vs 34 healthy controls, resting EEG. Power was higher over 2-100 Hz, with the largest difference in 6-9 Hz theta at all electrodes; beta and gamma were highest at frontal electrodes. Source-localised (LORETA); theta and beta sources were fronto-insulo-temporal, mapped to the overlying scalp region (frontal and temporal). Taken from the abstract; not checked in the full text. Small single-centre case-control study.",
      design: "Case-control",
      cite: { authors: "Moazami-Goudarzi M, et al.", year: 2008, title: "Enhanced frontal low and high frequency power and synchronization in the resting EEG of parkinsonian patients", journal: "Neuroimage" }
    },
    {
      id: "pm-32116262", condition: "parkinsons", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 42, k: null },
      sites: ["T3","T4","T5","T6"], bands: ["theta","alpha"], direction: "down", evidence: "preliminary",
      changes: { theta: "down", alpha: "down" }, symptoms: ["motor"],
      claim: "Parkinson's off medication: less temporal theta and alpha source activity than controls",
      detail: "Resting eyes-closed EEG in Parkinson's patients off medication vs age-matched controls (42 subjects in the analysis). Source-localised (LORETA); the temporal-lobe decreases in theta and alpha are mapped to the overlying temporal region. The anterior cingulate delta increase is a deep-structure result and is not mapped to a site. Coherence results and the classifier are not counted here.",
      design: "Case-control",
      cite: { authors: "Waninger S, et al.", year: 2020, title: "Neurophysiological Biomarkers of Parkinson's Disease", journal: "J Parkinsons Dis" }
    },
    {
      id: "pm-35042630", condition: "parkinsons", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 108, k: null },
      sites: ["Fp2","F4","F8"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["anxiety"],
      claim: "Parkinson's with anxiety: lower right prefrontal alpha1 power than Parkinson's without anxiety",
      detail: "108 people with Parkinson's, split by clinically relevant anxiety (33 with, 75 without) on the Parkinson Anxiety Scale; resting high-density EEG. Relative alpha1 power in the right prefrontal cortex was lower in those with anxiety, and insula-prefrontal connectivity was higher (not counted here). Mapped to right frontal sites (Fp2, F4, F8). Taken from the abstract; not checked in the full text. Cross-sectional, single-centre.",
      design: "Cross-sectional comparison",
      cite: { authors: "Betrouni N, et al.", year: 2022, title: "Anxiety in Parkinson's disease: A resting-state high density EEG study", journal: "Neurophysiol Clin" }
    },
    {
      id: "pm-37146531", condition: "parkinsons", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 169, k: null },
      sites: [], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["motor"],
      claim: "Parkinson's: more generalised resting theta power than non-PD controls, replicated in four cohorts",
      detail: "169 people (84 with Parkinson's, 85 non-PD) from four centres, resting EEG relative power. Theta relative power was higher in Parkinson's in all four datasets, with generalised (whole-head) distribution. A higher pre-alpha posterior result is not placed here because its band is not defined in the abstract. Taken from the abstract; not checked in the full text. Case-control across centres.",
      design: "Case-control (multicentre)",
      cite: { authors: "Jaramillo-Jimenez A, et al.", year: 2023, title: "Spectral features of resting-state EEG in Parkinson's Disease: A multicenter study using functional data analysis", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-37787445", condition: "parkinsons", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["theta","alpha"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", alpha: "up" }, symptoms: ["executive"],
      claim: "Parkinson's: more frontal theta and lower-alpha power, linked to executive dysfunction",
      detail: "Mild Parkinson's patients vs healthy controls, resting EEG power; increased theta and lower-alpha power in frontal lobe areas, correlated with slower executive test times and with striatal dopamine uptake (within Parkinson's). Total sample size not stated in the abstract. Taken from the abstract; not checked in the full text. Single-centre case-control.",
      design: "Case-control",
      cite: { authors: "Lorek K, et al.", year: 2023, title: "Slowing of EEG waves correlates with striatal [^18^ F]fluorodopa PET/CT uptake and executive dysfunction in Parkinson's disease", journal: "Eur J Neurosci" }
    },
    {
      id: "pm-37937898", condition: "parkinsons", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 52, k: null },
      sites: [], bands: ["alpha","beta"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up", beta: "up" }, symptoms: ["motor"],
      claim: "Parkinson's on and off medication: more total alpha and beta power than controls, widespread",
      detail: "26 people with Parkinson's (on and off medication) and 26 age-matched controls, eyes-closed and eyes-open resting EEG. Total alpha and beta power were higher in Parkinson's in both states, widely distributed across the scalp. After removing the aperiodic component, the beta difference disappeared and the alpha difference remained only for eyes-open; the aperiodic exponent and offset were higher (not counted as band results). Single-centre case-control.",
      design: "Case-control",
      cite: { authors: "McKeown DJ, et al.", year: 2024, title: "Medication-invariant resting aperiodic and periodic neural activity in Parkinson's disease", journal: "Psychophysiology" }
    },
    {
      id: "pm-40552872", condition: "parkinsons", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 39, k: null },
      sites: ["O1","O2"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["motor"],
      claim: "Parkinson's: reduced occipital alpha reactivity (eyes closed to open), linked to gait variability",
      detail: "20 people with Parkinson's and 19 healthy controls, eyes-closed and eyes-open resting EEG. Alpha reactivity over occipital electrodes (O1, O2, Oz) was reduced in Parkinson's; the group difference was no longer significant after adjusting for MMSE. Within Parkinson's, lower reactivity correlated with greater gait variability. Oz was averaged with O1 and O2 in the analysis. Single-centre case-control.",
      design: "Case-control",
      cite: { authors: "Lirani-Silva E, et al.", year: 2025, title: "Resting-state Alpha Reactivity Is Reduced in Parkinson's Disease and Associated With Gait Variability", journal: "Neurorehabil Neural Repair" }
    },
    {
      id: "pm-12705421", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 22, k: null },
      sites: [], bands: ["delta","theta","alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "mixed", beta: "mixed" }, symptoms: ["craving"],
      claim: "Methamphetamine abstinence (4 days): more delta and theta power than controls; alpha and beta unchanged",
      detail: "11 methamphetamine-dependent people after 4 days of inpatient abstinence vs 11 non-drug-using volunteers, eyes-closed resting EEG. Delta and theta absolute power was higher and alpha and beta did not differ; the authors describe a generalised pattern, so sites are whole-head. Taken from the abstract; not checked in the full text. Small single-centre case-control study.",
      design: "Case-control",
      cite: { authors: "Newton TF, et al.", year: 2003, title: "Quantitative EEG abnormalities in recently abstinent methamphetamine dependent individuals", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-12711923", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 614, k: null },
      sites: [], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["craving"],
      claim: "Alcohol dependence: more resting theta power than matched controls at all scalp sites",
      detail: "307 alcohol-dependent people and 307 age- and sex-matched controls, eyes-closed resting EEG. Absolute theta (3-7 Hz) power was higher at all scalp locations; the increase was strongest centrally and parietally in men and parietally in women. Taken from the abstract; not checked in the full text. Case-control study; craving is the core symptom, not directly measured.",
      design: "Case-control",
      cite: { authors: "Rangaswamy M, et al.", year: 2003, title: "Theta power in the EEG of alcoholics", journal: "Alcohol Clin Exp Res" }
    },
    {
      id: "pm-16179502", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 48, k: null },
      sites: ["C3","Cz","C4"], bands: ["delta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up" }, symptoms: ["craving"],
      claim: "MDMA abusers: higher central delta power than controls (eyes closed)",
      detail: "8 MDMA abusers, 8 MDMA and marijuana abusers, 15 marijuana abusers and 17 controls, 16-electrode eyes-closed resting EEG. Absolute delta power at central electrode sites was higher in the MDMA abusers than in the other groups. The abstract names no individual electrodes, so C3, Cz and C4 are the central sites; check the full text before relying on them. Alpha-2 power rose only in marijuana abusers and is not recorded here. Taken from the abstract; not checked in the full text. Small cross-sectional study with mixed drug histories.",
      design: "Case-control",
      cite: { authors: "Herning RI, et al.", year: 2005, title: "Neuropsychiatric alterations in MDMA users: preliminary findings", journal: "Ann N Y Acad Sci" }
    },
    {
      id: "pm-18974851", condition: "sud", type: "biomarker",
      metrics: { design: 3, control: null, blinded: null, n: 364, k: null },
      sites: ["Fz"], bands: ["theta","alpha","beta"], direction: "ratio", evidence: "contested",
      changes: { theta: "down", alpha: "mixed", beta: "mixed" }, symptoms: ["craving"],
      claim: "Alcohol use disorder: no alpha or beta link; theta lower at Fz only in alcoholics without anxiety",
      detail: "364 Plains American Indians (resting eyes-closed EEG at Fz, Pz, P3, P4, O1 and O2). The main analysis found no relationship between alpha or beta power and alcohol use disorder. Theta power at Fz was lower in alcoholics than non-alcoholics only in the subgroup without anxiety disorders (p = 0.03), a post hoc subgroup result. The paper's main aim is genetic linkage of EEG power, so the EEG group comparison is secondary. Cross-sectional, no blinding or sham control. Craving is not measured; the symptom tag is provisional.",
      design: "Cross-sectional cohort",
      cite: { authors: "Enoch MA, et al.", year: 2008, title: "Common genetic origins for EEG, alcoholism and anxiety: the role of CRH-BP", journal: "PLoS One" }
    },
    {
      id: "pm-19278131", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 141, k: null },
      sites: ["P3","P4","O1","O2","T5","T6"], bands: ["theta","beta"], direction: "down", evidence: "preliminary",
      changes: { theta: "down", beta: "down" }, symptoms: ["craving"],
      claim: "Chronic cocaine users: less posterior theta and beta power than non-drug-using controls",
      detail: "99 cocaine users (within 5 days of admission) and 42 age-matched controls, 16-lead eyes-closed resting EEG. Absolute theta, beta1 and beta2 power were reduced in posterior regions; the posterior sites were taken as P3, P4, O1, O2, T5 and T6 from the 16-lead montage. Within the users, recent cocaine use correlated with lower delta and theta power. Cross-sectional study with no blinding or sham control.",
      design: "Case-control",
      cite: { authors: "Copersino ML, et al.", year: 2009, title: "EEG and cerebral blood flow velocity abnormalities in chronic cocaine users", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-26002855", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: [], bands: ["gamma"], direction: "up", evidence: "preliminary",
      changes: { gamma: "up" }, symptoms: ["craving"],
      claim: "Illicit opiate users: higher resting gamma power (37-41 Hz) than healthy controls",
      detail: "Compared illicit opiate users and healthy controls with eyes-closed resting EEG from 26 sites; gamma power was higher in the illicit users. Source analysis (sLORETA) showed the largest differences in occipital, parietal and frontal lobes, mapped to the overlying scalp region. The methadone maintenance group was not used here because it is a treatment effect. Taken from the abstract; not checked in the full text. Group sizes are not given in the abstract.",
      design: "Case-control",
      cite: { authors: "Wang GY, et al.", year: 2016, title: "Quantitative EEG and Low-Resolution Electromagnetic Tomography (LORETA) Imaging of Patients Undergoing Methadone Treatment for Opiate Addiction", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-26035281", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["C3","Cz","C4","P3","Pz","P4"], bands: ["beta"], direction: "up", evidence: "preliminary",
      changes: { beta: "up" }, symptoms: ["impulsivity"],
      claim: "Hazardous drinkers (not dependent): higher centroparietal beta power than non-drinkers",
      detail: "University students with hazardous alcohol consumption but no dependence vs students without hazardous drinking, eyes-closed resting EEG. Absolute beta power was higher at centroparietal sites; theta showed no change. The abstract does not name electrodes, so C3, Cz, C4, P3, Pz and P4 are an assumed mapping of centroparietal and should be checked against the full text. Taken from the abstract; not checked in the full text. Group sizes are not given in the abstract.",
      design: "Case-control",
      cite: { authors: "Núñez-Jaramillo L, et al.", year: 2015, title: "Quantitative electroencephalography analysis in university students with hazardous alcohol consumption, but not alcohol dependence", journal: "Neuroreport" }
    },
    {
      id: "pm-26051750", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 83, k: null },
      sites: [], bands: ["delta","alpha"], direction: "down", evidence: "preliminary",
      changes: { delta: "down", alpha: "down" }, symptoms: ["craving"],
      claim: "Daily smokers: lower resting delta and alpha power than non-smokers and nondaily smokers",
      detail: "22 daily smokers, 31 nondaily smokers and 30 non-smokers, tested in a non-deprived state. Daily smokers had reduced delta and alpha power and higher impulsiveness; power was averaged across the 34-electrode montage, so the result is whole-head. Cross-sectional study with no blinding or sham control; dependence is inferred from smoking behaviour.",
      design: "Case-control",
      cite: { authors: "Rass O, et al.", year: 2016, title: "Resting-state EEG, impulsiveness, and personality in daily and nondaily smokers", journal: "Clin Neurophysiol" }
    },
    {
      id: "pm-26327686", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 42, k: null },
      sites: [], bands: ["delta"], direction: "up", evidence: "preliminary",
      changes: { delta: "up" }, symptoms: ["craving"],
      claim: "Alcohol use disorder: higher absolute delta power than healthy controls; beta did not differ",
      detail: "17 people with alcohol use disorder vs 25 healthy controls, eyes-closed resting EEG at 19 sites. Absolute delta power was higher in the AUD group than in controls, while beta power matched the controls. The internet gaming disorder group is not used here. Regional averages are reported in the paper but the AUD-versus-control regional result was not checked. Cross-sectional study with no blinding or sham control.",
      design: "Case-control",
      cite: { authors: "Son KL, et al.", year: 2015, title: "Neurophysiological features of Internet gaming disorder and alcohol use disorder: a resting-state EEG study", journal: "Transl Psychiatry" }
    },
    {
      id: "pm-26660886", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 30, k: null },
      sites: [], bands: ["beta"], direction: "up", evidence: "preliminary",
      changes: { beta: "up" }, symptoms: ["impulsivity"],
      claim: "Women with alcohol use disorder: higher absolute and relative beta power than matched controls",
      detail: "15 women with alcohol use disorder and 15 age-, sex- and education-matched controls, eyes-closed resting EEG. Absolute and relative beta power were higher in the AUD group, with the beta difference across the entire scalp, so sites are whole-head. Connectivity results are not used here. Taken from the abstract; not checked in the full text. Very small case-control study in women only.",
      design: "Case-control",
      cite: { authors: "Herrera-Díaz A, et al.", year: 2016, title: "Functional Connectivity and Quantitative EEG in Women with Alcohol Use Disorders: A Resting-State Study", journal: "Brain Topogr" }
    },
    {
      id: "pm-27354838", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 70, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["delta","theta","alpha"], direction: "up", evidence: "preliminary",
      changes: { delta: "up", theta: "up", alpha: "up" }, symptoms: ["craving"],
      claim: "Tobacco-smoking mothers: higher frontal delta, theta and alpha power than non-smoking mothers",
      detail: "35 smoking and 35 non-smoking mothers, resting EEG from a 128-channel net. Low-frequency power (delta, theta, alpha, alpha1) was higher at frontal sites in smokers; alpha2, beta and gamma did not differ. The frontal set above is the frontal region of the montage; the exact electrode labels were not checked against the paper. Cross-sectional study with no blinding or sham control.",
      design: "Case-control",
      cite: { authors: "Wilbanks HE, et al.", year: 2016, title: "Tobacco Smoking and the Resting Maternal Brain: A Preliminary Study of Frontal EEG", journal: "Yale J Biol Med" }
    },
    {
      id: "pm-29778070", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 61, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["theta","beta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up", beta: "up" }, symptoms: ["impulsivity"],
      claim: "Binge drinkers: higher frontal theta and beta power than light drinkers; alpha power unchanged",
      detail: "Young adults in binge-drinking vs light-drinking groups, eyes-open and eyes-closed resting EEG. Frontal theta and beta power were higher in binge drinkers, and alpha peak frequency was 0.7 Hz slower; alpha power did not differ. Theta and alpha slowing persisted after adjusting for depression, anxiety and personality. The frontal set above is the frontal region of the montage; exact electrode labels were not checked. Binge drinking is a drinking pattern, not a diagnosis; cross-sectional design.",
      design: "Case-control",
      cite: { authors: "Affan RO, et al.", year: 2018, title: "High-intensity binge drinking is associated with alterations in spontaneous neural oscillations in young adults", journal: "Alcohol" }
    },
    {
      id: "pm-35149322", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 36, k: null },
      sites: [], bands: ["beta","delta"], direction: "up", evidence: "preliminary",
      changes: { beta: "up", delta: "up" }, symptoms: ["impulsivity"],
      claim: "Prescription opioid use disorder: higher beta and delta power than healthy volunteers; theta and alpha unchanged",
      detail: "18 people with prescription opioid use disorder and 18 healthy volunteers, resting EEG. Beta1, beta2 and beta3 amplitude density was higher across frontal, temporal-central and posterior areas, and delta was higher; theta and alpha did not differ. Higher beta and delta were linked to poorer impulse control on the BIS-11 subscales. The abstract gives regions, not electrodes, so sites are whole-head. Taken from the abstract; not checked in the full text. Pilot study with a small sample.",
      design: "Case-control",
      cite: { authors: "Corace K, et al.", year: 2022, title: "Resting State EEG Activity Related to Impulsivity in People with Prescription Opioid Use Disorder", journal: "Psychiatry Res Neuroimaging" }
    },
    {
      id: "pm-35662565", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 71, k: null },
      sites: [], bands: ["theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", alpha: "down" }, symptoms: ["craving"],
      claim: "Alcohol use disorder with 2 weeks to 6 months abstinence: more theta and less alpha power than healthy controls",
      detail: "29 people with AUD abstinent 15 days to 6 months, 26 with AUD abstinent 6 to 13 months, and 16 healthy controls, eyes-closed resting EEG. The shorter-abstinence group had higher theta and lower alpha power than both the longer-abstinence and control groups; the longer-abstinence group resembled controls. Only the short-abstinence comparison is used here. Sites are whole-head because the abstract names no electrodes. Taken from the abstract; not checked in the full text. Cross-sectional study.",
      design: "Case-control",
      cite: { authors: "Martínez-Maldonado A, et al.", year: 2022, title: "Brain oscillatory functioning after long-term alcohol abstinence", journal: "Int J Psychophysiol" }
    },
    {
      id: "pm-35698004", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 48, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["inattention"],
      claim: "Cannabis use disorder: higher relative prefrontal alpha than controls; more alpha, worse attention",
      detail: "24 people with cannabis use disorder and 24 non-user controls, resting EEG. Relative alpha was higher in the patients and was localised mainly to prefrontal cortex. Source-localised (EEG source imaging); mapped to the overlying scalp region. In patients only, lower attentional performance was linked to higher alpha; the correlation was absent in controls. Cross-sectional study with no blinding or sham control.",
      design: "Case-control",
      cite: { authors: "Andriot T, et al.", year: 2022, title: "Electrophysiological and behavioral correlates of cannabis use disorder", journal: "Cogn Affect Behav Neurosci" }
    },
    {
      id: "pm-35699268", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 85, k: null },
      sites: ["Fp1","Fp2","F7","F3","Fz","F4","F8"], bands: ["beta","gamma"], direction: "up", evidence: "preliminary",
      changes: { beta: "up", gamma: "up" }, symptoms: ["craving"],
      claim: "Mothers with substance use: higher frontal beta and gamma power than non-substance-using mothers",
      detail: "48 substance-using mothers and 37 non-substance-using mothers, resting frontal EEG across seven bands. Beta and gamma power were higher in the substance-using mothers; no between-group difference was found in parental reflective functioning. The frontal set above is the frontal region of the montage; exact electrode labels were not checked. Cross-sectional study with no blinding or sham control; the substance-use type is mixed.",
      design: "Case-control",
      cite: { authors: "Ngoh G, et al.", year: 2022, title: "Exploring resting frontal EEG and reflective functioning in maternal substance use", journal: "Infant Ment Health J" }
    },
    {
      id: "pm-36890138", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 81, k: null },
      sites: [], bands: ["theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "down", alpha: "up" }, symptoms: ["craving"],
      claim: "Current male smokers (20+ years): lower relative theta and higher relative alpha than never-smokers",
      detail: "33 never-smokers, 28 past-smokers (20+ years abstinent) and 20 current smokers, all male, eyes-closed resting EEG. Relative theta was lower in current and past smokers; relative alpha was higher in current smokers only. The channels with significant group differences are marked in the paper's figure and were not named in the text, so the montage is recorded as whole-head. Cross-sectional study with no blinding or sham control.",
      design: "Case-control",
      cite: { authors: "Lee H, et al.", year: 2023, title: "Persistent impacts of smoking on resting-state EEG in male chronic smokers and past-smokers with 20 years of abstinence", journal: "Sci Rep" }
    },
    {
      id: "pm-9146819", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 63, k: null },
      sites: [], bands: ["beta"], direction: "up", evidence: "preliminary",
      changes: { beta: "up" }, symptoms: ["craving"],
      claim: "Cocaine-dependent men after about 10 days abstinence: more resting beta than both control groups",
      detail: "33 cocaine-dependent men compared with 10 non-drug users and 20 drug users who were not cocaine dependent; eight-site resting EEG. Percent beta was higher in the cocaine-dependent men than in both control groups and a normative database. Frontal and central beta correlated with cocaine use in the last 30 days. The abstract names no electrodes, so sites are whole-head. Taken from the abstract; not checked in the full text. Case-control study recorded during early abstinence.",
      design: "Case-control",
      cite: { authors: "Herning RI, et al.", year: 1997, title: "Neurophysiological signs of cocaine dependence: increased electroencephalogram beta during withdrawal", journal: "Biol Psychiatry" }
    },
    {
      id: "pm-9224905", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 28, k: null },
      sites: [], bands: ["hibeta"], direction: "up", evidence: "preliminary",
      changes: { hibeta: "up" }, symptoms: ["craving"],
      claim: "Detoxified alcoholics: higher resting fast beta (20-28 Hz) power than controls",
      detail: "15 detoxified male alcoholics (at least 2 weeks after detoxification) and 13 controls, 16-channel resting EEG. Resting fast beta power was higher in the alcoholics; the paper also reports abnormal EEG reactivity and no coupling with cerebral blood flow. The abstract names no electrodes, so sites are whole-head. Fast beta is recorded as the hibeta band. Taken from the abstract; not checked in the full text. Very small single-centre study.",
      design: "Case-control",
      cite: { authors: "Günther W, et al.", year: 1997, title: "Functional EEG mapping and SPECT in detoxified male alcoholics", journal: "Eur Arch Psychiatry Clin Neurosci" }
    },
    {
      id: "pm-9246556", condition: "sud", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 102, k: null },
      sites: [], bands: ["beta"], direction: "up", evidence: "preliminary",
      changes: { beta: "up" }, symptoms: ["craving"],
      claim: "Alcohol- and cocaine-dependent inpatients (1-6 months abstinent): more beta than non-drug controls",
      detail: "12 alcohol-dependent and 21 cocaine-dependent patients, and 14 non-drug-dependent controls, with 36 dual-dependent and 19 heroin-dependent patients in the same study. Beta power (high and low) was higher in the alcohol and cocaine groups than in controls, and beta did not correlate with use measures. Only the alcohol and cocaine groups are used here. The abstract names no electrodes, so sites are whole-head. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Costa L, et al.", year: 1997, title: "Quantitative electroencephalographic differences associated with alcohol, cocaine, heroin and dual-substance dependence", journal: "Drug Alcohol Depend" }
    },
    {
      id: "pm-14522608", condition: "ptsd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 116, k: null },
      sites: [], bands: ["alpha","beta"], direction: "ratio", evidence: "preliminary",
      changes: { alpha: "down", beta: "up" }, symptoms: ["intrusions","hyperarousal"],
      claim: "Combat veterans with PTSD: lower resting alpha and higher beta than veterans without PTSD",
      detail: "79 combat veterans with PTSD and 37 without, resting eyes-closed EEG. Alpha power was decreased and beta power increased in the PTSD group. The abstract names no electrodes, so sites are whole-head. The authors suggest beta may help separate PTSD subtypes. Taken from the abstract; not checked in the full text. Cross-sectional comparison; symptoms are the core PTSD clusters and were not separately analysed.",
      design: "Case-control",
      cite: { authors: "Jokić-Begić N, et al.", year: 2003, title: "Quantitative electroencephalogram (qEEG) in combat veterans with post-traumatic stress disorder (PTSD)", journal: "Nord J Psychiatry" }
    },
    {
      id: "pm-25046862", condition: "ptsd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 34, k: null },
      sites: ["P3","Pz","P4","Fz"], bands: ["theta"], direction: "up", evidence: "preliminary",
      changes: { theta: "up" }, symptoms: ["intrusions","hyperarousal"],
      claim: "PTSD: higher theta power in parietal and frontal sources than healthy controls (sLORETA)",
      detail: "17 PTSD patients and 17 matched healthy controls, 5-minute resting EEG. Theta (4.5-7.5 Hz) was increased in parietal areas and in frontal area BA6. Source-localised (sLORETA); mapped to the overlying scalp region, so P3, Pz, P4 and Fz are an approximate mapping. The alpha connectivity result is not used here. Taken from the abstract; not checked in the full text. Very small case-control study.",
      design: "Case-control",
      cite: { authors: "Imperatori C, et al.", year: 2014, title: "Aberrant EEG functional connectivity and EEG power spectra in resting state post-traumatic stress disorder: a sLORETA study", journal: "Biol Psychol" }
    },
    {
      id: "pm-27238074", condition: "ptsd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: null, k: null },
      sites: ["T4","T6","P4"], bands: ["delta","theta"], direction: "down", evidence: "preliminary",
      changes: { delta: "down", theta: "down" }, symptoms: ["intrusions","hyperarousal"],
      claim: "PTSD in combat veterans: lower low-frequency power, mainly right temporoparietal",
      detail: "Service members and veterans with combat blast exposure, varying in PTSD and blast-related mTBI, resting EEG. PTSD was linked to lower low-frequency power, mainly in the right temporoparietal region; the mTBI effect (higher prefrontal and right temporal low-frequency power) is separate and not used here. The abstract gives no electrodes; T4, T6 and P4 are an assumed right temporoparietal mapping, and delta and theta are assumed from low-frequency. Taken from the abstract; not checked in the full text. Group sizes are not given in the abstract.",
      design: "Case-control",
      cite: { authors: "Franke LM, et al.", year: 2016, title: "Distinction in EEG slow oscillations between chronic mild traumatic brain injury and PTSD", journal: "Int J Psychophysiol" }
    },
    {
      id: "cand-ptsd-eneuro-2020", condition: "ptsd", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 69, k: null },
      sites: ["O1","O2","Pz","Fz"], bands: ["alpha"], direction: "down", evidence: "preliminary",
      changes: { alpha: "down" }, symptoms: ["hyperarousal"],
      claim: "PTSD: lower alpha power in visual cortex and default-mode hubs (eyes-open rest)",
      detail: "25 PTSD, 24 generalised anxiety disorder and 20 healthy controls, high-density EEG. Only the standard eyes-open resting state is used; the modified state with passive image viewing is excluded as not resting. Alpha power was lower in PTSD in visual cortex and in posterior cingulate and medial prefrontal cortex. Source-localised (eLORETA); mapped to the overlying scalp region, so O1, O2, Pz and Fz are approximate. The lower alpha tracked hypervigilance. Cross-sectional study.",
      design: "Case-control",
      cite: { authors: "Clancy KJ, et al.", year: 2020, title: "Posttraumatic Stress Disorder Is Associated with α Dysrhythmia across the Visual Cortex and the Default Mode Network", journal: "eNeuro" }
    },
    {
      id: "pm-41066303", condition: "ptsd", type: "protocol",
      metrics: { design: 1, control: "none", blinded: null, n: 21, k: null },
      sites: ["T3"], bands: ["beta"], direction: "down", evidence: "preliminary",
      changes: { beta: "down" }, symptoms: ["intrusions","hyperarousal","sleep","executive"],
      claim: "Z-score neurofeedback in PTSD: fewer PTSD and insomnia symptoms; T3 beta fell after training",
      detail: "21 people with PTSD, ten 20-minute Z-score neurofeedback sessions, uncontrolled pre-post design. PTSD and insomnia symptoms fell, most for intrusions, cognition and mood, and arousal; executive attention improved. Beta at T3 decreased after training. The abstract does not state the training target band or electrode, so the T3 beta change is recorded as the observed effect. Taken from the abstract; not checked in the full text. No control group.",
      design: "Uncontrolled pilot",
      cite: { authors: "Im S", year: 2026, title: "Exploring the Effects of Z-Score Neurofeedback Training in PTSD: A Preliminary Investigation", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-34706446", condition: "ptsd", type: "protocol",
      metrics: { design: 3, control: null, blinded: null, n: 29, k: null },
      sites: ["Pz"], bands: ["alpha"], direction: "up", evidence: "preliminary",
      changes: { alpha: "up" }, symptoms: ["intrusions","hyperarousal"],
      claim: "Low-cost wearable neurofeedback in Rwandan PTSD: resting alpha rose and PCL-5 scores fell",
      detail: "29 participants: 10 neurofeedback, 10 motor-imagery brain-computer interface, and 9 controls, in a game-based protocol outside clinic conditions. Neurofeedback sessions raised resting alpha power (8-12 Hz) at Pz, and three of seven clinical measures improved in the neurofeedback group only; the motor-imagery group showed no such rise. The abstract does not state whether groups were randomised or blinded, and the control arm is not described. Taken from the abstract; not checked in the full text. Small study in a non-clinical setting.",
      design: "Controlled pilot",
      cite: { authors: "du Bois N, et al.", year: 2021, title: "Neurofeedback with low-cost, wearable electroencephalography (EEG) reduces symptoms in chronic Post-Traumatic Stress Disorder", journal: "J Affect Disord" }
    },
    {
      id: "pm-26542620", condition: "tbi", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 81, k: null },
      sites: ["F3","F4"], bands: ["alpha","beta"], direction: "asymmetry", evidence: "preliminary",
      changes: { alpha: "asymmetry", beta: "asymmetry" }, symptoms: ["lowmood","anxiety"],
      claim: "Athletes with past concussion (symptom-free): altered frontal alpha and beta asymmetry vs controls",
      detail: "52 male athletes with a concussion history (9+ months earlier, symptom-free) and 29 controls, resting EEG with mood measures. Frontal alpha and beta asymmetry differed from controls; alpha asymmetry related to depression and anxiety only in the concussion group. The abstract names no electrodes; F3 and F4 are the frontal asymmetry pair assumed. Taken from the abstract; not checked in the full text. Cross-sectional study.",
      design: "Case-control",
      cite: { authors: "Moore RD, et al.", year: 2016, title: "Neurophysiological correlates of persistent psycho-affective alterations in athletes with a history of concussion", journal: "Brain Imaging Behav" }
    },
    {
      id: "pm-26737184", condition: "tbi", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 54, k: null },
      sites: ["Fz","F3","F4"], bands: ["delta","theta","beta"], direction: "ratio", evidence: "preliminary",
      changes: { delta: "down", theta: "down", beta: "up" }, symptoms: ["postconcussion"],
      claim: "Subacute adolescent concussion: less frontal delta and theta, more beta than controls (source level)",
      detail: "21 adolescent athletes with subacute sports concussion (3 months or less) and 33 controls, 5-minute eyes-closed resting EEG on 64 channels. Independent components were clustered into a medial frontal source domain; concussed participants had less delta and theta and more beta power there. Source-localised (ICA with Measure Projection Analysis); mapped to the overlying scalp region, so Fz, F3 and F4 are approximate. Male adolescents only; the paper compares with a separate control group.",
      design: "Case-control",
      cite: { authors: "Balkan O, et al.", year: 2015, title: "Source-domain spectral EEG analysis of sports-related concussion via Measure Projection Analysis", journal: "Annu Int Conf IEEE Eng Med Biol Soc" }
    },
    {
      id: "pm-31094883", condition: "tbi", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 153, k: null },
      sites: [], bands: ["theta","alpha"], direction: "ratio", evidence: "preliminary",
      changes: { theta: "up", alpha: "down" }, symptoms: ["postconcussion"],
      claim: "Chronic military mTBI (over 5 months): higher global relative theta and lower relative alpha than controls",
      detail: "71 individuals with military-related mTBI more than 5 months after injury and 82 controls, eyes-closed resting EEG. Global relative theta was higher and relative alpha lower in the mTBI group. Beta interhemispheric coherence (a connectivity measure) is not used here. Single measures classified individuals poorly (below 60%); a machine-learning composite reached 75%. Sites are whole-head because the abstract names no electrodes. Taken from the abstract; not checked in the full text. Group-level differences are not diagnostic for individuals.",
      design: "Case-control",
      cite: { authors: "Lewine JD, et al.", year: 2019, title: "Quantitative EEG Biomarkers for Mild Traumatic Brain Injury", journal: "J Clin Neurophysiol" }
    },
    {
      id: "pm-39420809", condition: "tbi", type: "biomarker",
      metrics: { design: 2, control: null, blinded: null, n: 47, k: null },
      sites: ["Fz"], bands: ["theta"], direction: "ratio", evidence: "contested",
      changes: { theta: "mixed" }, symptoms: ["memory"],
      claim: "Subacute mTBI: no resting EEG or source-network difference from controls; anterior theta tracks verbal memory",
      detail: "26 people with subacute mTBI and 21 healthy controls, 60-second eyes-closed resting EEG. No EEG parameter differed between the groups. Within the mTBI group, anterior cingulate theta and memory-perception network activity correlated negatively with verbal memory. Source-localised (eLORETA); mapped to the overlying scalp region, so Fz approximates the anterior cingulate. Null group result, included as contested. Taken from the abstract; not checked in the full text.",
      design: "Case-control",
      cite: { authors: "Ueda M, et al.", year: 2025, title: "EEG Oscillatory Activity and Resting-State Networks Associated with Neurocognitive Function in Mild Traumatic Brain Injury", journal: "Clin EEG Neurosci" }
    },
    {
      id: "pm-42642967", condition: "tbi", type: "biomarker",
      metrics: { design: 5, control: null, blinded: null, n: 1236, k: 14 },
      sites: [], bands: ["theta"], direction: "up", evidence: "moderate",
      changes: { theta: "up" }, symptoms: ["postconcussion"],
      claim: "TBI meta-analysis: resting theta power higher than controls (g = 0.50), with heterogeneity",
      detail: "Systematic review and meta-analysis of 14 studies contributing 39 effect sizes (24 studies overall; 713 TBI, 523 controls). Pooled resting theta power was higher in TBI than controls (g = 0.50, p = 0.03), with substantial heterogeneity and publication bias. Etiology and sex moderated theta effects but neither survived FDR correction. The narrative fast-wave suppression is not per band and is not recorded. Whole-head; no electrodes. Taken from the abstract; not checked in the full text.",
      design: "Meta-analysis",
      cite: { authors: "Nwakamma MC, et al.", year: 2026, title: "Resting-state EEG spectral power alterations following traumatic brain injury: a comprehensive systematic review and meta-analysis of clinical and injury-related moderators", journal: "Brain Inj" }
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

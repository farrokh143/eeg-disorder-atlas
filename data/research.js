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

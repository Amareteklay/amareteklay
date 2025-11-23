import type { Locale } from "../locales";

export type LessonContent = {
    core: string;
    moves: string[];
    practice: string[];
};

export type LessonMeta = {
    slug: string;
    order: number;
    durationMinutes?: number;
    title: Record<Locale, string>;
    summary?: Record<Locale, string>;
    content: LessonContent;
};

export type ModuleMeta = {
    title: Record<Locale, string>;
    lessons: LessonMeta[];
};

export type CourseMeta = {
    slug: string;
    level?: "intro" | "intermediate" | "advanced";
    estimatedHours?: number;
    tags?: string[];

    title: Record<Locale, string>;
    tagline?: Record<Locale, string>;
    description?: Record<Locale, string>;

    modules: ModuleMeta[];
};

const en = (value: string): Record<Locale, string> => ({ en: value });

const COURSES: CourseMeta[] = [
    {
        slug: "homo-adapticus-essentials",
        level: "intro",
        estimatedHours: 12,
        tags: ["adaptation", "mindset", "identity"],
        title: en("The Homo Adapticus Essentials"),
        tagline: en("How to live, think, and evolve in a world that will not stop changing."),
        description: en(
            "Build the mental architecture of Homo Adapticus: an adaptive identity, flexible cognition, and daily practices for a high-change world."
        ),
        modules: [
            {
                title: en("Module 1: The Age of Acceleration"),
                lessons: [
                    {
                        slug: "the-world-has-entered-a-new-regime",
                        order: 1,
                        title: en("The World Has Entered a New Regime"),
                        summary: en("Adaptation is now a survival skill, not a bonus."),
                        content: {
                            core: "Rate of change outruns legacy mental models; adaptation keeps you aligned with reality.",
                            moves: [
                                "Contrast linear plans with exponential signals in your field.",
                                "List where you assume stability and tag them as risks."
                            ],
                            practice: [
                                "Write a one-page reflection on three shifts that blindsided you and why."
                            ]
                        }
                    },
                    {
                        slug: "three-interlocking-accelerations",
                        order: 2,
                        title: en("Three Interlocking Accelerations"),
                        summary: en("Technology, complexity, and information amplify each other."),
                        content: {
                            core: "Tech growth, system complexity, and information volume compound into non-linear change.",
                            moves: [
                                "Diagram how a recent tech shift increased complexity and data in your context.",
                                "Note bottlenecks that appear when all three accelerations collide."
                            ],
                            practice: [
                                "Build a cause-effect chain for your industry showing how the three accelerations interact."
                            ]
                        }
                    },
                    {
                        slug: "the-ai-shift-a-force-of-nature",
                        order: 3,
                        title: en("The AI Shift: A Force of Nature"),
                        summary: en("AI behaves like an environmental force, not just a tool."),
                        content: {
                            core: "AI reshapes cognition, markets, and meaning; treat it as an environment you design for.",
                            moves: [
                                "List decisions you already offload to AI and mark where human judgment must stay.",
                                "Identify dependencies and failure modes if AI output is wrong or missing."
                            ],
                            practice: [
                                "Run a one-week AI audit: log each assist, benefit, and hidden cost."
                            ]
                        }
                    },
                    {
                        slug: "the-cost-of-non-adaptation",
                        order: 4,
                        title: en("The Cost of Non-Adaptation"),
                        summary: en("Misalignment with reality creates overload and anxiety."),
                        content: {
                            core: "Refusing to adapt compounds cognitive overload, brittle plans, and missed opportunity.",
                            moves: [
                                "Spot signals of misalignment: repeated surprises, stalled projects, stress spikes.",
                                "Estimate the cost of delays or rework caused by clinging to old models."
                            ],
                            practice: [
                                "Write a non-adaptation bill: time, money, and wellbeing lost to resisting change."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 2: What Is Homo Adapticus?"),
                lessons: [
                    {
                        slug: "definition-and-origins",
                        order: 5,
                        title: en("Definition and Origins"),
                        summary: en("Adaptive self versus fixed self; identity as process."),
                        content: {
                            core: "Homo Adapticus treats identity as evolving software, not fixed hardware.",
                            moves: [
                                "Contrast traits you protect versus traits you iterate.",
                                "List fixed-mindset scripts you still run and where they came from."
                            ],
                            practice: [
                                "Write an evolution statement describing how you want to change this year."
                            ]
                        }
                    },
                    {
                        slug: "the-7-traits-of-homo-adapticus",
                        order: 6,
                        title: en("The 7 Traits of Homo Adapticus"),
                        summary: en("Curiosity, elasticity, reflection, ambiguity tolerance, experimentation, feedback hunger, identity fluidity."),
                        content: {
                            core: "Seven traits form adaptive identity: curiosity, elasticity, reflective reasoning, ambiguity tolerance, experimentation, feedback hunger, and identity fluidity.",
                            moves: [
                                "Self-score each trait and choose one to strengthen first.",
                                "Attach a weekly ritual to the weakest trait."
                            ],
                            practice: [
                                "Design a 14-day micro-challenge to stress-test one weak trait."
                            ]
                        }
                    },
                    {
                        slug: "adaptation-as-identity-not-skill",
                        order: 7,
                        title: en("Adaptation as Identity, Not Skill"),
                        summary: en("Adaptation is who you become, not just what you do."),
                        content: {
                            core: "Adaptive identity makes reinvention default; skills are outputs of that identity.",
                            moves: [
                                "Rewrite role statements from static titles to adaptive trajectories.",
                                "Pair identity claims with behaviors that prove them weekly."
                            ],
                            practice: [
                                "Rewrite your public bio to emphasize adaptive identity over fixed roles."
                            ]
                        }
                    },
                    {
                        slug: "why-traditional-worldviews-fail",
                        order: 8,
                        title: en("Why Traditional Worldviews Fail in a High-Change Era"),
                        summary: en("Stability-first models break under volatility."),
                        content: {
                            core: "Stability-centric worldviews assume slow change and fixed ladders; they fail in volatile systems.",
                            moves: [
                                "List beliefs you hold that assume stability (careers, institutions, expertise).",
                                "Tag which beliefs must be retired, revised, or tested."
                            ],
                            practice: [
                                "Draft a belief update list with actions for each belief."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 3: The Architecture of the Adaptive Mind"),
                lessons: [
                    {
                        slug: "cognitive-elasticity",
                        order: 9,
                        title: en("Cognitive Elasticity"),
                        summary: en("Stretch, update, and reshape mental models deliberately."),
                        content: {
                            core: "Elastic thinkers swap and update models quickly without losing rigor.",
                            moves: [
                                "Explain one topic through three domain lenses to practice model swapping.",
                                "Notice when attachment to a model blocks action and deliberately switch."
                            ],
                            practice: [
                                "Run a 20-minute daily elasticity drill by reinterpreting one news item through science, economics, and psychology."
                            ]
                        }
                    },
                    {
                        slug: "dual-processing-reimagined",
                        order: 10,
                        title: en("Dual Processing Reimagined (System 1 + System 2 + System GPT)"),
                        summary: en("Add an AI layer to fast and slow thinking."),
                        content: {
                            core: "Modern cognition uses intuition, analysis, and AI co-processing with clear boundaries.",
                            moves: [
                                "Assign tasks to System 1, System 2, or System GPT and note failure modes of each.",
                                "Add verification steps when System GPT proposes actions."
                            ],
                            practice: [
                                "For one decision, log what System 1 felt, System 2 reasoned, and System GPT suggested."
                            ]
                        }
                    },
                    {
                        slug: "epistemic-humility-infinite-knowledge",
                        order: 11,
                        title: en("Epistemic Humility in the Age of Infinite Knowledge"),
                        summary: en("Questions beat false certainty."),
                        content: {
                            core: "Humility accepts partial knowledge and designs for disconfirmation.",
                            moves: [
                                "Use confidence intervals on your claims.",
                                "Write disconfirming questions before you act."
                            ],
                            practice: [
                                "Maintain a humility journal: three times you were wrong and how you updated."
                            ]
                        }
                    },
                    {
                        slug: "the-adaptive-loop",
                        order: 12,
                        title: en("The Adaptive Loop"),
                        summary: en("Observe, interpret, adjust, integrate as a continuous loop."),
                        content: {
                            core: "Short sensing loops beat static plans: observe, interpret, adjust, integrate.",
                            moves: [
                                "Schedule weekly loop reviews with evidence and adjustments.",
                                "Tie adjustments to simple experiments, not big bets."
                            ],
                            practice: [
                                "Build a one-page adaptive loop template and fill it every week."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 4: The Physiology of Experience"),
                lessons: [
                    {
                        slug: "your-nervous-system-is-the-first-reality",
                        order: 13,
                        title: en("Your Nervous System Is the First Reality"),
                        summary: en("State comes before thought."),
                        content: {
                            core: "Physiology shapes perception before cognition; regulate the body to clear the mind.",
                            moves: [
                                "Track simple markers (breath pace, tension) before reacting.",
                                "Use state checks before decisions or feedback."
                            ],
                            practice: [
                                "Do a 5-minute pre-meeting scan: note signals, predict bias, choose a reset."
                            ]
                        }
                    },
                    {
                        slug: "the-performance-cycle-and-crash",
                        order: 14,
                        title: en("The Performance Cycle and Crash"),
                        summary: en("Peaks require planned recovery."),
                        content: {
                            core: "Performance spikes invite crashes without recovery; cycles can be engineered.",
                            moves: [
                                "Map your ramp, peak, crash, and recovery phases.",
                                "Pre-plan decompression rituals after high stakes events."
                            ],
                            practice: [
                                "After a high-stakes day, run a 24-hour recovery log and adjust your cycle map."
                            ]
                        }
                    },
                    {
                        slug: "the-imaginary-tyrant",
                        order: 15,
                        title: en("The Imaginary Tyrant"),
                        summary: en("Self-criticism often mirrors stress patterns."),
                        content: {
                            core: "Inner critics are often stress echoes, not identity truths.",
                            moves: [
                                "Name your critic voices and connect them to triggers.",
                                "Map critic spikes to physiological markers."
                            ],
                            practice: [
                                "Script your tyrant's lines and write counters rooted in bodily calming."
                            ]
                        }
                    },
                    {
                        slug: "adaptive-presence",
                        order: 16,
                        title: en("Adaptive Presence"),
                        summary: en("Witness states instead of fusing with them."),
                        content: {
                            core: "Presence lets you notice and choose rather than react.",
                            moves: [
                                "Use 3x3 breathing and sensory anchoring before key moments.",
                                "Label emotions without attaching identity."
                            ],
                            practice: [
                                "Run a daily 10-minute presence drill: notice sensations, name emotions, choose intent."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 5: The Five Domains of Adaptation"),
                lessons: [
                    {
                        slug: "domain-1-the-world",
                        order: 17,
                        title: en("Domain 1: The World"),
                        summary: en("External forces, systems, and constraints."),
                        content: {
                            core: "World factors set the outer game: tech, markets, culture, environment.",
                            moves: [
                                "Map a current challenge against external forces and constraints.",
                                "List opportunities that open if you align with those forces."
                            ],
                            practice: [
                                "Complete a one-page World scan for a project."
                            ]
                        }
                    },
                    {
                        slug: "domain-2-the-mind",
                        order: 18,
                        title: en("Domain 2: The Mind"),
                        summary: en("Cognition, attention, and emotion shape perception."),
                        content: {
                            core: "Attention and emotion filter reality; manage them deliberately.",
                            moves: [
                                "Track attention leaks and emotional triggers.",
                                "Add state-reset rituals to transitions."
                            ],
                            practice: [
                                "Run a three-day attention audit and remove one high-leak habit."
                            ]
                        }
                    },
                    {
                        slug: "domain-3-skill",
                        order: 19,
                        title: en("Domain 3: Skill"),
                        summary: en("Competence is layered micro-skills plus perception."),
                        content: {
                            core: "Skills are stacks of micro-capabilities and perceptual cues.",
                            moves: [
                                "Decompose a goal into micro-skills and sensory cues.",
                                "Plan deliberate practice with feedback loops."
                            ],
                            practice: [
                                "Write a skill stack for a role you want and define the first drill."
                            ]
                        }
                    },
                    {
                        slug: "domain-4-social",
                        order: 20,
                        title: en("Domain 4: Social"),
                        summary: en("Collaboration, politics, and networks shape outcomes."),
                        content: {
                            core: "Humans are relational; social dynamics alter every project outcome.",
                            moves: [
                                "Identify stakeholders, power centers, and norms before acting.",
                                "Design touchpoints that build trust before you need it."
                            ],
                            practice: [
                                "Build a relationship map for a current initiative."
                            ]
                        }
                    },
                    {
                        slug: "domain-5-meaning",
                        order: 21,
                        title: en("Domain 5: Meaning"),
                        summary: en("Values, purpose, and narrative drive motivation."),
                        content: {
                            core: "Meaning anchors action; without it, motivation decays.",
                            moves: [
                                "Write a short meaning statement to guide trade-offs.",
                                "Check whether tasks ladder to that meaning."
                            ],
                            practice: [
                                "Create a meaning-action loop: value -> action -> feedback -> update."
                            ]
                        }
                    },
                    {
                        slug: "domain-interactions",
                        order: 22,
                        title: en("Domain Interactions"),
                        summary: en("Change in one domain cascades through all others."),
                        content: {
                            core: "Domains are coupled; push one and the rest move.",
                            moves: [
                                "Before big changes, run a domino analysis across all five domains.",
                                "Set monitoring signals for secondary effects."
                            ],
                            practice: [
                                "Pick one change and map its impacts across all five domains."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 6: Principles of Adaptive Living"),
                lessons: [
                    {
                        slug: "the-adaptive-day",
                        order: 23,
                        title: en("The Adaptive Day"),
                        summary: en("Structure time to match cognitive rhythms."),
                        content: {
                            core: "Align energy with tasks; design days around peaks and recovery.",
                            moves: [
                                "Tag calendar blocks as deep, shallow, social, or recovery.",
                                "Place deep work in high arousal windows."
                            ],
                            practice: [
                                "Design a seven-day calendar using energy tags and review results."
                            ]
                        }
                    },
                    {
                        slug: "the-adaptive-task",
                        order: 24,
                        title: en("The Adaptive Task"),
                        summary: en("Precision task design increases success under uncertainty."),
                        content: {
                            core: "Define outcomes, constraints, and check-ins to make tasks robust.",
                            moves: [
                                "Set success criteria, constraints, and failure triggers before starting.",
                                "Add checkpoints for feedback, not just deadlines."
                            ],
                            practice: [
                                "Rewrite three current tasks using the adaptive task template."
                            ]
                        }
                    },
                    {
                        slug: "the-adaptive-decision",
                        order: 25,
                        title: en("The Adaptive Decision"),
                        summary: en("Decisions are hypotheses with feedback loops."),
                        content: {
                            core: "Treat decisions as testable bets with reversibility and stop-loss rules.",
                            moves: [
                                "List options with probabilities and assumptions.",
                                "Define stop-loss and review dates for each choice."
                            ],
                            practice: [
                                "Run a decision brief on an upcoming choice and schedule a post-mortem."
                            ]
                        }
                    },
                    {
                        slug: "the-adaptive-identity-loop",
                        order: 26,
                        title: en("The Adaptive Identity Loop"),
                        summary: en("Behavior updates identity, which updates behavior."),
                        content: {
                            core: "Identity and action reinforce each other; small loops create new selves.",
                            moves: [
                                "Pair identity statements with micro-actions.",
                                "Add weekly reflection to reinforce or adjust the loop."
                            ],
                            practice: [
                                "Choose one identity shift and design a 21-day action plan with weekly reflection."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 7: Becoming Homo Adapticus"),
                lessons: [
                    {
                        slug: "self-observation-seeing-patterns-clearly",
                        order: 27,
                        title: en("Self-Observation: Seeing Your Patterns Clearly"),
                        summary: en("Accurate self-observation fuels change."),
                        content: {
                            core: "You cannot adapt what you cannot see; pattern logs expose leverage points.",
                            moves: [
                                "Review triggers, states, behaviors, and outcomes weekly.",
                                "Spot repeating loops and design one intervention per loop."
                            ],
                            practice: [
                                "Complete two weeks of pattern logs and pick one high-leverage change."
                            ]
                        }
                    },
                    {
                        slug: "juxtaposition-exercises-past-vs-future-self",
                        order: 28,
                        title: en("Juxtaposition Exercises: Past vs Future Self"),
                        summary: en("Contrast exposes drift and desired direction."),
                        content: {
                            core: "Comparing past and future selves clarifies gaps and momentum.",
                            moves: [
                                "Write operating systems for past-you and future-you.",
                                "Note habits to retire and habits to acquire."
                            ],
                            practice: [
                                "Record a three-minute audio from future-you coaching present-you."
                            ]
                        }
                    },
                    {
                        slug: "narrative-reconstruction",
                        order: 29,
                        title: en("Narrative Reconstruction"),
                        summary: en("Rewrite your story to align with adaptive identity."),
                        content: {
                            core: "Narratives can trap or free you; author an adaptive storyline.",
                            moves: [
                                "Identify old plotlines that keep you static.",
                                "Replace them with arcs about experimentation and growth."
                            ],
                            practice: [
                                "Draft a one-page adaptive life story and share it for feedback."
                            ]
                        }
                    },
                    {
                        slug: "the-30-day-adaptive-challenge",
                        order: 30,
                        title: en("The 30-Day Adaptive Challenge"),
                        summary: en("Daily micro-adaptations compound."),
                        content: {
                            core: "Small daily changes build adaptive capacity faster than rare big pushes.",
                            moves: [
                                "Pick one domain focus and define a daily micro-action.",
                                "Set a nightly review loop to capture signals."
                            ],
                            practice: [
                                "Run the 30-day plan; track compliance and insights in a simple sheet."
                            ]
                        }
                    },
                    {
                        slug: "your-personal-adaptation-plan",
                        order: 31,
                        title: en("Your Personal Adaptation Plan"),
                        summary: en("Codify ongoing loops, rituals, and checkpoints."),
                        content: {
                            core: "A living plan with rhythms and reviews keeps adaptation active.",
                            moves: [
                                "Set quarterly themes, monthly experiments, and weekly reviews.",
                                "Define metrics that show you are adapting, not just working."
                            ],
                            practice: [
                                "Build a 90-day adaptation plan with dates, metrics, and review cadence."
                            ]
                        }
                    }
                ]
            }
        ]
    },
    {
        slug: "adaptive-learning-mastery",
        level: "intermediate",
        estimatedHours: 10,
        tags: ["learning", "ai", "practice"],
        title: en("Adaptive Learning Mastery"),
        tagline: en("Learn anything faster with an adaptive mind and AI as your cognitive partner."),
        description: en(
            "Design learning projects, practice deliberately, and build AI-augmented systems that accelerate skill acquisition."
        ),
        modules: [
            {
                title: en("Module 1: Learning in the Age of AI"),
                lessons: [
                    {
                        slug: "why-traditional-learning-is-broken",
                        order: 1,
                        title: en("Why Traditional Learning Is Broken"),
                        summary: en("School models favor compliance over adaptability."),
                        content: {
                            core: "Old learning models optimize for memorization and linear curricula, not rapid adaptation.",
                            moves: [
                                "Contrast syllabus-first vs problem-first approaches in your work.",
                                "Identify habits built for exams that no longer serve you."
                            ],
                            practice: [
                                "List three learning habits to drop and three adaptive habits to start."
                            ]
                        }
                    },
                    {
                        slug: "explosion-of-available-knowledge",
                        order: 2,
                        title: en("The Explosion of Available Knowledge"),
                        summary: en("Information abundance creates overwhelm; curation wins."),
                        content: {
                            core: "Abundant information makes curation and timing the new bottlenecks.",
                            moves: [
                                "Create a tiered source list: primary, secondary, AI summaries.",
                                "Set rules for when to stop collecting and start practicing."
                            ],
                            practice: [
                                "Curate a 10-link starter pack for a new skill and prune it to five."
                            ]
                        }
                    },
                    {
                        slug: "ai-as-thinking-partner",
                        order: 3,
                        title: en("AI as a Thinking Partner"),
                        summary: en("AI augments cognition when guided and verified."),
                        content: {
                            core: "AI can tutor, critique, and simulate if you set roles and guardrails.",
                            moves: [
                                "Define AI's role before each session: tutor, critic, or simulator.",
                                "Add verification steps for any AI-derived answer."
                            ],
                            practice: [
                                "Run one study session with AI as tutor and log what improved and what failed."
                            ]
                        }
                    },
                    {
                        slug: "framing-not-memorizing",
                        order: 4,
                        title: en("The New Skill: Framing, Not Memorizing"),
                        summary: en("Questions beat rote memory."),
                        content: {
                            core: "Framing problems and asking sharp questions matter more than storing facts.",
                            moves: [
                                "Turn learning goals into question banks.",
                                "Use hypothesis-first reading to direct attention."
                            ],
                            practice: [
                                "Create a 15-question bank that proves you understand your target skill."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 2: The Principles of Adaptive Learning"),
                lessons: [
                    {
                        slug: "adaptive-learning-loop",
                        order: 5,
                        title: en("The Adaptive Learning Loop"),
                        summary: en("Observe, attempt, feedback, adjust, integrate quickly."),
                        content: {
                            core: "Short learning loops compound; integrate feedback immediately.",
                            moves: [
                                "Time-box attempts and seek feedback before perfection.",
                                "Integrate learnings in writing after each loop."
                            ],
                            practice: [
                                "Run a three-day loop on a micro-skill and document the changes."
                            ]
                        }
                    },
                    {
                        slug: "cognitive-elasticity-learning",
                        order: 6,
                        title: en("Cognitive Elasticity"),
                        summary: en("Switch perspectives to learn new models fast."),
                        content: {
                            core: "Perspective switching accelerates model uptake and prevents rigidity.",
                            moves: [
                                "Use analogies from other domains to explain new concepts.",
                                "Teach back lessons in two different framings."
                            ],
                            practice: [
                                "Teach a new concept using two analogies from different domains."
                            ]
                        }
                    },
                    {
                        slug: "just-in-time-vs-just-in-case-learning",
                        order: 7,
                        title: en("Just-In-Time vs Just-In-Case Learning"),
                        summary: en("Learn when relevance peaks, not in advance."),
                        content: {
                            core: "Prioritize learning that solves immediate problems; park the rest.",
                            moves: [
                                "Maintain a backlog tagged need-now vs parked.",
                                "Schedule reviews to promote parked items when relevant."
                            ],
                            practice: [
                                "Resort your current learning list into JIT and JIC, scheduling JIT first."
                            ]
                        }
                    },
                    {
                        slug: "uncertainty-as-learning-asset",
                        order: 8,
                        title: en("Uncertainty as a Learning Asset"),
                        summary: en("Confusion points to what to learn next."),
                        content: {
                            core: "Confusion is directional; use it to guide targeted experiments.",
                            moves: [
                                "Write confusion statements instead of hiding them.",
                                "Design one experiment per confusion item."
                            ],
                            practice: [
                                "After each study block, log top three confusions and next experiments."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 3: Designing a Learning Project"),
                lessons: [
                    {
                        slug: "defining-the-exact-skill",
                        order: 9,
                        title: en("Defining the Exact Skill"),
                        summary: en("Precision beats ambition."),
                        content: {
                            core: "Clear skill definitions shrink scope and accelerate progress.",
                            moves: [
                                "Write user stories for the skill and set boundaries.",
                                "Clarify what is out of scope to avoid drift."
                            ],
                            practice: [
                                "Draft a one-sentence skill spec with constraints and target audience."
                            ]
                        }
                    },
                    {
                        slug: "shrinking-the-skill-into-micro-skills",
                        order: 10,
                        title: en("Shrinking the Skill Into Micro-Skills"),
                        summary: en("Break complexity into trainable units."),
                        content: {
                            core: "Micro-skills make practice measurable and teachable.",
                            moves: [
                                "Decompose into perception, knowledge, execution, and feedback channels.",
                                "Design drills per micro-skill instead of practicing the whole."
                            ],
                            practice: [
                                "Map one skill into 10 micro-skills with example drills."
                            ]
                        }
                    },
                    {
                        slug: "setting-acceptance-criteria",
                        order: 11,
                        title: en("Setting Acceptance Criteria"),
                        summary: en("Define success before learning begins."),
                        content: {
                            core: "Observable, falsifiable criteria prevent fuzzy progress.",
                            moves: [
                                "Add quality bars and conditions to each micro-skill.",
                                "Decide how you will test and who will judge."
                            ],
                            practice: [
                                "Write acceptance criteria for two micro-skills and share with a peer."
                            ]
                        }
                    },
                    {
                        slug: "creating-a-30-day-learning-plan",
                        order: 12,
                        title: en("Creating a 30-Day Learning Plan"),
                        summary: en("Time-boxed plan with feedback checkpoints."),
                        content: {
                            core: "Sequenced micro-skills plus scheduled assessments keep you on track.",
                            moves: [
                                "Lay out weekly demos and review points.",
                                "Mix drills, application, and reflection blocks."
                            ],
                            practice: [
                                "Build a 30-day calendar with daily drills and weekly demos."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 4: Deliberate Practice in a High-Speed World"),
                lessons: [
                    {
                        slug: "what-makes-practice-deliberate",
                        order: 13,
                        title: en("What Makes Practice Deliberate"),
                        summary: en("Stretch zones, tight feedback, clear goals."),
                        content: {
                            core: "Deliberate practice balances difficulty, feedback, and focus.",
                            moves: [
                                "Set difficulty to roughly 60-80% success.",
                                "Instrument feedback so you see errors fast."
                            ],
                            practice: [
                                "Redesign one practice session with explicit stretch and feedback knobs."
                            ]
                        }
                    },
                    {
                        slug: "feedback-engineering",
                        order: 14,
                        title: en("Feedback Engineering"),
                        summary: en("High-quality signals drive progress."),
                        content: {
                            core: "Better feedback loops beat more hours; AI can amplify signal quality.",
                            moves: [
                                "Define objective metrics and rubrics for your drills.",
                                "Use AI critique with the rubric, then compare to human feedback."
                            ],
                            practice: [
                                "Create a feedback rubric, run one AI critique, and compare to human input."
                            ]
                        }
                    },
                    {
                        slug: "constraint-driven-skill-building",
                        order: 15,
                        title: en("Constraint-Driven Skill Building"),
                        summary: en("Constraints create focus and creativity."),
                        content: {
                            core: "Intentional limits create sharper skills and reveal weaknesses.",
                            moves: [
                                "Apply time, tool, or format constraints to a drill.",
                                "Rotate constraints to stress different sub-skills."
                            ],
                            practice: [
                                "Do a 25-minute constrained drill (one take, minimal tools, no undo)."
                            ]
                        }
                    },
                    {
                        slug: "identity-and-skill-formation",
                        order: 16,
                        title: en("Identity and Skill Formation"),
                        summary: en("Become the person who practices."),
                        content: {
                            core: "Link practice to identity to sustain consistency over peaks.",
                            moves: [
                                "Write identity statements that justify your practice habits.",
                                "Track consistency and celebrate streaks, not just outcomes."
                            ],
                            practice: [
                                "Write a practice identity manifesto and track adherence for two weeks."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 5: AI-Augmented Learning Systems"),
                lessons: [
                    {
                        slug: "ai-as-tutor-critic-and-simulator",
                        order: 17,
                        title: en("AI as Tutor, Critic, and Simulator"),
                        summary: en("Use AI roles deliberately."),
                        content: {
                            core: "Different roles require different prompts and safeguards.",
                            moves: [
                                "Create role-specific prompt templates before sessions.",
                                "Plan verification for any critical output."
                            ],
                            practice: [
                                "Build three prompts (tutor, critic, simulator) for one micro-skill."
                            ]
                        }
                    },
                    {
                        slug: "designing-ai-powered-drills",
                        order: 18,
                        title: en("Designing AI-Powered Drills"),
                        summary: en("Custom exercises targeted at weaknesses."),
                        content: {
                            core: "AI can generate reps with varied difficulty and immediate feedback.",
                            moves: [
                                "Ask AI to create drills that focus on your error patterns.",
                                "Scale difficulty gradually and capture scoring data."
                            ],
                            practice: [
                                "Use AI to create and grade five drills; log error patterns."
                            ]
                        }
                    },
                    {
                        slug: "building-your-learning-copilot-in-vs-code",
                        order: 19,
                        title: en("Building Your Learning Copilot in VS Code"),
                        summary: en("Integrate AI into your workflow."),
                        content: {
                            core: "Embedding AI in your tools reduces friction and increases reps.",
                            moves: [
                                "Set up snippets, chat prompts, and test harnesses inside VS Code.",
                                "Measure where the copilot saves time and where it needs guardrails."
                            ],
                            practice: [
                                "Configure one copilot-like workflow and measure time saved on a task."
                            ]
                        }
                    },
                    {
                        slug: "automating-reflection-and-knowledge-retrieval",
                        order: 20,
                        title: en("Automating Reflection and Knowledge Retrieval"),
                        summary: en("AI-enhanced notes and spaced repetition."),
                        content: {
                            core: "Automate summaries, flashcards, and review schedules to keep knowledge alive.",
                            moves: [
                                "Auto-summarize sessions and generate cards with prompts.",
                                "Schedule spaced reviews and track retention."
                            ],
                            practice: [
                                "Build a workflow that turns daily notes into spaced-repetition cards."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 6: Building Your Adaptive Learning System"),
                lessons: [
                    {
                        slug: "the-adaptive-learning-day",
                        order: 21,
                        title: en("The Adaptive Learning Day"),
                        summary: en("Align daily rhythms to cognitive windows."),
                        content: {
                            core: "Structure days with acquisition, drills, and reflection tied to your energy.",
                            moves: [
                                "Place acquisition in high-focus windows, drills midday, reflection at night.",
                                "Use small buffers to protect learning blocks."
                            ],
                            practice: [
                                "Pilot a five-day adaptive schedule and adjust after review."
                            ]
                        }
                    },
                    {
                        slug: "the-adaptive-knowledge-base",
                        order: 22,
                        title: en("The Adaptive Knowledge Base"),
                        summary: en("Keep notes alive and linked to outcomes."),
                        content: {
                            core: "A layered knowledge base (capture, distill, express) grows with your skills.",
                            moves: [
                                "Link notes to demos and decisions, not just topics.",
                                "Distill weekly to prevent bloat."
                            ],
                            practice: [
                                "Build a simple PKM structure with daily capture and weekly distillation."
                            ]
                        }
                    },
                    {
                        slug: "the-portfolio-principle",
                        order: 23,
                        title: en("The Portfolio Principle"),
                        summary: en("Document and demonstrate progress."),
                        content: {
                            core: "Shipping small artifacts proves learning and attracts feedback.",
                            moves: [
                                "Ship one small artifact each week tied to a skill.",
                                "Narrate what changed and what you learned."
                            ],
                            practice: [
                                "Publish one artifact per week for four weeks and gather feedback."
                            ]
                        }
                    },
                    {
                        slug: "your-personal-learning-operating-system",
                        order: 24,
                        title: en("Your Personal Learning Operating System"),
                        summary: en("Combine rituals, tools, metrics, and reviews."),
                        content: {
                            core: "An operating system codifies your rituals, metrics, and review cadence.",
                            moves: [
                                "Define KPIs like practice hours, shipped artifacts, and feedback loops.",
                                "Schedule monthly reviews to adjust the system."
                            ],
                            practice: [
                                "Write a one-page learning OS with tools, rituals, and monthly review dates."
                            ]
                        }
                    }
                ]
            }
        ]
    },
    {
        slug: "five-domains-of-adaptation",
        level: "intro",
        estimatedHours: 8,
        tags: ["frameworks", "systems", "reflection"],
        title: en("The Five Domains of Adaptation"),
        tagline: en("Understand the true structure of life, change, and human development."),
        description: en(
            "Learn the five-domain model—World, Mind, Skill, Social, Meaning—and use it to diagnose challenges and design growth."
        ),
        modules: [
            {
                title: en("Module 1: The World Domain"),
                lessons: [
                    {
                        slug: "what-the-world-really-means",
                        order: 1,
                        title: en('What "The World" Really Means'),
                        summary: en("Systems, forces, constraints, and opportunities."),
                        content: {
                            core: "The World domain is the external system of forces you must align with.",
                            moves: [
                                "Map actors, incentives, and constraints for a current context.",
                                "Identify where you fight reality versus flow with it."
                            ],
                            practice: [
                                "Draw a system map for a project showing inputs, outputs, and bottlenecks."
                            ]
                        }
                    },
                    {
                        slug: "three-scales-of-reality",
                        order: 2,
                        title: en("Three Scales of Reality"),
                        summary: en("Personal, institutional, and planetary layers interact."),
                        content: {
                            core: "Reality operates on multiple scales; decisions echo differently at each level.",
                            moves: [
                                "Analyze one decision at personal, institutional, and planetary scales.",
                                "Spot conflicts between scales and plan mitigations."
                            ],
                            practice: [
                                "Write a memo on how a personal choice is shaped by institutional and planetary forces."
                            ]
                        }
                    },
                    {
                        slug: "forces-of-change",
                        order: 3,
                        title: en("The Forces of Change"),
                        summary: en("Technology, economics, culture, environment, AI."),
                        content: {
                            core: "Tech, economic, cultural, environmental, and AI forces drive change in the World domain.",
                            moves: [
                                "Track leading indicators for each force that affects you.",
                                "Assign rough probabilities to shifts and plan options."
                            ],
                            practice: [
                                "Build a monthly forces dashboard with five metrics."
                            ]
                        }
                    },
                    {
                        slug: "reading-the-environment-like-a-scientist",
                        order: 4,
                        title: en("Reading the Environment Like a Scientist"),
                        summary: en("Observe patterns before reacting emotionally."),
                        content: {
                            core: "Scientific observation beats reactive judgment; collect data before acting.",
                            moves: [
                                "Form hypotheses about patterns you see.",
                                "Run small probes to test instead of assuming."
                            ],
                            practice: [
                                "Run a two-week observation log on a workplace pattern and test one hypothesis."
                            ]
                        }
                    },
                    {
                        slug: "alignment-with-reality",
                        order: 5,
                        title: en("Alignment With Reality"),
                        summary: en("Act in harmony with the actual world, not the imagined one."),
                        content: {
                            core: "Progress requires acting on how things are, not how you wish they were.",
                            moves: [
                                "List assumptions and seek disconfirming evidence.",
                                "Calibrate plans with feedback from people closest to the facts."
                            ],
                            practice: [
                                "List five assumptions about a goal and design tests to validate or kill each."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 2: The Mind Domain"),
                lessons: [
                    {
                        slug: "mind-as-system-not-identity",
                        order: 6,
                        title: en("Your Mind as a System, Not an Identity"),
                        summary: en("Cognitive modules and emotional loops are components."),
                        content: {
                            core: "The mind is a set of subsystems, not your essence; states are not identity.",
                            moves: [
                                "Label subsystems like planner, critic, and explorer as they show up.",
                                "Separate self-worth from transient states."
                            ],
                            practice: [
                                "Keep a two-day log labeling which subsystem dominated each hour."
                            ]
                        }
                    },
                    {
                        slug: "attention-as-most-valuable-resource",
                        order: 7,
                        title: en("Attention as the Most Valuable Resource"),
                        summary: en("Attention allocation defines your reality."),
                        content: {
                            core: "Attention budgets determine what exists for you; leaks are costly.",
                            moves: [
                                "Create attention budgets for deep work and recovery.",
                                "Set no-trade zones to protect focus."
                            ],
                            practice: [
                                "Track attention allocation for three days and redesign one block."
                            ]
                        }
                    },
                    {
                        slug: "cognitive-bias-and-model-updating",
                        order: 8,
                        title: en("Cognitive Bias and Model Updating"),
                        summary: en("Bias resists new info; updating must be explicit."),
                        content: {
                            core: "Minds resist change; you need deliberate updating rituals.",
                            moves: [
                                "Place small bets or predictions to surface bias.",
                                "Review prediction outcomes and adjust models."
                            ],
                            practice: [
                                "Make five predictions with probabilities; review outcomes in a week."
                            ]
                        }
                    },
                    {
                        slug: "emotional-physiology",
                        order: 9,
                        title: en("Emotional Physiology"),
                        summary: en("Feelings are cycles, not truths."),
                        content: {
                            core: "Emotions are physiological loops; naming them lowers fusion.",
                            moves: [
                                "Check bodily markers before labeling a feeling.",
                                "Track triggers and exits for recurring states."
                            ],
                            practice: [
                                "Do a five-times-per-day state check-in for a week; note triggers and exits."
                            ]
                        }
                    },
                    {
                        slug: "adaptive-cognition",
                        order: 10,
                        title: en("Adaptive Cognition"),
                        summary: en("Combine reflection, flexibility, and model switching."),
                        content: {
                            core: "Adaptive thinkers switch models and reflect quickly to fit changing inputs.",
                            moves: [
                                "Run cognitive sprints to try new lenses on stubborn problems.",
                                "Pair reflection time with specific model switches."
                            ],
                            practice: [
                                "Choose a stubborn problem and analyze it with two new models."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 3: The Skill Domain"),
                lessons: [
                    {
                        slug: "what-a-skill-really-is",
                        order: 11,
                        title: en("What a Skill Really Is"),
                        summary: en("Micro-skills plus patterns plus perception."),
                        content: {
                            core: "Skills are composites of sensing, deciding, executing, and reviewing loops.",
                            moves: [
                                "Break target skills into sensing, deciding, executing, reviewing components.",
                                "Identify which component is weakest."
                            ],
                            practice: [
                                "Decompose one skill into its four components and pick a component to drill."
                            ]
                        }
                    },
                    {
                        slug: "the-skill-stack",
                        order: 12,
                        title: en("The Skill Stack"),
                        summary: en("Balance depth and breadth."),
                        content: {
                            core: "A healthy skill stack mixes depth spikes with supporting breadth.",
                            moves: [
                                "Sketch your current T-shaped stack with spikes and bars.",
                                "Plan complements that support your primary spike."
                            ],
                            practice: [
                                "Sketch your current skill T-shape; add one planned spike and one new bar."
                            ]
                        }
                    },
                    {
                        slug: "deliberate-practice-revisited",
                        order: 13,
                        title: en("Deliberate Practice Revisited"),
                        summary: en("Use stretch, constraints, and feedback loops."),
                        content: {
                            core: "Deliberate practice is engineered discomfort with tight feedback.",
                            moves: [
                                "Shorten feedback latency to under 72 hours.",
                                "Quantify errors and set goals for reduction."
                            ],
                            practice: [
                                "Redesign a practice plan with 72-hour feedback cycles."
                            ]
                        }
                    },
                    {
                        slug: "skill-acquisition-in-the-age-of-ai",
                        order: 14,
                        title: en("Skill Acquisition in the Age of AI"),
                        summary: en("Partner with AI to accelerate."),
                        content: {
                            core: "AI can expand reps, scenarios, and critiques when guided well.",
                            moves: [
                                "Use AI to generate varied examples and counterexamples.",
                                "Let AI critique outputs using your rubric."
                            ],
                            practice: [
                                "For one micro-skill, ask AI for 10 scenarios and solve them."
                            ]
                        }
                    },
                    {
                        slug: "skill-maintenance-and-reinvention",
                        order: 15,
                        title: en("Skill Maintenance and Reinvention"),
                        summary: en("Prevent decay and plan upgrades."),
                        content: {
                            core: "Skills decay without maintenance; periodic reinvention keeps them relevant.",
                            moves: [
                                "Schedule maintenance drills for core skills.",
                                "Set reinvention seasons to upgrade tools and methods."
                            ],
                            practice: [
                                "Plan a quarterly maintenance and upgrade calendar for your top three skills."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 4: The Social Domain"),
                lessons: [
                    {
                        slug: "why-social-reality-is-a-domain-of-adaptation",
                        order: 16,
                        title: en("Why Social Reality Is a Domain of Adaptation"),
                        summary: en("Humans are relational; isolation distorts outcomes."),
                        content: {
                            core: "Social dynamics shape results; ignoring them is self-sabotage.",
                            moves: [
                                "List where you rely on social inputs and where you avoid them.",
                                "Identify missing relationships that would unblock work."
                            ],
                            practice: [
                                "Map three projects and the people who influence them."
                            ]
                        }
                    },
                    {
                        slug: "social-dynamics-101",
                        order: 17,
                        title: en("Social Dynamics 101"),
                        summary: en("Power, norms, expectations, coordination."),
                        content: {
                            core: "Power flows, norms, and coordination costs dictate group behavior.",
                            moves: [
                                "Observe status moves and shared scripts in meetings.",
                                "Spot coordination bottlenecks and design fixes."
                            ],
                            practice: [
                                "Run a meeting observation: log norms, power flows, and bottlenecks."
                            ]
                        }
                    },
                    {
                        slug: "adaptive-communication",
                        order: 18,
                        title: en("Adaptive Communication"),
                        summary: en("Frame messages to audience and state."),
                        content: {
                            core: "Communication adapts to audience, context, and emotional state.",
                            moves: [
                                "Use intent-context-impact checks before speaking.",
                                "Prepare three frames for important messages: data, story, request."
                            ],
                            practice: [
                                "Rewrite an important message using data, story, and request frames."
                            ]
                        }
                    },
                    {
                        slug: "social-capital-and-network-awareness",
                        order: 19,
                        title: en("Social Capital and Network Awareness"),
                        summary: en("Opportunities move through people and trust."),
                        content: {
                            core: "Networks move information and opportunity; invest before you need them.",
                            moves: [
                                "Maintain a light relationship operating system.",
                                "Lead with value before asking for help."
                            ],
                            practice: [
                                "Schedule three value-first touches this week and log responses."
                            ]
                        }
                    },
                    {
                        slug: "collaboration-in-high-change-environments",
                        order: 20,
                        title: en("Collaboration in High-Change Environments"),
                        summary: en("Uncertainty demands explicit alignment."),
                        content: {
                            core: "Under uncertainty, teams need explicit agreements and fast loops.",
                            moves: [
                                "Set working agreements, cadences, and definitions of done.",
                                "Review alignment weekly and adjust roles if needed."
                            ],
                            practice: [
                                "For a team project, co-write a one-page working agreement."
                            ]
                        }
                    }
                ]
            },
            {
                title: en("Module 5: The Meaning Domain"),
                lessons: [
                    {
                        slug: "meaning-as-a-human-operating-system",
                        order: 21,
                        title: en("Meaning as a Human Operating System"),
                        summary: en("Meaning organizes perception and effort."),
                        content: {
                            core: "Meaning is the OS that directs attention and energy.",
                            moves: [
                                "List your meaning sources and link them to behaviors.",
                                "Check for conflicts between stated values and actions."
                            ],
                            practice: [
                                "Write a meaning map connecting values to weekly actions."
                            ]
                        }
                    },
                    {
                        slug: "identity-as-a-story-not-a-fixed-object",
                        order: 22,
                        title: en("Identity as a Story, Not a Fixed Object"),
                        summary: en("Self-narrative is editable."),
                        content: {
                            core: "Identity is a narrative you author; it can be rewritten to allow change.",
                            moves: [
                                "Spot inherited scripts and decide which to drop.",
                                "Draft adaptive scripts that allow iteration."
                            ],
                            practice: [
                                "Write a two-paragraph identity draft that allows change."
                            ]
                        }
                    },
                    {
                        slug: "values-as-adaptive-anchors",
                        order: 23,
                        title: en("Values as Adaptive Anchors"),
                        summary: en("Values stabilize while allowing motion."),
                        content: {
                            core: "Values anchor you in motion; they guide trade-offs under stress.",
                            moves: [
                                "Choose three values and define how each shows up under pressure.",
                                "Check decisions against those definitions."
                            ],
                            practice: [
                                "For a recent conflict, analyze which value you protected or violated."
                            ]
                        }
                    },
                    {
                        slug: "purpose-in-an-accelerating-world",
                        order: 24,
                        title: en("Purpose in an Accelerating World"),
                        summary: en("Purpose counters drift and nihilism."),
                        content: {
                            core: "A purpose thesis guides action and resists nihilism in fast change.",
                            moves: [
                                "Define scope and horizon for your purpose thesis.",
                                "Test it with small experiments before committing."
                            ],
                            practice: [
                                "Draft a six-month purpose experiment with clear outcomes."
                            ]
                        }
                    },
                    {
                        slug: "the-meaning-action-loop",
                        order: 25,
                        title: en("The Meaning-Action Loop"),
                        summary: en("Meaning shapes behavior; behavior reshapes meaning."),
                        content: {
                            core: "Action and meaning reinforce each other; closing the loop keeps direction.",
                            moves: [
                                "Set weekly reflection to check what felt meaningful.",
                                "Adjust actions based on that reflection."
                            ],
                            practice: [
                                "Set a weekly meaning review: what mattered, what did not, and why."
                            ]
                        }
                    }
                ]
            }
        ]
    }
];

function t(record: Record<Locale, string> | undefined, locale: Locale): string {
    if (!record) return "";
    return record[locale] || record["en"] || Object.values(record)[0] || "";
}

export function getCourses(locale: Locale) {
    return COURSES.map((course) => {
        const allLessons = course.modules.flatMap((m) => m.lessons);
        return {
            ...course,
            titleLabel: t(course.title, locale),
            taglineLabel: t(course.tagline, locale),
            descriptionLabel: t(course.description, locale),
            totalLessons: allLessons.length,
        };
    });
}

export function getCourseBySlug(courseSlug: string, locale: Locale) {
    const course = COURSES.find((c) => c.slug === courseSlug);
    if (!course) return null;

    const modules = course.modules.map((mod) => ({
        ...mod,
        titleLabel: t(mod.title, locale),
        lessons: mod.lessons.map((lesson) => ({
            ...lesson,
            titleLabel: t(lesson.title, locale),
            summaryLabel: t(lesson.summary, locale),
        })),
    }));

    const allLessons = modules.flatMap((m) => m.lessons);

    return {
        ...course,
        titleLabel: t(course.title, locale),
        taglineLabel: t(course.tagline, locale),
        descriptionLabel: t(course.description, locale),
        modules,
        lessons: allLessons,
        totalLessons: allLessons.length,
    };
}

export function getLessonMeta(courseSlug: string, lessonSlug: string, locale: Locale) {
    const course = getCourseBySlug(courseSlug, locale);
    if (!course) return null;

    const allLessons = course.lessons;
    const lessonIndex = allLessons.findIndex((l) => l.slug === lessonSlug);
    if (lessonIndex === -1) return null;

    const lesson = allLessons[lessonIndex];
    const prev = allLessons[lessonIndex - 1] || null;
    const next = allLessons[lessonIndex + 1] || null;

    return {
        course,
        lesson,
        prev,
        next,
    };
}

export function getAllCourseSlugs() {
    return COURSES.map((c) => c.slug);
}

export function getAllLessonSlugs() {
    const slugs: { courseSlug: string; lessonSlug: string }[] = [];
    for (const course of COURSES) {
        for (const mod of course.modules) {
            for (const lesson of mod.lessons) {
                slugs.push({ courseSlug: course.slug, lessonSlug: lesson.slug });
            }
        }
    }
    return slugs;
}


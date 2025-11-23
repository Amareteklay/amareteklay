import { notFound } from "next/navigation";
import {
    getLessonMeta,
    getAllLessonSlugs,
} from "@/lib/courses";
import { isSupportedLocale, locales, type Locale } from "@/lib/locales";
import CourseLessonLayout from "@/components/courses/CourseLessonLayout";

type Params = { locale: string; courseSlug: string; lessonSlug: string };
type Props = {
    params: Promise<Params>;
};

export async function generateStaticParams() {
    const slugs = getAllLessonSlugs();
    const params = [];
    for (const locale of locales) {
        for (const item of slugs) {
            params.push({ locale, ...item });
        }
    }
    return params;
}

const LESSON_CONTENT: Record<string, React.ReactNode> = {
    // Module 1
    "the-ai-mirage": (
        <>
            <p className="lead">
                We often mistake the map for the territory. With AI, we are mistaking the mirror for the person standing in front of it.
            </p>
            <h2>The Illusion of Understanding</h2>
            <p>
                Large Language Models (LLMs) are statistical engines, not reasoning minds. They predict the next likely token based on vast amounts of human text. When they sound "smart," it is because they are mirroring the collective intelligence of humanity, not generating independent thought.
            </p>
            <p>
                Understanding this distinction is the first step to using AI effectively. If you treat it as an oracle, you will be misled. If you treat it as a pattern-matching engine, you can wield it with precision.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>When have you attributed "intent" or "understanding" to an AI response?</li>
                <li>How would your interaction change if you viewed the AI solely as a text predictor?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Ask an AI to explain a complex topic you know well. Look closely for subtle errors or "hallucinations" that sound plausible but are factually wrong.</li>
            </ul>
        </>
    ),
    "why-thinking-must-change": (
        <>
            <p className="lead">
                In a world where answers are cheap, questions become the new currency of value.
            </p>
            <h2>From Retrieval to Curation</h2>
            <p>
                Traditionally, expertise was about storing information. You were valuable because you knew things others didn't. Today, access to information is universal. The bottleneck has shifted from <em>access</em> to <em>discernment</em>.
            </p>
            <p>
                We must move from being "knowers" to being "curators" and "synthesizers." The skill is no longer finding the answer, but verifying it, contextualizing it, and applying it to unique human problems.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>What parts of your job rely on "retrieval" of facts? How might AI automate that?</li>
                <li>What parts rely on judgment, empathy, or complex synthesis?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Take a problem you are solving. Ask AI for 5 different approaches. Your task is not to pick one, but to synthesize a 6th approach that combines the best elements of the AI's suggestions with your own context.</li>
            </ul>
        </>
    ),
    "homo-adapticus": (
        <>
            <p className="lead">
                Adaptability is not just a skill; it is a stance. It is the refusal to be obsolete.
            </p>
            <h2>The Core Stance</h2>
            <p>
                Homo Adapticus is the next iteration of the professional. It is someone who does not fear change but surfs it. This requires a shift from "learning to do" to "learning to learn."
            </p>
            <p>
                In an accelerating world, your static knowledge depreciates faster than ever. Your ability to acquire new mental models and discard old ones is your only appreciating asset.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>What is a skill you learned 5 years ago that is now obsolete?</li>
                <li>What is a skill you are resisting learning today?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Identify one tool or method you use daily that hasn't changed in 3 years. Research if there is an AI-augmented way to do it. Try it for one hour.</li>
            </ul>
        </>
    ),

    // Module 2
    "ai-modes": (
        <>
            <p className="lead">
                AI is not one tool; it is a shapeshifter. Knowing which mode to use is half the battle.
            </p>
            <h2>Calculator, Oracle, Partner</h2>
            <p>
                <strong>Calculator:</strong> Use AI for deterministic tasks like formatting data, translating code, or summarizing text. It is highly reliable here.
            </p>
            <p>
                <strong>Oracle:</strong> Use AI to query knowledge. But beware: it is a "fuzzy" oracle. It hallucinates. Verify everything.
            </p>
            <p>
                <strong>Partner:</strong> Use AI to brainstorm, critique, and roleplay. This is where it shines. It doesn't need to be "right"; it just needs to be stimulating.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>Which mode do you use most often?</li>
                <li>Have you ever used it as a Calculator when you should have used it as a Partner?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Take a vague idea. Treat AI as a Partner: "I have this half-baked idea about X. Ask me 3 questions to help me clarify it."</li>
            </ul>
        </>
    ),
    "probabilities-not-prophecies": (
        <>
            <p className="lead">
                AI deals in likelihoods. Humans crave certainties. This mismatch is the source of many errors.
            </p>
            <h2>Thinking Probabilistically</h2>
            <p>
                When an LLM generates text, it is rolling dice on every word. It is not stating a fact; it is stating the most probable continuation.
            </p>
            <p>
                To work with AI, you must become comfortable with ambiguity. Don't ask "Is this true?" Ask "How likely is this to be true, and how can I verify it?"
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>How do you handle uncertainty in your work?</li>
                <li>Do you trust AI outputs too easily because they look confident?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Ask AI a question with no single right answer (e.g., "What is the future of remote work?"). Notice how it constructs a plausible narrative. Now ask it to argue the exact opposite.</li>
            </ul>
        </>
    ),
    "system-triad": (
        <>
            <p className="lead">
                Kahneman gave us System 1 and 2. Now we have System GPT.
            </p>
            <h2>The Triad</h2>
            <p>
                <strong>System 1 (Intuition):</strong> Fast, automatic, emotional. Good for quick decisions, bad for complex logic.
            </p>
            <p>
                <strong>System 2 (Analysis):</strong> Slow, effortful, logical. Good for math and reasoning, but tiring.
            </p>
            <p>
                <strong>System GPT (AI):</strong> Fast, encyclopedic, tireless, but prone to error.
            </p>
            <p>
                The goal is to offload System 2 drudgery to System GPT, while using System 1 to guide the process and System 2 to verify the results.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>Where do you spend most of your mental energy? System 1 or 2?</li>
                <li>Can System GPT take over some of your System 2 load?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Next time you have a "System 2" task (e.g., analyzing a spreadsheet, editing a long doc), try to delegate the first pass to AI. Measure how much energy you saved.</li>
            </ul>
        </>
    ),

    // Module 3
    "prompt-as-specification": (
        <>
            <p className="lead">
                A prompt is not a conversation; it is a piece of code written in English.
            </p>
            <h2>Precision Matters</h2>
            <p>
                Vague prompts get vague answers. To get high-quality output, you must specify the constraints, the format, the tone, and the context.
            </p>
            <p>
                Think of yourself as a software engineer. Your prompt is the spec. If the output is buggy, the bug is likely in your spec.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>Look at your last 3 prompts. Were they specific or vague?</li>
                <li>Did you provide context (who you are, what the goal is)?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Take a simple request like "Write an email." Rewrite it with: Role (Act as...), Context (I am writing to...), Constraints (Keep it under 100 words, be professional but warm), and Format (Use bullet points for the main asks).</li>
            </ul>
        </>
    ),
    "tasks-to-workflows": (
        <>
            <p className="lead">
                Amateurs prompt. Professionals build workflows.
            </p>
            <h2>Chaining Steps</h2>
            <p>
                Don't try to do everything in one shot. Complex tasks require a chain of steps.
            </p>
            <p>
                <strong>Example:</strong> Instead of "Write a blog post about X," try:
                <ol>
                    <li>"Generate 5 outlines for a post about X."</li>
                    <li>"Critique outline #3 and suggest improvements."</li>
                    <li>"Write the introduction based on the improved outline."</li>
                </ol>
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>Where do you try to force AI to do too much at once?</li>
                <li>How could you break that task into 3 distinct steps?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Pick a complex deliverable. Map out a 3-step "AI chain" to create it. Run the chain.</li>
            </ul>
        </>
    ),
    "human-in-the-loop": (
        <>
            <p className="lead">
                Automation without supervision is negligence.
            </p>
            <h2>The Loop</h2>
            <p>
                You must always remain in the loop. You are the pilot; AI is the autopilot. You don't go to sleep in the cockpit.
            </p>
            <p>
                Your role shifts from "creator" to "reviewer." This requires a different kind of attention—vigilance rather than flow.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>Have you ever sent AI output without reading it?</li>
                <li>What is the worst that could happen if the AI made a mistake in your current task?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Establish a "verification checklist" for your AI outputs. (e.g., Check facts, Check tone, Check formatting). Use it for one day.</li>
            </ul>
        </>
    ),

    // Module 4
    "overreliance-and-laziness": (
        <>
            <p className="lead">
                Use it or lose it. The brain is a muscle, and AI is a forklift.
            </p>
            <h2>Cognitive Atrophy</h2>
            <p>
                If you use a forklift to lift every box, your muscles will atrophy. If you use AI to write every sentence and solve every problem, your mind will soften.
            </p>
            <p>
                You must choose where to struggle. Struggle is where learning happens. Don't outsource the struggle that builds the skills you care about.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>What is a "hard" mental task you enjoy?</li>
                <li>Are you tempted to outsource it? Why?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Designate "AI-free zones" in your work. Tasks where you commit to doing it the hard way to keep your edge.</li>
            </ul>
        </>
    ),
    "epistemic-humility": (
        <>
            <p className="lead">
                The more information we have, the less we know for sure.
            </p>
            <h2>Updating Beliefs</h2>
            <p>
                In an AI-rich world, misinformation and plausible-sounding nonsense will proliferate. We need epistemic humility—the willingness to say "I don't know" and the discipline to verify.
            </p>
            <p>
                Hold your beliefs loosely. Be ready to update them when new data arrives.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>When was the last time you changed your mind about something important?</li>
                <li>How do you verify information you find online?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Find a topic where you have a strong opinion. Ask AI to provide the "strongest arguments against" your position. Read them with an open mind.</li>
            </ul>
        </>
    ),
    "attention-emotion-ai": (
        <>
            <p className="lead">
                Your attention is the scarcity. AI is the abundance.
            </p>
            <h2>Nervous System Regulation</h2>
            <p>
                AI tools are designed to be frictionless. They can speed us up to a pace that our nervous systems cannot handle.
            </p>
            <p>
                Notice how you feel when working with AI. Are you anxious? Impatient? Scattered? You must govern the pace, or the tool will govern you.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>How does your body feel after 2 hours of deep work vs. 2 hours of AI prompting?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Practice "slow prompting." Take 3 deep breaths before hitting enter. Read the output slowly. Don't rush to the next prompt.</li>
            </ul>
        </>
    ),

    // Module 5
    "bias-manipulation": (
        <>
            <p className="lead">
                AI mirrors our best and our worst. It is not neutral.
            </p>
            <h2>The Dark Side</h2>
            <p>
                Models are trained on human data, which contains bias, stereotypes, and darkness. They can be manipulated to produce harmful content, or they can subtly influence your views.
            </p>
            <p>
                Be aware of the "view from nowhere" illusion. Every model has a perspective encoded in its weights.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>Have you noticed any cultural or political bias in AI responses?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Ask the same controversial question to two different models (e.g., GPT and Claude). Compare the nuances in their answers.</li>
            </ul>
        </>
    ),
    "labour-inequality": (
        <>
            <p className="lead">
                The future is already here, it's just unevenly distributed.
            </p>
            <h2>The Broader Impact</h2>
            <p>
                AI will create massive wealth, but it may also displace labor and widen inequality. As a user, you are part of this system.
            </p>
            <p>
                Understanding the economic shifts helps you position yourself not just for survival, but for solidarity.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>How is AI affecting your industry? Who is most at risk?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Read one article about the impact of AI on a profession different from yours (e.g., artists, truck drivers, coders).</li>
            </ul>
        </>
    ),
    "personal-responsibility": (
        <>
            <p className="lead">
                You are the algorithm's keeper.
            </p>
            <h2>Micro-Ethics</h2>
            <p>
                We often wait for regulation, but ethics starts with the user. How you use these tools matters. Do you disclose AI use? Do you verify facts? Do you respect copyright?
            </p>
            <p>
                Your personal choices set the norms for your team and your circle.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>What is your personal policy on disclosing AI use?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Draft a simple "AI Ethics Statement" for yourself. "I will always verify... I will never use AI to..."</li>
            </ul>
        </>
    ),

    // Module 6
    "ai-in-work-today": (
        <>
            <p className="lead">
                Start where you are. Use what you have. Do what you can.
            </p>
            <h2>Mapping Your Workflow</h2>
            <p>
                Don't try to revolutionize everything at once. Look for the low-hanging fruit. Where is the friction in your day? Where is the boredom?
            </p>
            <p>
                Map your tasks to the "AI Modes" (Calculator, Oracle, Partner).
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>List your top 5 daily tasks. Which ones are "Calculator" tasks?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Pick ONE task to fully "AI-augment" this week. Document the before and after.</li>
            </ul>
        </>
    ),
    "skills-roadmap": (
        <>
            <p className="lead">
                The goal is not to master the tool, but to master the mind that wields it.
            </p>
            <h2>Future-Proof Skills</h2>
            <p>
                <strong>1. Critical Thinking:</strong> The ability to evaluate truth.
                <br />
                <strong>2. Communication:</strong> The ability to prompt and persuade.
                <br />
                <strong>3. Synthesis:</strong> The ability to connect dots.
                <br />
                <strong>4. Empathy:</strong> The ability to understand humans.
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>Which of these skills is your strongest? Which is your weakest?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Create a 6-month learning plan. Pick one "technical" AI skill (e.g., advanced prompting) and one "human" skill (e.g., storytelling) to improve.</li>
            </ul>
        </>
    ),
    "homo-adapticus-charter": (
        <>
            <p className="lead">
                This is your operating system.
            </p>
            <h2>Your Charter</h2>
            <p>
                A charter is a promise you make to yourself. It defines how you will engage with technology, how you will protect your mind, and how you will contribute to the world.
            </p>
            <p>
                <strong>Example:</strong> "I will use AI to extend my reach, not to replace my thought. I will remain curious, critical, and human."
            </p>
            <h3>Reflection</h3>
            <ul>
                <li>What is one promise you want to make to yourself regarding AI?</li>
            </ul>
            <h3>Try this</h3>
            <ul>
                <li>Write your "Homo Adapticus Charter." Print it out. Put it on your desk.</li>
            </ul>
        </>
    ),
};

export default async function LessonPage(props: Props) {
    const { locale: rawLocale, courseSlug, lessonSlug } = await props.params;
    if (!isSupportedLocale(rawLocale)) return notFound();
    const locale = rawLocale as Locale;

    const meta = getLessonMeta(courseSlug, lessonSlug, locale);
    if (!meta) return notFound();

    const { course, lesson, prev, next } = meta;

    const content = LESSON_CONTENT[lessonSlug];

    return (
        <CourseLessonLayout
            locale={locale}
            courseSlug={course.slug}
            courseTitle={course.titleLabel}
            lessonTitle={lesson.titleLabel}
            lessonOrder={lesson.order}
            totalLessons={course.totalLessons}
            prevSlug={prev?.slug}
            nextSlug={next?.slug}
        >
            {content || <p>Lesson content coming soon...</p>}
        </CourseLessonLayout>
    );
}

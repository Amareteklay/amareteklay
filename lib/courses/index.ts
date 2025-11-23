import type { Locale } from "../locales";

export type LessonMeta = {
  slug: string;
  order: number;
  durationMinutes?: number;
  title: Record<Locale, string>;
  summary?: Record<Locale, string>;
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

const COURSES: CourseMeta[] = [
  {
    slug: "thinking-in-the-age-of-ai",
    level: "intro",
    estimatedHours: 4,
    tags: ["AI", "Critical Thinking", "Philosophy"],
    title: {
      en: "Thinking in the Age of AI",
      sv: "Tänkande i AI-åldern",
    },
    tagline: {
      en: "A practical guide for humans.",
      sv: "En praktisk guide för människor.",
    },
    description: {
      en: "Understand what AI is, build a mental toolkit for reasoning with it, and design your personal adaptation plan.",
      sv: "Förstå vad AI är, bygg en mental verktygslåda för att resonera med den, och utforma din personliga anpassningsplan.",
    },
    modules: [
      {
        title: { en: "Module 1: Orientation", sv: "Modul 1: Orientering" },
        lessons: [
          {
            slug: "the-ai-mirage",
            order: 1,
            durationMinutes: 10,
            title: { en: "The AI Mirage", sv: "AI-hägringen" },
            summary: { en: "What today's AI really is (and is not).", sv: "Vad dagens AI verkligen är (och inte är)." },
          },
          {
            slug: "why-thinking-must-change",
            order: 2,
            durationMinutes: 15,
            title: { en: "Why Thinking Must Change", sv: "Varför tänkandet måste förändras" },
            summary: { en: "Information overload, automation, and new leverage.", sv: "Informationsöverflöd, automation och ny hävstång." },
          },
          {
            slug: "homo-adapticus",
            order: 3,
            durationMinutes: 10,
            title: { en: "Homo Adapticus", sv: "Homo Adapticus" },
            summary: { en: "Your core stance in an accelerating world.", sv: "Din kärnhållning i en accelererande värld." },
          },
        ],
      },
      {
        title: { en: "Module 2: Mental Models", sv: "Modul 2: Mentala modeller" },
        lessons: [
          {
            slug: "ai-modes",
            order: 4,
            durationMinutes: 12,
            title: { en: "AI as Calculator, Oracle, and Partner", sv: "AI som kalkylator, orakel och partner" },
            summary: { en: "Different modes of use.", sv: "Olika användningslägen." },
          },
          {
            slug: "probabilities-not-prophecies",
            order: 5,
            durationMinutes: 15,
            title: { en: "Probabilities, Not Prophecies", sv: "Sannolikheter, inte profetior" },
            summary: { en: "Thinking in terms of likelihood, not truth.", sv: "Att tänka i termer av sannolikhet, inte sanning." },
          },
          {
            slug: "system-triad",
            order: 6,
            durationMinutes: 15,
            title: { en: "System 1, System 2, and System GPT", sv: "System 1, System 2 och System GPT" },
            summary: { en: "Triad of intuition, analysis, and AI.", sv: "Triad av intuition, analys och AI." },
          },
        ],
      },
      {
        title: { en: "Module 3: Working with AI", sv: "Modul 3: Arbeta med AI" },
        lessons: [
          {
            slug: "prompt-as-specification",
            order: 7,
            durationMinutes: 15,
            title: { en: "Prompt as Specification", sv: "Prompt som specifikation" },
            summary: { en: "Thinking in precise instructions.", sv: "Att tänka i exakta instruktioner." },
          },
          {
            slug: "tasks-to-workflows",
            order: 8,
            durationMinutes: 20,
            title: { en: "From Tasks to Workflows", sv: "Från uppgifter till arbetsflöden" },
            summary: { en: "Chaining AI steps instead of one-shot prompts.", sv: "Kedja AI-steg istället för engångspromptar." },
          },
          {
            slug: "human-in-the-loop",
            order: 9,
            durationMinutes: 10,
            title: { en: "Human in the Loop", sv: "Människan i loopen" },
            summary: { en: "Where you must stay in control.", sv: "Där du måste behålla kontrollen." },
          },
        ],
      },
      {
        title: { en: "Module 4: Cognitive Hygiene", sv: "Modul 4: Kognitiv hygien" },
        lessons: [
          {
            slug: "overreliance-and-laziness",
            order: 10,
            durationMinutes: 10,
            title: { en: "Overreliance & Laziness", sv: "Överberoende & lättja" },
            summary: { en: "How to avoid getting mentally soft.", sv: "Hur man undviker att bli mentalt mjuk." },
          },
          {
            slug: "epistemic-humility",
            order: 11,
            durationMinutes: 12,
            title: { en: "Epistemic Humility", sv: "Epistemisk ödmjukhet" },
            summary: { en: "Updating beliefs in an AI-rich info environment.", sv: "Uppdatera övertygelser i en AI-rik miljö." },
          },
          {
            slug: "attention-emotion-ai",
            order: 12,
            durationMinutes: 15,
            title: { en: "Attention, Emotion, and AI", sv: "Uppmärksamhet, känsla och AI" },
            summary: { en: "How tools shape your nervous system.", sv: "Hur verktyg formar ditt nervsystem." },
          },
        ],
      },
      {
        title: { en: "Module 5: Ethics & Risk", sv: "Modul 5: Etik & Risk" },
        lessons: [
          {
            slug: "bias-manipulation",
            order: 13,
            durationMinutes: 15,
            title: { en: "Bias, Manipulation, and Misinformation", sv: "Bias, manipulation och desinformation" },
            summary: { en: "Navigating the dark side.", sv: "Att navigera på den mörka sidan." },
          },
          {
            slug: "labour-inequality",
            order: 14,
            durationMinutes: 15,
            title: { en: "Labour, Inequality, and Institutions", sv: "Arbete, ojämlikhet och institutioner" },
            summary: { en: "The broader impact.", sv: "Den bredare påverkan." },
          },
          {
            slug: "personal-responsibility",
            order: 15,
            durationMinutes: 10,
            title: { en: "Personal Responsibility", sv: "Personligt ansvar" },
            summary: { en: "Your micro-ethics as a user.", sv: "Din mikroetik som användare." },
          },
        ],
      },
      {
        title: { en: "Module 6: Adaptation Plan", sv: "Modul 6: Anpassningsplan" },
        lessons: [
          {
            slug: "ai-in-work-today",
            order: 16,
            durationMinutes: 20,
            title: { en: "AI in Your Work Today", sv: "AI i ditt arbete idag" },
            summary: { en: "Mapping tasks where AI helps now.", sv: "Kartlägga uppgifter där AI hjälper nu." },
          },
          {
            slug: "skills-roadmap",
            order: 17,
            durationMinutes: 15,
            title: { en: "Skills to Build Next", sv: "Färdigheter att bygga härnäst" },
            summary: { en: "A simple roadmap (1–2 years).", sv: "En enkel färdplan (1–2 år)." },
          },
          {
            slug: "homo-adapticus-charter",
            order: 18,
            durationMinutes: 10,
            title: { en: "Your Homo Adapticus Charter", sv: "Din Homo Adapticus-stadga" },
            summary: { en: "1-page personal operating system.", sv: "1-sidigt personligt operativsystem." },
          },
        ],
      },
    ],
  },
];

// --- Helpers ---

function t(record: Record<Locale, string> | undefined, locale: Locale): string {
  if (!record) return "";
  return record[locale] || record["en"] || Object.values(record)[0] || "";
}

export function getCourses(locale: Locale) {
  return COURSES.map((course) => {
    // Flatten lessons for the count
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
    lessons: allLessons, // Keep a flat list for easy access if needed, or for backward compat if we want
    totalLessons: allLessons.length,
  };
}

export function getLessonMeta(
  courseSlug: string,
  lessonSlug: string,
  locale: Locale
) {
  const course = getCourseBySlug(courseSlug, locale);
  if (!course) return null;

  const allLessons = course.lessons; // Uses the flat list we created above
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

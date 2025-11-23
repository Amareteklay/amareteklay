import { notFound } from "next/navigation";
import { getLessonMeta, getAllLessonSlugs } from "@/lib/courses";
import { isSupportedLocale, locales, type Locale } from "@/lib/locales";
import CourseLessonLayout from "@/components/courses/CourseLessonLayout";

type Params = { locale: string; courseSlug: string; lessonSlug: string };
type Props = {
    params: Promise<Params>;
};

export async function generateStaticParams() {
    const slugs = getAllLessonSlugs();
    const params = [] as { locale: string; courseSlug: string; lessonSlug: string }[];
    for (const locale of locales) {
        for (const item of slugs) {
            params.push({ locale, ...item });
        }
    }
    return params;
}

export default async function CourseLessonPage(props: Props) {
    const { locale: rawLocale, courseSlug, lessonSlug } = await props.params;
    if (!isSupportedLocale(rawLocale)) return notFound();
    const locale = rawLocale as Locale;

    const meta = getLessonMeta(courseSlug, lessonSlug, locale);
    if (!meta) return notFound();

    const { course, lesson, prev, next } = meta;
    const content = lesson.content;
    const full = content.full;

    if (full) {
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
                <article className="prose prose-invert prose-lg max-w-none space-y-8">
                    <section>
                        <h2>1. Essence</h2>
                        {full.essence.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </section>

                    <section>
                        <h2>2. Why This Matters</h2>
                        {full.whyMatters.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </section>

                    <section>
                        <h2>3. Key Concepts</h2>
                        <ul>
                            {full.keyConcepts.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>4. Examples and Scenarios</h2>
                        <ul>
                            {full.examples.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>5. Extended Explanation</h2>
                        {full.extended.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </section>

                    <section>
                        <h2>6. How It Interacts With the Five Domains</h2>
                        <ul>
                            <li>
                                <strong>The World:</strong> {full.interactions.world}
                            </li>
                            <li>
                                <strong>The Mind:</strong> {full.interactions.mind}
                            </li>
                            <li>
                                <strong>Skill:</strong> {full.interactions.skill}
                            </li>
                            <li>
                                <strong>Social:</strong> {full.interactions.social}
                            </li>
                            <li>
                                <strong>Meaning:</strong> {full.interactions.meaning}
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Reflective Prompts</h2>
                        <ul>
                            {full.prompts.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>8. Practical Exercises</h2>
                        <ul>
                            {full.exercises.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    {full.advanced && (
                        <section>
                            <h2>9. Advanced Practice</h2>
                            <ul>
                                {full.advanced.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <section>
                        <h2>10. Summary</h2>
                        {full.summary.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </section>
                </article>
            </CourseLessonLayout>
        );
    }

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
            <div className="space-y-8">
                <p className="lead">{content.core}</p>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">Moves</h2>
                    <ul className="list-disc space-y-2 pl-5">
                        {content.moves.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">Practice</h2>
                    <ul className="list-disc space-y-2 pl-5">
                        {content.practice.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </CourseLessonLayout>
    );
}

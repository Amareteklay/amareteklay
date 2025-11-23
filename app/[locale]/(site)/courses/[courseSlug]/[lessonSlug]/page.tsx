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

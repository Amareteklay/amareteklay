import Link from "next/link";
import { notFound } from "next/navigation";
import {
    getCourseBySlug,
    getAllCourseSlugs,
} from "@/lib/courses";
import { isSupportedLocale, locales, type Locale } from "@/lib/locales";
import CourseLayout from "@/components/courses/CourseLayout";
import { ArrowRight } from "lucide-react";

type Params = { locale: string; courseSlug: string };
type Props = {
    params: Promise<Params>;
};

export async function generateStaticParams() {
    const slugs = getAllCourseSlugs();
    const params = [];
    for (const locale of locales) {
        for (const courseSlug of slugs) {
            params.push({ locale, courseSlug });
        }
    }
    return params;
}

export default async function CoursePage(props: Props) {
    const { locale: rawLocale, courseSlug } = await props.params;
    if (!isSupportedLocale(rawLocale)) return notFound();
    const locale = rawLocale as Locale;

    const course = getCourseBySlug(courseSlug, locale);
    if (!course) return notFound();

    const firstLesson = course.lessons[0];

    return (
        <CourseLayout locale={locale} course={course}>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="lead text-xl">{course.descriptionLabel}</p>

                <h2>How this course works</h2>
                <ul>
                    <li>
                        <strong>Self-paced:</strong> Move through the lessons at your own speed.
                    </li>
                    <li>
                        <strong>Practical:</strong> Each lesson includes reflection questions and AI exercises.
                    </li>
                    <li>
                        <strong>Foundational:</strong> Designed to shift your perspective, not just teach tools.
                    </li>
                </ul>

                {firstLesson && (
                    <div className="not-prose mt-8">
                        <Link
                            href={`/${locale}/courses/${course.slug}/${firstLesson.slug}`}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:bg-primary/90"
                        >
                            Start with Lesson 1 <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                )}
            </div>
        </CourseLayout>
    );
}

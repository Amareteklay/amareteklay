import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourses } from "@/lib/courses";
import { isSupportedLocale, type Locale } from "@/lib/locales";
import SpatialWrapper from "@/components/courses/SpatialWrapper";

type Params = { locale: string };
type Props = {
    params: Promise<Params>;
};

export default async function CoursesIndexPage(props: Props) {
    const { locale: rawLocale } = await props.params;
    if (!isSupportedLocale(rawLocale)) return notFound();
    const locale = rawLocale as Locale;

    const courses = getCourses(locale);

    return (
        <SpatialWrapper>
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <header className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl text-glow">
                            Courses
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Explore our structured learning paths.
                        </p>
                    </header>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <Link
                                key={course.slug}
                                href={`/${locale}/courses/${course.slug}`}
                                className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg transition hover:bg-white/10 hover:shadow-cyan-500/10 spatial-border-glow"
                            >
                                <div className="mb-4">
                                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                                        {course.level}
                                    </div>
                                    <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                        {course.titleLabel}
                                    </h2>
                                </div>

                                <p className="mb-6 flex-1 text-sm text-muted-foreground">
                                    {course.taglineLabel}
                                </p>

                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{course.totalLessons} Lessons</span>
                                    {course.estimatedHours && <span>{course.estimatedHours}h</span>}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </SpatialWrapper>
    );
}

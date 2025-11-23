import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/locales";
import type { getCourseBySlug } from "@/lib/courses";
import SpatialWrapper from "./SpatialWrapper";

type CourseLayoutProps = {
    locale: Locale;
    course: NonNullable<ReturnType<typeof getCourseBySlug>>;
    children?: ReactNode;
};

export default function CourseLayout({
    locale,
    course,
    children,
}: CourseLayoutProps) {
    return (
        <SpatialWrapper>
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Course Header */}
                <header className="mb-12 border-b border-white/10 pb-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                            {course.level && <span>{course.level}</span>}
                            {course.estimatedHours && (
                                <>
                                    <span>•</span>
                                    <span>{course.estimatedHours}h</span>
                                </>
                            )}
                        </div>
                        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl text-glow">
                            {course.titleLabel}
                        </h1>
                        <p className="text-xl text-muted-foreground">{course.taglineLabel}</p>
                    </div>
                </header>

                <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
                    {/* Main Content */}
                    <main>{children}</main>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <div className="spatial-glass rounded-xl p-6">
                            <h3 className="mb-4 font-semibold text-foreground">Curriculum</h3>
                            <div className="space-y-6">
                                {course.modules.map((module, i) => (
                                    <div key={i}>
                                        <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-primary/90">
                                            {module.titleLabel}
                                        </h4>
                                        <nav className="flex flex-col gap-1">
                                            {module.lessons.map((lesson) => (
                                                <Link
                                                    key={lesson.slug}
                                                    href={`/${locale}/courses/${course.slug}/${lesson.slug}`}
                                                    className="group flex flex-col gap-1 rounded-lg p-2 transition hover:bg-primary/10"
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                                            {lesson.order}. {lesson.titleLabel}
                                                        </span>
                                                        {lesson.durationMinutes && (
                                                            <span className="text-xs text-muted-foreground">
                                                                {lesson.durationMinutes}m
                                                            </span>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </SpatialWrapper>
    );
}

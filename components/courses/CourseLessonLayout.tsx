import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/locales";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type CourseLessonLayoutProps = {
    locale: Locale;
    courseSlug: string;
    courseTitle: string;
    lessonTitle: string;
    lessonOrder: number;
    totalLessons: number;
    prevSlug?: string | null;
    nextSlug?: string | null;
    children: ReactNode;
};

export default function CourseLessonLayout({
    locale,
    courseSlug,
    courseTitle,
    lessonTitle,
    lessonOrder,
    totalLessons,
    prevSlug,
    nextSlug,
    children,
}: CourseLessonLayoutProps) {
    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                <Link
                    href={`/${locale}/courses`}
                    className="transition hover:text-foreground"
                >
                    Courses
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link
                    href={`/${locale}/courses/${courseSlug}`}
                    className="transition hover:text-foreground"
                >
                    {courseTitle}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-foreground">Lesson {lessonOrder}</span>
            </nav>

            <main>
                <div className="mb-8">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <BookOpen className="h-3 w-3" />
                        <span>
                            Lesson {lessonOrder} of {totalLessons}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        {lessonTitle}
                    </h1>
                </div>

                <article className="prose prose-neutral dark:prose-invert max-w-none">
                    {children}
                </article>
            </main>

            {/* Footer Navigation */}
            <footer className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
                {prevSlug ? (
                    <Link
                        href={`/${locale}/courses/${courseSlug}/${prevSlug}`}
                        className="group flex flex-col gap-1 rounded-xl border border-border p-4 transition hover:bg-muted/50"
                    >
                        <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                            <ChevronLeft className="h-3 w-3" /> Previous Lesson
                        </span>
                        <span className="font-medium group-hover:text-primary">
                            Go back
                        </span>
                    </Link>
                ) : (
                    <div /> /* Spacer */
                )}

                {nextSlug ? (
                    <Link
                        href={`/${locale}/courses/${courseSlug}/${nextSlug}`}
                        className="group flex flex-col items-end gap-1 rounded-xl border border-border p-4 text-right transition hover:bg-muted/50"
                    >
                        <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                            Next Lesson <ChevronRight className="h-3 w-3" />
                        </span>
                        <span className="font-medium group-hover:text-primary">
                            Continue
                        </span>
                    </Link>
                ) : (
                    <Link
                        href={`/${locale}/courses/${courseSlug}`}
                        className="group flex flex-col items-end gap-1 rounded-xl border border-border p-4 text-right transition hover:bg-muted/50"
                    >
                        <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                            Complete
                        </span>
                        <span className="font-medium group-hover:text-primary">
                            Back to Course Overview
                        </span>
                    </Link>
                )}
            </footer>
        </div>
    );
}

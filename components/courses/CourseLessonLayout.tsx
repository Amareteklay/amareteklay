import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/locales";
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import SpatialWrapper from "./SpatialWrapper";

type CourseLessonLayoutProps = {
    locale: Locale;
    courseSlug: string;
    courseTitle: string;
    lessonTitle: string;
    lessonOrder: number;
    totalLessons: number;
    prevSlug?: string;
    nextSlug?: string;
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
        <SpatialWrapper>
            <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href={`/${locale}/courses`} className="hover:text-primary transition-colors">
                        Courses
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link
                        href={`/${locale}/courses/${courseSlug}`}
                        className="hover:text-primary transition-colors"
                    >
                        {courseTitle}
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground font-medium">Lesson {lessonOrder}</span>
                </nav>

                {/* Lesson Header */}
                <header className="mb-12">
                    <div className="mb-4 text-xs font-bold uppercase tracking-wider text-primary">
                        Lesson {lessonOrder} of {totalLessons}
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-glow">
                        {lessonTitle}
                    </h1>
                </header>

                {/* Content */}
                <article className="prose prose-invert prose-lg max-w-none mb-16">
                    {children}
                </article>

                {/* Navigation Footer */}
                <footer className="flex items-center justify-between border-t border-white/10 pt-8">
                    {prevSlug ? (
                        <Link
                            href={`/${locale}/courses/${courseSlug}/${prevSlug}`}
                            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Previous Lesson
                        </Link>
                    ) : (
                        <div />
                    )}

                    {nextSlug ? (
                        <Link
                            href={`/${locale}/courses/${courseSlug}/${nextSlug}`}
                            className="group flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
                        >
                            Next Lesson
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    ) : (
                        <Link
                            href={`/${locale}/courses/${courseSlug}`}
                            className="group flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
                        >
                            Back to course overview
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </footer>
            </div>
        </SpatialWrapper>
    );
}

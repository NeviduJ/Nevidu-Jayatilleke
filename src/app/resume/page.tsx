import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { experience, education } from "@/data/resume";
import * as motion from "framer-motion/client";

export default function Resume() {
    return (
        <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold mb-12"
                >
                    Resume
                </motion.h1>

                {/* Experience Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-8 pb-2 border-b border-neutral-200 dark:border-neutral-800">Experience</h2>
                    <div className="space-y-12">
                        {experience.map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8 border-l-2 border-neutral-200 dark:border-neutral-800"
                            >
                                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-neutral-900 dark:bg-neutral-50" />
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-semibold text-xl">{job.role}</h3>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                                            {job.employmentType}
                                        </span>
                                    </div>
                                    <span className="text-sm text-neutral-500 font-mono">{job.period}</span>
                                </div>
                                <div className="text-neutral-600 dark:text-neutral-400 font-medium">{job.company}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Education Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-8 pb-2 border-b border-neutral-200 dark:border-neutral-800">Education</h2>
                    <div className="space-y-10">
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
                                    <h3 className="font-semibold text-xl">{edu.degree}</h3>
                                    <span className="text-sm text-neutral-500 font-mono">{edu.period}</span>
                                </div>
                                <div className="text-neutral-600 dark:text-neutral-400 font-medium mb-2">{edu.institution}</div>
                                <p className="text-neutral-500">{edu.details}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

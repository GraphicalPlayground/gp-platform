// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { createMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Pricing | Graphical Playground',
  description: 'View our pricing options and find the perfect plan for your needs.',
  keywords: ['pricing', 'plans', 'subscriptions', 'cost']
});

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <section className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Simple pricing for everyone
        </h1>

        <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
          Learn for free as an individual, or equip your school or company with
          powerful learning tools, analytics and certification management.
        </p>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-3">
        {/* Individual */}
        <div className="rounded-2xl border p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Individual</h2>

          <div className="mt-6">
            <span className="text-5xl font-bold">Free</span>
          </div>

          <p className="mt-4 text-neutral-600">
            Perfect for students and hobbyists.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            <li>✓ Unlimited access to public curriculum</li>
            <li>✓ Personal dashboard</li>
            <li>✓ Track your progress</li>
            <li>✓ Community support</li>
            <li>✓ Access to the editor</li>
          </ul>

          <button className="mt-10 w-full rounded-lg bg-black py-3 text-white transition hover:bg-neutral-800">
            Get Started
          </button>
        </div>

        {/* School */}
        <div className="rounded-2xl border-2 border-blue-600 p-8 shadow-lg">
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            Most Popular
          </span>

          <h2 className="mt-4 text-2xl font-semibold">School</h2>

          <div className="mt-6">
            <span className="text-5xl font-bold">€199</span>
            <span className="text-neutral-500"> / month</span>
          </div>

          <p className="mt-4 text-neutral-600">
            For classrooms and educational institutions.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            <li>✓ Up to 100 students</li>
            <li>✓ Teacher dashboard</li>
            <li>✓ Student management</li>
            <li>✓ Classroom analytics</li>
            <li>✓ Private curricula</li>
            <li>✓ Certification management</li>
          </ul>

          <button className="mt-10 w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700">
            Contact Sales
          </button>
        </div>

        {/* Company */}
        <div className="rounded-2xl border p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Company</h2>

          <div className="mt-6">
            <span className="text-5xl font-bold">€999</span>
            <span className="text-neutral-500"> / month</span>
          </div>

          <p className="mt-4 text-neutral-600">
            Upskill your engineering teams.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            <li>✓ Up to 250 employees</li>
            <li>✓ Team management</li>
            <li>✓ Learning analytics</li>
            <li>✓ Custom learning paths</li>
            <li>✓ API access</li>
            <li>✓ Priority support</li>
          </ul>

          <button className="mt-10 w-full rounded-lg bg-black py-3 text-white transition hover:bg-neutral-800">
            Request Demo
          </button>
        </div>
      </section>

      <section className="mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Official Certification Credits
          </h2>

          <p className="mt-4 text-neutral-600">
            Learning is free. Official certifications require certification
            credits that can be purchased separately.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border">
          <table className="w-full">
            <thead className="bg-neutral-100">
              <tr>
                <th className="px-6 py-4 text-left">Credits</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Recommended for</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="px-6 py-4">5</td>
                <td className="px-6 py-4">€25</td>
                <td className="px-6 py-4">Individuals</td>
              </tr>

              <tr className="border-t">
                <td className="px-6 py-4">25</td>
                <td className="px-6 py-4">€100</td>
                <td className="px-6 py-4">Small teams</td>
              </tr>

              <tr className="border-t">
                <td className="px-6 py-4">100</td>
                <td className="px-6 py-4">€350</td>
                <td className="px-6 py-4">Schools</td>
              </tr>

              <tr className="border-t">
                <td className="px-6 py-4">500</td>
                <td className="px-6 py-4">€1500</td>
                <td className="px-6 py-4">Enterprises</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          One credit grants one certification attempt. Credits never expire and
          can be assigned to any learner in your organization.
        </p>
      </section>

      <section className="mt-24 rounded-3xl bg-neutral-900 px-8 py-16 text-center text-white">
        <h2 className="text-4xl font-bold">
          Ready to start learning?
        </h2>

        <p className="mt-4 text-neutral-300">
          Join Graphical Playground today and build the next generation of
          graphics engineers.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="rounded-lg bg-white px-6 py-3 font-medium text-black">
            Start for Free
          </button>

          <button className="rounded-lg border border-white px-6 py-3">
            Contact Sales
          </button>
        </div>
      </section>
    </main>
  );
}
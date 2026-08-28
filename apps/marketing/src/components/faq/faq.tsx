// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { FAQ, FAQGroup } from '@gp/ui/components';

interface QuestionAnswer {
  question: string | React.ReactNode;
  answer: string | React.ReactNode;
}

interface FAQItem {
  questions: QuestionAnswer[];
  heading: string | React.ReactNode;
}

interface FAQClientProps {
  heading?: string | React.ReactNode;
  faqs: FAQItem | FAQItem[];
}

export const FAQClient: React.FC<FAQClientProps> = ({ faqs, heading }) => {
  if (!faqs || (Array.isArray(faqs) && faqs.length === 0)) {
    return null;
  }

  if (Array.isArray(faqs)) {
    return (
      <FAQGroup tabAttributes={(_, i) => ({ 'data-analytics': `faq-tab-${i}` })}>
        {heading !== undefined && <FAQGroup.Heading>{heading}</FAQGroup.Heading>}
        {faqs.map((faq, index) => (
          <FAQ key={index}>
            <FAQ.Heading>{faq.heading}</FAQ.Heading>
            {faq.questions.map((qa, qaIndex) => (
              <FAQ.Item key={qaIndex}>
                <FAQ.Question>{qa.question}</FAQ.Question>
                <FAQ.Answer>{qa.answer}</FAQ.Answer>
              </FAQ.Item>
            ))}
          </FAQ>
        ))}
      </FAQGroup>
    );
  }

  return (
    <FAQ>
      <FAQ.Heading>{faqs.heading}</FAQ.Heading>
      {faqs.questions.map((qa, index) => {
        return (
          <FAQ.Item key={index}>
            <FAQ.Question>{qa.question}</FAQ.Question>
            <FAQ.Answer>{qa.answer}</FAQ.Answer>
          </FAQ.Item>
        );
      })}
    </FAQ>
  );
};

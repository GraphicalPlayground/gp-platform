// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Loose, PostalAddress, Locale, Url, SocialPlatform, Email, CurrencyCode } from '@gp/types';

type OrganizationSocials = Extract<SocialPlatform, 'github' | 'linkedin' | 'discord'>;
type OrganizationEmailNames =
  | 'support'
  | 'legal'
  | 'press'
  | 'marketing'
  | 'sponsor'
  | 'partnerships'
  | 'security'
  | 'contact'
  | 'account'
  | 'privacy'
  | 'billing'
  | 'abuse'
  | 'accessibility'
  | 'feedback'
  | 'careers';
type OrganizationSubdomains = 'app' | 'docs' | 'api' | 'blog' | 'status' | 'discord' | 'admin';

/**
 * @brief Constants and information about the organization.
 * @details This class provides static properties and methods to access various constants and information related to the organization, such as its name, legal name, address, domain, social media links, email addresses, and more.
 * It serves as a centralized place to manage and retrieve organization-related data in a consistent manner.
 */
export class Organization {
  public static readonly name: string = 'Graphical Playground';
  public static readonly legalName: string = 'Graphical Playground, Inc.';
  public static readonly shortName: string = 'GPlayd';
  public static readonly initials: string = 'GP';

  public static readonly description: string = '';
  public static readonly tagline: string = '';
  public static readonly mission: string = '';

  public static readonly address: PostalAddress = {
    line1: '2 Rue du Professeur Charles Appleton',
    city: 'Lyon',
    postalCode: '69007',
    country: 'FR'
  };

  public static readonly domain: string = 'graphical-playground.com';
  public static readonly url: Url = `https://${Organization.domain}` as Url;

  public static readonly currency: CurrencyCode = 'EUR';
  public static readonly currencySymbol: string = '€';
  public static readonly currencyName: string = 'Euro';

  public static readonly locales = {
    supported: ['en', 'fr'] as Locale[],
    default: 'en' as Locale
  };

  public static readonly socials: Record<OrganizationSocials, Url> = {
    github: 'https://github.com/GraphicalPlayground' as Url,
    linkedin: 'https://www.linkedin.com/company/graphical-playground' as Url,
    discord: Organization.subdomain('discord')
  };

  public static readonly emails: Record<OrganizationEmailNames, Email> = {
    support: Organization.mail('support'),
    legal: Organization.mail('legal'),
    press: Organization.mail('press'),
    marketing: Organization.mail('marketing'),
    sponsor: Organization.mail('sponsor'),
    partnerships: Organization.mail('partnerships'),
    security: Organization.mail('security'),
    contact: Organization.mail('contact'),
    account: Organization.mail('account'),
    privacy: Organization.mail('privacy'),
    billing: Organization.mail('billing'),
    abuse: Organization.mail('abuse'),
    accessibility: Organization.mail('accessibility'),
    feedback: Organization.mail('feedback'),
    careers: Organization.mail('careers')
  };

  /**
   * @brief Generates a mailto link for the specified email name.
   * @param name - The name of the email address to generate a mailto link for (e.g., 'support', 'legal', etc.).
   * @returns A string representing the mailto link for the specified email address.
   */
  public static mailto(name: Loose<OrganizationEmailNames>): string {
    return `mailto:${Organization.mail(name)}`;
  }

  /**
   * @brief Generates an email address for the specified email name.
   * @param name - The name of the email address to generate (e.g., 'support', 'legal', etc.).
   * @returns A string representing the email address for the specified name.
   */
  public static mail(name: Loose<OrganizationEmailNames>): Email {
    return `${name}@${Organization.domain}` as Email;
  }

  /**
   * @brief Generates a URL for the specified subdomain of the organization.
   * @param name - The name of the subdomain to generate a URL for (e.g., 'app', 'docs', etc.).
   * @returns A string representing the URL for the specified subdomain.
   */
  public static subdomain(name: Loose<OrganizationSubdomains>): Url {
    return `https://${name}.${Organization.domain}` as Url;
  }
}

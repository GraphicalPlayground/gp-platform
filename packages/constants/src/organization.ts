// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Loose, PostalAddress, Locale, Url, SocialPlatform, Email, CurrencyCode } from '@gp/types';
import { KnowsAbout } from './knows-about';

type OrganizationSocials = Extract<SocialPlatform, 'github' | 'linkedin' | 'discord'>;
type OrganizationEmailNames =
  | 'support'
  | 'legal'
  | 'press'
  | 'marketing'
  | 'sponsor'
  | 'partnerships'
  | 'sales'
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

  public static readonly description: string =
    'An interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines. Explore creative coding, canvas experiments, and real-time graphics programming.';
  public static readonly tagline: string = 'Learn how AAA graphics engines are really built. No GPU required.';
  public static readonly mission: string =
    'To make the knowledge behind modern real-time rendering accessible to anyone who wants to learn it, regardless of their hardware or their background.';

  public static readonly alternateNames: string[] = ['GP', 'GPlayd', 'Graphical Playground Platform', 'gp-platform'];

  public static readonly address: PostalAddress = {
    line1: '2 Rue du Professeur Charles Appleton',
    city: 'Lyon',
    state: 'Auvergne-Rhône-Alpes',
    postalCode: '69007',
    country: 'FR'
  };

  public static readonly domain: string = 'graphical-playground.com';
  public static readonly url: Url = `https://${Organization.domain}` as Url;

  public static readonly currency: CurrencyCode = 'EUR';
  public static readonly currencySymbol: string = '€';
  public static readonly currencyName: string = 'Euro';

  public static readonly knowsAbout = KnowsAbout;

  public static readonly foundingDate: Date = new Date('2025-12-01T00:00:00Z');

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
    sales: Organization.mail('sales'),
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
   * @brief Generates the full product name for a given product under the organization's brand.
   * @param name - The name of the product (e.g., 'Engine', 'Platform', 'Docs').
   * @returns A string representing the full product name, prefixed with the organization's name.
   */
  public static product(name: string): string {
    return `${Organization.name} ${name}`;
  }

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

  /**
   * @brief Generates a URL for a specific repository under the organization's GitHub account.
   * @param name - The name of the repository to generate a URL for.
   * @returns  A string representing the URL for the specified repository under the organization's GitHub account.
   */
  public static repository(name: string): Url {
    return (this.socials.github + '/' + name) as Url;
  }
}

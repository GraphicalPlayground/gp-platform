# CHANGELOG ([@gp](https://github.com/GraphicalPlayground)/types)

## v0.0.2

### Additions

- Added a `Pronouns` primitive for a person's pronouns, with common values plus room for custom ones.
- Added `LanguageCode`, `CountryCode`, `CurrencyCode` and `Locale` primitives for i18n and SEO data.
- Added a `LanguageDirection` primitive and a `getLanguageDirection` helper to detect right-to-left languages.
- Added a `TimeZone` primitive, validated against IANA time zone identifiers.
- Added `Email`, `PhoneNumber`, `Url` and `SocialPlatform` primitives for contact information.
- Added `Slug`, `HexColor`, `Rating`, `Duration` and `ISODateString` primitives for content frontmatter and display values.
- Added a `Money` primitive that pairs an amount with a `CurrencyCode`.
- Added `Percentage` and `Progress` primitives for bounded numeric ranges, plus a `progressToPercentage` helper.
- Added a `Uuid` primitive to validate UUID strings.
- Added a `Semver` primitive with a `parseSemver` helper for semantic version strings.
- Added a `MimeType` primitive to validate MIME type strings.
- Added a `ByteSize` primitive with a `formatByteSize` helper for file and upload sizes.
- Added an `AspectRatio` primitive with a `toRatio` helper for video and image ratios.
- Added a `GeoCoordinates` primitive for latitude/longitude pairs.
- Added a `Brand` utility type for tagging primitives so they can't be swapped for a plain string or number by mistake.
- Added generic utility types: `DeepPartial`, `DeepReadonly`, `Nullable`, `Optional`, `RequireAtLeastOne`, `Prettify`, `ValueOf`, `NonEmptyArray`.

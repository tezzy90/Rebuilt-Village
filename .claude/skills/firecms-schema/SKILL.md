---
name: firecms-schema
description: Reference patterns for defining FireCMS collection schemas for Rebuilt Village. Invoke when defining a new Firestore collection, modifying an existing one, or needing to understand the canonical field patterns (image refs, slugs, timestamps, references, roles).
---

# FireCMS Collection Schema Patterns

This is a reference for building FireCMS collection configs consistent across the Rebuilt Village admin UI. Every collection in the project must follow these patterns.

## Import boilerplate

```typescript
import { buildCollection, buildProperty } from "@firecms/core";
```

## Required fields on every collection

Every collection includes these three fields, no exceptions:

```typescript
active: buildProperty({
  name: "Active",
  description: "Uncheck to hide from the public site without deleting",
  dataType: "boolean",
  defaultValue: true,
}),
createdAt: buildProperty({
  name: "Created",
  dataType: "date",
  readOnly: true,
  autoValue: "on_create",
}),
updatedAt: buildProperty({
  name: "Updated",
  dataType: "date",
  readOnly: true,
  autoValue: "on_update",
}),
```

Collections with manual sort order also include:

```typescript
order: buildProperty({
  name: "Order",
  description: "Lower numbers appear first",
  dataType: "number",
  validation: { required: true, min: 0, integer: true },
  defaultValue: 100,
}),
```

## Slug fields

Any collection whose documents are addressable by URL (events, posts, programs) uses a slug field:

```typescript
slug: buildProperty({
  name: "Slug",
  description: "URL-safe identifier. Lowercase letters, numbers, hyphens only.",
  dataType: "string",
  validation: {
    required: true,
    matches: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    matchesMessage: "Lowercase letters, numbers, and single hyphens between words only",
  },
}),
```

The slug should also be used as the Firestore document ID where possible. Set this at the collection level via `customId: true` and a custom ID path resolver, or accept that FireCMS will auto-generate IDs and treat slug as a unique index.

## Image fields

Images live in Firebase Storage and are referenced by a typed object. Alt text is always required.

```typescript
coverImage: buildProperty({
  name: "Cover image",
  dataType: "map",
  properties: {
    storagePath: buildProperty({
      name: "Image",
      dataType: "string",
      storage: {
        storagePath: "events",
        acceptedFiles: ["image/jpeg", "image/png", "image/webp"],
        maxSize: 5 * 1024 * 1024, // 5MB
        metadata: { cacheControl: "max-age=31536000, immutable" },
        fileName: (context) => `${Date.now()}-${context.file.name}`,
      },
      validation: { required: true },
    }),
    alt: buildProperty({
      name: "Alt text",
      description: "Describe the image for screen readers. Required for accessibility.",
      dataType: "string",
      validation: { required: true, min: 3, max: 200 },
    }),
    width: buildProperty({ name: "Width (px)", dataType: "number", validation: { integer: true, positive: true } }),
    height: buildProperty({ name: "Height (px)", dataType: "number", validation: { integer: true, positive: true } }),
  },
}),
```

The main site reads images by passing `storagePath` through Firebase Storage getDownloadURL or through a Cloudflare Images transformation URL if configured.

## Rich text (portable text for blog posts)

Posts use the FireCMS markdown editor for body content:

```typescript
body: buildProperty({
  name: "Body",
  dataType: "string",
  markdown: true,
  validation: { required: true, min: 50 },
}),
```

The frontend renders markdown via `react-markdown` or similar. Do not use the deprecated Sanity Portable Text schema; markdown is sufficient for nonprofit blog content.

## Enums

Use `enumValues` for fields with a closed set of options:

```typescript
type: buildProperty({
  name: "Event type",
  dataType: "string",
  enumValues: {
    screening: "Screening",
    camp: "Camp",
    fundraiser: "Fundraiser",
    workshop: "Workshop",
    community: "Community event",
  },
  validation: { required: true },
}),
```

## References to other collections

When one document references another (e.g., gifts reference donors):

```typescript
donor: buildProperty({
  name: "Donor",
  dataType: "reference",
  path: "donors",
  previewProperties: ["name", "email"],
  validation: { required: true },
}),
```

## Arrays of values

```typescript
tags: buildProperty({
  name: "Tags",
  dataType: "array",
  of: buildProperty({ dataType: "string" }),
}),
```

## Role-based permissions

Every collection specifies permissions based on Firebase Auth custom claims:

```typescript
permissions: ({ authController }) => {
  const roles = (authController.extra?.roles as string[]) || [];
  const isAdmin = roles.includes("admin");
  const isEditor = roles.includes("editor");
  return {
    read: true,
    create: isAdmin || isEditor,
    edit: isAdmin || isEditor,
    delete: isAdmin, // only admins can delete
  };
},
```

For donor-related collections (donors, gifts, grants), editors get read-only:

```typescript
permissions: ({ authController }) => {
  const roles = (authController.extra?.roles as string[]) || [];
  const isAdmin = roles.includes("admin");
  const isEditor = roles.includes("editor");
  return {
    read: isAdmin || isEditor,
    create: isAdmin,
    edit: isAdmin,
    delete: isAdmin,
  };
},
```

## Collection registration

Every collection is imported into `admin/src/App.tsx`:

```typescript
import { eventsCollection } from "./collections/events";
import { teamMembersCollection } from "./collections/teamMembers";
// ... etc

const collections = [
  eventsCollection,
  teamMembersCollection,
  boardMembersCollection,
  postsCollection,
  programsCollection,
  sponsorsCollection,
  donorsCollection,
  giftsCollection,
  grantsCollection,
  donorProjectsCollection,
];
```

## Firestore security rules to match

Collection permissions in FireCMS are enforced client-side only. The actual security boundary is Firestore rules. Every collection defined in FireCMS must have a matching rule in `firestore.rules`:

```
match /events/{eventId} {
  allow read: if true;  // public read
  allow create, update: if request.auth != null
    && request.auth.token.roles.hasAny(['admin', 'editor']);
  allow delete: if request.auth != null
    && request.auth.token.roles.hasAny(['admin']);
}
```

Donor collections should NOT have public read:

```
match /donors/{donorId} {
  allow read: if request.auth != null
    && request.auth.token.roles.hasAny(['admin', 'editor']);
  allow create, update, delete: if request.auth != null
    && request.auth.token.roles.hasAny(['admin']);
}
```

## Validation checklist when adding a new collection

- [ ] Collection file added under `admin/src/collections/`
- [ ] TypeScript type exported
- [ ] Slug field present (if URL-addressable)
- [ ] Image fields have required alt text
- [ ] `active`, `createdAt`, `updatedAt` present
- [ ] Permissions specified per role
- [ ] Imported into `admin/src/App.tsx` collections array
- [ ] Matching rule added to `firestore.rules`
- [ ] Composite indexes added to `firestore.indexes.json` if needed
- [ ] `cd admin && npm run build` passes

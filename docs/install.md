# Satoshium Link Installation Guide

The `satoshium-link` repository supports the coordination layer of the Satoshium platform.

It provides shared routing infrastructure, repository mapping surfaces, domain-layer documentation, and reusable interface components used across multiple platform domains.

This guide explains how to work with the coordination layer locally.

---

## Purpose of Local Setup

Local setup allows contributors to:

- test shared navigation components
- preview routing behavior across domains
- validate repo map updates
- review progress tracking surfaces
- verify domain-layer documentation changes

The coordination layer does not require a build pipeline.

It operates as structured static infrastructure.

---

## Basic Setup

Clone the repository:


git clone https://github.com/satoshiumai/satoshium-link.git


Move into the project directory:


cd satoshium-link


Open the repository in your preferred editor.

Because the coordination layer uses static files, most updates can be previewed directly in a browser.

---

## Previewing Pages Locally

To preview pages with shared component loaders active, use a lightweight local server.

Example using Python:


python -m http.server 8000


Then open:


http://localhost:8000


This ensures loader scripts resolve correctly.

---

## Shared Component Dependencies

The coordination layer references shared components such as:

- topbar loaders
- footer loaders
- domain-layer mapping components
- sayings engine scripts

These components may be hosted within:

- `satoshium-link`
- `satoshium.ai`
- shared asset directories across the ecosystem

Ensure referenced paths remain consistent when testing locally.

---

## Updating Repo Map Surfaces

When modifying:


/repos/index.md


verify that:

- repository names remain accurate
- architectural layer placement remains correct
- domain-layer alignment matches Architecture pages
- Signal Layer references remain forward-compatible

Repo mapping supports platform traceability.

---

## Updating Progress Surfaces

When modifying:


/progress/index.md


ensure updates reflect:

- visible architectural transitions
- domain migrations
- coordination-layer expansion
- cross-domain integration milestones

Progress documentation should remain factual and structural.

---

## Updating Domain-Layer Documentation

When modifying:


/domain-layers/index.md


verify consistency with:

- platform architecture definitions
- registry alignment
- repo map structure
- routing-layer documentation

Domain-layer clarity supports ecosystem navigation.

---

## Phase004 Coordination Context

Phase004 establishes Satoshium as a distributed multi-domain platform.

The coordination layer ensures:

- consistent routing behavior
- shared navigation continuity
- structural transparency across repositories
- cross-domain architectural readability

Local setup allows contributors to maintain these properties as the platform evolves.

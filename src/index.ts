// Note: Entry point is designed with TypeDoc in mind.

export { default as ThreeBCF } from './ThreeBCF';
export * from './ThreeBCF';

/**
 * At the bottom you'll find the `core`.
 *
 * The `core` namespace is where you find everything related to the core of the library.
 * The core features most of the BCF interfaces as so-called [zod](https://github.com/colinhacks/zod) schemas.
 *
 * Use parts of this namespace to create your own implementation of the library.
 */
export * as CORE from './core';

/**
 * On top of the core, you'll find the `three` layer.
 *
 * All actions performed on the actual "BCF data" should be done in a `three.js` context (!!!).
 * This means that the BIM models used, cameras position, math operations, etc. etc. are done in terms of `three.js` (!!!).
 *
 * This layer is a highly opinionated one!
 */
export * as THREE from './three';

/**
 * Finally, on top of the three layer, you'll find the `ThreeBCF` layer.
 *
 * This layers is the main entry point for the library and is a high-level "API" for creating BCF files.
 *
 * If this workflow doesn't fit your needs, you can always grab individual parts from each layer use them as you see fit.
 */
export * as THREE_BCF from './three-bcf';

/**
 * The `webWorker` namespace where you find everything related to the web worker.
 */
export * as WORKER from './worker';

/**
 * TypeScript types and interfaces.
 */
export * as TYPES from './types';

/**
 * Constants related to all 3 layers (core, three, ThreeBCF)
 */
export * as CONSTANTS from './constants';

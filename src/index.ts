// Note: Entry point is designed with TypeDoc in mind.

export { default as ThreeBCF } from './ThreeBCF';
export * from './ThreeBCF';
/**
 * `three.js` namespace where you can create a `Topic` in a `three.js` context.
 */
export * as THREE from './three';
/**
 * `webWorker` namespace where you find everything related to the web worker.
 */
export * as WORKER from './worker';
/**
 * `core` namespace where you find everything related to the core of the library.
 * The core features most of the BCF creation functionality. Mainly the XML generation.
 *
 * Use parts of this namespace to create your own implementation of the library.
 */
export * as CORE from './core';
/**
 * TypeScript types and interfaces.
 */
export * as TYPES from './types';

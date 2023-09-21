// Note: Entry point is designed with TypeDoc in mind.

export { default as ThreeBCF } from './ThreeBCF';
export * from './ThreeBCF';
/**
 * The `three.js` namespace is  where you can create a `Topic` in a `three.js` context.
 * These topics lives temporary in the `three.js` space.
 */
export * as THREE from './three';
/**
 * `webWorker` namespace where you find everything related to the web worker.
 */
export * as WORKER from './worker';
/**
 * The `core` namespace is where you find everything related to the core of the library.
 * The core features most of the BCF creation functionality. Mainly the XML generation.
 * XMLs are generated using factory classes.
 *
 * Use parts of this namespace to create your own implementation of the library.
 */
export * as CORE from './core';
/**
 * TypeScript types and interfaces.
 */
export * as TYPES from './types';
export * as CONSTANTS from './constants';

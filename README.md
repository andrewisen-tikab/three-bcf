# three-bcf

A BIM Collaboration Format (BCF) writer for three.js

[![PR Checker](https://github.com/andrewisen-tikab/three-bcf/actions/workflows/pr.yml/badge.svg)](https://github.com/andrewisen-tikab/three-bcf/actions/workflows/pr.yml)

three-bcf is:

-   Simple
-   Opinionated

![Example](./resources/example.gif?raw=true)

## Getting Started

### Installing

```bash
npm install three-bcf
```

or

```bash
yarn add three-bcf
```

### Web Worker

Copy the `worker.js` file into your project's public folder.
I.e. `worker.js` should be treated as a static file.
You can find it in the `dist` folder.

Once added, simply create a new `ThreeBCF` object and reference the worker's path.

#### Example

```ts
import * as BCF from 'three-bcf';

const workerUrl = 'path/to/worker.js';

const bcf = new BCF.ThreeBCF({
    workerURL,
});
```

### Namespaces

This library uses namespaces to avoid name collisions.
Begin by importing everything from `three-bcf`.

```ts
import * as BCF from 'three-bcf';
```

Then, use the namespace to access the different parts of the library.

```ts
const topic = new BCF.THREE.Topic_Three();
```

### Checking that the worker is working

`ThreeBCF` will send a message to the worker to check that everything is working as intended.

> THREE.BCF: Sending 'test' message to worker thread

If everything is working as intended, the worker should respond with:

> THREE.BCF.WORKER: Got test message from main thread. Sending response to main thread

Finally, the main thread should receive the response and tell you that everything is working as intended.

> THREE.BCF: Got message from worker thread. Everything's fine!

If that works, then you can continue to the next step.

## Usage

### Creating a topic

Simply create a topic and add the relevant data (params) to it.

```ts
const topic = new BCF.THREE.Topic_Three(); // The topic is empty at this point§
topic.set(params);

// Store the topic somewhere
topics.push(topic);
```

### Create a BCF

When you are ready to create a BCF file, begin by serializing all topic.

```ts
const data = topics.map((topic) => {
    topic.toJSON();
});

// Then, call the createBCF method
bcf.createBCF({
    type: 'begin',
    topics: data,
});
```

## Example

A full SPA example can be found in the `example` folder.
It's a somewhat complicated three.js scene with React on top of it.

You don't need to know React, but it helps if you want to understand the code.
Check the `state` folder to see how the data is stored and manipulated.

The so-called `slice` is a part of `react-redux`, but it contains all the bits and pieces needed to create a BCF file yourself.

You can also try it out here:
[https://andrewisen-tikab.github.io/three-bcf/example/](https://andrewisen-tikab.github.io/three-bcf/example/)

## Docs

Auto-generated docs can be found here:
[https://andrewisen-tikab.github.io/three-bcf/docs/](https://andrewisen-tikab.github.io/three-bcf/docs/)

## Design Structure

The following diagram shows the intended design structure of `three-bcf`.

![Design](./resources/design.png?raw=true)

The source of the data should always (!) come from a database or state.
This data should be highly serializable.

The structure of the code mimics this design.

![Structure](./resources/struture.png?raw=true)

### Core

At the bottom you'll find the core. It contains the main functionality of `three-bcf`.
Mainly the creation of the BCF file. Use parts of this code to write your own BCF writer.

### Three

On top of the core, you'll find the `three` layer.
Al actions performed on the "data" should be done in a `three.js` context.
This means that the models used, cameras position, math operations, etc. etc. are done in terms of `three.js`.
This layer is highly opinionated!

### ThreeBCF

Finally, on top of the `three` layer, you'll find the `ThreeBCF` layer.
This layers is the main entry point for `three-bcf` and is a high-level "API"for creating BCF files.

If this workflow doesn't fit your needs, you can always grab individual parts from each layer use them as you see fit.

## Status

This is a work in progress. It's not production ready.
There are still a lot of things that needs to be done!

## Remarks

This uses BCF version 3.0.

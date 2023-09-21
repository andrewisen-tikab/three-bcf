# three-bcf

A BIM Collaboration Format (BCF) writer for three.js

[![PR Checker](https://github.com/andrewisen-tikab/three-bcf/actions/workflows/pr.yml/badge.svg)](https://github.com/andrewisen-tikab/three-bcf/actions/workflows/pr.yml)

three-bcf is:

-   Simple to use, yet
-   Highly opinionated

<img src="https://github.com/andrewisen-tikab/three-bcf/blob/dev/resources/example.gif?raw=true" width="100%" />

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

`three-bcf` uses a web worker to create the BCF file.

To get started, copy the `worker.js` file into your project's public folder.

In other words:

> `worker.js` should be treated as a static file.

You can find the file inside the `dist` folder (inside the `node_modules/three-bcf` folder).

Once added, simply create a new `ThreeBCF` object and reference the worker's path.

#### Example

The path might look something like this:

```ts
import * as BCF from 'three-bcf';

const workerUrl = 'path/to/worker.js';

const bcf = new BCF.ThreeBCF({
    workerURL,
});
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

### Namespaces

This library uses namespaces to avoid name collisions.
Begin by importing everything from `three-bcf`.

```ts
import * as BCF from 'three-bcf';
```

Then, use the different namespace to access the different parts of the library.

```ts
const topic = new BCF.THREE.Topic_Three();
```

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
Check out the `state` folder to see how the data is stored and manipulated.

The so-called `slice` is a part of `react-redux`, and contains all the bits and pieces needed to create a BCF file yourself.

Also, you can also try it out here:

[https://andrewisen-tikab.github.io/three-bcf/example/](https://andrewisen-tikab.github.io/three-bcf/example/)

## Docs

Auto-generated docs can be found here:
[https://andrewisen-tikab.github.io/three-bcf/docs/](https://andrewisen-tikab.github.io/three-bcf/docs/)

## Design Structure

The following diagram shows the intended design structure of `three-bcf`.

<img src="https://github.com/andrewisen-tikab/three-bcf/blob/dev/resources/design.png?raw=true" width="100%" />

The source of the data should always (!) come from a database or state.
This data should be highly serializable!

The structure of the code mimics this design.

<img src="https://github.com/andrewisen-tikab/three-bcf/blob/dev/resources/structure.png?raw=true" width="100%" />

### Core

At the bottom you'll find the `core`. It contains the main functionality of `three-bcf`.
Mainly the creation of the actual BCF file. It has code related the `zip` files and `xml` generation.

Use parts of this code to write your own BCF writer.

### Three

On top of the core, you'll find the `three` layer.

Al actions performed on the actual "BCF data" should be done in a `three.js` context (!!!).
This means that the BIM models used, cameras position, math operations, etc. etc. are done in terms of `three.js` (!!!).

This layer is highly opinionated one!

### ThreeBCF

Finally, on top of the three layer, you'll find the `ThreeBCF` layer.
This layers is the main entry point for `three-bcf` and is a high-level "API"for creating BCF files.

If this workflow doesn't fit your needs, you can always grab individual parts from each layer use them as you see fit.

## Contributing

Modify the code is somewhat complicated. For example, if you want to edit the `core` and add a new property to the BCF file, you need to do the following:

1. Modify the `core`.

Update `TopicSchema_Core` found inside `src/core/bcf/topic.ts`.
N.B: The library used `zod` to create a schema for the BCF file.

```ts
const TopicSchema_Core = BCFBaseSchema.extend({
    /**
     * Comment goes here
     */
    newProperty: z.string(),
});
```

2. Modify the `three` layer.

Update `Topic_Three` found inside `src/three/topic.ts`.

Simply:

-   Add a new property
-   Update the constructor
-   Update getters and setters
-   Update the `check` method(s)

3. Modify the `ThreeBCF` layer.

Finally, navigate to the `createZipAsync` function inside `src/worker/zip.ts`.
Depending on the type of property you added, you need to update the `factory`.

E.g. `MarkupFactory_XML`.

Simply update the factory's `create` method to use the new property.

```ts
.up()
.ele('newProperty')
.txt(e.newProperty)
```

4. Update the `example`

Finally, update the `example` to use the new property.
This part can be a bit tricky depending on the property you added.

Simply ask for help if you get stuck!

## Status

This is a work in progress. It's not production ready.
There are still a lot of things that needs to be done!

## Remarks

This uses BCF version 3.0.

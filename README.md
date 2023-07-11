# three-bcf

A BIM Collaboration Format (BCF) writer for three.js

[![PR Checker](https://github.com/andrewisen-tikab/three-bcf/actions/workflows/pr.yml/badge.svg)](https://github.com/andrewisen-tikab/three-bcf/actions/workflows/pr.yml)

three-bcf is:

-   Simple
-   Opinionated
-   Powerful

![Example](./resources/example.gif?raw=true)

## Design Structure

The following diagram shows the design structure of `three-bcf`.

![Design](./resources/design.png?raw=true)

The source of the data should always (!) come from a database or state.
This data should be highly searliazable.

Next, all actions performed on the data should be done in a `three.js` context.
This means that the models used, cameras position and math operations are done in terms of `three.js`.

Finally, the data is passed to the `BCFWriter` which will create a BCF file.

If this workflow doesn't fit your needs, you can always grab individual parts of the code and use them as you see fit.

## Usage

Copy the `worker.js` file into your project.
You can find it in the `dist` folder.

Once added, simply create a new worker and post a message to it.

```ts
const worker = new Worker();

const createBCF = (params: WorkerEventPostMessageData): void => {
    worker.postMessage(params);
    worker.onmessage = (event: WorkerEventOnMessageParams) => {
        console.log('Got message from worker thread. Saving ZIP');
        saveAs(event.data, 'presentation.bcf');
    };
};
```

You can test that it works by running the following code:

```ts
// TODO
```

Simply create a topic and add the relevant data (params) to it.

```ts
const topic = new Topic();
topic.set(params);
```

Finally, serialize the topic and send it to the worker.

```ts
const object = topic.toJSON();

const params = {}; // TODO

worker.postMessage(params);
```

## Example

A full SPA example can be found in the `example` folder.
It's a simple three.js scene with React on top of it.

You don't need to know React, but it helps if you want to understand the code.
Check the `state` folder to see how the data is stored and manipulated.

The so-called `slice` is a part of `react-redux`, but it contains all the bits and pieces needed to create a BCF file yourself.

You can also try it out here:
[https://andrewisen-tikab.github.io/three-bcf/example/](https://andrewisen-tikab.github.io/three-bcf/example/)

## Docs

Auto-generated docs can be found here:
[https://andrewisen-tikab.github.io/three-bcf/docs/](https://andrewisen-tikab.github.io/three-bcf/docs/)

## Status

This is a work in progress. It's not production ready.

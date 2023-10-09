// CORE
export { default as TopicSchema } from './core/Topic';

// THREE
export { Topic2 as Topic } from './three/Topic';

// THREE BCF
export { default as MarkupFactory_XML } from './three-bcf/topic/markup';
export { default as ViewpointFactory_XML } from './three-bcf/topic/viewpoint';

// EXAMPLE
export { bcfSlice } from '../example/react/state/bcfSlice';

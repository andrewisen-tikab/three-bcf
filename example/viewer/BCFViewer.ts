import { Topic, TopicParams } from '../../src/three/dev';
import THREEViewer from './Viewer';

/**
 * Class for handling BCF in a three.js environment.
 */
class _BCFViewer extends THREEViewer {
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private static _instance: _BCFViewer;

    public topics: Topic[];

    constructor() {
        super();
        this.topics = [];
    }

    /**
     * @deprecated WIP
     */
    public createTopicFromCurrentCameraState(): void {
        if (this.cameraState == null) {
            this.setCameraState();
        }
        const params = JSON.parse(this.cameraState!);
        this.createTopic(params);
    }

    /**
     * @deprecated WIP
     */
    private createTopic(params: TopicParams): void {
        const topic = new Topic();
        topic.set(params);
        this.topics.push(topic);
    }
}
const BCFViewer = _BCFViewer.Instance;

export default BCFViewer;

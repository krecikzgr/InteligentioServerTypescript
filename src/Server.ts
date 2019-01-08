import {SceneResource} from './resources/scene/SceneResource'
import {App} from './App'
const sceneResource = new SceneResource()

const app = new App()

sceneResource.initialize(app.getServer());
app.start()
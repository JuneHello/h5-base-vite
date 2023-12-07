import { App, Directive } from "vue";
import auth from "./modules/auth";
import reclick from "./modules/reclick";
import copy from "./modules/copy";

const directivesMap: { [key: string]: Directive } = {
  auth,
  copy,
  reclick
};

const plugins = {
  install(app: App<Element>) {
    Object.keys(directivesMap).forEach(key => app.directive(key, directivesMap[key]));
  }
};

export default plugins;

import './style.css';
import type { App } from 'vue';
import { Config, Status, ConfigEditDialog } from "./components";
import I18nUtils from './modules/i18n';
import * as NetworkTypes from './types/network';
import * as Api from './modules/api';
import * as Utils from './modules/utils';
declare const _default: {
    install: (app: App) => void;
};
export default _default;
export { Config, ConfigEditDialog, Status, I18nUtils, NetworkTypes, Api, Utils };

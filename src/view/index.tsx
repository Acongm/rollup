import { h, render } from 'preact';
import View from './preact';

const renderApp = (dom: Element, opt: any) => {
  return render(<View />, dom);
};
export default renderApp;

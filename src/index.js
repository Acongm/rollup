import { h, render } from 'preact';

export const App = () => {
  return <div>hello parcel + preact</div>;
};
const renderApp = () => render(<App />, document.getElementById('app'));
export default renderApp;

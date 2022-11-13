import render from './view/index';
const initAddView = (options: { [key: string]: string }) => {
  const renderProps = {
    ...options,
  };
  const div = document.createElement('div');
  div.className = 'rollup';
  document.body.appendChild(div);
  const mountedDom = div;
  return render(mountedDom, renderProps);
};
export default initAddView;

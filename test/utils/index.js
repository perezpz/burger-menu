import { mount as baseMount } from 'enzyme';

const CONTAINER_ID = 'container';

export function mount(reactNode, containerSelector = `#${CONTAINER_ID}`) {
  return baseMount(reactNode, {
    attachTo: document.querySelector(containerSelector),
  });
}

export const genBeforeEach = (cb) => () => {
  document.body.innerHTML = '';
  // Avoid `attachTo: document.body` Warning
  const div = document.createElement('div');
  div.setAttribute('id', CONTAINER_ID);
  document.body.appendChild(div);

  if (typeof cb === 'function') {
    cb();
  }
};

export const genAfterEach = (cb) => () => {
  const div = document.getElementById(CONTAINER_ID);
  if (div) {
    document.body.removeChild(div);
  }

  if (typeof cb === 'function') {
    cb();
  }
};

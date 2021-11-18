<div align="center">
<article style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <h1 style="width: 100%; text-align: center;">Burger-Menu</h1>
    <p>
        A modern, flexible menu component that provides navigation for pages and features. Quickly build beautiful React apps.
    </p>
</article>

<div align="center">

[![NPM][npm-badge]][npm-url] [![LICENSE][license-badge]][license-url]
[![CODECOV][codecov-badge]][codecov-url]

[npm-badge]: https://img.shields.io/npm/v/burger-menu
[npm-url]: https://www.npmjs.com/package/burger-menu
[license-badge]: https://img.shields.io/badge/license-MIT-orange
[license-url]: https://github.com/perezpz/burger-menu/blob/main/LICENSE
[codecov-badge]: https://img.shields.io/codecov/c/gh/perezpz/react-burger-menu
[codecov-url]: https://codecov.io/gh/perezpz/react-burger-menu

</div>

</div>

# 🎉 Features

- Written in Typescript, Friendly Static Type Support.

# 🔥 Demo

Live demo: [burger-menu](https://burger-menu-gold.vercel.app/)

# 🔥 Install

```sh
# with npm
npm install burger-menu

# with yarn
yarn add burger-menu

```

# 👍 Usage

Here is a quick example to get you started, it's all you need:

```jsx live=true dir="column"
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { slide as Burger, SubMenu, Item } from "burger-menu";
import 'burger-menu/lib/index.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)}>Icon</div>
      <Burger className="burger-menu" isOpen={isOpen} selectedKey={'entry'} onClose={() => setIsOpen(false)}>
        <Item itemKey={'manage'} text={'User Management'}></Item>
        <Item itemKey={'user'} text={'User Center'}></Item>
        <SubMenu title="Union Management">
          <Item itemKey={'notice'} text={'Announcement'}></Item>
          <Item itemKey={'union'} text={'Union Inquiries'}></Item>
          <Item itemKey={'entry'} text={'Entry information'}></Item>
        </SubMenu>
      </Burger>
    </>
});

ReactDOM.render(<App />, document.querySelector('#app'));
```

## How to import

```jsx
import { slide as Burger, SubMenu } from 'burger-menu';
import 'burger-menu/lib/index.css';
```

## Animations

The usage above imported `slide` which renders a menu that slides in when the burger icon is clicked. To use a different animation you can substitute `slide` with any of the following (check out the [demo](https://burger-menu-gold.vercel.app/) to see the animations in action):

- `slide`
- `fallDown`

## API Reference

| Properties       | Description                                                       | Type              | Default  |
| ---------------- | ----------------------------------------------------------------- | ----------------- | -------- |
| isOpen           | Control open state                                                | boolean           | false    |
| width            | Width                                                             | number \| string  | 300      |
| left             | Sliding position                                                  | boolean           | false    |
| duration         | Automatic close delay                                             | string            | 300ms    |
| customCrossIcon  | Icon for close button                                             | ReactNode         | false    |
| customIcon       | Custom icon or logo component, will be displayed on the head left | ReactNode         | false    |
| onOpen           | The Callback function when animation end                          | function(e) => {} | () => {} |
| onClose          | The callback function before the exit animation ends              | function(e) => {} | () => {} |
| bodyClassName    | Add className to body tag                                         | string            |          |
| htmlClassName    | Add className to html tag                                         | string            |          |
| noOverlay        | Toggle whether to show overlay                                    | boolean           | false    |
| overlayClassName | Overlay style name                                                | string            |          |

### SubMenu

| Properties | Description                                     | Type      | Default |
| ---------- | ----------------------------------------------- | --------- | ------- |
| title      | SubMenu copy                                    | string    |         |
| icon       | Icon of SubMenu, will be displayed on the right | ReactNode |         |

### Item

| Properties | Description                                              | Type      | Default |
| ---------- | -------------------------------------------------------- | --------- | ------- |
| text       | Content for item                                         | string    |         |
| icon       | The icon of the menu item, will be displayed on the left | ReactNode |         |
| itemKey    | Unique ID of the menu item                               | string    |         |

# 🎈 License

Burger Menu is [MIT Licensed](LICENSE)

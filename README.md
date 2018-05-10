# react-elements-selector

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

> React (Render Props) component to handle selection of elements

![alt text](http://g.recordit.co/r5EYoaZhMO.gif 'Example')

[![NPM](https://img.shields.io/npm/v/react-elements-selector.svg)](https://www.npmjs.com/package/react-elements-selector) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-elements-selector

npm install --save react-elements-selector
```

## Usage

```jsx
import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import ElementsSelector from 'react-elements-selector';
import styled from 'react-emotion';

const items = [
  { name: 'Panda', selectable: true },
  { name: 'Waffle', selectable: true },
  { name: 'PandaWaffles', selectable: false },
  { name: 'WafflePandas', selectable: true },
  { name: 'PandaWaffleWaffles', selectable: true },
  { name: 'WafflePandaPandas', selectable: false },
  { name: 'WafflePandaWaffles', selectable: true },
  { name: 'PandaWafflePandas', selectable: true }
];

const Container = styled('div')`
  display: flex;
`;

const Card = styled('div')`
  width: 300px;
  height: 300px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  ${({ isSelected }) => isSelected && `background-color: cadetblue;`};
  ${({ notSelectable }) => notSelectable && `background-color: grey;`};
  ${({ isInRange }) => isInRange && `background-color: chartreuse;`};
`;

class App extends Component {
  render() {
    return (
      <ElementsSelector
        items={items}
        notSelectable={items.filter(item => !item.selectable)}
      >
        {({
          items: users,
          toggleSelect,
          isSelecting,
          isItemSelected,
          itemProps,
          selectedItems
        }) => {
          return (
            <Fragment>
              <Container>
                {users.map(user => {
                  return (
                    <Card key={user.name} {...itemProps(user)}>
                      {isItemSelected(user) ? (
                        <div>Selected {user.name}</div>
                      ) : (
                        <div>{user.name}</div>
                      )}
                    </Card>
                  );
                })}
              </Container>
              -- Hold down shift to select multiple boxes -- <br />
              <br />
              <button onClick={toggleSelect}>
                {!isSelecting ? 'Start Selecting' : 'Cancel'}
              </button>
              <br />
              <br />
              {JSON.stringify(selectedItems)}
            </Fragment>
          );
        }}
      </ElementsSelector>
    );
  }
}

export default App;

render(<App />, document.getElementById('root'));
```

## License

MIT © [functionalStoic](https://github.com/functionalStoic)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/10525357?v=4" width="100px;"/><br /><sub><b>Josh Hamilton</b></sub>](http://blog.nearbycoder.com/)<br />[💬](#question-nearbycoder "Answering Questions") [🐛](https://github.com/functionalStoic/react-elements-selector/issues?q=author%3Anearbycoder "Bug reports") [💻](https://github.com/functionalStoic/react-elements-selector/commits?author=nearbycoder "Code") [📖](https://github.com/functionalStoic/react-elements-selector/commits?author=nearbycoder "Documentation") [💡](#example-nearbycoder "Examples") [👀](#review-nearbycoder "Reviewed Pull Requests") [⚠️](https://github.com/functionalStoic/react-elements-selector/commits?author=nearbycoder "Tests") [🔧](#tool-nearbycoder "Tools") | [<img src="https://avatars3.githubusercontent.com/u/7215306?v=4" width="100px;"/><br /><sub><b>functionalStoic</b></sub>](https://github.com/functionalStoic)<br />[💬](#question-functionalStoic "Answering Questions") [🐛](https://github.com/functionalStoic/react-elements-selector/issues?q=author%3AfunctionalStoic "Bug reports") [💻](https://github.com/functionalStoic/react-elements-selector/commits?author=functionalStoic "Code") [📖](https://github.com/functionalStoic/react-elements-selector/commits?author=functionalStoic "Documentation") [💡](#example-functionalStoic "Examples") [👀](#review-functionalStoic "Reviewed Pull Requests") [⚠️](https://github.com/functionalStoic/react-elements-selector/commits?author=functionalStoic "Tests") [🔧](#tool-functionalStoic "Tools") |
| :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

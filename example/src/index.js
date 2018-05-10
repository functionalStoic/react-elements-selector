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
        {(
          users,
          toggleSelect,
          isSelecting,
          isItemSelected,
          itemProps,
          selectedItems
        ) => {
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
              <button onClick={toggleSelect}>
                {!isSelecting ? 'Start Selecting' : 'Cancel'}
              </button>
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

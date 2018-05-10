import { Component } from 'react';

export default class ElementsSelector extends Component {
  static defaultProps = { items: [], notSelectable: [] };

  defaultState = {
    selectedItems: [],
    selectedRange: [],
    firstSelectedItem: null,
    isSelecting: false,
    isShifting: false
  };

  state = this.defaultState;

  componentDidMount() {
    window.addEventListener('keydown', this.handleShift);
    window.addEventListener('keyup', this.handleShift);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleShift);
    window.removeEventListener('keyup', this.handleShift);
  };

  handleShift = event => {
    if (event.key === 'Shift') {
      this.setState(prevState => {
        return { isShifting: !prevState.isShifting };
      });
    }
  };

  toggleSelect = () => {
    this.setState(
      ({ isSelecting, isShifting }) =>
        isSelecting
          ? { ...this.defaultState, isShifting }
          : { isSelecting: true }
    );
  };

  toggleResource = item => {
    if (this.props.notSelectable.indexOf(item) !== -1) return;

    this.setState(({ selectedItems, selectedRange }) => {
      const { isShifting, selectedRange: range } = this.state;
      if (isShifting && range.length > 1) {
        return {
          selectedItems: [...selectedItems, ...selectedRange].filter(
            (value, index, self) => self.indexOf(value) === index
          ),
          firstSelectedItem: item,
          selectedRange: []
        };
      } else if (this.isItemSelected(item)) {
        return {
          selectedItems: selectedItems.filter(i => i !== item),
          firstSelectedItem: null,
          selectedRange: []
        };
      } else {
        return {
          selectedItems: [...selectedItems, item],
          firstSelectedItem: item,
          selectedRange: []
        };
      }
    });
  };

  isItemSelected = item => this.state.selectedItems.indexOf(item) !== -1;

  updateSelectedRange = (e, item) => {
    if (!this.state.firstSelectedItem) return;

    const {
      props: { items, notSelectable },
      state: { firstSelectedItem }
    } = this;

    this.setState(prevState => {
      const firstIndex = items.indexOf(firstSelectedItem);
      const lastIndex = items.indexOf(item);
      const firstSlice = firstIndex > lastIndex ? lastIndex : firstIndex;
      const lastSlice = firstIndex < lastIndex ? lastIndex + 1 : firstIndex + 1;
      return {
        selectedRange: items.slice(firstSlice, lastSlice).filter(item => {
          return notSelectable.indexOf(item) === -1;
        })
      };
    });
  };

  itemProps = item => {
    const {
      state: { isShifting, selectedRange, isSelecting },
      props: { notSelectable },
      isItemSelected,
      updateSelectedRange,
      toggleResource
    } = this;

    return {
      isInRange: isShifting && selectedRange.indexOf(item) !== -1,
      isSelected: isItemSelected(item),
      onClick: () => isSelecting && toggleResource(item),
      onMouseOver: e => updateSelectedRange(e, item),
      notSelectable: notSelectable.indexOf(item) !== -1
    };
  };

  render() {
    const {
      toggleSelect,
      isItemSelected,
      itemProps,
      state: { isSelecting, selectedItems },
      props: { children, items }
    } = this;

    return children({
      items,
      toggleSelect,
      isSelecting,
      isItemSelected,
      itemProps,
      selectedItems
    });
  }
}

import { Component } from 'react'

export default class ElementsSelector extends Component {
  defaultState = {
    selectedItems: [],
    selectedRange: [],
    firstSelectedItem: null,
    isSelecting: false,
    isShifting: false
  }

  state = this.defaultState

  static defaultProps = {
    items: [],
    notSelectable: []
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleShift)
    window.addEventListener('keyup', this.handleShift)
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleShift)
    window.removeEventListener('keyup', this.handleShift)
  }

  handleShift = event => {
    if (event.key === 'Shift') {
      this.setState(prevState => {
        return { isShifting: !prevState.isShifting }
      })
    }
  }

  toggleSelect = () => {
    this.setState(
      ({ isSelecting, isShifting }) =>
        isSelecting
          ? { ...this.defaultState, isShifting }
          : { isSelecting: true }
    )
  }

  toggleResource = item => {
    if (this.props.notSelectable.indexOf(item) !== -1) return

    this.setState(({ selectedItems, selectedRange }) => {
      const { isShifting, selectedRange: range } = this.state
      if (isShifting && range.length > 1) {
        return {
          selectedItems: [...selectedItems, ...selectedRange].filter(
            (value, index, self) => self.indexOf(value) === index
          ),
          firstSelectedItem: item,
          selectedRange: []
        }
      } else if (this.isItemSelected(item)) {
        return {
          selectedItems: selectedItems.filter(i => i !== item),
          firstSelectedItem: null,
          selectedRange: []
        }
      } else {
        return {
          selectedItems: [...selectedItems, item],
          firstSelectedItem: item,
          selectedRange: []
        }
      }
    })
  }

  isItemSelected = item => this.state.selectedItems.indexOf(item) !== -1

  updateSelectedRange = (e, item) => {
    if (!this.state.firstSelectedItem) return

    const { items, notSelectable } = this.props
    const { firstSelectedItem } = this.state

    this.setState(prevState => {
      const firstIndex = items.indexOf(firstSelectedItem)
      const lastIndex = items.indexOf(item)
      const firstSlice = firstIndex > lastIndex ? lastIndex : firstIndex
      const lastSlice = firstIndex < lastIndex ? lastIndex + 1 : firstIndex + 1
      return {
        selectedRange: items.slice(firstSlice, lastSlice).filter(item => {
          return notSelectable.indexOf(item) === -1
        })
      }
    })
  }

  itemProps = item => {
    return {
      isInRange:
        this.state.isShifting && this.state.selectedRange.indexOf(item) !== -1,
      isSelected: this.isItemSelected(item),
      onClick: () => this.state.isSelecting && this.toggleResource(item),
      onMouseOver: e => this.updateSelectedRange(e, item),
      notSelectable: this.props.notSelectable.indexOf(item) !== -1
    }
  }

  render() {
    const { isSelecting, selectedItems } = this.state
    const { children } = this.props
    return children(
      this.props.items,
      this.toggleSelect,
      isSelecting,
      this.isItemSelected,
      this.itemProps,
      selectedItems
    )
  }
}

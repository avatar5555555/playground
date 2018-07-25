import hoistNonReactStatics from 'hoist-non-react-statics'

export const hoistStatics = (higherOrderComponent) => (BaseComponent) => {
  const NewComponent = higherOrderComponent(BaseComponent)
  hoistNonReactStatics(NewComponent, BaseComponent)

  return NewComponent
}

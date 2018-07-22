/*tslint:disable:no-var-keyword*/

type SpaceValue = string | number
type SpaceOrBoolValue = bool | string | number

interface IBreakpointsProps {
  lg?: SpaceOrBoolValue
  md?: SpaceOrBoolValue
  sm?: SpaceOrBoolValue
  xl?: SpaceOrBoolValue
  xs?: SpaceOrBoolValue
}

declare module 'smooth-ui' {
  export var Alert: React.ComponentType
  export var Box: React.ComponentType<{
    alignContent?: string
    alignItems?: string
    alignSelf?: string
    direction?: string
    flex?: SpaceOrBoolValue
    justifyContent?: string
    margin?: SpaceValue
    padding?: SpaceValue
    wrap?: string
  }>
  export var Button: React.ComponentType
  export var Checkbox: React.ComponentType
  export var Col: React.ComponentType<IBreakpointsProps>
  export var ControlFeedback: React.ComponentType<{ valid?: boolean }>
  export var FormCheck: React.ComponentType
  export var FormCheckLabel: React.ComponentType
  export var FormGroup: React.ComponentType
  export var Input: React.ComponentType<React.HTMLProps<HTMLLabelElement>>
  export var Label: React.ComponentType<{ control?: boolean }>
  export var Modal: React.ComponentType
  export var ModalBody: React.ComponentType
  export var ModalContent: React.ComponentType
  export var ModalDialog: React.ComponentType
  export var ModalFooter: React.ComponentType
  export var ModalHeader: React.ComponentType
  export var Radio: React.ComponentType
  export var RadioGroup: React.ComponentType
  export var Row: React.ComponentType<{ gutter?: SpaceValue }>
  export var Select: React.ComponentType
  export var Switch: React.ComponentType
  export var Textarea: React.ComponentType
  export var Toggler: React.ComponentType
  export var Transition: React.ComponentType
  export var Typography: React.ComponentType<{
    margin?: boolean
    variant?:
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'display-1'
      | 'display-2'
      | 'display-3'
      | 'display-4'
  }>

  export var defaultTheme: object

  // utils
  declare function th(path: string, modifier?: () => T): T
}

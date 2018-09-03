/*tslint:disable:no-var-keyword interface-name no-namespace */

// Helper type operators
type KeyofBase = keyof any
type Diff<T extends KeyofBase, U extends KeyofBase> = ({ [P in T]: P } &
  { [P in U]: never })[T]
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>

interface Window {
  ReactIntlLocaleData: any
  __NEXT_DATA__: any
  MediaStream: any
  webkitMediaStream: any
  MediaRecorder: any
}

declare namespace NodeJS {
  export interface Process {
    browser: boolean
  }

  export interface Global {
    fetch: any
  }
}

declare module 'smooth-ui' {
  type SpaceValue = string | number
  type SpaceOrBoolValue = bool | string | number

  interface IBreakpointsProps {
    lg?: SpaceOrBoolValue
    md?: SpaceOrBoolValue
    sm?: SpaceOrBoolValue
    xl?: SpaceOrBoolValue
    xs?: SpaceOrBoolValue
  }

  export var Alert: React.ComponentType<React.HTMLProps<HTMLDivElement>>
  export var Box: React.ComponentType<
    React.HTMLProps<HTMLDivElement> & {
      alignContent?: string
      alignItems?: string
      alignSelf?: string
      direction?: string
      flex?: SpaceOrBoolValue
      justifyContent?: string
      margin?: SpaceValue
      padding?: SpaceValue
      wrap?: string
    }
  >
  export var Button: React.ComponentType<
    React.HTMLProps<HTMLButtonElement> & {
      variant?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'light'
        | 'dark'
        | null
    }
  >
  export var Checkbox: React.ComponentType<React.HTMLProps<HTMLDivElement>>
  export var Col: React.ComponentType<
    React.HTMLProps<HTMLDivElement> & IBreakpointsProps
  >
  export var ControlFeedback: React.ComponentType<
    React.HTMLProps<HTMLDivElement> & { valid?: boolean }
  >
  export var FormCheck: React.ComponentType<React.HTMLProps<HTMLDivElement>>
  export var FormCheckLabel: React.ComponentType<
    React.HTMLProps<HTMLLabelElement>
  >
  export var FormGroup: React.ComponentType<React.HTMLProps<HTMLDivElement>>
  export var Input: React.ComponentType<
    React.HTMLProps<HTMLInputElement> & { control?: boolean }
  >
  export var Label: React.ComponentType<React.HTMLProps<HTMLLabelElement>>
  export var Modal: React.ComponentType<React.HTMLProps<HTMLDivElement>>
  export var ModalBody: React.ComponentType<React.HTMLProps<HTMLDivElement>>
  export var ModalContent: React.ComponentType<React.HTMLProps<HTMLDivElement>>
  export var ModalDialog: React.ComponentType<React.HTMLProps<HTMLDivElement>>
  export var ModalFooter: React.ComponentType<React.HTMLProps<HTMLDivElement>>
  export var ModalHeader: React.ComponentType<React.HTMLProps<HTMLDivElement>>
  export var Radio: React.ComponentType<React.HTMLProps<HTMLInputElement>>
  export var RadioGroup: React.ComponentType<React.HTMLProps<HTMLDivElement>>
  export var Row: React.ComponentType<
    React.HTMLProps<HTMLDivElement> & { gutter?: SpaceValue }
  >
  export var Select: React.ComponentType<React.HTMLProps<HTMLSelectElement>>
  export var Switch: React.ComponentType<React.HTMLProps<HTMLInputElement>>
  export var Textarea: React.ComponentType<React.HTMLProps<HTMLTextAreaElement>>
  export var Toggler: React.ComponentType<React.HTMLProps<HTMLSpanElement>>
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

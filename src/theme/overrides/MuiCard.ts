import {
  ComponentsOverrides,
  ComponentsProps,
  ComponentsVariants,
  Theme,
} from '@mui/material'

export const MuiCard: {
  defaultProps?: ComponentsProps['MuiCard']
  styleOverrides?: ComponentsOverrides<Theme>['MuiCard']
  variants?: ComponentsVariants['MuiCard']
} = {
  styleOverrides: {
    root: () => ({
      borderRadius: 0,
    }),
  },
}

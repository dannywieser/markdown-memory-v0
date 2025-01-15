import {
  ComponentsOverrides,
  ComponentsProps,
  ComponentsVariants,
  Theme,
} from '@mui/material'

export const MuiChip: {
  defaultProps?: ComponentsProps['MuiChip']
  styleOverrides?: ComponentsOverrides<Theme>['MuiChip']
  variants?: ComponentsVariants['MuiChip']
} = {
  styleOverrides: {
    root: () => ({
      borderRadius: '4px',
    }),
  },
}

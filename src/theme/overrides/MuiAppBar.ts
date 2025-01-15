import {
  ComponentsOverrides,
  ComponentsProps,
  ComponentsVariants,
  Theme,
} from '@mui/material'

export const MuiAppBar: {
  defaultProps?: ComponentsProps['MuiAppBar']
  styleOverrides?: ComponentsOverrides<Theme>['MuiAppBar']
  variants?: ComponentsVariants['MuiAppBar']
} = {
  defaultProps: {
    color: 'transparent',
    elevation: 0,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      borderBottom: `1px solid`,
      borderColor: theme.palette.grey[300],
      borderTop: `1px solid`,
    }),
  },
}

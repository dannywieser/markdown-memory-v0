import { Chip } from '@mui/material'
import { styled } from '@mui/system'

export const Tag = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[500],
  border: 0,
  borderRadius: '8px',
  color: theme.palette.primary.contrastText,
}))

import styled from '@emotion/styled'

import { HeaderProps } from './Header.types'

const Tag = styled['h1']`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: ${(props) => props.theme.text['h1'].fontSize};
  font-weight: ${(props) => props.theme.text['h1'].fontWeight};
  line-height: ${(props) => props.theme.text.lineHeight}em;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.contrastText};
  margin: 0;
  position: sticky;
  padding-left: ${(props) => props.theme.grid * 2}px;
  padding-top: ${(props) => props.theme.grid * 1}px;
  padding-bottom: ${(props) => props.theme.grid * 1}px;
  top: 0;
`

export default function Header({ title }: HeaderProps) {
  return <Tag>{title}</Tag>
}

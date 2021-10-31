import styled, { css } from 'styled-components';

interface ButtonProps {
  background: string;
  foreground: string;
  type?: 'contained' | 'outlined';
}

export const StyledButton = styled.div<ButtonProps>`
  min-width: 80px;
  width: fit-content;
  height: 42px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  font-size: 15px;
  text-align: center;
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0;
    position: absolute;
    will-change: opacity;
    transition: 0.2s opacity;
  }

  &:hover::before {
    opacity: 0.12;
  }

  ${({ background, foreground, type }) => css`
    color: ${foreground || '#fff'};
    border: ${type === 'outlined'
      ? `1px solid ${background || '#1E6FEB'}`
      : 'unset'};
    background-color: ${type === 'outlined'
      ? 'transparent'
      : background || '#1E6FEB'};

    &::before {
      background-color: ${foreground || '#fff'};
    }
  `};
`;

export const StyledLabel = styled.div`
  z-index: 1;
  font-size: 12px;
  pointer-events: none;
`;

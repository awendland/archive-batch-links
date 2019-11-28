import { css } from 'emotion'

export const GLOBAL = `
  html, body {
    font-family: sans-serif;
    background: #251533;
    box-sizing: border-box;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
  body {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #C5AEDA;
  }
  #my-app {
    width: 95%;
  }
`

export const input = css`
  width: 100%;
  margin: 0.5em 0;
  height: 20em;
  border: none;
  background: none;
  border: 2px solid #d42867;
  font-size: 1em;
  padding: 0.5em 1em;
  outline: none;
  color: #d42867;
  &::placeholder {
    color: #d42867;
  }
`

export const table = css`
  width: 100%;
`

export const urlRow = css``

export const urlRow_ignored = css`
  opacity: 0.4;
`

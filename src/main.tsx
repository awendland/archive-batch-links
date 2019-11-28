import app, { Update } from 'apprun'
import './api'
import * as styles from './styles'
import * as getUrls from 'get-urls'
import produce from 'immer'

const classlist = (classes) => classes.filter((c) => !!c).join(' ')

type State = {
  urls?: string[]
  urlStatus: {
    [url: string]: {
      approved: boolean
      currentStatus: 'none' | 'pending' | Number
      newAction: 'none' | 'pending' | 'saved'
    }
  }
}

const initialState: State = {
  urlStatus: {},
}

const view = (state: State) => {
  return (
    <div>
      <style type="text/css">{styles.GLOBAL}</style>
      <textarea
        oninput={(ev) => app.run('changeRawInput', ev.target.value)}
        placeholder="Dump any text with URLs in it"
        className={styles.input}
      />
      <table className={styles.table}>
        <tr>
          <td></td>
          <td onclick={() => app.run('approveAll')}>Approve All</td>
          <td>Check All</td>
          <td>Save All</td>
        </tr>
        {state.urls?.map((url) => (
          <tr
            className={classlist([
              styles.urlRow,
              state.urlStatus[url].approved || styles.urlRow_ignored,
            ])}
          >
            <td>{url}</td>
            <td onclick={() => app.run('toggleApproval', url)}>
              {state.urlStatus[url].approved ? 'APPROVE' : 'IGNORE'}
            </td>
            <td>{state.urlStatus[url].currentStatus}</td>
            <td>{state.urlStatus[url].newAction}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

const update: Update<State> = {
  '#': (state) => {
    // On first load
  },
  changeRawInput: (state, rawInput) =>
    produce(state, (draft) => {
      draft.urls = Array.from(getUrls(rawInput))
      draft.urlStatus = draft.urls
        .map((url) => [
          url,
          state.urlStatus[url] ?? {
            approved: false,
            currentStatus: 'none',
            newAction: 'none',
          },
        ])
        .reduce(
          (obj, [k, v]: [string, any]) => Object.assign(obj, { [k]: v }),
          {},
        )
    }),
  approveAll: (state) =>
    produce(state, (draft) => {
      state.urls.map((url) => (draft.urlStatus[url].approved = true))
    }),
  toggleApproval: (state, url) =>
    produce(state, (draft) => {
      draft.urlStatus[url].approved = !draft.urlStatus[url].approved
    }),
  render: (state) => state,
}

app.start('my-app', initialState, view, update)

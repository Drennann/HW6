import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const AccountHistoryStoreModel = types
  .model("AccountHistoryStore")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AccountHistoryStore extends Instance<typeof AccountHistoryStoreModel> {}
export interface AccountHistoryStoreSnapshotOut extends SnapshotOut<typeof AccountHistoryStoreModel> {}
export interface AccountHistoryStoreSnapshotIn extends SnapshotIn<typeof AccountHistoryStoreModel> {}
export const createAccountHistoryStoreDefaultModel = () => types.optional(AccountHistoryStoreModel, {})

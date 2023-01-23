import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AccountHistoryStoreModel } from "./AccountHistoryStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  accountHistoryStore: types.optional(AccountHistoryStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

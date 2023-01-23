import { AccountHistoryStoreModel } from "./AccountHistoryStore"

test("can be created", () => {
  const instance = AccountHistoryStoreModel.create({})

  expect(instance).toBeTruthy()
})

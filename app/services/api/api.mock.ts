import MockAdapter from "axios-mock-adapter"
import { add, formatISO } from "date-fns"
import { api } from "./api"
import { AccountDTO, TransactionDTO } from "./api.types"

const mock = new MockAdapter(api.apisauce.axiosInstance, { delayResponse: 300 })

const currencyEur = {
  id: 1,
  name: "EUR",
}
const currencyUsd = {
  id: 2,
  name: "USD",
}
const currencyGbr = {
  id: 3,
  name: "GBR",
}

mock.onGet("/accounts").reply<AccountDTO[]>(200, [
  {
    id: 1,
    name: "Current Account",
    number: "1234-4567-3456-0000",
    balances: [
      {
        id: 1,
        currency: currencyEur,
        amount: 76451,
      },
      {
        id: 2,
        currency: currencyUsd,
        amount: 82805.61,
      },
      {
        id: 3,
        currency: currencyGbr,
        amount: 67806.77,
      },
    ],
  },
  {
    id: 2,
    name: "Savings",
    number: "1234-4567-3456-1111",
    balances: [
      {
        id: 4,
        currency: currencyEur,
        amount: 1000,
      },
      {
        id: 5,
        currency: currencyUsd,
        amount: 1083.24,
      },
      {
        id: 6,
        currency: currencyGbr,
        amount: 887.17,
      },
    ],
  },
  {
    id: 3,
    name: "Vacation",
    number: "1234-4567-3456-2222",
    balances: [
      {
        id: 1,
        currency: currencyEur,
        amount: 1500,
      },
      {
        id: 2,
        currency: currencyUsd,
        amount: 16234.86,
      },
    ],
  },
])

const transactionTemplates = [
  {
    id: 1,
    type: "auto",
    targetName: '"Golub" Taxi Transportation',
    dateTime: "2022-05-22T18:39:00.000Z",
    amount: -345,
    currency: currencyEur,
  },
  {
    id: 2,
    type: "food",
    targetName: '"Francois" Restaurant Dinner',
    dateTime: "2022-05-15T20:56:00.000Z",
    amount: -1158,
    currency: currencyEur,
  },
  {
    id: 3,
    type: "travel",
    targetName: '"AirMax" Travel to Paris',
    dateTime: "2022-05-14T16:00:00.000Z",
    amount: -813,
    currency: currencyEur,
  },
  {
    id: 4,
    type: "house",
    targetName: "Construction ltd.",
    dateTime: "2022-05-11T09:26:00.000Z",
    amount: 24500,
    currency: currencyUsd,
  },
  {
    id: 5,
    type: "transfer",
    targetName: "Robert Smith",
    dateTime: "2022-05-03T12:06:00.000Z",
    amount: 11215,
    currency: currencyUsd,
  },
]
mock.onGet(/\/accounts\/\d+\/transactions/).reply<TransactionDTO[]>((config) => {
  const { size = 50, offset = 0 } = config.params ?? {}
  const now = new Date()
  try {
    const transactions = [...new Array(size)].map((_, index) => ({
      ...transactionTemplates[index % transactionTemplates.length],
      id: offset + index,
      dateTime: formatISO(add(now, { days: -(offset - index) })),
    }))
    return [200, transactions]
  } catch (e) {
    console.log(e)
  }
  return [200, []]
})

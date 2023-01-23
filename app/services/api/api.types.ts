/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

export interface CurrencyDTO {
  id: number
  name: string
}

export interface BalanceDTO {
  id: number
  currency: CurrencyDTO
  amount: number
}

export interface AccountDTO {
  id: number
  name: string
  number: string
  balances: BalanceDTO[]
}

export type TransactionTypeDTO = "auto" | "food" | "travel" | "house" | "transfer"

export interface TransactionDTO {
  id: number
  type: TransactionTypeDTO
  targetName: string
  dateTime: string
  amount: number
  currency: CurrencyDTO
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

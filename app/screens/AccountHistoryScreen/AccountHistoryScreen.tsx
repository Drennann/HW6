import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { RefreshControl, ViewStyle } from "react-native"
import { Screen } from "../../components"
import { AccountCardList } from "./AccountCardList"
import { RecentTransactionsView } from "./RecentTransactionsView"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useColorSchemeStyle } from "../../theme/useColorSchemeStyle"
import { AccountDTO, api, TransactionDTO } from "../../services/api"

export const AccountHistoryScreen = observer(function AccountHistoryScreen() {
  const $rootColorSchemeStyle = useColorSchemeStyle({
    light: $rootLight,
    dark: $rootDark,
  })
  const $styles = [$root, $rootColorSchemeStyle]

  const bottomTabBarHeight = useBottomTabBarHeight()

  const [accounts, setAccounts] = useState<AccountDTO[]>()
  const [activeAccountId, setActiveAccountId] = useState<AccountDTO["id"]>()
  const [transactions, setTransactions] = useState<TransactionDTO[]>()

  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    fetchAccounts()
  }, [])

  useEffect(() => {
    if (!activeAccountId && accounts && accounts.length > 0) {
      setActiveAccountId(accounts[0].id)
    }
  }, [accounts])

  useEffect(() => {
    if (activeAccountId) {
      setTransactions(undefined)
      fetchTransactions(activeAccountId)
    }
  }, [activeAccountId])

  const fetchAccounts = async () => {
    const { data } = await api.getAccounts()
    setAccounts(data)
  }

  const fetchTransactions = async (accountId: AccountDTO["id"]) => {
    const { data } = await api.getTransactions(accountId, { size: 5 })
    setTransactions(data)
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    await Promise.all([fetchAccounts(), activeAccountId && fetchTransactions(activeAccountId)])
    setIsRefreshing(false)
  }

  return (
    <Screen
      style={$styles}
      preset="scroll"
      contentContainerStyle={{ paddingBottom: bottomTabBarHeight }}
      ScrollViewProps={{
        overScrollMode: "always",
        refreshControl: (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshData}
            tintColor="white"
            colors={["#523CF8"]}
          />
        ),
      }}
    >
      {accounts && activeAccountId && (
        <AccountCardList
          style={$accountCardList}
          accounts={accounts}
          activeAccountId={activeAccountId}
          onChangeActiveAccountId={setActiveAccountId}
        />
      )}
      {transactions && activeAccountId && (
        <RecentTransactionsView
          style={$recentTransactions}
          accountId={activeAccountId}
          transactions={transactions}
        />
      )}
    </Screen>
  )
})

const SCREEN_PADDING_HORIZONTAL = 12

const $root: ViewStyle = {
  flex: 1,
}
const $rootLight: ViewStyle = {
  backgroundColor: "#523CF8",
}
const $rootDark: ViewStyle = {
  backgroundColor: "#16110D",
}

const $accountCardList: ViewStyle = {
  marginTop: 20,
}

const $recentTransactions: ViewStyle = {
  marginTop: 11,
  marginHorizontal: SCREEN_PADDING_HORIZONTAL,
}

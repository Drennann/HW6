import React, { FC, useState, useEffect, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ListRenderItem, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { ListItem, Screen, Text, TextThemed } from "../components"
import { AccountDTO, api, TransactionDTO } from "../services/api"
import TransactionListItem from "../components/TransactionListItem"
import { format } from "date-fns"
import { typography } from "../theme"
import { useColorSchemeStyle } from "../theme/useColorSchemeStyle"

type TransactionListItem =
  | { type: "month"; payload: string }
  | { type: "transaction"; payload: TransactionDTO }

export const TransactionListScreen: FC<AppStackScreenProps<"TransactionList">> = observer(
  function TransactionListScreen(props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const { route } = props

    const [transactions, setTransactions] = useState<TransactionDTO[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchTransactions = async (accountId: AccountDTO["id"]) => {
      setIsLoading(true);
      const { data = [] } = await api.getTransactions(accountId, {
        offset: transactions.length,
        size: 50,
      })

      setTransactions([...transactions, ...data])
      setIsLoading(false)
    }

    useEffect(() => {
      fetchTransactions(route.params.accountId)
    }, [route.params.accountId])

    let currentMonth: string
    const data = transactions?.reduce<TransactionListItem[]>((result, item) => {
      const transactionMonth = format(new Date(item.dateTime), "MMMM, yyyy")
      if (result.length === 0 || transactionMonth !== currentMonth) {
        currentMonth = transactionMonth
        result.push({ type: "month", payload: transactionMonth })
      }
      result.push({ type: "transaction", payload: item })
      return result
    }, [])

    const $containerThemed = useColorSchemeStyle({
      light: $containerLight,
      dark: $containerDark,
    })

    return (
      <Screen contentContainerStyle={[$container, $containerThemed]}>
        <FlatList
          style={$transactionsList}
          data={data || []}
          renderItem={({ item }) => {
            if (item.type === "month") {
              return (
                <View style={$transactionsListSection}>
                  <TextThemed style={$transactionsListSectionHeader}>{item.payload}</TextThemed>
                </View>
              )
            }
            return <TransactionListItem style={$transactionsListItem} transaction={item.payload} />
          }}
          onEndReached={() => {
            console.log("onEndReached")
            fetchTransactions(route.params.accountId)
          }}
          keyExtractor={(item, index) => String(index)}
          initialNumToRender={15}
          maxToRenderPerBatch={50}
          refreshing={isLoading}
        />
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 12,
}
const $containerLight: ViewStyle = {
  backgroundColor: "white",
}
const $containerDark: ViewStyle = {
  backgroundColor: "#16110D",
}

const $transactionsList: ViewStyle = {
  paddingTop:30,
  flex: 1,
}
const $transactionsListItem: ViewStyle = {
  marginTop: 22,
}
const $transactionsListSection: ViewStyle = {
  marginTop: 26,
}
const $transactionsListSectionHeader: TextStyle = {
  fontFamily: typography.fonts.montserrat.normal,
  fontSize: 15,
  lineHeight: 18,
}

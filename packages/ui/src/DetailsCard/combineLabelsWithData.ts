import { ItemProps } from './types'

export const combineLabelsWithData = <T extends Record<string, string | JSX.Element>>(
  labels: [string, keyof T][],
  dataList: T
): ItemProps[] => labels.map((label) => ({
  label: label[0],
  value: dataList[label[1]]
}))

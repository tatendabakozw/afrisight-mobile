import { config } from '@tamagui/config/v3'

import { createTamagui, createTokens } from 'tamagui'
import Colors from './constants/Colors'


export const tamaguiConfig = createTamagui(config)

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {

    interface TamaguiCustomConfig extends Conf { }

}
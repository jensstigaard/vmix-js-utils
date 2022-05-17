// Types
import { VideoInput } from '../../types/inputs/video'
// Mappers
import { PlayableInputMapper } from './playable-input-mapper'
import { GenericAudioInputMapper } from './generic-audio-input-mapper'

export abstract class GenericPlayableWithAudioInputMapper extends PlayableInputMapper {

  map(input: Element, includeLayers: boolean = true): VideoInput {
    if (input.attributes.getNamedItem('audiobusses')) {
      return {
        ...super.map(input, includeLayers),
        ...(new GenericAudioInputMapper).map(input)
      }
    } else {
      return {
        ...super.map(input, includeLayers),
        audiobusses: [],
        muted: false,
        solo: false,
        volume: -1,
        balance: 0,
        audioMeter: { left: 0, right: 0 },
        gainDb: 0
      }
    }
  }
}

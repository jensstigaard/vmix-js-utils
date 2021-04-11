import { BaseInputMapper } from './base-input-mapper'
import { BlankInputMapper } from './blank-input-mapper'
import { ReplayInputMapper } from './replay-input-mapper'
import { ReplayPreviewInputMapper } from './replay-preview-input-mapper'
import { TitleInputMapper } from './title-input-mapper'
import { VideoInputMapper } from './video-input-mapper'

export const InputMappers: { [key: string]: BaseInputMapper } = {
	Blank: new BlankInputMapper,
	Replay: new ReplayInputMapper,
	ReplayPreview: new ReplayPreviewInputMapper,
	Title: new TitleInputMapper,
	Video: new VideoInputMapper
}

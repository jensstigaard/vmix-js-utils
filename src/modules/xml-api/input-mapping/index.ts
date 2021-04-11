import { AudioInputMapper } from './audio-input-mapper'
import { BaseInputMapper } from './base-input-mapper'
import { BlankInputMapper } from './blank-input-mapper'
import { PhotosInputMapper } from './photos-input-mapper'
import { ReplayInputMapper } from './replay-input-mapper'
import { ReplayPreviewInputMapper } from './replay-preview-input-mapper'
import { SrtStreamInputMapper } from './srt-stream-input-mapper'
import { StreamInputMapper } from './stream-input-mapper'
import { TitleInputMapper } from './title-input-mapper'
import { VideoInputMapper } from './video-input-mapper'

export const InputMappers: { [key: string]: BaseInputMapper } = {
	Audio: new AudioInputMapper,
	Blank: new BlankInputMapper,
	Photos: new PhotosInputMapper,
	Replay: new ReplayInputMapper,
	ReplayPreview: new ReplayPreviewInputMapper,
	SRT: new SrtStreamInputMapper,
	Stream: new StreamInputMapper,
	Title: new TitleInputMapper,
	Video: new VideoInputMapper
}

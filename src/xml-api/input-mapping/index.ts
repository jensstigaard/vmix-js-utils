import { AudioInputMapper } from './audio-input-mapper'
import { BaseInputMapper } from './base-input-mapper'
import { BlankInputMapper } from './blank-input-mapper'
import { ImageInputMapper } from './image-input-mapper'
import { MixInputMapper } from './mix-input-mapper'
import { PhotosInputMapper } from './photos-input-mapper'
import { ReplayInputMapper } from './replay-input-mapper'
import { ReplayPreviewInputMapper } from './replay-preview-input-mapper'
import { StreamInputMapper } from './stream-input-mapper'
import { TitleInputMapper } from './title-input-mapper'
import { VideoInputMapper } from './video-input-mapper'
import { VideoCallInputMapper } from './video-call-input-mapper'
import { VideoListInputMapper } from './video-list-input-mapper'
import { VirtualSetInputMapper } from './virtual-set-input-mapper'

export const InputMappers: { [key: string]: BaseInputMapper } = {
	Audio: new AudioInputMapper,
	Blank: new BlankInputMapper,
	Browser: new VideoInputMapper,
	Capture: new VideoInputMapper,
	Colour: new ImageInputMapper,
	DesktopCapture: new VideoInputMapper,
	Image: new ImageInputMapper,
	ImageSequence: new ImageInputMapper,
	Mix: new MixInputMapper,
	NDI: new VideoInputMapper,
	Photos: new PhotosInputMapper,
	Replay: new ReplayInputMapper,
	ReplayPreview: new ReplayPreviewInputMapper,
	SRT: new StreamInputMapper,
	Stream: new StreamInputMapper,
	Title: new TitleInputMapper,
	Video: new VideoInputMapper,
	VideoCall: new VideoCallInputMapper,
	VideoList: new VideoListInputMapper,
	VideoDelay: new VideoInputMapper,
	VirtualSet: new VirtualSetInputMapper,
	VLC: new StreamInputMapper,
}

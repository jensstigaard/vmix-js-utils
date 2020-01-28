export default {

	ReplayACamera1: 'Set Replay A input to camera 1',
	ReplayACamera2: 'Set Replay A input to camera 2',
	ReplayACamera3: 'Set Replay A input to camera 3',
	ReplayACamera4: 'Set Replay A input to camera 4',

	ReplayBCamera1: 'Set Replay B input to camera 1',
	ReplayBCamera2: 'Set Replay B input to camera 2',
	ReplayBCamera3: 'Set Replay B input to camera 3',
	ReplayBCamera4: 'Set Replay B input to camera 4',

	ReplayChangeDirection: 'Switch replay direction - forward/reverse',

	ReplayChangeSpeed: {
		description: 'Change replay playback speed',
		parameters: {
			Value: {
				type: Number,
				description: 'Speed in percentage'
			}
		}
	},

	ReplayCopyLastEvent: {
		description: 'Copy last replay event to event list',
		parameters: {
			Value: {
				type: Number,
				description: 'Event list 0-7'
			}
		}
	},

	ReplayCopySelectedEvent: {
		description: 'Copy selected replay event to event list',
		parameters: {
			Value: {
				type: Number,
				description: 'Event list 0-7'
			}
		}
	},

	ReplayExportLastEvent: {
		description: 'Export last replay event to specific folder',
		parameters: {
			Value: {
				type: String,
				description: 'Folder'
			}
		}
	},

	ReplayFastBackward: {
		description: 'Replay fast backwards',
		parameters: {
			Value: {
				type: Number,
				description: 'Speed 1-30x'
			}
		}
	},

	ReplayFastForward: {
		description: 'Replay fast forward',
		parameters: {
			Value: {
				type: Number,
				description: 'Speed 1-30x'
			}
		}
	},

	ReplayJumpFrames: {
		description: 'Replay jump frames',
		parameters: {
			Value: {
				type: Number,
				description: 'Frames'
			}
		}
	},

	ReplayJumpToNow: 'Replay jump to now',

	ReplayLastEventCameraOff: {
		description: 'Replay turn off speficied camera angle for last event',
		parameters: {
			Value: {
				type: Number,
				description: 'Camera angle 1-4'
			}
		}
	},

	ReplayLastEventCameraOn: {
		description: 'Replay turn on speficied camera angle for last event',
		parameters: {
			Value: {
				type: Number,
				description: 'Camera angle 1-4'
			}
		}
	},

	ReplayLastEventSingleCameraOn: {
		description: 'Replay turn on only speficied camera angle for last event (turns off all other angles for event)',
		parameters: {
			Value: {
				type: Number,
				description: 'Camera angle 1-4'
			}
		}
	},

	ReplayLive: 'Replay: Turn on replay live mode - replay window showing live sources and new replays are created in repect to now timestamp',
	ReplayLiveToggle: 'Replay: Toggle on/off replay live mode - toggles whether replay window is showing live sources and new replays are created in repect to now timestamp',
	ReplayMarkCancel: 'Replay: Cancel marking of event',
	ReplayMarkIn: 'Replay: Mark In for new replay event in respect to current timestamp selected in replay module (from live/non live mode)',
	ReplayMarkInLive: 'Replay: Mark In for new replay event in respect to live',

	ReplayMarkInOut: {
		description: 'Replay: Mark In/Out based on number of seconds and current timestamp selected in replay module (from live/non live mode)',
		parameters: {
			Value: {
				type: Number,
				description: 'Seconds'
			}
		}
	},

	ReplayMarkInOutLive: {
		description: 'Replay: Mark In/Out based on number of seconds back from right now',
		parameters: {
			Value: {
				type: Number,
				description: 'Seconds'
			}
		}
	},

	ReplayMarkInOutRecorded: {
		description: 'Replay: Mark In/Out based on number of seconds back from current selected timestamp of recorded session',
		parameters: {
			Value: {
				type: Number,
				description: 'Seconds'
			}
		}
	},

	ReplayMarkInRecorded: 'Replay: Mark In based on currently selected timestamp of recorded session',
	ReplayMarkInRecordedNow: 'Replay: Mark In based on currently selected timestamp of now timestamp in recorded session',

	ReplayMarkOut: 'Replay: Mark Out based on currently selected timestamp of recorded session',

	ReplayMoveLastEvent: {
		description: 'Replay: Move Last replay event to other event list',
		parameters: {
			Value: {
				type: Number,
				description: 'Event list 0-7'
			}
		}
	},

	ReplayMoveSelectedEvent: {
		description: 'Replay: Move selected replay event to other event list',
		parameters: {
			Value: {
				type: Number,
				description: 'Event list 0-7'
			}
		}
	},

	ReplayMoveSelectedEventDown: 'Replay: Move to select next event (down)',
	ReplayMoveSelectedEventUp: 'Replay: Move to select previous event (up)',

	ReplayMoveSelectedInPoint: {
		description: 'Replay: Move In-point for selected event',
		parameters: {
			Value: {
				type: Number,
				description: 'Number of frames relative. Negative number = previous in time. Positive number = Forward in time'
			}
		}
	},

	ReplayMoveSelectedOutPoint: {
		description: 'Replay: Move Out-point for selected event',
		parameters: {
			Value: {
				type: Number,
				description: 'Number of frames relative. Negative number = previous in time. Positive number = Forward in time'
			}
		}
	},

	ReplayPause: 'Replay: Pause playback',
	ReplayPlay: 'Replay: Resume playback',

	ReplayPlayAllEvents: 'Replay: Play all events in active list (do NOT automatically transition to output)',
	ReplayPlayAllEventsToOutput: 'Replay: Play all events in active list (automatically transition to output)',

	ReplayPlayBackward: 'Replay: Reverse playback of replay',

	ReplayPlayEvent: {
		description: 'Replay: Play Event by ID',
		parameters: {
			Value: {
				type: Number,
				description: 'Event number: 0-1000'
			}
		}
	},

	ReplayPlayEventsByID: {
		description: 'Replay: Play Events by ID (do NOT automatically transition to output)',
		parameters: {
			Value: {
				type: String,
				description: 'List of Events each with number 0-1000'
			}
		}
	},

	ReplayPlayEventsByIDToOutput: {
		description: 'Replay: Play Events by ID (automatically transition to output)',
		parameters: {
			Value: {
				type: String,
				description: 'List of Events each with number 0-1000'
			}
		}
	},

	ReplayPlayEventToOutput: {
		description: 'Replay: Play Event by ID',
		parameters: {
			Value: {
				type: Number,
				description: 'Event number: 0-1000'
			}
		}
	},

	ReplayPlayForward: 'Replay: Forward Playback of replay inputs',

	ReplayPlayLastEvent: 'Replay: Playback of last event (do NOT automatically transition to output)',
	ReplayPlayLastEventToOutput: 'Replay: Playback of last event (automatically transition to output)',

	ReplayPlayNext: 'Replay: Play Next event',

	ReplayPlayPause: 'Replay: Resume or pause playback of replay input',
	ReplayPlayPrevious: 'Replay: Play Previous event',

	ReplayPlaySelectedEvent: 'Replay: Play selected event (do NOT automatically transition to output)',
	ReplayPlaySelectedEventToOutput: 'Replay: Play selected event (automatically transition to output)',

	ReplayRecorded: 'Replay: Set in Recorded mode (non live)',

	ReplaySelectedEventCameraOff: {
		description: 'Replay: Turn off desired camera angle for selected event',
		parameters: {
			Value: {
				type: Number,
				description: 'Camera angle 1-4'
			}
		}
	},

	ReplaySelectedEventCameraOn: {
		description: 'Replay: Turn on desired camera angle for selected event',
		parameters: {
			Value: {
				type: Number,
				description: 'Camera angle 1-4'
			}
		}
	},

	ReplaySelectedEventSingleCameraOn: {
		description: 'Replay: Turn on only desired camera angle for selected event (turns off all other angles for event)',
		parameters: {
			Value: {
				type: Number,
				description: 'Camera angle 1-4'
			}
		}
	},

	ReplaySelectEvents1: 'Replay: Select events category 1',
	ReplaySelectEvents2: 'Replay: Select events category 2',
	ReplaySelectEvents3: 'Replay: Select events category 3',
	ReplaySelectEvents4: 'Replay: Select events category 4',
	ReplaySelectEvents5: 'Replay: Select events category 5',
	ReplaySelectEvents6: 'Replay: Select events category 6',
	ReplaySelectEvents7: 'Replay: Select events category 7',
	ReplaySelectEvents8: 'Replay: Select events category 8',

	ReplaySelectFirstEvent: 'Replay: Select first event (oldest - in top) of active list/category',
	ReplaySelectLastEvent: 'Replay: Select Last event (newest - in bottom) of active list/category',

	ReplaySelectNextEvent: 'Replay: Select next event (newer)',
	ReplaySelectPreviousEvent: 'Replay: Select previos event (older)',

	ReplaySetDirectionBackward: 'Replay: Set direction backwards - Reverse playback',
	ReplaySetDirectionForward: 'Replay: Set direction backwards - Forward (normal) playback',

	ReplaySetLastEventText: {
		description: 'Replay: Set text for last event',
		parameters: {
			Value: {
				type: String,
				description: 'Text'
			}
		}
	},

	ReplaySetLastEventTextCamera: {
		description: 'Replay: Changes the text of last event of the specified angle (1-4). Example: 3,angle3text',
		parameters: {
			Value: [ // Composite separated by ","
				{
					type: Number,
					description: 'Camera'
				},
				{
					type: String,
					description: 'Text'
				}
			]
		}
	},

	ReplaySetSelectedEventText: {
		description: 'Replay: Set text for selected event',
		parameters: {
			Value: {
				type: String,
				description: 'Text'
			}
		}
	},

	ReplaySetSelectedEventTextCamera: {
		description: 'Replay: Changes the text of the selected event of the specified angle (1-4). Example: 3,angle3text',
		parameters: {
			Value: [ // Composite separated by ","
				{
					type: Number,
					description: 'Camera'
				},
				{
					type: String,
					description: 'Text'
				}
			]
		}
	},

	ReplaySetSpeed: {
		description: 'Replay: See SetRateSlowMotion',
		parameters: {
			Value: {
				type: Number,
				description: 'Speed 0.0-1.0'
			},
		}
	},

	ReplayShowHide: 'Replay: Show/hide replay window',

	ReplayStartRecording: 'Replay: Start recording of replay session',

	ReplayStopEvents: 'Replay: Stop events playback',

	ReplayStopRecording: 'Replay: Stop recording of replay session',

	ReplayToggleLastEventCamera1: 'Replay: Toggle Camera angle 1 for Last event',
	ReplayToggleLastEventCamera2: 'Replay: Toggle Camera angle 1 for Last event',
	ReplayToggleLastEventCamera3: 'Replay: Toggle Camera angle 1 for Last event',
	ReplayToggleLastEventCamera4: 'Replay: Toggle Camera angle 1 for Last event',

	ReplayToggleSelectedEventCamera1: 'Replay: Toggle Camera angle 1 for Selected event',
	ReplayToggleSelectedEventCamera2: 'Replay: Toggle Camera angle 2 for Selected event',
	ReplayToggleSelectedEventCamera3: 'Replay: Toggle Camera angle 3 for Selected event',
	ReplayToggleSelectedEventCamera4: 'Replay: Toggle Camera angle 4 for Selected event',

	ReplayUpdateSelectedInPoint: 'Replay: Update In point of Selected Event to current Position.',
	ReplayUpdateSelectedOutPoint: 'Replay: Update Mark Out point of Selected Event to current Position.',
}

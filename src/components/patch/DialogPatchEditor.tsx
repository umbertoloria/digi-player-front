import { FC, useState } from 'react'
import { VolcaDrumPatchEditor } from './VolcaDrumPatchEditor.tsx'
import { VolcaDrumPatch } from '../../lib/volca_drum_patch.ts'

const DEFAULT_PATCH: VolcaDrumPatch = {
  kick: {
    sound_src_type: 'WaveSine',
    mod_type: 'ModTri',
    amp_eg: 'EnvExp',
    level: 10,
    pitch: 10,
    eg_attack: 10,
    eg_release: 10,
    mod_amount: 10,
    mod_rate: 10,
  },
  hh: {
    sound_src_type: 'WaveSine',
    mod_type: 'ModTri',
    amp_eg: 'EnvExp',
    level: 10,
    pitch: 10,
    eg_attack: 10,
    eg_release: 10,
    mod_amount: 10,
    mod_rate: 10,
  },
  snare: {
    sound_src_type: 'WaveSine',
    mod_type: 'ModTri',
    amp_eg: 'EnvExp',
    level: 10,
    pitch: 10,
    eg_attack: 10,
    eg_release: 10,
    mod_amount: 10,
    mod_rate: 10,
  },
  sound4: {
    sound_src_type: 'WaveSine',
    mod_type: 'ModTri',
    amp_eg: 'EnvExp',
    level: 10,
    pitch: 10,
    eg_attack: 10,
    eg_release: 10,
    mod_amount: 10,
    mod_rate: 10,
  },
  sound5: {
    sound_src_type: 'WaveSine',
    mod_type: 'ModTri',
    amp_eg: 'EnvExp',
    level: 10,
    pitch: 10,
    eg_attack: 10,
    eg_release: 10,
    mod_amount: 10,
    mod_rate: 10,
  },
  sound6: {
    sound_src_type: 'WaveSine',
    mod_type: 'ModTri',
    amp_eg: 'EnvExp',
    level: 10,
    pitch: 10,
    eg_attack: 10,
    eg_release: 10,
    mod_amount: 10,
    mod_rate: 10,
  },
}

export const DialogPatchEditor: FC<{
  onClose: () => void
  onApply: (volca_drum_patch: VolcaDrumPatch) => void
}> = ({ onClose, onApply }) => {
  const [patch, setPatch] = useState(DEFAULT_PATCH)
  return (
    <>
      <VolcaDrumPatchEditor patch={patch} setPatch={setPatch} />
      <div>
        <button
          onClick={() => {
            onApply(patch)
          }}
        >
          Apply
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  )
}

import { FC } from 'react'
import { VolcaDrumPatch } from '../../lib/volca_drum_patch.ts'
import { VolcaDrumPatchLayoutEditor } from './VolcaDrumPatchLayoutEditor.tsx'

export const VolcaDrumPatchEditor: FC<{
  patch: VolcaDrumPatch
  setPatch: (patch: VolcaDrumPatch) => void
}> = ({ patch, setPatch }) => {
  return (
    <>
      <div>Patch:</div>
      <div>
        <VolcaDrumPatchLayoutEditor
          title="Kick"
          layout={patch.kick}
          setLayout={(layout) => {
            setPatch({
              ...patch,
              kick: layout,
            })
          }}
        />
        <VolcaDrumPatchLayoutEditor
          title="Hi-hat"
          layout={patch.hh}
          setLayout={(layout) => {
            setPatch({
              ...patch,
              hh: layout,
            })
          }}
        />
        <VolcaDrumPatchLayoutEditor
          title="Snare"
          layout={patch.snare}
          setLayout={(layout) => {
            setPatch({
              ...patch,
              snare: layout,
            })
          }}
        />
        <VolcaDrumPatchLayoutEditor
          title="Sound 4"
          layout={patch.sound4}
          setLayout={(layout) => {
            setPatch({
              ...patch,
              sound4: layout,
            })
          }}
        />
        <VolcaDrumPatchLayoutEditor
          title="Sound 5"
          layout={patch.sound5}
          setLayout={(layout) => {
            setPatch({
              ...patch,
              sound5: layout,
            })
          }}
        />
        <VolcaDrumPatchLayoutEditor
          title="Sound 6"
          layout={patch.sound6}
          setLayout={(layout) => {
            setPatch({
              ...patch,
              sound6: layout,
            })
          }}
        />
      </div>
    </>
  )
}

import { FC } from 'react'
import { YamlPatchLayout } from '../../lib/volca_drum_patch.ts'

export const VolcaDrumPatchLayoutEditor: FC<{
  title: string
  layout: YamlPatchLayout
  setLayout: (layout: YamlPatchLayout) => void
}> = ({ title, layout, setLayout }) => {
  return (
    <>
      <div>Layout: {title}</div>
      <div>
        <pre>{JSON.stringify(layout, null, 2)}</pre>
      </div>
    </>
  )
}

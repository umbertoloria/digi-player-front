import { FC } from 'react'
import {
  YamlPatchLayout,
  YamlPatchLayoutSoundSrcType,
} from '../../lib/volca_drum_patch.ts'

export const VolcaDrumPatchLayoutEditor: FC<{
  title: string
  layout: YamlPatchLayout
  setLayout: (layout: YamlPatchLayout) => void
}> = ({ title, layout, setLayout }) => {
  return (
    <>
      <div>Layout: {title}</div>
      <form>
        <pre>{JSON.stringify(layout, null, 2)}</pre>
        <fieldset>
          <InputSoundSourceType
            sourceSrcType={layout.sound_src_type}
            setSourceSrcType={newValue => {
              setLayout({
                ...layout,
                sound_src_type: newValue,
              })
            }}
          />
        </fieldset>
      </form>
    </>
  )
}

const InputSoundSourceType: FC<{
  sourceSrcType: YamlPatchLayoutSoundSrcType
  setSourceSrcType: (sourceSrcType: YamlPatchLayoutSoundSrcType) => void
}> = ({ sourceSrcType, setSourceSrcType }) => {
  return (
    <>
      <div>
        <label>Sound Source Type</label>
        <div>
          <RadioLabel
            name='sound_source_type'
            value='WaveSine'
            label='WaveSine'
            checked={sourceSrcType == 'WaveSine'}
            onChecked={() => {
              setSourceSrcType('WaveSine')
            }}
          />
          <RadioLabel
            name='sound_source_type'
            value='WaveSaw'
            label='WaveSaw'
            checked={sourceSrcType == 'WaveSaw'}
            onChecked={() => {
              setSourceSrcType('WaveSaw')
            }}
          />
          <RadioLabel
            name='sound_source_type'
            value='WaveNoiseHPF'
            label='WaveNoiseHPF'
            checked={sourceSrcType == 'WaveNoiseHPF'}
            onChecked={() => {
              setSourceSrcType('WaveNoiseHPF')
            }}
          />
          <RadioLabel
            name='sound_source_type'
            value='WaveNoiseLPF'
            label='WaveNoiseLPF'
            checked={sourceSrcType == 'WaveNoiseLPF'}
            onChecked={() => {
              setSourceSrcType('WaveNoiseLPF')
            }}
          />
          <RadioLabel
            name='sound_source_type'
            value='WaveNoiseBPF'
            label='WaveNoiseBPF'
            checked={sourceSrcType == 'WaveNoiseBPF'}
            onChecked={() => {
              setSourceSrcType('WaveNoiseBPF')
            }}
          />
        </div>
      </div>
    </>
  )
}

const RadioLabel: FC<{
  name: string
  value: string
  label: string
  checked: boolean
  onChecked: () => void
}> = ({ name, value, label, checked, onChecked }) => {
  return (
    <>
      <div>
        <label>
          <input
            type='radio'
            name={name}
            value={value}
            checked={checked}
            onChange={event => {
              const new_value = event.target.value
              if (new_value === value) {
                onChecked()
              }
            }}
          />
          <span>{label}</span>
        </label>
      </div>
    </>
  )
}

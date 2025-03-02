import { FC } from 'react'
import {
  YamlPatchLayout,
  YamlPatchLayoutAmpEg,
  YamlPatchLayoutModulationType,
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
          <div className="flex flex-wrap gap-2">
            <InputSoundSourceType
              sourceSrcType={layout.sound_src_type}
              setSourceSrcType={newValue => {
                setLayout({
                  ...layout,
                  sound_src_type: newValue,
                })
              }}
            />
            <InputModulationType
              modulationType={layout.mod_type}
              setModulationType={newValue => {
                setLayout({
                  ...layout,
                  mod_type: newValue,
                })
              }}
            />
            <InputAmpEg
              ampEg={layout.amp_eg}
              setAmpEg={newValue => {
                setLayout({
                  ...layout,
                  amp_eg: newValue,
                })
              }}
            />
          </div>
          <InputLevel
            label="Level"
            min={0}
            max={127}
            value={layout.level}
            setValue={newValue => {
              setLayout({
                ...layout,
                level: newValue,
              })
            }}
          />
          <InputLevel
            label="Pitch"
            min={0}
            max={127}
            value={layout.pitch}
            setValue={newValue => {
              setLayout({
                ...layout,
                pitch: newValue,
              })
            }}
          />
          <InputLevel
            label="Eg Attack"
            min={0}
            max={127}
            value={layout.eg_attack}
            setValue={newValue => {
              setLayout({
                ...layout,
                eg_attack: newValue,
              })
            }}
          />
          <InputLevel
            label="Eg Release"
            min={0}
            max={127}
            value={layout.eg_release}
            setValue={newValue => {
              setLayout({
                ...layout,
                eg_release: newValue,
              })
            }}
          />
          <InputLevel
            label="Mod. Amount"
            min={0}
            max={127}
            value={layout.mod_amount}
            setValue={newValue => {
              setLayout({
                ...layout,
                mod_amount: newValue,
              })
            }}
          />
          <InputLevel
            label="Mod. Rate"
            min={0}
            max={127}
            value={layout.mod_rate}
            setValue={newValue => {
              setLayout({
                ...layout,
                mod_rate: newValue,
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
            name="sound_source_type"
            value="WaveSine"
            label="WaveSine"
            checked={sourceSrcType == 'WaveSine'}
            onChecked={() => {
              setSourceSrcType('WaveSine')
            }}
          />
          <RadioLabel
            name="sound_source_type"
            value="WaveSaw"
            label="WaveSaw"
            checked={sourceSrcType == 'WaveSaw'}
            onChecked={() => {
              setSourceSrcType('WaveSaw')
            }}
          />
          <RadioLabel
            name="sound_source_type"
            value="WaveNoiseHPF"
            label="WaveNoiseHPF"
            checked={sourceSrcType == 'WaveNoiseHPF'}
            onChecked={() => {
              setSourceSrcType('WaveNoiseHPF')
            }}
          />
          <RadioLabel
            name="sound_source_type"
            value="WaveNoiseLPF"
            label="WaveNoiseLPF"
            checked={sourceSrcType == 'WaveNoiseLPF'}
            onChecked={() => {
              setSourceSrcType('WaveNoiseLPF')
            }}
          />
          <RadioLabel
            name="sound_source_type"
            value="WaveNoiseBPF"
            label="WaveNoiseBPF"
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

const InputModulationType: FC<{
  modulationType: YamlPatchLayoutModulationType
  setModulationType: (modulationType: YamlPatchLayoutModulationType) => void
}> = ({ modulationType, setModulationType }) => {
  return (
    <>
      <div>
        <label>Modulation Type</label>
        <div>
          <RadioLabel
            name="mod_type"
            value="ModExp"
            label="ModExp"
            checked={modulationType == 'ModExp'}
            onChecked={() => {
              setModulationType('ModExp')
            }}
          />
          <RadioLabel
            name="mod_type"
            value="ModTri"
            label="ModTri"
            checked={modulationType == 'ModTri'}
            onChecked={() => {
              setModulationType('ModTri')
            }}
          />
          <RadioLabel
            name="mod_type"
            value="ModRand"
            label="ModRand"
            checked={modulationType == 'ModRand'}
            onChecked={() => {
              setModulationType('ModRand')
            }}
          />
        </div>
      </div>
    </>
  )
}

const InputAmpEg: FC<{
  ampEg: YamlPatchLayoutAmpEg
  setAmpEg: (ampEg: YamlPatchLayoutAmpEg) => void
}> = ({ ampEg, setAmpEg }) => {
  return (
    <>
      <div>
        <label>Amp Eg</label>
        <div>
          <RadioLabel
            name="amp_eg"
            value="EnvAd"
            label="EnvAd"
            checked={ampEg == 'EnvAd'}
            onChecked={() => {
              setAmpEg('EnvAd')
            }}
          />
          <RadioLabel
            name="amp_eg"
            value="EnvExp"
            label="EnvExp"
            checked={ampEg == 'EnvExp'}
            onChecked={() => {
              setAmpEg('EnvExp')
            }}
          />
          <RadioLabel
            name="amp_eg"
            value="EnvMul"
            label="EnvMul"
            checked={ampEg == 'EnvMul'}
            onChecked={() => {
              setAmpEg('EnvMul')
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
            type="radio"
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

const InputLevel: FC<{
  label: string
  min: number
  max: number
  value: number
  setValue: (value: number) => void
}> = ({ label, min, max, value, setValue }) => {
  return (
    <>
      <span className="mr-2">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={event => {
          const newValue = event.target.value
          const newValueInt = parseInt(newValue)
          setValue(newValueInt)
        }}
      />
    </>
  )
}

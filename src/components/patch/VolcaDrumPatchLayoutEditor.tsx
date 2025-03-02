import { FC } from 'react'
import {
  YamlPatchLayout,
  YamlPatchLayoutAmpEg,
  YamlPatchLayoutModulationType,
  YamlPatchLayoutSoundSrcType,
} from '../../lib/volca_drum_patch.ts'
import classNames from 'classnames'

export const VolcaDrumPatchLayoutEditor: FC<{
  title: string
  layout: YamlPatchLayout
  setLayout: (layout: YamlPatchLayout) => void
}> = ({ title, layout, setLayout }) => {
  return (
    <div className="border-2 border-gray-500 rounded-md p-2">
      <div>Layout: {title}</div>
      <form>
        {/*<pre>{JSON.stringify(layout, null, 2)}</pre>*/}
        <div className="flex flex-wrap gap-2">
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
          <div className="flex flex-col gap-1">
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
          </div>
        </div>
      </form>
    </div>
  )
}

const InputSoundSourceType: FC<{
  sourceSrcType: YamlPatchLayoutSoundSrcType
  setSourceSrcType: (sourceSrcType: YamlPatchLayoutSoundSrcType) => void
}> = ({ sourceSrcType, setSourceSrcType }) => {
  return (
    <>
      <div>
        <label>Sound SRC TYPE</label>
        <div>
          <RadioLabel
            label="WaveSine"
            checked={sourceSrcType == 'WaveSine'}
            onChecked={() => {
              setSourceSrcType('WaveSine')
            }}
          />
          <RadioLabel
            label="WaveSaw"
            checked={sourceSrcType == 'WaveSaw'}
            onChecked={() => {
              setSourceSrcType('WaveSaw')
            }}
          />
          <RadioLabel
            label="WaveNoiseHPF"
            checked={sourceSrcType == 'WaveNoiseHPF'}
            onChecked={() => {
              setSourceSrcType('WaveNoiseHPF')
            }}
          />
          <RadioLabel
            label="WaveNoiseLPF"
            checked={sourceSrcType == 'WaveNoiseLPF'}
            onChecked={() => {
              setSourceSrcType('WaveNoiseLPF')
            }}
          />
          <RadioLabel
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
        <label>MOD. Type</label>
        <div>
          <RadioLabel
            label="ModExp"
            checked={modulationType == 'ModExp'}
            onChecked={() => {
              setModulationType('ModExp')
            }}
          />
          <RadioLabel
            label="ModTri"
            checked={modulationType == 'ModTri'}
            onChecked={() => {
              setModulationType('ModTri')
            }}
          />
          <RadioLabel
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
            label="EnvAd"
            checked={ampEg == 'EnvAd'}
            onChecked={() => {
              setAmpEg('EnvAd')
            }}
          />
          <RadioLabel
            label="EnvExp"
            checked={ampEg == 'EnvExp'}
            onChecked={() => {
              setAmpEg('EnvExp')
            }}
          />
          <RadioLabel
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
  label: string
  checked: boolean
  onChecked: () => void
}> = ({ label, checked, onChecked }) => {
  return (
    <>
      <div
        className={classNames('cursor-pointer bg-gray-200 px-1', {
          'bg-gray-400': checked,
          'hover:bg-gray-300': !checked,
        })}
        onClick={() => {
          onChecked()
        }}
      >
        {label}
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
    <div>
      <div className="mr-2 w-28 inline-block">{label}</div>
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
      <div className="ml-2 w-10 text-center inline-block bg-gray-200 rounded">{value}</div>
    </div>
  )
}

export type VolcaDrumPatch = {
  kick: YamlPatchLayout
  hh: YamlPatchLayout
  snare: YamlPatchLayout
  sound4: YamlPatchLayout
  sound5: YamlPatchLayout
  sound6: YamlPatchLayout
}
export type YamlPatchLayout = {
  sound_src_type: YamlPatchLayoutSoundSrcType
  mod_type: YamlPatchLayoutModulationType
  amp_eg: YamlPatchLayoutAmpEg
  level: number
  pitch: number
  eg_attack: number
  eg_release: number
  mod_amount: number
  mod_rate: number
}
export type YamlPatchLayoutSoundSrcType =
  | 'WaveSine'
  | 'WaveSaw'
  | 'WaveNoiseHPF'
  | 'WaveNoiseLPF'
  | 'WaveNoiseBPF'

export type YamlPatchLayoutModulationType = 'ModExp' | 'ModTri' | 'ModRand'

export type YamlPatchLayoutAmpEg = 'EnvAd' | 'EnvExp' | 'EnvMul'

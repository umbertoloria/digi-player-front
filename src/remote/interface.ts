// API
// v0.2
// 2025-03-22T20:46:14Z

export type ISong = {
  id: string
  author: string
  title: string
  tempo: {
    bpm: number
    time_signature_top: number
    time_signature_down: number
  }
  sections: ISongSection[]
}
export type ISongSection = {
  id: number
  kind: string
  bars: number
  first_bar_num: number
  time_signature_top: number
  time_signature_down: number
  chord_changes_in_time: ISongSectionChordChange[]
}
export type ISongSectionChordChange = {
  i_1_16th_start: number
  chord_name: string
}
export type ITempoSnapshot = {
  cur_bar: number
  cur_quarter: number
  cur_1_8: number
  cur_1_16: number
  section_bar_first: number
  section_bar_last: number
}

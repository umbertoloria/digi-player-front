// API
// v0.1
// 2025-03-22T19:06:57Z

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
}
export type ITempoSnapshot = {
  cur_bar: number
  cur_quarter: number
  cur_1_8: number
  cur_1_16: number
  section_bar_first: number
  section_bar_last: number
}

import { FC } from 'react'
import { create_array_of_zeros } from '../../lib/utils.ts'
import classNames from 'classnames'
import { ISong, ISongSection, ITempoSnapshot } from '../../remote/interface.ts'

export const Song: FC<{
  song: ISong
  tempoSnapshot: undefined | ITempoSnapshot
}> = ({ song, tempoSnapshot }) => {
  if (!song) {
    return <>The song is missing</>
  }
  return (
    <>
      {/*<pre>{JSON.stringify(song, null, 2)}</pre>*/}

      <span className='text-xl'>{`${song.author} - ${song.title}`}</span>
      <span className='ml-2 inline-block text-center px-2 text-md font-bold rounded border-gray-600 border-2'>
        {song.tempo.bpm}
      </span>
      <div>
        {song.sections.map((section, index) => (
          <div key={index}>
            <SongSection section={section} tempoSnapshot={tempoSnapshot} />
          </div>
        ))}
      </div>
    </>
  )
}
export const SongPlayer: FC<{
  song: ISong
  tempoSnapshot: ITempoSnapshot
}> = ({ song, tempoSnapshot }) => {
  const curr_section = get_current_song_section(song, tempoSnapshot)
  const prev_section = curr_section
    ? song.sections.find(section => section.id === curr_section.id - 1)
    : undefined
  const next_section = curr_section
    ? song.sections.find(section => section.id === curr_section.id + 1)
    : undefined
  return (
    <>
      {/*<pre>{JSON.stringify(song, null, 2)}</pre>*/}

      <span className='text-xl'>{`${song.author} - ${song.title}`}</span>
      <span className='ml-2 inline-block text-center px-2 text-md font-bold rounded border-gray-600 border-2'>
        {song.tempo.bpm}
      </span>
      <div>
        {!!prev_section && (
          <SongSection section={prev_section} tempoSnapshot={tempoSnapshot} />
        )}
        {!!curr_section && (
          <SongSection
            section={curr_section}
            isCurrent
            tempoSnapshot={tempoSnapshot}
          />
        )}
        {!!next_section && (
          <SongSection section={next_section} tempoSnapshot={tempoSnapshot} />
        )}
      </div>
    </>
  )
}

function get_current_song_section(song: ISong, tempoSnapshot: ITempoSnapshot) {
  return song.sections.find(section =>
    is_song_section_current(section, tempoSnapshot)
  )
}

function is_song_section_current(
  section: ISongSection,
  tempoSnapshot: ITempoSnapshot
) {
  return (
    section.first_bar_num <= tempoSnapshot.cur_bar &&
    tempoSnapshot.cur_bar <= section.first_bar_num + section.bars - 1
  )
}

const SongSection: FC<{
  section: ISongSection
  tempoSnapshot: undefined | ITempoSnapshot
  isCurrent?: boolean
}> = ({ section, tempoSnapshot }) => {
  return (
    <div className='song-section'>
      <div className='song-section-header'>
        <span className='font-lg'>{section.kind}</span>
      </div>
      <div className='song-section-content'>
        {create_array_of_zeros(section.bars).map((_, index) => (
          <div key={index}>
            <SongSectionBar
              is_first={index === 0}
              is_last={index === section.bars - 1}
              bar_id={section.first_bar_num + index}
              time_signature_top={section.time_signature_top}
              time_signature_down={section.time_signature_down}
              tempoSnapshot={tempoSnapshot}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const SongSectionBar: FC<{
  is_first: boolean
  is_last: boolean
  bar_id: number
  time_signature_top: number
  time_signature_down: number
  tempoSnapshot: undefined | ITempoSnapshot
}> = ({
  is_first,
  is_last,
  bar_id,
  time_signature_top,
  time_signature_down,
  tempoSnapshot,
}) => {
  const is_current_bar = tempoSnapshot?.cur_bar === bar_id
  return (
    <div
      className={classNames('song-section-bar', {
        'is-first': is_first,
        'is-last': is_last,
      })}
    >
      <div className='song-section-bar-header'>{bar_id}</div>
      <div className='song-section-bar-content'>
        {create_array_of_zeros(time_signature_top).map((_, index) => (
          <div key={index}>
            <SongSectionBarSub
              time_signature_down={time_signature_down}
              is_current_bar={is_current_bar}
              i_subdivision={index + 1}
              tempoSnapshot={tempoSnapshot}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// This is usually for Quarters.
const SongSectionBarSub: FC<{
  time_signature_down: number // As a "Subdivision Value".
  is_current_bar: boolean
  i_subdivision: number // From 1.
  tempoSnapshot: undefined | ITempoSnapshot
}> = ({ is_current_bar, i_subdivision, tempoSnapshot }) => {
  const is_current =
    // TODO: Quarter or Subdivision?
    is_current_bar && tempoSnapshot?.cur_quarter === i_subdivision
  return (
    <div
      className={classNames('song-section-bar-subdivision', {
        'is-current': is_current,
        'is-first': i_subdivision === 1,
      })}
    >
      <div className='song-section-bar-subdivision-header'>{i_subdivision}</div>
      <div className='song-section-bar-subdivision-content'>
        {create_array_of_zeros(4).map((_, index) => (
          <div key={index}>
            <SongSectionBarSub116th
              is_current_sub={is_current}
              i_1_16th={index + 1}
              tempoSnapshot={tempoSnapshot}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// This is usually for 1/16ths.
const SongSectionBarSub116th: FC<{
  is_current_sub: boolean
  i_1_16th: number // From 1.
  tempoSnapshot: undefined | ITempoSnapshot
}> = ({ is_current_sub, i_1_16th, tempoSnapshot }) => {
  const is_current =
    // TODO: Quarter or Subdivision?
    is_current_sub && tempoSnapshot?.cur_1_16 === i_1_16th
  return (
    <div
      className={classNames('song-section-bar-subdivision-116', {
        'is-current': is_current,
        'is-first': i_1_16th === 1,
      })}
    >
      {get_symbol_for_i_1_16th(i_1_16th)}
    </div>
  )
}

function get_symbol_for_i_1_16th(i_1_16th: number) {
  if (i_1_16th === 1) {
    return '1'
  } else if (i_1_16th === 2) {
    return "'"
  } else if (i_1_16th === 3) {
    return '&'
  } else if (i_1_16th === 4) {
    return "'"
  }
  // Should never happen.
  return ' '
}

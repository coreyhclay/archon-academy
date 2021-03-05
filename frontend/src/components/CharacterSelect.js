const CharacterSelect = (props) => (
  <select className='CharacterSelect' value={props.value} onChange={props.onChange}>
    <option className='characteroptions' value=''></option>
    <option value='Albedo'>Albedo</option>
    <option value='Amber'>Amber</option>
    <option value='Barbara'>Barbara</option>
    <option value='Beidou'>Beidou</option>
    <option value='Bennett'>Bennett</option>
    <option value='Chongyun'>Chongyun</option>
    <option value='Diluc'>Diluc</option>
    <option value='Diona'>Diona</option>
    <option value='Fischl'>Fischl</option>
    <option value='Ganyu'>Ganyu</option>
    <option value='Jean'>Jean</option>
    <option value='Kaeya'>Kaeya</option>
    <option value='Keqing'>Keqing</option>
    <option value='Klee'>Klee</option>
    <option value='Lisa'>Lisa</option>
    <option value='Mona'>Mona</option>
    <option value='Ningguang'>Ningguang</option>
    <option value='Noelle'>Noelle</option>
    <option value='Qiqi'>Qiqi</option>
    <option value='Razor'>Razor</option>
    <option value='Sucrose'>Sucrose</option>
    <option value='Tartaglia'>Tartaglia</option>
    <option value='Anemo Traveler'>Anemo Traveler</option>
    <option value='Geo Traveler'>Geo Traveler</option>
    <option value='Venti'>Venti</option>
    <option value='Xiangling'>Xiangling</option>
    <option value='Xiao'>Xiao</option>
    <option value='Xinyan'>Xinyan</option>
    <option value='Zhongli'>Zhongli</option>
  </select>
)

export default CharacterSelect

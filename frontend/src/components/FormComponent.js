import CharacterSelect from './CharacterSelect'

const FormComponent = () => (
  <div>
    <CharacterSelect value={this.state.slot1} onChange={this.onChangeSlot1} />
    <CharacterSelect value={this.state.slot2} onChange={this.onChangeSlot2} />
    <CharacterSelect value={this.state.slot3} onChange={this.onChangeSlot3} />
    <CharacterSelect value={this.state.slot4} onChange={this.onChangeSlot4} />
  </div>
)

export default FormComponent

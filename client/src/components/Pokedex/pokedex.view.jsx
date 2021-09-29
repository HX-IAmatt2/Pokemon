import deleteIcon from '../../assets/img/delete.png'
import renameIcon from '../../assets/img/rename.png'
import powerOffIcon from '../../assets/img/powerOff.png'

import styles from './pokedex.module.css'

const PokedexView = ({ closePokedex, detailedPokemon, deletePokemon, screenMode, setScreenMode, renamePokemon, newName, handleNameChange }) => {
  const name = detailedPokemon.name[0].toUpperCase() + detailedPokemon.name.substring(1)

  return (
    <>
      <div className={styles.main}>
        <div className={styles.pokedex}>

          {/* CLOSE */}
          <div id={styles.powerOffDiv}>
            <img id={styles.powerOffIcon} src={powerOffIcon} title='Close Pokedex' alt='' onClick={closePokedex} />
          </div>

          {/* IMAGEN */}
          <div id={styles.imgScreenStandard}>
            <img className={styles.bounce7} id={styles.img} src={detailedPokemon.img} alt='' />
          </div>

          {detailedPokemon.types.find(type => type.name === 'water')
            ? (
              <div id={styles.imgScreenWater}>
                <img className={styles.bounce7} id={styles.img} src={detailedPokemon.img} alt='' />
              </div>
              )
            : null}
          {detailedPokemon.types.find(type => type.name === 'flying')
            ? (
              <div id={styles.imgScreenSky}>
                <img className={styles.bounce7} id={styles.img} src={detailedPokemon.img} alt='' />
              </div>
              )
            : null}

          {/* ID */}
          <div id={styles.idDiv}>
            {detailedPokemon.id.toString().length === 1 ? '#00' + detailedPokemon.id : null}
            {detailedPokemon.id.toString().length === 2 ? '#0' + detailedPokemon.id : null}
            {detailedPokemon.id.toString().length === 3 ? '#' + detailedPokemon.id : null}
          </div>

          {/* NOMBRE */}
          <div id={styles.nameDiv}>
            {name}
          </div>

          {/* TYPES ICONS */}
          <div id={styles.typesIconsDiv}>

            {detailedPokemon.types.length > 1
              ? (
                  detailedPokemon.types.map((type, index) => {
                    const typeName = type.name[0].toUpperCase() + type.name.substring(1)
                    return <img key={index} className={styles.typeIcon} src={`./img/types/${type.name}.png`} alt='' title={typeName} />
                  })
                )
              : (
                <img id={styles.typeIconUnique} src={`./img/types/${detailedPokemon.types[0].name}.png`} alt='' title={detailedPokemon.types[0].name[0].toUpperCase() + detailedPokemon.types[0].name.substring(1)} />
                )}

          </div>

          {/* TYPES SCREEN */}
          <div id={styles.statsScreen}>
            {!screenMode.status
              ? (
                <>
                  {/* TYPES */}
                  <div className={styles.statDiv}>
                    {detailedPokemon.types.length > 1
                      ? <span className={styles.statTitle}>Types: </span>
                      : <span className={styles.statTitle}>Type: </span>}
                    <ul>
                      {detailedPokemon.types.map((type, index) => {
                        const typeName = type.name[0].toUpperCase() + type.name.substring(1)
                        return <li key={index}>{index === 0 ? typeName : ', ' + typeName}  </li>
                      }
                      )}
                    </ul>
                  </div>

                  {/* HP */}
                  <div className={styles.statDiv}>
                    <span className={styles.statTitle}>HP:</span>{detailedPokemon.hp}
                  </div>

                  {/* ATAQUE */}
                  <div className={styles.statDiv}>
                    <span className={styles.statTitle}>Attack:</span>{detailedPokemon.attack}
                  </div>

                  {/* DEFENSA */}
                  <div className={styles.statDiv}>
                    <span className={styles.statTitle}>Defense:</span>{detailedPokemon.defense}
                  </div>

                  {/* VELOCIDAD */}
                  <div className={styles.statDiv}>
                    <span className={styles.statTitle}>Speed: </span>{detailedPokemon.speed}
                  </div>
                </>
                )
              : null}

            {screenMode.status === 'deleting'
              ? (
                <>
                  <p>Do you want to delete <span id={styles.deleteName}>{name}</span> ?</p>
                  <div id={styles.deleteOptionsBox}>
                    <h3 className={styles.deleteOption} onClick={() => deletePokemon(detailedPokemon.name)}>YES</h3>
                    <h2>{'   '}</h2>
                    <h3 className={styles.deleteOption} onClick={() => setScreenMode(prev => ({ ...prev, status: null }))}>NO</h3>
                  </div>
                </>
                )
              : null}

            {screenMode.status === 'renaming'
              ? (
                <>
                  <p>Type a new name</p>
                  <div className={styles.errorBox}>
                    {newName.error ? newName.error : null}
                  </div>
                  <div id={styles.deleteOptionsBox}>
                    <div id={styles.inputBox}>
                      <input
                        id={styles.inputName}
                        type='text'
                        name='name'
                        value={newName.name}
                        onChange={(event) => handleNameChange(event.target.value)}
                      />
                      {!newName.error
                        ? <div className={styles.deleteOption} onClick={() => renamePokemon(detailedPokemon.name)}>OK</div>
                        : <div className={styles.deleteOptionDisabled}>OK</div>}
                    </div>
                  </div>
                </>
                )
              : null}

            {screenMode.status === 'deleted'
              ? (
                <>
                  <p>{screenMode.msg}</p>
                  <p className={styles.statTitle}>Closing Pokedex...</p>
                </>
                )
              : null}

          </div>

          {/* ALTURA */}
          <div id={styles.heightTitleDiv}>
            <span className={styles.statTitle}>Height</span>
          </div>
          <div id={styles.heightDiv}>
            {detailedPokemon.height}
          </div>

          {/* PESO */}
          <div id={styles.weightTitleDiv}>
            <span className={styles.statTitle}>Weight</span>
          </div>
          <div id={styles.weightDiv}>
            {detailedPokemon.weight}
          </div>

          {/* DELETE BUTTON */}
          <>
            {detailedPokemon.category === 'custom'
              ? (
                <div id={styles.deleteDiv}>
                  <img id={styles.deleteButton} src={deleteIcon} title={`Delete ${name}`} alt='' onClick={() => setScreenMode(prev => ({ ...prev, status: 'deleting' }))} />

                </div>
                )
              : null}
          </>

          {/* RENAME BUTTON */}
          <>
            {detailedPokemon.category === 'custom'
              ? (
                <div id={styles.renameDiv}>
                  <img id={styles.renameButton} src={renameIcon} title={`Rename ${name}`} alt='' onClick={() => setScreenMode(prev => ({ ...prev, status: 'renaming' }))} />
                </div>
                )
              : null}
          </>
        </div>

      </div>
    </>
  )
}

export default PokedexView

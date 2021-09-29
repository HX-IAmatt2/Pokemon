import Alert from '../Alert/alert'
import check from '../../assets/img/check.png'
import wrong from '../../assets/img/wrong.png'
import styles from './pokeLab.module.css'

const PokeLabView = ({ form, handleChange, handleSubmit, validate, handleNameChange, handleCheckboxChange, backToHome, typeList, done, error }) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.form}>
          {done
            ? <Alert done={done} />
            : (
              <>
                <div className={styles.column}>
                  {/* NAME */}
                  <div className={styles.inputGroup}>
                    <div className={styles.largeInputDiv}>
                      <label>Name</label>
                      <div className={styles.inputBox}>
                        <div>
                          <input
                            className={styles.inputName}
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={(event) => handleNameChange(event.target.value)}
                          />
                          {!error.name ? (<span><img className={styles.errorStatusIcon} src={check} alt='' /></span>) : null}
                          {error.name === 'wrong' ? (<span><img className={styles.errorStatusIcon} src={wrong} alt='' /></span>) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    {/* HP */}
                    <div className={styles.inputDiv}>
                      <label>HP</label>
                      <div className={styles.inputBox}>
                        <div>
                          <input
                            className={styles.input}
                            type='number'
                            name='hp'
                            value={form.hp}
                            min='1'
                            onChange={(event) => handleChange(event.target.name, event.target.value)}
                          />
                          {!error.hp ? (<span><img className={styles.errorStatusIcon} src={check} alt='' /></span>) : null}
                          {error.hp === 'wrong' ? (<span><img className={styles.errorStatusIcon} src={wrong} alt='' /></span>) : null}

                        </div>
                      </div>
                    </div>

                    {/* SPEED */}
                    <div className={styles.inputDiv}>
                      <label>Speed</label>
                      <div className={styles.inputBox}>
                        <input
                          className={styles.input}
                          type='number'
                          name='speed'
                          value={form.speed}
                          min='1'
                          onChange={(event) => handleChange(event.target.name, event.target.value)}
                        />
                        {!error.speed ? (<span><img className={styles.errorStatusIcon} src={check} alt='' /></span>) : null}
                        {error.speed === 'wrong' ? (<span><img className={styles.errorStatusIcon} src={wrong} alt='' /></span>) : null}
                      </div>
                    </div>

                    <div className={styles.inputDivTwo}>
                      {/* ATTACK */}
                      <label>Attack</label>
                      <div className={styles.inputBox}>
                        <input
                          className={styles.input}
                          type='number'
                          name='attack'
                          value={form.attack}
                          min='1'
                          onChange={(event) => handleChange(event.target.name, event.target.value)}
                        />
                        {!error.attack ? (<span><img className={styles.errorStatusIcon} src={check} alt='' /></span>) : null}
                        {error.attack === 'wrong' ? (<span><img className={styles.errorStatusIcon} src={wrong} alt='' /></span>) : null}
                      </div>
                    </div>

                    {/* DEFENSE */}
                    <div className={styles.inputDivTwo}>
                      <label>Defense</label>
                      <div className={styles.inputBox}>
                        <input
                          className={styles.input}
                          type='number'
                          name='defense'
                          value={form.defense}
                          min='1'
                          onChange={(event) => handleChange(event.target.name, event.target.value)}
                        />
                        {!error.defense ? (<span><img className={styles.errorStatusIcon} src={check} alt='' /></span>) : null}
                        {error.defense === 'wrong' ? (<span><img className={styles.errorStatusIcon} src={wrong} alt='' /></span>) : null}
                      </div>
                    </div>
                    <div id={styles.points}>
                      Remaining Points: {255 - form.speed - form.hp - form.attack - form.defense}
                      {error.points === 'wrong' ? (<span><img className={styles.errorStatusIcon} src={wrong} alt='' /></span>) : null}
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    {/* HEIGHT */}
                    <div className={styles.inputDiv}>
                      <label>Height</label>
                      <div className={styles.inputBox}>
                        <input
                          className={styles.input}
                          type='number'
                          name='height'
                          value={form.height}
                          min='1'
                          onChange={(event) => handleChange(event.target.name, event.target.value)}
                        />
                        {!error.height ? (<span><img className={styles.errorStatusIcon} src={check} alt='' /></span>) : null}
                        {error.height === 'wrong' ? (<span><img className={styles.errorStatusIcon} src={wrong} alt='' /></span>) : null}
                      </div>
                    </div>

                    {/* WEIGHT */}
                    <div className={styles.inputDiv}>
                      <label>Weight</label>
                      <div className={styles.inputBox}>
                        <input
                          className={styles.input}
                          type='number'
                          name='weight'
                          value={form.weight}
                          min='1'
                          onChange={(event) => handleChange(event.target.name, event.target.value)}
                        />
                        {!error.weight ? (<span><img className={styles.errorStatusIcon} src={check} alt='' /></span>) : null}
                        {error.weight === 'wrong' ? (<span><img className={styles.errorStatusIcon} src={wrong} alt='' /></span>) : null}
                      </div>
                    </div>

                  </div>
                </div>

                <div className={styles.column}>
                  {/* TYPES */}
                  <div className={styles.inputGroup}>
                    <div id={styles.types}>
                      <div>
                        <label>Types</label>
                        {!error.types ? (<span><img className={styles.errorStatusIcon} src={check} alt='' /></span>) : null}
                        {error.types === 'wrong' ? (<span><img className={styles.errorStatusIcon} src={wrong} alt='' /></span>) : null}
                      </div>
                      <div id={styles.typesTable}>

                        {/* PRIMER COLUMNA */}
                        <div className={styles.typeColumn}>
                          {typeList.slice(0, typeList.length / 2).map((type, index) => {
                            const typeName = type[0].toUpperCase() + type.substring(1)
                            return (
                              <div key={index} className={styles.type}>
                                <img key={index} className={styles.typeIcon} src={`./img/types/${type}.png`} alt='' />
                                <label className={styles.typeLabel}>{typeName}</label>
                                {form.types.length > 1 && !form.types.includes(type)
                                  ? <input disabled type='checkbox' id={type} />
                                  : <input type='checkbox' id={type} onChange={(event) => handleCheckboxChange(event)} />}
                              </div>
                            )
                          })}

                        </div>

                        {/* SEGUNDA COLUMNA */}
                        <div className={styles.typeColumn}>
                          {typeList.slice(typeList.length / 2).map((type, index) => {
                            const typeName = type[0].toUpperCase() + type.substring(1)
                            return (
                              <div key={index} className={styles.type}>
                                <img key={index} className={styles.typeIcon} src={`./img/types/${type}.png`} alt='' />
                                <label className={styles.typeLabel}>{typeName}</label>
                                {form.types.length > 1 && !form.types.includes(type)
                                  ? <input disabled type='checkbox' id={type} />
                                  : <input type='checkbox' id={type} onChange={(event) => handleCheckboxChange(event)} />}
                              </div>
                            )
                          })}

                        </div>

                      </div>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className={styles.inputGroup}>
                    <div id={styles.buttonsDiv}>
                      <button id={styles.cancelButton} onClick={backToHome}>CANCEL</button>
                      {validate
                        ? <button id={styles.createButton} onClick={handleSubmit}>CREATE</button>
                        : <button id={styles.createButtonDisabled} disabled>CREATE</button>}
                    </div>
                  </div>

                </div>
              </>
              )}
        </div>

      </div>

    </>
  )
}

export default PokeLabView

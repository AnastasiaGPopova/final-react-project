
import styles from "../Create/Create.module.css";
import { useForm } from "../../hooks/useForm";

function Create() {
  const {recordValues, onChangeHandler, onGenresChange, onSubmitHandler, errorMessages} = useForm({}, {
    recordName: "",
    artist: "",
    year: "",
    imageUrl: "",
    description: "",
    rpm: "33",
  }, 'create')


  return (
    <div className={styles.hero}>
      {errorMessages && (
      <div className={styles.errorMsg}>
          <h1> Error Message:</h1>
          <p>{errorMessages}</p>
        </div>)}

      <form>
        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">
            <i className="fa-solid fa-envelope" /> Record Name:
          </label>
          <input
            className={styles.registerboxInput}
            type="text"
            id="recordName"
            name="recordName"
            placeholder="Write you record name..."
            value={recordValues.recordName}
            onChange={onChangeHandler}
          />
        </div>
        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">
            <i className="fa-solid fa-envelope" /> Artist:
          </label>
          <input
            className={styles.registerboxInput}
            type="text"
            id="artist"
            name="artist"
            placeholder="Write you record name..."
            value={recordValues.artist}
            onChange={onChangeHandler}
          />
        </div>
        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">
            <i className="fa-solid fa-envelope" /> Year:
          </label>
          <input
            className={styles.registerboxInput}
            type="text"
            id="year"
            name="year"
            placeholder="Write the year..."
            value={recordValues.year}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">
            <i className="fa-solid fa-envelope" /> Image Url:
          </label>
          <input
            className={styles.registerboxInput}
            type="text"
            id="imageurl"
            name="imageUrl"
            placeholder="Write the image url..."
            value={recordValues.imageUrl}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">
            <i className="fa-solid fa-envelope" /> Description:
          </label>
          <textarea
            className={styles.registerboxInputDescription}
            type="text"
            id="description"
            name="description"
            placeholder="Write description..."
            value={recordValues.description}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.registerbox1}>
          <label className={styles.registerboxLabels} htmlFor="text">
            {" "}
            RPM:
          </label>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="PRM33">
              33
            </label>
            <input
              className="radioInput"
              type="radio"
              id="PRM33"
              name="rpm"
              value="33"
              onChange={onChangeHandler}
              checked={recordValues.rpm === "33"}
            />
          </div>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="PRM33">
              45
            </label>
            <input
              className="radioInput"
              type="radio"
              id="PRM33"
              name="rpm"
              value="45"
              onChange={onChangeHandler}
              checked={recordValues.rpm === "45"}
            />
          </div>
        </div>

        <div className={styles.registerbox2}>
          <label className={styles.registerboxLabels} htmlFor="text">
            {" "}
            Genre:
          </label>
          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="genre">
              Rock
            </label>
            <input
              className="radioInput"
              type="checkbox"
              id="rock"
              name="genre"
              onChange={onGenresChange}
              checked={recordValues.rock}
            />
          </div>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="genre">
              Jazz
            </label>
            <input
              className="radioInput"
              type="checkbox"
              id="jazz"
              name="genre"
              onChange={onGenresChange}
              checked={recordValues.jazz}
            />
          </div>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="genre">
              Pop
            </label>
            <input
              className="radioInput"
              type="checkbox"
              id="pop"
              name="genre"
              onChange={onGenresChange}
              checked={recordValues.pop}
            />
          </div>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="genre">
              Alternative
            </label>
            <input
              className="radioInput"
              type="checkbox"
              id="alternative"
              name="genre"
              onChange={onGenresChange}
              checked={recordValues.alternative}
            />
          </div>
        </div>
        <br/>
        <button
          className={styles.submitButton}
          type="button"
          onClick={onSubmitHandler}
        >
          <span></span>CREATE RECORD{" "}
        </button>
      </form>
    </div>
  );
}

export default Create;

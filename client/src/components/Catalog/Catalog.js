import { useEffect, useState } from "react";
import styles from "../Catalog/Catalog.module.css";
import Record from "../SingleRecord/Record";
import * as data from "../../api/data";
import { useNavigate } from "react-router-dom";

function Catalog({ records, setRecords, setIsChanged }) {
  const navigate = useNavigate();
  const [isSearched, setIsSearched] = useState(false)
  const [sortedByLikes, setSortedByLikes] = useState(false)
  const [sortedByRecordName, setSortedByRecordName] = useState(false)
  const [sortedByLastAdded, setSortedByLastAdded] = useState(true)
  const [searchValues, setSearchValues] = useState({
    searchItem: "",
    genres: "",
    rpm: "",
    year: "",
  });






  return (
    <>
      <div className={styles.s009}>
        <form>
          <div className={styles.advancesearch}>
            <div className={styles.row1}>
              <div>
                <input
                  type="text"
                  id="searchItem"
                  name="searchItem"
                  placeholder="Search artist/record..."
                />
              </div>
              <div className="input-field">
                <div className={styles.inputselect}>
                  <label>TEST!</label>
                  <select data-trigger="" name="choices-single-defaul">
                    <option>Rock</option>
                    <option>Alternative</option>
                    <option>Jazz</option>
                    <option>Pop</option>
                  </select>
                </div>
              </div>
            </div>
            <br/>

            <div className={styles.row2}>
              <div className="input-field">
                <div className={styles.inputselect}>
                  <select data-trigger="" name="choices-single-defaul">
                    <option placeholder="" value="">
                      RPM
                    </option>
                    <option>33</option>
                    <option>45</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputfield}>
                <div className={styles.inputselect}>
                  <select data-trigger="" name="choices-single-defaul">
                    <option placeholder="" value="">
                      Year
                    </option>
                    <option>1950 and older</option>
                    <option>1950-1980</option>
                    <option>1980-2000</option>
                    <option>2000-2020</option>
                    <option>2020 and newer</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.row3}>
              <div className={styles.groupbtn}>
                <button className={styles.buttonReset}>
                  <span className={styles.searchAdvanced} />
                  RESET
                </button>
                <button className={styles.buttonReset}>
                  <span className={styles.searchAdvanced} />
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <section className={styles.pagesection}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.blogform}>
              <div className={styles.gramo}>
                <img
                  className={styles.gramoimg}
                  src="/images/gramophone.png"
                  alt=""
                />
                <div className={styles.allSorting}>
                  <div className={styles.plate1}>
                    <img
                      className={styles.plate1img}
                      src="/images/plate.png"
                      alt=""
                    />
                    <div className={styles.centersort}>
                      <button className={styles.button1} onClick={async() => {
                        setSortedByLastAdded(true)
                        setSortedByLikes(false)
                        setSortedByRecordName(false)
                        setRecords(state => ([...state].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))))
                      }}>
                        <span className={styles.search}/>
                        Last added
                      </button>
                    </div>
                  </div>
                  <div className={styles.plate2}>
                    <img
                      className={styles.plate2img}
                      src="/images/plate.png"
                      alt=""
                    />
                    <div className={styles.centersort}>
                      <button className={styles.button2} onClick={() => {
                        setSortedByLikes(true)
                        setSortedByLastAdded(false)
                        setSortedByRecordName(false)
                        setRecords(state => ([...state].sort((a,b) => b.likes - a.likes)))
                      }}>
                        <span className={styles.search}/>
                        Likes count
                      </button>
                    </div>
                  </div>
                  <div className={styles.plate3}>
                    <img
                      className={styles.plate3img}
                      src="/images/plate.png"
                      alt=""
                    />
                    <div className={styles.centersort}>
                      <button className={styles.button3} onClick={() => {
                        setSortedByLikes(false)
                        setSortedByLastAdded(false)
                        setSortedByRecordName(true)
                        setRecords(state => ([...state].sort((a,b) => a.recordName > b.recordName ? 1 : -1)))
                      }}>
                        <span className={styles.search} />
                        Alphabetical
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles["col-lg-9"]} style={{ paddingLeft: 30 }}>
              <div className={styles.row}>

                
                {/* ---------All Records----------- */}

                {sortedByLikes &&
                records.map((x) => (<Record key={x._id} {...x} />
                ))
                }

                {sortedByLastAdded &&
                 records.map((x) => (<Record key={x._id} {...x} />
                 ))
                } 

                {sortedByRecordName &&
                 records.map((x) => (<Record key={x._id} {...x} />
                 ))
                } 

                {records.length === 0 && (
                  <div className={styles.norecord}>
                    <h2>There are no records reviews found yet...</h2>
                    <button
                      className={styles.createbutton}
                      type="button"
                      onClick={() => navigate("/create")}
                    >
                      <span className={styles.noentries}></span> CREATE NOW{" "}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Catalog;

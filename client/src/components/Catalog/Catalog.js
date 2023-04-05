import { useState, useEffect } from "react";
import { useContext } from "react";
import {RecordContext } from "../../contexts/RecordContext";
import styles from "../Catalog/Catalog.module.css";
import Record from "../SingleRecord/Record";
import * as dataApi from "../../api/data";
import { useNavigate } from "react-router-dom";
import Spinner from "../../utils/Spinner";

function Catalog() {
  const navigate = useNavigate();
  const {records, setRecords, loading , setLoading} = useContext(RecordContext)
  const [sortedByLikes, setSortedByLikes] = useState(false)
  const [sortedByRecordName, setSortedByRecordName] = useState(false)
  const [sortedByLastAdded, setSortedByLastAdded] = useState(true)
  const [searchValues, setSearchValues] = useState({
    searchItem: "",
    genres: "all",
    rpm: "all",
    year: "all",
  });

  useEffect(() => {
    async function updateRecords(){
      const result = await dataApi.getRecords()
      setRecords(result)
      setSortedByLikes(false)
      setSortedByLastAdded(true)
      setSortedByRecordName(false)
      setSearchValues((state) => ({ searchItem:'', genres: "all", rpm: "all", year: "all" }))
    }
    updateRecords()
  }, [setRecords])

  const onChangeHandler = (e) => {
    setSearchValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  async function onSubmitHandler(e){
    e.preventDefault()
    const data = {
      searchItem: searchValues.searchItem,
      genres: searchValues.genres,
      rpm: searchValues.rpm,
      year: searchValues.year
    }

    console.log(data)

    setLoading(true)
    const response = await dataApi.searchFunction(data)
    console.log(response)
    setRecords(response)
    setLoading(false)
  }




  return (
    loading ? (<Spinner loading={loading}/>) : (
    <>
      <div className={styles.s009}>
        <form onSubmit={onSubmitHandler}>
          <div className={styles.advancesearch}>
            <div className={styles.row1}>
                <input
                  type="text"
                  id="searchItem"
                  name="searchItem"
                  placeholder="Search artist/record..."
                  value={searchValues.searchItem}
                  onChange={onChangeHandler}/>
            </div>
            <br/>


            <div className={styles.row2}>
            <div className={styles.inputfield}>
            <label htmlFor="genre">Genre</label>
                <div className={styles.inputselect}>
                  <select name="genres" id="genre" value={searchValues.genres}
                                                    onChange={onChangeHandler}>
                    <option value='all'>All</option>
                    <option value='rock'>Rock</option>
                    <option value='alternative'>Alternative</option>
                    <option value='jazz'>Jazz</option>
                    <option value='pop'>Pop</option>
                  </select>
                </div>
              </div>
              <div className={styles.inputfield}>
              <label htmlFor="rpm">RPM</label>
                <div className={styles.inputselect}>
                  <select name="rpm" id="rpm" value={searchValues.rpm}
                                              onChange={onChangeHandler}>
                    <option value='all'>All</option>
                    <option value='33'>33</option>
                    <option value='45'>45</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputfield}>
              <label htmlFor="year">Year</label>
                <div className={styles.inputselect}>
                  <select name="year" id="year" value={searchValues.year}
                                                onChange={onChangeHandler}>
                    <option value='all'>All</option>
                    <option>1980 and older</option>
                    <option>1980-2020</option>
                    <option>2021 and newer</option>
                  </select>
                </div>
              </div>
            </div>
            <br/>




            <div className={styles.row3}>
              <div className={styles.groupbtn}>
                <button className={styles.buttonReset} onClick={async () => {
                  const result = await dataApi.getRecords()
                  setRecords(result)
                  setSortedByLikes(false)
                  setSortedByLastAdded(true)
                  setSortedByRecordName(false)
                  setSearchValues((state) => ({ searchItem:'', genres: "all", rpm: "all", year: "all" }))
                }}>
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
        <h5 className={styles.catalogText}>Record list: </h5>
        <p className={styles.catalogTextP}>
        {sortedByLikes && ' sorted by likes'}
        {sortedByLastAdded && ' sorted by creation date'}
        {sortedByRecordName && ' sorted by album name (A-Z)'}
        </p>


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
                        Album(A-Z)
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
                    <h2>There are no records found.</h2>
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
  )
  )
}

export default Catalog;

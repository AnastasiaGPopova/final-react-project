
const router = require("express").Router();

const recordManager = require("../managers/recordManager");

router.post("/", async (req, res) => {
    console.log(`----------TEST SEARCH-----------------`)

    console.log(req.body.searchItem)
    const {searchItem, year, rpm, genres } = req.body

    if(year === "all" && rpm === "all" && genres ==="all" && searchItem === ""){
        const result = await recordManager.getAll()
        console.log(`--------Search By Name----------`)
        console.log(result)
        return res.json(result)
    }


        // //----------SearchItem + GLOBAL TEST

        // if(year === "" && rpm !== "" && genres !=="" && searchItem !== ""){
        //     const result = await recordManager.globalTEST(searchItem, year, genres, rpm).clone()
        //     console.log(`--------global test---------`)
        //     console.log(result)
        //     console.log(genres)
        //     return res.json(result)
        // }


    if(year === "all" && rpm === "all" && genres ==="all" && searchItem !== ""){
        const result = await recordManager.getSearchedbyArtistOrRecord(searchItem).clone()
        console.log(`--------Search By Name----------`)
        console.log(result)
        return res.json(result)
    }

    if(year !== "all" && rpm === "all" && genres ==="all" && searchItem === ""){
        if(year === "1980-2020"){
            const result = await recordManager.getSearchedbyYear1980to2020().clone()
            console.log(`--------1980-2020----------`)
            console.log(result)
            return res.json(result)

        }

        if(year === "2021 and newer"){
            const result = await recordManager.getSearchedbyYear2021andNewer().clone()
            console.log(`--------2021 and newer----------`)
            console.log(result)
            return res.json(result)

        }

        if(year === "1980 and older"){
            const result = await recordManager.getSearchedbyYear1980andOlder().clone()
            console.log(`--------1980 and older----------`)
            console.log(result)
            return res.json(result)

        }
        // const result = await recordManager.getSearchedbyArtistOrRecord(searchItem).clone()
        console.log(year)
    }

    if(year === "all" && rpm === "all" && genres !=="all" && searchItem === ""){
        const result = await recordManager.getbyGenre(genres).clone()
        console.log(result)
        console.log(genres)
        return res.json(result)
    }


    if(year === "all" && rpm !== "all" && genres ==="all" && searchItem === ""){
        const result = await recordManager.getbyRPM(rpm).clone()
        console.log(result)
        console.log(rpm)
        return res.json(result)
    }

//------Combinations---------------------

    //------------ Combinations with SearchItem
    //----------SearchItem + YEAR
    if(year !== "all" && rpm === "all" && genres ==="all" && searchItem !== ""){

        console.log(`-------Iteam and year-----------`)

        if(year === "1980-2020"){
            const result = await recordManager.itemandYear1980to2020(searchItem).clone()
            console.log(`--------1980-2020----------`)
            console.log(result)
            return res.json(result)

        }

        if(year === "2021 and newer"){
            const result = await recordManager.itemandYear2020andNewer(searchItem).clone()
            console.log(`--------2021 and newer----------`)
            console.log(result)
            return res.json(result)
        }

        if(year === "1980 and older"){
            const result = await recordManager.itemandYear1980andOlder(searchItem).clone()
            console.log(`--------1980 and older----------`)
            console.log(result)
            return res.json(result)
        }
    }

    //----------SearchItem + GENRE

    if(year === "all" && rpm === "all" && genres !=="all" && searchItem !== ""){
        const result = await recordManager.itemandGenre(searchItem, genres).clone()
        console.log(result)
        console.log(genres)
        return res.json(result)
    }

    //----------SearchItem + RPM
    if(year === "all" && rpm !== "all" && genres ==="all" && searchItem !== ""){
        const result = await recordManager.itemandRPM(searchItem, rpm).clone()
        console.log(result)
        console.log(genres)
        return res.json(result)
    }

    //SearchItem+ RPM + Year
    if(year !== "all" && rpm !== "all" && genres ==="all" && searchItem !== ""){

        console.log(`-------Iteam and year-----------`)

        if(year === "1980-2020"){
            const result = await recordManager.itemRPMYear1980to2020(searchItem, rpm).clone()
            console.log(`--------1980-2020----------`)
            console.log(result)
            return res.json(result)

        }

        if(year === "2021 and newer"){
            const result = await recordManager.itemRPMYear2020andNewer(searchItem, rpm).clone()
            console.log(`--------2021 and newer----------`)
            console.log(result)
            return res.json(result)
        }

        if(year === "1980 and older"){
            const result = await recordManager.itemRPMYear1980andOlder(searchItem, rpm).clone()
            console.log(`--------1980 and older----------`)
            console.log(result)
            return res.json(result)
        }
    }


        //SearchItem+ Genre + Year
        if(year !== "all" && rpm === "all" && genres !=="all" && searchItem !== ""){

            console.log(`-------SearchItem+ Genre + Year-----------`)
    
            if(year === "1980-2020"){
                const result = await recordManager.itemGenreYear1980to2020(searchItem, genres).clone()
                console.log(`--------1980-2020----------`)
                console.log(result)
                return res.json(result)
    
            }
    
            if(year === "2021 and newer"){
                const result = await recordManager.itemGenreYear2020andNewer(searchItem, genres).clone()
                console.log(`--------2021 and newer----------`)
                console.log(result)
                return res.json(result)
            }
    
            if(year === "1980 and older"){
                const result = await recordManager.itemGenreYearear1980andOlder(searchItem, genres).clone()
                console.log(`--------1980 and older----------`)
                console.log(result)
                return res.json(result)
            }
        }

        //SearchItem+ Genre + Year + RPM

        if(year !== "all" && rpm !== "all" && genres !=="all" && searchItem !== ""){

            console.log(`-------Iteam and year-----------`)
    
            if(year === "1980-2020"){
                const result = await recordManager.allYear1980to2020(searchItem, genres, rpm).clone()
                console.log(`--------1980-2020----------`)
                console.log(result)
                return res.json(result)
    
            }
    
            if(year === "2021 and newer"){
                const result = await recordManager.allYear2020andNwer(searchItem, genres, rpm).clone()
                console.log(`--------2021 and newer----------`)
                console.log(result)
                return res.json(result)
            }
    
            if(year === "1980 and older"){
                const result = await recordManager.allYear1980andOlder(searchItem, genres, rpm).clone()
                console.log(`--------1980 and older----------`)
                console.log(result)
                return res.json(result)
            }
        }


                //SearchItem+ Genre + RPM

                if(year === "all" && rpm !== "all" && genres !=="all" && searchItem !== ""){

                    console.log(`-------Iteam + Genre + RPM-----------`)

                    const result = await recordManager.itemGenreRPM(searchItem, genres, rpm)
                    return res.json(result)
                }

//------------ Combinations with Year

/// Year with PRM
if(year !== "all" && rpm !== "all" && genres ==="all" && searchItem === ""){

    console.log(`-------Iteam and year-----------`)

    if(year === "1980-2020"){
        const result = await recordManager.RPMYear1980to2020(rpm).clone()
        console.log(`--------1980-2020----------`)
        console.log(result)
        return res.json(result)

    }

    if(year === "2021 and newer"){
        const result = await recordManager.RPMYear2020andNewer(rpm).clone()
        console.log(`--------2021 and newer----------`)
        console.log(result)
        return res.json(result)
    }

    if(year === "1980 and older"){
        const result = await recordManager.RPMYear1980andOlder(rpm).clone()
        console.log(`--------1980 and older----------`)
        console.log(result)
        return res.json(result)
    }
}

/// Year with genre
if(year !== "all" && rpm === "all" && genres !=="all" && searchItem === ""){

    console.log(`-------Iteam and year-----------`)

    if(year === "1980-2020"){
        const result = await recordManager.genre1980to2020(genres).clone()
        console.log(`--------1980-2020----------`)
        console.log(result)
        return res.json(result)

    }

    if(year === "2021 and newer"){
        const result = await recordManager.genre2020andNewer(genres).clone()
        console.log(`--------2021 and newer----------`)
        console.log(result)
        return res.json(result)
    }

    if(year === "1980 and older"){
        const result = await recordManager.genre1980andOlder(genres).clone()
        console.log(`--------1980 and older----------`)
        console.log(result)
        return res.json(result)
    }
}


//------------ Combinations with genre
if(year === "all" && rpm !== "all" && genres !=="all" && searchItem === ""){
    const result = await recordManager.genreandRPM(genres, rpm).clone()
    console.log(result)
    console.log(genres)
    return res.json(result)
}

//genre+year+rpm
if(year !== "all" && rpm !== "all" && genres !=="all" && searchItem === ""){

    console.log(`-------Iteam and year-----------`)

    if(year === "1980-2020"){
        const result = await recordManager.genreRPM1980to2020(genres, rpm).clone()
        console.log(`--------1980-2020----------`)
        console.log(result)
        return res.json(result)

    }

    if(year === "2021 and newer"){
        const result = await recordManager.genreRPM2020andNewer(genres, rpm).clone()
        console.log(`--------2021 and newer----------`)
        console.log(result)
        return res.json(result)
    }

    if(year === "1980 and older"){
        const result = await recordManager.genreRPM1980andOlder(genres, rpm).clone()
        console.log(`--------1980 and older----------`)
        console.log(result)
        return res.json(result)
    }
}



  });

module.exports = router
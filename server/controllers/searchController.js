
const router = require("express").Router();

const recordManager = require("../managers/recordManager");

router.post("/", async (req, res) => {
    console.log(`----------TEST SEARCH-----------------`)
    console.log(req.body.searchItem)
    const {searchItem, year, rpm, genres } = req.body


    if(year === "" && rpm === "" && genres ==="" && searchItem !== ""){
        const result = await recordManager.getSearchedbyArtistOrRecord(searchItem).clone()
        console.log(result)
        return res.json(result)
    }

    if(year !== "" && rpm === "" && genres ==="" && searchItem === ""){
        if(year === "1980-2020"){
            const result = await recordManager.getSearchedbyYear1980to2020().clone()
            console.log(result)
            return res.json(result)

        }

        if(year === "2021 and newer"){
            const result = await recordManager.getSearchedbyYear2021andNewer().clone()
            console.log(result)
            return res.json(result)

        }

        if(year === "1980 and older"){
            const result = await recordManager.getSearchedbyYear1980andOlder().clone()
            console.log(result)
            return res.json(result)

        }
        // const result = await recordManager.getSearchedbyArtistOrRecord(searchItem).clone()
        console.log(year)
    }

    if(year === "" && rpm === "" && genres !=="" && searchItem === ""){
        const result = await recordManager.getbyGenre(genres).clone()
        console.log(result)
        console.log(genres)
        return res.json(result)
    }


    if(year === "" && rpm !== "" && genres ==="" && searchItem === ""){
        const result = await recordManager.getbyRPM(rpm).clone()
        console.log(result)
        console.log(rpm)
        return res.json(result)
    }



  });

module.exports = router
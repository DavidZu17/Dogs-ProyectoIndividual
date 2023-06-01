export const fuctionFilterByType = ( copyFilter ) =>{
    const list1 = copyFilter.sort((dogA, dogB) => {
        const primerPesoInfo = dogA.weight.replace(" ", "").split("-")
        let primerMin = parseInt(primerPesoInfo[0])
        let primerMax = parseInt(primerPesoInfo[1])

        const segundoPesoInfo = dogB.weight.replace(" ", "").split("-")
        let segundoMin = parseInt(segundoPesoInfo[0])
        let segundoMax = parseInt(segundoPesoInfo[1])

        if(isNaN(primerMin)) primerMin = 0
        if(isNaN(segundoMin)) segundoMin = 0

        if(isNaN(primerMax)) primerMax = 0
        if(isNaN(segundoMax)) segundoMax = 0

        if(primerMin != segundoMin) 
            return primerMin - segundoMin
        else 
            return primerMax - segundoMax

    });
    return list1
}
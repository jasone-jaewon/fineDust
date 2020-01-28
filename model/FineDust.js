const wear_mask = '마스크 착용하세요!!\n';
const fine_dust = Object.freeze({
    BEST : {info : '최고 좋음',message : ''},
    GOOD : {info : '좋음', message : ''},
    NORMAL : {info : '보통', message : ''},
    LITTLE_BAD : {info : '조금 나쁨', message : ''},
    BAD : {info : '나쁨', message : wear_mask},
    SUPER_BAD : {info : '상당히 나쁨', message : wear_mask},
    WORST : {info : '최악', message : wear_mask}
});

let getFineDust = function getFineDust(aqi_US) {
    if (aqi_US >= 0 && aqi_US <= 30) {
        return fine_dust.BEST;
    }
    if (aqi_US > 30 && aqi_US <= 50) {
        return fine_dust.GOOD;
    }
    if (aqi_US > 50 && aqi_US <= 80) {
        return fine_dust.NORMAL;
    }
    if (aqi_US > 80 && aqi_US <= 100) {
        return fine_dust.LITTLE_BAD;
    }
    if (aqi_US > 100 && aqi_US <= 150) {
        return fine_dust.BAD;
    }
    if (aqi_US > 150 && aqi_US <= 200) {
        return fine_dust.SUPER_BAD;
    }
    return fine_dust.WORST;
};
module.exports.fineDust = fine_dust;
module.exports.getFineDust = getFineDust;
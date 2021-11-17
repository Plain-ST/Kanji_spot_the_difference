const APPLICATION_KEY = "03552dc7200f90891de96acab646c520a78d9c874530c6b0f15c872dc962a77a";
const CLIENT_KEY = "8e286744b54f9946c663eaa38545a3cefe007778a435d36863e68ec3b51f3a89";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "Kanji_spot_the_difference";
const key = "score";
let scoreClass = ncmb.DataStore(DBName);
let Score;

function Save_score(score){
    Score = score;
    let Score_data = new scoreClass();
    Score_data.set(key,score)
        .save()
        .then(High_Score_Check())
        .catch(function(e) {
            alert("スコア保存失敗："+e);
        });
}

function High_Score_Check() {
    scoreClass.order("score")
        .fetchAll()
        .then(function(data){
            let data_List = [];
            for(i=0;i<data.length;i++){
                data_List.push(data[i].score);
            }
            data_List.push(Score);
            data_List.sort();
            console.log(data_List);
            if(data_List[0]==Score){
                alert("High Score");
            }
        })
        .catch(function(e) {
            alert("データ取得失敗："+e)            
        });
}
window.addEventListener("load", () => {
    const set = new Array();
    const cdText = new Array("①","②","③");

    const music1 = new Audio("musics/music.mp3");
    music1.volume = 0.5;
    const music2 = new Audio("musics/クイズ正解1.mp3");
    music2.volume = 0.5;
    const music3 = new Audio("musics/クイズ不正解1.mp3");
    music3.volume = 0.5;

    const music4 = new Audio("musics/「1」.mp3");
    music4.volume = 0.5;
    const music5 = new Audio("musics/「2」.mp3");
    music5.volume = 0.5;
    const music6 = new Audio("musics/「3」.mp3");
    music6.volume = 0.5;
    const cdAudio = new Array(music4, music5, music6);

    const startBtn = document.getElementById("start-btn");
    const selectBox = document.getElementById("select-box");
    const flashText = document.getElementById("flash-text");
    const set1 = document.querySelector("select[name=set1]");
    const set2 = document.querySelector("select[name=set2]");
    const set3 = document.querySelector("select[name=set3]");
    const conTitle = document.getElementById("contents-title");
    const answerBox = document.getElementById("answer");
    const answerBtn = document.getElementById("answer-btn");
    const backBtn = document.getElementById("back-btn");
    let countNum = 0;
    let answer = 0;
    let cdNum = 3;

    // スタート時に必要なもの以外は隠しておく
    flashText.setAttribute("style", "display: none;");
    answerBox.setAttribute("style", "display: none;");
    answerBtn.setAttribute("style", "display: none;");
    backBtn.setAttribute("style", "display: none;");
    
    // 問題の作成・表示
    const numCreate = () => {
        // 選択された問題数になったら数値の表示を止める
        countNum++;
        // 0から1までの数でランダムな数値を作成
        let rdm = Math.random();
        /* 
            Math.pow(x, y)　xのy乗
            rdmが小数点以下の数値なので、桁数に合わせた数値に変換し、小数点以下は切り捨てる
            0が出力されるのを防ぐ * 0.9 + Math.pow(10, set[0]-1)
        */
        rdm = Math.floor(rdm * Math.pow(10, set[0]) * 0.9 + Math.pow(10, set[0] - 1));
        // 全ての数値を計算
        answer += rdm;
        flashText.textContent = rdm.toLocaleString();
        music1.currentTime = 0;
        music1.play();
        //　問題表示後に空白を表示するためblankを呼び出し
        interval = setTimeout(blank, set[2]*1000);
    }
    
    // 問題表示後の空白を表示するための処理
    const blank = () => {
        flashText.textContent = "";
        if(set[1] == countNum){
            clearInterval(interval);
            // 答えの入力欄、テキストの表示
            // conText.textContent = "解答を入力して答えを確認してみましょう"
            answerBox.removeAttribute("style", "display: none;");
            answerBtn.removeAttribute("style", "display: none;");
        }else {
            // 0.1秒間空白を表示
            interval = setTimeout(numCreate, 100);
        }
    }

    // 問題表示前のカウントダウンの処理
    const countDown = () => {
        cdNum--;
        // 配列から呼び出し、カウントダウン音声再生
        flashText.textContent = cdText[cdNum];
        cdAudio[cdNum].play();
        if(cdNum == 0){
            // カウントダウン終了後、1秒間の空白を入れてスタートする
            interval = setTimeout(blank, 1000);
        }else{
            // cdNumが0になるまでカウントダウンの処理を呼び出し
            interval = setTimeout(countDown, 1000);
        }
    }
    
    // スタートボタンを押した時の処理
    startBtn.addEventListener("click", () => {
        // フラッシュ暗算の文字を隠す
        conTitle.setAttribute("style", "display: none;");
        // 数字が表示されるようにする
        flashText.removeAttribute("style", "display: none;");
        // スタートボタンを隠す
        startBtn.setAttribute("style", "display: none;");
        // 選択肢・テキストを隠す
        selectBox.setAttribute("style", "display: none;");
        // conText.textContent = "";
        // 問題桁数・問題数・表示間隔を取得し、配列内へ格納
        set[0] = set1.value;
        set[1] = set2.value;
        set[2] = set3.value;
        //カウントダウンの処理を呼び出し
        countDown();
    })

    // 確認ボタンを押した時の処理
    answerBtn.addEventListener("click", () => {
        // 確認ボタンを非表示
        answerBtn.setAttribute("style", "display: none;");
        // 答えが書き換えられないようにする
        answerBox.disabled = true;
        // 答え合わせ
        const answerValue = answerBox.value;
        if(answerValue == answer){
            flashText.textContent = answer.toLocaleString();
            music2.play();
        }else{
            flashText.textContent = answer.toLocaleString();
            music3.play();
        }
        // もう一度行うボタンを表示
        backBtn.removeAttribute("style", "display: none;");
    })
    
    // もう一度行うボタンを押した時の処理
    backBtn.addEventListener("click", () => {
        // フラッシュ暗算の文字を表示
        conTitle.removeAttribute("style", "display: none;");
        // 数字が表示される箇所を隠す
        flashText.setAttribute("style", "display: none;");
        // もう一度行うボタンを非表示
        backBtn.setAttribute("style", "display: none;");
        // スタートボタン、選択肢を表示
        selectBox.removeAttribute("style", "display: none;");
        // conText.textContent = "桁数・問題数(口数)・問題速度を選んで、スタートを押してください!"
        startBtn.removeAttribute("style", "display: none;");
        // 正解をリセット・解答欄を非表示
        flashText.textContent = "";
        answerBox.setAttribute("style", "display: none;");
        answerBox.disabled = false;
        answerBox.value = "";
        // もう一度計算できるようにするためにカウントと数値の合計を元に戻す
        countNum = 0;
        answer = 0;
        cdNum = 3;
    })
    
})